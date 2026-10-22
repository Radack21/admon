<?php

namespace App\Support;

/**
 * Generador de diffs unificados sin dependencias externas.
 *
 * Usa LCS (longest common subsequence) sobre las líneas. Para archivos muy
 * grandes (más de ~1500 líneas o >2M celdas) cae en un "reemplazo total"
 * para no agotar memoria.
 */
class UnifiedDiff
{
    /**
     * Genera un diff unificado entre dos textos.
     */
    public static function diff(string $old, string $new, string $label = 'archivo', int $context = 3): string
    {
        $a = preg_split('/\r\n|\r|\n/', $old);
        $b = preg_split('/\r\n|\r|\n/', $new);

        $n = count($a);
        $m = count($b);

        $header = "--- a/{$label}\n+++ b/{$label}\n";

        if ($old === $new) {
            return $header . '(sin cambios)';
        }

        if ($n === 0 || $m === 0 || $n > 1500 || $m > 1500 || ($n * $m) > 2_000_000) {
            return $header . self::fullReplace($a, $b);
        }

        // LCS por programación dinámica.
        $dp = array_fill(0, $n + 1, array_fill(0, $m + 1, 0));
        for ($i = $n - 1; $i >= 0; $i--) {
            for ($j = $m - 1; $j >= 0; $j--) {
                $dp[$i][$j] = ($a[$i] === $b[$j])
                    ? $dp[$i + 1][$j + 1] + 1
                    : max($dp[$i + 1][$j], $dp[$i][$j + 1]);
            }
        }

        // Backtracking para obtener las operaciones.
        $ops = []; // ['-', $line] | ['+', $line] | [' ', $line]
        $i = 0;
        $j = 0;
        while ($i < $n && $j < $m) {
            if ($a[$i] === $b[$j]) {
                $ops[] = [' ', $a[$i]];
                $i++;
                $j++;
            } elseif ($dp[$i + 1][$j] >= $dp[$i][$j + 1]) {
                $ops[] = ['-', $a[$i]];
                $i++;
            } else {
                $ops[] = ['+', $b[$j]];
                $j++;
            }
        }
        while ($i < $n) {
            $ops[] = ['-', $a[$i]];
            $i++;
        }
        while ($j < $m) {
            $ops[] = ['+', $b[$j]];
            $j++;
        }

        return $header . self::renderHunks($ops, $context);
    }

    /**
     * Convierte una secuencia de operaciones en hunks @@ con contexto.
     */
    private static function renderHunks(array $ops, int $context): string
    {
        // Índices de línea reales (1-based) para "-" y "+".
        $oldLine = 0;
        $newLine = 0;

        $total = count($ops);
        $out = '';
        $hunk = [];
        $hunkOldStart = null;
        $hunkNewStart = null;

        $flush = function () use (&$out, &$hunk, &$hunkOldStart, &$hunkNewStart) {
            if (empty($hunk)) {
                return;
            }
            $oldCount = 0;
            $newCount = 0;
            foreach ($hunk as [$tag]) {
                if ($tag !== '+') {
                    $oldCount++;
                }
                if ($tag !== '-') {
                    $newCount++;
                }
            }
            $out .= '@@ -' . $hunkOldStart . ',' . $oldCount
                . ' +' . $hunkNewStart . ',' . $newCount . " @@\n";
            foreach ($hunk as [$tag, $line]) {
                $out .= $tag . $line . "\n";
            }
            $hunk = [];
        };

        for ($idx = 0; $idx < $total; $idx++) {
            [$tag, $line] = $ops[$idx];

            if ($tag === '-') {
                $oldLine++;
                $hunkOldStart = $hunkOldStart ?? $oldLine;
                $hunkNewStart = $hunkNewStart ?? ($newLine + 1);
            } elseif ($tag === '+') {
                $newLine++;
                $hunkOldStart = $hunkOldStart ?? ($oldLine + 1);
                $hunkNewStart = $hunkNewStart ?? $newLine;
            } else {
                $oldLine++;
                $newLine++;
                $hunkOldStart = $hunkOldStart ?? $oldLine;
                $hunkNewStart = $hunkNewStart ?? $newLine;
            }

            $hunk[] = [$tag, $line];

            // Cierre de hunk: cuando hay suficiente contexto sin cambios después
            // de un cambio.
            if ($tag === ' ' && count($hunk) > $context * 2) {
                // Verifica si ya no hay cambios cercanos.
                $hasChangeAhead = false;
                for ($k = $idx + 1; $k < min($total, $idx + 1 + $context); $k++) {
                    if ($ops[$k][0] !== ' ') {
                        $hasChangeAhead = true;
                        break;
                    }
                }
                if (! $hasChangeAhead) {
                    $flush();
                    $hunkOldStart = null;
                    $hunkNewStart = null;
                }
            }
        }

        $flush();

        return $out;
    }

    /**
     * Reemplazo total (archivo muy grande o vacío).
     */
    private static function fullReplace(array $a, array $b): string
    {
        $out = '';
        foreach ($a as $line) {
            $out .= '-' . $line . "\n";
        }
        foreach ($b as $line) {
            $out .= '+' . $line . "\n";
        }
        return $out;
    }
}
