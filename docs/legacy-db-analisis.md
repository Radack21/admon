# Análisis de la base de datos legacy (`matecsol_Brief`)

> Fecha: 16 de octubre de 2026
> Fuente: `matecsol_Brief` en `52.73.109.51` (conexión de solo lectura).
> Contexto: migración de CodeIgniter 2.1.4 → Laravel 12 + Inertia + React (`/Migracion/Admon`).

## Resumen ejecutivo

| Métrica | Valor |
|---|---|
| Tablas | 73 |
| Foreign keys | **0** |
| Motores | 59 InnoDB + 14 MyISAM |
| Filas en MyISAM | 282,224 (casi todo `MHistorico`, 281,132) |
| Tablas sin primary key | 3 (`Empresa`, `Mineria`, `Modulos`) |
| Columnas `varchar` | 323 |
| Columnas `int` | 205 |
| Columnas `date` / `datetime` / `timestamp` | 27 / 3 / 2 |
| Collations | 70 `latin1_swedish_ci` + 3 `utf8mb3_general_ci` |
| Columnas NOT NULL sin default (no auto_increment) | 508 |

---

## 1. Errores estructurales

| # | Error | Evidencia |
|---|-------|-----------|
| 1 | **Cero foreign keys** en las 73 tablas | `information_schema.referential_constraints` = 0 |
| 2 | **14 tablas MyISAM** (sin transacciones, locks de tabla) | 59 InnoDB + 14 MyISAM; las MyISAM concentran 282k filas (casi todo `MHistorico`) |
| 3 | **3 tablas sin primary key** | `Empresa`, `Mineria`, `Modulos` |
| 4 | **Naming caótico** | PascalCase (`MHistorico`), snake_case (`permisosdetallado`), minúsculas (`fkproductoetiqueta`), mixtos (`SubTipo_cliente`, `Tipo_cliente`), singular/plural (`Pais` vs `Ciudad` vs `Meses`), idiomas (`Status` vs `Estado`) |
| 5 | **Backups viviendo en producción** | 5 tablas con prefijo `-` (`-Documentos`, `-estatus`, `-Expediente`, `-HistorialPuestos`, `-IncSolicitud`) + 3 con sufijo `bk` (`Archivo_Imgsbk`, `Archivo_Sprintsbk`, `Archivo_Tareasbk`) |
| 6 | **Tablas planas gigantes** | `Directorio` 70 cols, `InformacionEmpleados` 69, `Permisos` 30, `Potenciales` 26 |
| 7 | **Clientes en 3 tablas** | `Cliente` (4 filas), `Directorio` (67), `Potenciales` (1,725) — misma entidad dispersa |
| 8 | **Doble sistema de permisos** | `Permisos` (30 bool) + `permisosdetallado` (14 varchar) |
| 9 | **Redes sociales como columnas** | `Potenciales`: `facebook`, `twitter`, `linkedin`, `google`, `Pagina` |
| 10 | **`Directorio` con 18 columnas `Confidencial_*`** | `Confidencial_1` … `Confidencial_18` (varchar) → deberían ser tabla `metadata` aparte |

---

## 2. Errores de tipos de datos

| # | Error | Evidencia |
|---|-------|-----------|
| 11 | **Fechas como varchar** | 323 columnas varchar vs solo 27 `date` + 3 `datetime` + 2 `timestamp`. Ej: `usuarios.FechaAlta/FechaBaja/Desde` varchar(20), `InformacionEmpleados.FechaInicio/FechaTermino/Fecha` varchar(20), `Cobranza.FechaPago/FechaEntregaEfectivo/FechaDepositoBancario` varchar(50) |
| 12 | **Formatos de fecha inconsistentes** | En `usuarios.FechaAlta`: `24/03/2015`, `21/05/16`, `05/05/24` (dd/mm/yyyy y dd/mm/yy mezclados) |
| 13 | **Booleanos como varchar(2)** | `Factura`, `ReciboElaborado`, `Auto`, `Deudas`, `Discapacidad`, `Hijos`, `Ingles`, `Licencia`, `OtrosIngresos`, `PadeceEnfermedad`, `Renta`, `HaceDeporte`, `Remunerada`… con `"1"/"0"/""` |
| 14 | **`mes`/`anio` como varchar(4)** | `Cobranza.mes`: `"9"`, `"05"`, `"7"`, `"8"` (con/sin cero a la izquierda) |
| 15 | **IDs inconsistentes** | `Cobranza.ID_cliente` varchar(25) vs `int` en el resto; `usuarios.Id` int(2) |
| 16 | **Password en texto plano + hash roto** | `usuarios.clave` varchar(100) guarda la contraseña para "recuperación"; `password` = `sha1(md5())` (40 chars en varchar(255)) |
| 17 | **`Online` como string** | `usuarios.Online` int(2) pero se inserta `'1'`/`'0'` |

---

## 3. Codificación e integridad

| # | Error | Evidencia |
|---|-------|-----------|
| 18 | **Collation mixta** | 70 tablas `latin1_swedish_ci` + 3 `utf8mb3_general_ci` → acentos y joins problemáticos |
| 19 | **508 columnas NOT NULL sin default** (sin auto_increment) | obliga a guardar `''` en vez de `NULL`; se pierde la semántica "sin dato" |
| 20 | **Sin índices únicos** | `usuarios` solo tiene PRIMARY sobre `Id`; `login`/`email` sin UNIQUE |
| 21 | **Sesgo de datos** | `Potenciales`: 1,604/1,725 = **93% estado=11 (Guanajuato)** |
| 22 | **Huérfanos** | `subtipo_cliente_id=29` no pertenece a su `uso_cfdi` (select vacío al editar) |

---

## Recomendaciones

Ya el nuevo esquema (`clients` + catálogos + FKs reales vía `constrained()`) va por buen camino. Sobre esa base:

1. **Normalizar por dominio** (no copiar tablas planas). `Directorio`/`Potenciales` → una sola entidad con metadata en tablas relacionadas (ya existen `client_metadata`, `client_credentials`).
2. **UTF-8 uniforme**: migrar todo a `utf8mb4_unicode_ci`; al importar desde `latin1_swedish_ci`, corregir mojibake (acentos, `ñ`, `á`, `é`).
3. **Tipos correctos**: fechas → `DATE`/`DATETIME`; booleanos → `tinyint(1)`/enum; montos → `decimal(10,2)`; normalizar `mes`/`anio`.
4. **Limpieza de fechas**: detectar y normalizar `dd/mm/yy` vs `dd/mm/yyyy` **antes** de castear (ojo con `05/05/24`).
5. **Eliminar tablas backup y muertas** (`-*`, `*bk`, `Cliente` de 4 filas) antes de migrar.
6. **Unificar permisos** con `spatie/laravel-permission` (ya instalado); no replicar `Permisos`/`permisosdetallado`.
7. **Seguridad**: re-hashear con bcrypt/argon2 y **eliminar** `clave` en texto plano; nunca enviar password por email.
8. **Preservar `MHistorico`** (281k filas de telemetría) como tabla aparte, idealmente particionada/archivada.
9. **Decidir política `NULL` vs `''`** explícita en la migración (hoy 508 columnas "obligan" a vacío).
