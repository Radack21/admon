import { useState } from "react";
import useTheme from "@/hooks/useTheme";
import Input from "@/Components/ui/Input";
import Textarea from "@/Components/ui/Textarea";
import Select from "@/Components/ui/Select";
import Checkbox from "@/Components/ui/Checkbox";
import RadioGroup from "@/Components/ui/RadioGroup";
import Toggle from "@/Components/ui/Toggle";
import Button from "@/Components/ui/Button";
import Badge from "@/Components/ui/Badge";
import Stepper from "@/Components/ui/Stepper";
import PhoneInput from "@/Components/ui/PhoneInput";
import DateInput from "@/Components/ui/DateInput";
import TimeInput from "@/Components/ui/TimeInput";
import PasswordInput from "@/Components/ui/PasswordInput";
import FileUpload from "@/Components/ui/FileUpload";
import Tabs from "@/Components/ui/Tabs";
import SavingOverlay from "@/Components/ui/SavingOverlay";
import MetricBar from "@/Components/ui/MetricBar";
import MetricDonut from "@/Components/ui/MetricDonut";
import TableCard from "@/Components/ui/TableCard";
import RowActions from "@/Components/ui/RowActions";
import ColorPicker from "@/Components/ui/ColorPicker";
import RichTextEditor from "@/Components/ui/RichTextEditor";
import LedSlider from "@/Components/ui/LedSlider";
import MediaUploader from "@/Components/ui/MediaUploader";
import FingerprintScanner from "@/Components/ui/FingerprintScanner";
import SignaturePad from "@/Components/ui/SignaturePad";
import MapPicker from "@/Components/ui/MapPicker";
import Timeline from "@/Components/ui/Timeline";

function SortIcon() {
    return (
        <svg className="sort-icon" viewBox="0 0 8 10">
            <polygon points="4,0 8,4 0,4" />
            <polygon points="4,10 0,6 8,6" />
        </svg>
    );
}

function Card({ title, children }) {
    return (
        <section
            className="rounded-[16px] border p-6 flex flex-col gap-5 shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-color)" }}
        >
            <div className="section-header">{title}</div>
            {children}
        </section>
    );
}

const COUNTRY_OPTIONS = [
    { value: "mx", label: "México (+52)" },
    { value: "us", label: "Estados Unidos (+1)" },
    { value: "es", label: "España (+34)" },
    { value: "co", label: "Colombia (+57)" },
    { value: "ar", label: "Argentina (+54)" },
];

const REGIMEN_OPTIONS = [
    { value: "regimen", label: "601 — General de Ley Personas Morales" },
    { value: "resico", label: "626 — Régimen Simplificado de Confianza" },
    { value: "fisica", label: "612 — Personas Físicas con Actividades Empresariales" },
];

const ROWS = [
    { cliente: "Acme Corp", folio: "ING-2026-0314", fecha: "12 mar 2026", vencimiento: "28 mar 2026", estatus: "Cobrado", monto: 48500 },
    { cliente: "Tecnología Libre", folio: "ING-2026-0315", fecha: "15 mar 2026", vencimiento: "31 mar 2026", estatus: "Pendiente", monto: 32000 },
    { cliente: "Nexo Retail", folio: "ING-2026-0317", fecha: "10 mar 2026", vencimiento: "20 mar 2026", estatus: "Vencido", monto: 12000 },
];

