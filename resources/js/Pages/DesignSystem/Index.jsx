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
    { cliente: "Acme Corp", folio: "ING-2026-0314", fecha: "12 mar 2026", estatus: "Cobrado", monto: 48500 },
    { cliente: "Tecnología Libre", folio: "ING-2026-0315", fecha: "15 mar 2026", estatus: "Pendiente", monto: 32000 },
    { cliente: "Nexo Retail", folio: "ING-2026-0317", fecha: "10 mar 2026", estatus: "Vencido", monto: 12000 },
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
                                required
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

                    <Card title="Tabla y paginación">
                        <div className="table-wrapper">
                            <div className="table-responsive">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Cliente</th>
                                            <th>Folio</th>
                                            <th>Fecha emisión</th>
                                            <th>Estatus</th>
                                            <th style={{ textAlign: "right" }}>Monto</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ROWS.map((r) => (
                                            <tr key={r.folio}>
                                                <td style={{ fontWeight: 600 }}>{r.cliente}</td>
                                                <td style={{ color: "var(--text-muted)" }}>{r.folio}</td>
                                                <td>{r.fecha}</td>
                                                <td>
                                                    <Badge variant={r.estatus.toLowerCase()}>{r.estatus}</Badge>
                                                </td>
                                                <td style={{ textAlign: "right", fontWeight: 700 }}>
                                                    ${r.monto.toLocaleString("es-MX")}
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
                    </Card>
                </div>
            </div>
        </div>
    );
}
