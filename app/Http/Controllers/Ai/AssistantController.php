<?php

namespace App\Http\Controllers\Ai;

use App\Http\Controllers\Controller;
use App\Services\Ai\AssistantService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use RuntimeException;

class AssistantController extends Controller
{
    public function __construct(private readonly AssistantService $assistant)
    {
    }

    /**
     * Página del asistente (Inertia).
     */
    public function index()
    {
        return Inertia::render('Asistente/Index', [
            'config' => [
                'model' => config('ai.model'),
                'maxIterations' => (int) config('ai.max_iterations'),
            ],
        ]);
    }

    /**
     * Endpoint de chat con streaming (SSE).
     */
    public function chat(Request $request)
    {
        $validated = $request->validate([
            'message' => ['required', 'string', 'max:8000'],
            'history' => ['sometimes', 'array', 'max:40'],
        ]);

        $userId = (int) $request->user()->id;
        $message = (string) $validated['message'];
        $history = $validated['history'] ?? [];

        return response()->stream(function () use ($userId, $message, $history) {
            set_time_limit(0);

            $emit = function (string $event, array $data = []) {
                if (connection_aborted()) {
                    throw new RuntimeException('client_aborted');
                }

                echo 'data: ' . json_encode(['type' => $event, ...$data]) . "\n\n";

                if (ob_get_level() > 0) {
                    ob_flush();
                }
                flush();
            };

            try {
                $this->assistant->run($userId, $message, $history, $emit);
            } catch (RuntimeException $e) {
                if ($e->getMessage() !== 'client_aborted') {
                    $emit('error', ['message' => $e->getMessage()]);
                }
            } catch (\Throwable $e) {
                $emit('error', ['message' => 'Error interno del asistente: ' . $e->getMessage()]);
            }
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache, no-transform',
            'Connection' => 'keep-alive',
            'X-Accel-Buffering' => 'no',
        ]);
    }

    /**
     * Aplica un cambio pendiente previamente aprobado por el usuario.
     */
    public function apply(Request $request)
    {
        $validated = $request->validate([
            'change_id' => ['required', 'string', 'max:64'],
        ]);

        try {
            $result = $this->assistant->applyPending((string) $validated['change_id'], (int) $request->user()->id);

            return response()->json(['ok' => true, 'path' => $result['path']]);
        } catch (RuntimeException $e) {
            return response()->json(['ok' => false, 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Descarta un cambio pendiente.
     */
    public function discard(Request $request)
    {
        $validated = $request->validate([
            'change_id' => ['required', 'string', 'max:64'],
        ]);

        $this->assistant->discardPending((string) $validated['change_id'], (int) $request->user()->id);

        return response()->json(['ok' => true]);
    }
}
