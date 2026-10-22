<?php

namespace App\Services\Ai;

use Illuminate\Support\Facades\Http;
use RuntimeException;

/**
 * Cliente HTTP (streaming) para la API de mensajes de Anthropic.
 *
 * Consume el endpoint /v1/messages en modo streaming y expone los deltas de
 * texto mediante un callback, acumulando internamente los bloques de
 * contenido (texto y tool_use) para devolverlos como resultado.
 */
class AnthropicClient
{
    /**
     * Envía una petición de mensajes con streaming.
     *
     * @param  array  $payload  Cuerpo de la petición (model, system, messages, tools, max_tokens...).
     * @param  callable  $onTextDelta  Recibe cada delta de texto (string).
     * @return array{stop_reason: ?string, content: array, tool_uses: array}
     *
     * @throws RuntimeException
     */
    public function streamMessage(array $payload, callable $onTextDelta): array
    {
        $apiKey = config('ai.api_key');

        if (empty($apiKey)) {
            throw new RuntimeException('ANTHROPIC_API_KEY no está configurada. Añádela a tu .env.');
        }

        $payload['stream'] = true;

        $response = Http::withHeaders([
            'x-api-key' => $apiKey,
            'anthropic-version' => '2023-06-01',
            'content-type' => 'application/json',
        ])
            ->withOptions([
                'stream' => true,
                'timeout' => 0,
                'connect_timeout' => 15,
            ])
            ->post(rtrim((string) config('ai.base_url'), '/') . '/v1/messages', $payload);

        if ($response->status() >= 400) {
            throw new RuntimeException(
                'Error de Anthropic (' . $response->status() . '): '
                . mb_substr((string) $response->body(), 0, 500)
            );
        }

        $stream = $response->toPsrResponse()->getBody();

        $blocks = [];
        $stopReason = null;
        $buffer = '';

        while (! $stream->eof()) {
            $buffer .= $stream->read(4096);

            while (($nl = strpos($buffer, "\n")) !== false) {
                $line = substr($buffer, 0, $nl);
                $buffer = substr($buffer, $nl + 1);
                $line = rtrim($line, "\r");

                if ($line === '' || ! str_starts_with($line, 'data:')) {
                    continue;
                }

                $data = json_decode(trim(substr($line, 5)), true);

                if (! is_array($data)) {
                    continue;
                }

                $this->handleEvent($data, $blocks, $stopReason, $onTextDelta);
            }
        }

        return [
            'stop_reason' => $stopReason,
            'content' => $this->buildContentBlocks($blocks),
            'tool_uses' => $this->buildToolUses($blocks),
        ];
    }

    private function handleEvent(array $data, array &$blocks, ?string &$stopReason, callable $onTextDelta): void
    {
        $type = $data['type'] ?? null;

        switch ($type) {
            case 'content_block_start':
                $idx = $data['index'];
                $cb = $data['content_block'] ?? [];
                $blocks[$idx] = [
                    'type' => $cb['type'] ?? 'text',
                    'text' => '',
                    'thinking' => (string) ($cb['thinking'] ?? ''),
                    'signature' => (string) ($cb['signature'] ?? ''),
                    'id' => $cb['id'] ?? null,
                    'name' => $cb['name'] ?? null,
                    'input_json' => '',
                ];
                break;

            case 'content_block_delta':
                $idx = $data['index'];
                if (! isset($blocks[$idx])) {
                    $blocks[$idx] = [
                        'type' => 'text',
                        'text' => '',
                        'thinking' => '',
                        'signature' => '',
                        'input_json' => '',
                    ];
                }
                $delta = $data['delta'] ?? [];
                $dtype = $delta['type'] ?? null;

                if ($dtype === 'text_delta') {
                    $text = (string) ($delta['text'] ?? '');
                    $blocks[$idx]['text'] .= $text;
                    if ($text !== '') {
                        $onTextDelta($text);
                    }
                } elseif ($dtype === 'input_json_delta') {
                    $blocks[$idx]['input_json'] .= (string) ($delta['partial_json'] ?? '');
                } elseif ($dtype === 'thinking_delta') {
                    $blocks[$idx]['thinking'] = ($blocks[$idx]['thinking'] ?? '') . (string) ($delta['thinking'] ?? '');
                } elseif ($dtype === 'signature_delta') {
                    $blocks[$idx]['signature'] = ($blocks[$idx]['signature'] ?? '') . (string) ($delta['signature'] ?? '');
                }
                break;

            case 'message_delta':
                $stopReason = $data['delta']['stop_reason'] ?? $stopReason;
                break;

            case 'error':
                throw new RuntimeException(
                    'Error en el stream de Anthropic: '
                    . ($data['error']['message'] ?? json_encode($data))
                );

            default:
                // message_start, content_block_stop, message_stop, ping...
                break;
        }
    }

    private function buildContentBlocks(array $blocks): array
    {
        $content = [];
        foreach ($blocks as $block) {
            $type = $block['type'] ?? 'text';

            if ($type === 'text') {
                $content[] = ['type' => 'text', 'text' => $block['text']];
            } elseif ($type === 'thinking') {
                $content[] = [
                    'type' => 'thinking',
                    'thinking' => $block['thinking'] ?? '',
                    'signature' => $block['signature'] ?? '',
                ];
            } elseif ($type === 'tool_use') {
                $content[] = [
                    'type' => 'tool_use',
                    'id' => $block['id'],
                    'name' => $block['name'],
                    'input' => $this->decodeJson($block['input_json'] ?? ''),
                ];
            }
            // redacted_thinking y otros tipos se ignoran.
        }

        return $content;
    }

    private function buildToolUses(array $blocks): array
    {
        $tools = [];
        foreach ($blocks as $block) {
            if (($block['type'] ?? '') !== 'tool_use') {
                continue;
            }

            $tools[] = [
                'id' => $block['id'],
                'name' => $block['name'],
                'input' => $this->decodeJson($block['input_json'] ?? ''),
            ];
        }

        return $tools;
    }

    private function decodeJson(string $json): array
    {
        $decoded = json_decode($json, true);

        return is_array($decoded) ? $decoded : [];
    }
}