export default function DesignSystemIndex() {
    const { theme, toggle } = useTheme("light");
    const isDark = theme === "dark";

    const [text, setText] = useState("");
    const [textValue, setTextValue] = useState("Acme Corp");
    const [invalid, setInvalid] = useState("");
    const [notes, setNotes] = useState("");
    const [country, setCountry] = useState("");
    const [regimen, setRegimen] = useState("regimen");
    const [num, setNum] = useState(0);
    const [phone, setPhone] = useState("5512345678");
    const [phoneEmpty, setPhoneEmpty] = useState("");
    const [fecha, setFecha] = useState("15/09/2026");
    const [fechaEmpty, setFechaEmpty] = useState("");
    const [hora, setHora] = useState("09:30");
    const [horaEmpty, setHoraEmpty] = useState("");
    const [password, setPassword] = useState("");
    const [tabCapsule, setTabCapsule] = useState("directorio");
    const [tabUnderline, setTabUnderline] = useState("generales");
    const [saving, setSaving] = useState(false);
    const [color, setColor] = useState("#EA580C");
    const [descuento, setDescuento] = useState(0);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [checks, setChecks] = useState({ facturas: true, recibidas: true, nominas: false });
    const [radio, setRadio] = useState("moral");
    const [toggles, setToggles] = useState({ wa: true, correo: false });

    return (
        <div className={isDark ? "dark" : ""}>
            <div className="relative min-h-dvh" style={{ backgroundColor: isDark ? "transparent" : "var(--bg-app)" }}>
                {isDark && (
                    <>
                        <div className="bg-canvas" />
                        <div className="grain" />
                    </>
                )}

                <div className="relative z-10 max-w-5xl mx-auto px-6 py-10 flex flex-col gap-6">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                            <h1 className="text-2xl font-semibold" style={{ color: "var(--text-main)" }}>
                                UI Kit · Design System
                            </h1>
                            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                                Vista aislada para validar tema claro/oscuro, inputs, botones y componentes base.
                            </p>
                        </div>
                        <Toggle
                            checked={isDark}
                            onChange={toggle}
                            offLabel="Claro"
                            onLabel="Oscuro"
                            label="Tema"
                        />
                    </div>

                    <Card title="Botones">
                        <div className="flex items-center gap-3 flex-wrap">
                            <Button variant="primary">Guardar cambios</Button>
                            <Button variant="secondary">Cancelar</Button>
                            <Button variant="outline">Examinar</Button>
                            <Button variant="circle" data-tooltip="Agregar nuevo cliente">+</Button>
                            <Button variant="circle-ghost" data-tooltip="Descargar reporte">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                            </Button>
                            <Button variant="primary" disabled>
                                Deshabilitado
                            </Button>
                        </div>
                    </Card>

                    <Card title="Campos de texto">
                        <div className="grid grid-cols-2 gap-5">
                            <Input label="Nombre comercial" required value={text} onChange={(e) => setText(e.target.value)} />
                            <Input label="Razón social" value={textValue} onChange={(e) => setTextValue(e.target.value)} />
                            <Input
                                label="Correo electrónico"
                                type="email"
                                required
                                placeholder="nombre@ejemplo.com"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                icon={
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                }
                            />
                            <Input label="RFC" invalid={invalid.length > 0} value={invalid} onChange={(e) => setInvalid(e.target.value)} />
                        </div>
                        <Textarea label="Notas o comentarios" value={notes} onChange={(e) => setNotes(e.target.value)} />
                    </Card>

                    <Card title="Selects y stepper">
                        <div className="grid grid-cols-3 gap-5">
                            <Select label="País / LADA" options={COUNTRY_OPTIONS} value={country} onChange={setCountry} searchable />
                            <Select label="Régimen SAT" options={REGIMEN_OPTIONS} value={regimen} onChange={setRegimen} searchable />
                            <Stepper label="Usuarios previstos" value={num} onChange={setNum} min={0} max={99} />
                        </div>
                    </Card>

                    <Card title="Teléfono">
                        <div className="grid grid-cols-2 gap-5">
                            <PhoneInput label="Teléfono de contacto" required value={phone} onChange={setPhone} />
                            <PhoneInput label="Teléfono alterno" value={phoneEmpty} onChange={setPhoneEmpty} />
                        </div>
                    </Card>

                    <Card title="Fecha y hora">
                        <div className="grid grid-cols-2 gap-5">
                            <DateInput label="Fecha de alta" required value={fecha} onChange={setFecha} />
                            <DateInput label="Fecha de vencimiento" value={fechaEmpty} onChange={setFechaEmpty} />
                            <TimeInput label="Hora de atención" required value={hora} onChange={setHora} />
                            <TimeInput label="Hora de cierre" value={horaEmpty} onChange={setHoraEmpty} />
                        </div>
                    </Card>

                    <Card title="Contraseña">
                        <div className="grid grid-cols-2 gap-5">
                            <PasswordInput
                                label="Contraseña"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </Card>

                    <Card title="Archivos">
                        <div className="grid grid-cols-2 gap-5">
                            <FileUpload label="Comprobante de domicilio" required accept=".pdf,.png,.jpg,.jpeg" />
                            <FileUpload label="Anexos" multiple />
                        </div>
                    </Card>

                    <Card title="Búsqueda">
                        <div className={`search-field ${search ? "has-value" : ""}`}>
                            <span className="search-icon">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                className="search-pill"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder=" "
                                autoComplete="off"
                            />
                            <label className="floating-label">Buscar cliente, folio, RFC...</label>
                        </div>
                    </Card>

                    <Card title="Selección">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-3">
                                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                                    Checkboxes
                                </span>
                                <Checkbox
                                    label="Facturas Emitidas"
                                    checked={checks.facturas}
                                    onChange={(e) => setChecks((s) => ({ ...s, facturas: e.target.checked }))}
                                />
                                <Checkbox
                                    label="Facturas Recibidas"
                                    checked={checks.recibidas}
                                    onChange={(e) => setChecks((s) => ({ ...s, recibidas: e.target.checked }))}
                                />
                                <Checkbox
                                    label="Nóminas Timbradas"
                                    checked={checks.nominas}
                                    onChange={(e) => setChecks((s) => ({ ...s, nominas: e.target.checked }))}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                                    Radios
                                </span>
                                <RadioGroup
                                    name="tipoPersona"
                                    value={radio}
                                    onChange={setRadio}
                                    options={[
                                        { value: "moral", label: "Persona Moral" },
                                        { value: "fisica", label: "Persona Física" },
                                    ]}
                                />
                                <span className="text-xs font-semibold uppercase tracking-wide mt-2" style={{ color: "var(--text-muted)" }}>
                                    Toggles
                                </span>
                                <div className="flex items-center gap-8 flex-wrap">
                                    <Toggle label="WhatsApp" checked={toggles.wa} onChange={(e) => setToggles((s) => ({ ...s, wa: e.target.checked }))} />
                                    <Toggle label="Correo" checked={toggles.correo} onChange={(e) => setToggles((s) => ({ ...s, correo: e.target.checked }))} />
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card title="Badges de estatus">
                        <div className="flex items-center gap-3 flex-wrap">
                            <Badge variant="cobrado">Cobrado</Badge>
                            <Badge variant="pendiente">Pendiente</Badge>
                            <Badge variant="vencido">Vencido</Badge>
                        </div>
                    </Card>

                    <Card title="Tabs">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-3">
                                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                                    Cápsula
                                </span>
                                <Tabs
                                    variant="capsule"
                                    value={tabCapsule}
                                    onChange={setTabCapsule}
                                    tabs={[
                                        { label: "Directorio", value: "directorio" },
                                        { label: "Potenciales", value: "potenciales" },
                                        { label: "Mailing", value: "mailing" },
                                    ]}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                                    Subrayado
                                </span>
                                <Tabs
                                    variant="underline"
                                    value={tabUnderline}
                                    onChange={setTabUnderline}
                                    tabs={[
                                        { label: "Datos Generales", value: "generales" },
                                        { label: "Configuración Operativa", value: "operativa" },
                                    ]}
                                />
                            </div>
                        </div>
                    </Card>

                    <Card title="Guardado">
                        <div
                            className="relative rounded-[16px] border p-6 min-h-[200px] flex flex-col gap-4"
                            style={{ backgroundColor: "var(--bg-modal)", borderColor: "var(--border-color)" }}
                        >
                            <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
                                El overlay cubre el contenedor (como dentro de un modal). Pulsa <strong>Guardar</strong>.
                            </p>
                            <div className="flex items-center gap-3">
                                <Button variant="secondary" onClick={() => setSaving(false)}>
                                    Cancelar
                                </Button>
                                <Button variant="primary" onClick={() => setSaving(true)}>
                                    Guardar
                                </Button>
                            </div>
                            <SavingOverlay
                                show={saving}
                                title="Guardando información..."
                                description="Procesando cambios del cliente."
                                onClose={() => setSaving(false)}
                            />
                        </div>
                    </Card>

                    <Card title="Métricas">
                        <div className="flex flex-col gap-5">
                            <MetricBar
                                label="Meta de registros del mes"
                                value={68}
                                text="34 de 50 clientes nuevos este mes"
                            />
                            <MetricDonut
                                label="Calidad promedio de validaciones biométricas"
                                value={91}
                                sub="Calidad"
                                title="Directorio completo"
                                description="Promedio agregado de todas las validaciones biométricas registradas."
                            />
                        </div>
                    </Card>

                    <Card title="Color">
                        <div className="grid grid-cols-2 gap-5">
                            <ColorPicker label="Color identificador" value={color} onChange={setColor} />
                        </div>
                    </Card>

                    <Card title="Editor de texto enriquecido">
                        <RichTextEditor placeholder="Escriba aquí la descripción detallada..." />
                    </Card>

                    <Card title="Deslizador">
                        <div className="grid grid-cols-2 gap-5">
                            <LedSlider label="Descuento autorizado" value={descuento} onChange={setDescuento} />
                        </div>
                    </Card>

                    <Card title="Multimedia">
                        <MediaUploader label="Evidencia" />
                    </Card>

                    <Card title="Validación">
                        <div className="grid grid-cols-2 gap-5">
                            <FingerprintScanner />
                            <SignaturePad label="Firma" />
                        </div>
                    </Card>

                    <Card title="Ubicación">
                        <MapPicker />
                    </Card>

                    <Card title="Historial">
                        <Timeline />
                    </Card>

                    <section className="flex flex-col gap-5">
                        <div className="section-header">Tabla</div>
                        <TableCard
                            searchPlaceholder="Buscar cliente, folio, RFC..."
                            filters={["Estatus: Cobrado", "Monto: 10,000 – 50,000"]}
                        >
                            <div className="table-wrapper">
                                <div className="table-responsive">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                {["Cliente", "Folio", "Fecha emisión", "Vencimiento", "Estatus"].map((col) => (
                                                    <th key={col}>
                                                        <div className="th-content">
                                                            <span>{col}</span>
                                                            <SortIcon />
                                                        </div>
                                                    </th>
                                                ))}
                                                <th style={{ textAlign: "right" }}>
                                                    <div className="th-content" style={{ justifyContent: "flex-end" }}>
                                                        <span>Monto</span>
                                                        <SortIcon />
                                                    </div>
                                                </th>
                                                <th style={{ textAlign: "center", width: 150 }}>
                                                    <div className="th-content" style={{ justifyContent: "center" }}>
                                                        <span>Acciones</span>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ROWS.map((r) => (
                                                <tr key={r.folio}>
                                                    <td style={{ fontWeight: 600 }}>{r.cliente}</td>
                                                    <td style={{ color: "var(--text-muted)" }}>{r.folio}</td>
                                                    <td>{r.fecha}</td>
                                                    <td>{r.vencimiento}</td>
                                                    <td>
                                                        <Badge variant={r.estatus.toLowerCase()}>{r.estatus}</Badge>
                                                    </td>
                                                    <td style={{ textAlign: "right", fontWeight: 700 }}>
                                                        ${r.monto.toLocaleString("es-MX")}
                                                    </td>
                                                    <td style={{ textAlign: "center" }}>
                                                        <RowActions />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="pagination-bar">
                                <span className="pagination-info">Mostrando 1–3 de 20 registros</span>
                                <div className="pagination-controls">
                                    <button className="page-btn" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                                        ‹
                                    </button>
                                    {[1, 2, 3].map((p) => (
                                        <button key={p} className={`page-btn ${page === p ? "active" : ""}`} onClick={() => setPage(p)}>
                                            {p}
                                        </button>
                                    ))}
                                    <button className="page-btn" disabled={page === 3} onClick={() => setPage((p) => Math.min(3, p + 1))}>
                                        ›
                                    </button>
                                </div>
                            </div>
                        </TableCard>
                    </section>
                </div>
            </div>
        </div>
    );
}
