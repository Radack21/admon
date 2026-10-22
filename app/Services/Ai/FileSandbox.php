<?php

namespace App\Services\Ai;

use RuntimeException;

/**
 * Sandbox de sistema de archivos para el asistente de IA.
 *
 * Garantiza que cualquier ruta que la IA quiera leer o escribir:
 *  - sea relativa al directorio del proyecto (base_path),
 *  - no escape del proyecto (sin "..", sin rutas absolutas, sin symlinks externos),
 *  - no apunte a rutas sensibles (.env, vendor, node_modules, storage, .git, ...).
 */
class FileSandbox
{
    /**
     * Resuelve una ruta relativa a una ruta absoluta dentro del proyecto.
     *
     * @throws RuntimeException si la ruta es inválida o está denegada.
     */
    public function resolve(string $path, bool $allowMissing = false): string
    {
        $path = trim(str_replace('\\', '/', $path));

        if ($path === '' || $path === '.') {
            throw new RuntimeException('Ruta vacía.');
        }

        // Rechaza rutas absolutas y protocolos.
        if (str_starts_with($path, '/')) {
            throw new RuntimeException('No se permiten rutas absolutas.');
        }
        if (preg_match('/^[a-zA-Z]:\//', $path) || preg_match('#^[a-z]+://#i', $path)) {
            throw new RuntimeException('Ruta no válida.');
        }

        // Rechaza navegación hacia arriba.
        foreach (explode('/', $path) as $segment) {
            if ($segment === '..') {
                throw new RuntimeException('No se permite navegar fuera del proyecto.');
            }
        }

        $base = rtrim(base_path(), '/');
        $full = $base . '/' . ltrim($path, '/');

        $real = realpath($full);

        if ($real === false) {
            if (! $allowMissing) {
                throw new RuntimeException("El archivo o directorio no existe: {$path}");
            }

            // Para objetivos de escritura inexistentes: el directorio padre debe existir.
            $parentReal = realpath(dirname($full));
            if ($parentReal === false) {
                throw new RuntimeException("El directorio padre no existe: {$path}");
            }
            $real = rtrim($parentReal, '/') . '/' . basename($full);
        }

        // Verificación de contención dentro del proyecto.
        if ($real !== $base && ! str_starts_with($real, $base . '/')) {
            throw new RuntimeException('La ruta escapa del directorio del proyecto.');
        }

        $this->assertAllowed($real);

        return $real;
    }

    /**
     * Verifica que la ruta absoluta no esté en la lista de denegados.
     */
    public function assertAllowed(string $absolutePath): void
    {
        $rel = ltrim(str_replace('\\', '/', substr($absolutePath, strlen(base_path()))), '/');

        // Denegar por segmento/ruta.
        foreach ((array) config('ai.deny_paths', []) as $deny) {
            $deny = trim((string) $deny, '/');
            if ($deny === '') {
                continue;
            }
            if ($rel === $deny || str_starts_with($rel, $deny . '/')) {
                throw new RuntimeException("La ruta está denegada: {$rel}");
            }
        }

        $basename = basename($rel);

        // .env exacto, y .env.* salvo .env.example (que es seguro).
        if ($basename === '.env') {
            throw new RuntimeException('El archivo .env está denegado.');
        }
        if (str_starts_with($basename, '.env.') && $basename !== '.env.example') {
            throw new RuntimeException('Los archivos .env.* están denegados.');
        }

        // Denegar extensiones binarias.
        $ext = strtolower(pathinfo($basename, PATHINFO_EXTENSION));
        if ($ext !== '' && in_array($ext, (array) config('ai.deny_extensions', []), true)) {
            throw new RuntimeException("Extensión denegada: .{$ext}");
        }
    }
}
