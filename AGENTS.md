# BriefData Admon — Convenciones para agentes

## Screenshots de pruebas

- Guardar en la carpeta `screenshots/` (gitignored)
- Al final de cada sesión de pruebas visuales, limpiar con: `rm -rf screenshots/`

## Build & Dev

- Servidor PHP: `php artisan serve` (puerto 8000)
- Vite dev: `npm run dev` (HMR en puerto 5173)
- Build producción: `npm run build`
- Vite debe estar corriendo para ver cambios en caliente; si no, usar `npm run build` para compilar

## Estructura del frontend

```
resources/
├── css/app.css         # Tailwind v4 (@theme + keyframes + utilities)
├── js/
│   ├── app.jsx         # Entry point Inertia + React
│   ├── Layouts/
│   │   └── AppLayout.jsx   # Layout principal (header animado + sidebar + status)
│   ├── Pages/
│   │   ├── Home.jsx        # Dashboard (usa Header.jsx con Logo + UserCapsule)
│   │   ├── Ingresos/
│   │   │   └── Index.jsx   # Listado con tabs + tabla
│   │   └── auth/
│   │       ├── Login.jsx
│   │       └── ForgotPassword.jsx
│   └── Components/
│       ├── header/
│       │   └── AnimatedHeader.jsx  # Header animado p/AppLayout (pills→expanding→crossfade→final)
│       ├── layout/header/Header.jsx  # Header del Home (Logo + UserCapsule pills fijos)
│       ├── ui/
│       │   ├── Logo.jsx         # Widget logo marca (Home)
│       │   └── UserCapsule.jsx  # Widget usuario (Home)
│       ├── sidebar/RightSidebar.jsx
│       ├── status/StatusBar.jsx
│       ├── table/ (TableCard, DataTable, Pagination)
│       └── tabs/TabsBar.jsx
```

## Tema visual

- Tema oscuro, fondo canvas con gradiente radial rojo/negro + grano animado
- Vidrio: `bg-white/5 backdrop-blur-[20px] border border-white/15`
- Fuentes: Outfit (principal), Space Grotesk (código/fechas), Inter (sans)
- Marca: "Brief" gradiente white→white/75, "Data" gradiente #F97316→#EF4444

## Header animado (páginas internas)

4 fases controladas por timers en `AnimatedHeader.jsx`:
1. `pills` (0-0.1s): Dos píldoras glass en left:20/right:20, width:auto, rounded-full
2. `expanding` (0.1-1.0s): Píldoras expanden a 50% width, vidrio migra a barra unificada
3. `crossfade` (1.0-1.5s): Widgets + FinalHeader se solapan, crossfade de opacidad
4. `final` (1.5s+): Solo FinalHeader, datetime aparece a 1.8s con fade radial

## Notas

- `AppHeader.jsx` fue eliminado (código muerto)
- El Home usa `Header.jsx` → `Logo.jsx` + `UserCapsule.jsx` (píldoras fijas, sin animación)
- No tocar `Logo.jsx` ni `UserCapsule.jsx` si el cambio es solo del header de páginas internas

## Módulos implementados

### Clientes (`/clientes`)
- **Página**: `Pages/Clientes/Index.jsx` — 3 tabs (Directorio, Potenciales, Mailing)
- **Tabla**: `Pages/Clientes/ClientesDataTable.jsx` — columnas: Cliente, Folio, RFC, Estatus, Fecha, Contacto + acciones
- **Controlador**: `Http/Controllers/Clients/ClientController.php`
- **API**: `Http/Controllers/Clients/ClientApiController.php` (estados, ciudades, subtipos)
- **Modelos**: `Client`, `ClientContact`, `ClientSocialNetwork`, `ClientCredential`, `ClientMetadata`, `Mailing`
- **Catálogos**: `PersonaTipo`, `UsoCfdi`, `SubTipoCliente`, `RegimenFiscal`, `FormaJuridica`, `Ambito`, `Tamanio`, `Sector`, `Clasificacion`, `Rama`, `Pais`, `Estado`, `Ciudad`, `Servicio`
- **Tabla**: `clients` (unifica Directorio + Potenciales del legacy)

## DB

- Conexión principal: `mariadb` → `migracion` (52.73.109.51)
- Conexión legacy: `legacy` → `matecsol_Brief` (mismo server, solo lectura para migrar datos)
- Las credenciales están en `.env`
