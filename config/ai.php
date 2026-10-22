<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Asistente de IA (Anthropic Claude)
    |--------------------------------------------------------------------------
    |
    | Configuración del chat de IA que puede leer el código del proyecto y
    | proponer cambios sobre archivos. Los cambios NUNCA se aplican de forma
    | automática: se generan como diff y requieren aprobación explícita.
    |
    */

    // Clave de API de Anthropic (https://console.anthropic.com)
    'api_key' => env('ANTHROPIC_API_KEY'),

    // Endpoint base de la API de Anthropic.
    'base_url' => env('ANTHROPIC_BASE_URL', 'https://api.anthropic.com'),

    // Modelo a utilizar. Opus 5.5 es el más capaz para código.
    'model' => env('ANTHROPIC_MODEL', 'claude-opus-5-5'),

    // Máximo de tokens de salida por turno del modelo.
    'max_tokens' => (int) env('ANTHROPIC_MAX_TOKENS', 8192),

    // Nivel de esfuerzo (razonamiento adaptativo) de Opus 5.x.
    'effort' => env('ANTHROPIC_EFFORT', 'medium'),

    // Número máximo de iteraciones del "tool loop" (leer/buscar/proponer).
    'max_iterations' => (int) env('AI_MAX_ITERATIONS', 8),

    // Límite de bytes al leer un archivo para contexto.
    'max_file_bytes' => (int) env('AI_MAX_FILE_BYTES', 60000),

    // Máximo de líneas al leer un archivo para contexto.
    'max_file_lines' => (int) env('AI_MAX_FILE_LINES', 1200),

    // Máximo de resultados de búsqueda devueltos al modelo.
    'max_search_results' => (int) env('AI_MAX_SEARCH_RESULTS', 40),

    // TTL (segundos) de un cambio pendiente de aprobación.
    'pending_change_ttl' => (int) env('AI_PENDING_CHANGE_TTL', 3600),

    // Rutas/segmentos denegados: la IA jamás puede leer o escribir aquí.
    'deny_paths' => [
        '.env',
        'vendor',
        'node_modules',
        'storage',
        '.git',
        'bootstrap/cache',
    ],

    // Extensiones binarias denegadas (se evita leer/escribir binarios).
    'deny_extensions' => [
        'png', 'jpg', 'jpeg', 'gif', 'bmp', 'ico', 'webp', 'avif', 'svgz',
        'pdf', 'zip', 'gz', 'tar', '7z', 'rar', 'exe', 'bin', 'dll', 'so',
        'woff', 'woff2', 'ttf', 'eot', 'otf',
        'mp3', 'mp4', 'avi', 'mov', 'webm', 'wav', 'ogg',
        'sqlite', 'db', 'bak',
    ],
];
