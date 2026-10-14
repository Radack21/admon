import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/es";
import Badge from "@/Components/ui/Badge";

dayjs.locale("es");

const TYPE_LABEL = {
    active: "Activo",
    inactive: "Inactivo",
    prospect: "Potencial",
};

const PLATFORM_LABEL = {
    web: "Página web",
    facebook: "Facebook",
    twitter: "Twitter",
    linkedin: "LinkedIn",
    google: "Google+",
};

const rel = (obj) => obj?.nombre || "—";

function Field({ label, value, className = "col-span-4" }) {
    return (
        <div className={className}>
            <div
                style={{
                    fontSize: 10.5,
                    fontWeight: 600,
                    letterSpacing: ".05em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                }}
            >
                {label}
            </div>
            <div
                style={{
                    fontSize: 14,
                    color: "var(--text-main)",
                    marginTop: 5,
                    wordBreak: "break-word",
                    lineHeight: 1.4,
                }}
            >
                {value === null || value === undefined || value === "" ? "—" : value}
            </div>
        </div>
    );
}

export default function ClientDetailModal({ client, onClose, onEdit }) {
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const { data } = await axios.get(route("api.clientes.show", client.id));
                if (active) setDetail(data);
            } catch (e) {
                console.error("Error loading client detail", e);
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => {
            active = false;
        };
    }, [client.id]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    const isPotencial = detail?.type === "prospect";

    return (
        <div className="modal-overlay active">
            <div className="modal-card">
                <div className="modal-header">
                    <div className="modal-header-top">
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <h2>{isPotencial ? "Ficha del Potencial" : "Ficha del Cliente"}</h2>
                            {detail && <Badge variant={detail.type}>{TYPE_LABEL[detail.type] || detail.type}</Badge>}
                        </div>
                        <button
                            type="button"
                            className="icon-btn delete-btn"
                            onClick={onClose}
                            aria-label="Cerrar ficha"
                            data-tooltip="Cerrar ventana"
                            data-tooltip-align="left"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="modal-body">
                    {loading ? (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "80px 0",
                                color: "var(--text-muted)",
                                fontSize: 13,
                            }}
                        >
                            Cargando información...
                        </div>
                    ) : !detail ? (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "80px 0",
                                color: "var(--text-muted)",
                                fontSize: 13,
                            }}
                        >
                            No se pudo cargar la información del cliente.
                        </div>
                    ) : (
                        <>
                            <div className="form-section">
                                <div className="section-header">Identificación</div>
                                <div className="form-grid">
                                    <Field label="Nombre comercial" className="col-span-6" value={detail.nombre_comercial} />
                                    <Field label="Razón social" className="col-span-6" value={detail.razon_social} />
                                    <Field label="RFC" value={detail.rfc} />
                                    <Field label="CURP" value={detail.curp} />
                                    <Field label="Representante legal" value={detail.representante_legal} />
                                    <Field
                                        label="Responsable"
                                        value={
                                            detail.responsable
                                                ? `${detail.responsable.nombre || ""} ${detail.responsable.apellido_paterno || ""}`.trim()
                                                : "—"
                                        }
                                    />
                                    <Field label="Sucursal" value={detail.sucursal} />
                                    <Field label="Folio" value={detail.folio} />
                                    <Field
                                        label="Fecha de registro"
                                        value={detail.fecha_registro ? dayjs(detail.fecha_registro).format("DD MMM YYYY") : "—"}
                                    />
                                    {isPotencial && <Field label="Fuente" className="col-span-6" value={detail.fuente} />}
                                </div>
                            </div>

                            <div className="form-section">
                                <div className="section-header">Clasificación Fiscal</div>
                                <div className="form-grid">
                                    <Field label="Tipo de persona" value={rel(detail.persona_tipo)} />
                                    <Field label="Uso CFDI" value={rel(detail.usocfdi)} />
                                    <Field label="Subtipo" value={rel(detail.subtipo_cliente)} />
                                    <Field label="Régimen fiscal" value={rel(detail.regimen_fiscal)} />
                                    <Field label="Forma jurídica" value={rel(detail.forma_juridica)} />
                                    <Field label="Ámbito" value={rel(detail.ambito)} />
                                    <Field label="Tamaño" value={rel(detail.tamanio)} />
                                    <Field label="Sector" value={rel(detail.sector)} />
                                    <Field label="Clasificación" value={rel(detail.clasificacion)} />
                                    <Field label="Rama" value={rel(detail.rama)} />
                                </div>
                            </div>

                            <div className="form-section">
                                <div className="section-header">Dirección</div>
                                <div className="form-grid">
                                    <Field label="Calle" className="col-span-6" value={detail.domicilio_calle} />
                                    <Field label="Número" className="col-span-6" value={detail.domicilio_numero} />
                                    <Field label="Colonia" className="col-span-6" value={detail.domicilio_colonia} />
                                    <Field label="Código postal" className="col-span-6" value={detail.domicilio_cp} />
                                    <Field label="País" value={rel(detail.pais)} />
                                    <Field label="Estado" value={rel(detail.estado)} />
                                    <Field label="Ciudad" value={rel(detail.ciudad)} />
                                </div>
                            </div>

                            <div className="form-section">
                                <div className="section-header">Contacto Principal</div>
                                <div className="form-grid">
                                    <Field label="Nombre" className="col-span-6" value={detail.contacto_nombre} />
                                    <Field label="Profesión" className="col-span-6" value={detail.contacto_profesion} />
                                    <Field label="Cargo / Puesto" className="col-span-4" value={detail.contacto_puesto} />
                                    <Field
                                        label="Correo electrónico"
                                        className="col-span-4"
                                        value={
                                            detail.contacto_email ? (
                                                <a href={`mailto:${detail.contacto_email}`} style={{ color: "var(--accent)" }}>
                                                    {detail.contacto_email}
                                                </a>
                                            ) : (
                                                "—"
                                            )
                                        }
                                    />
                                    <Field label="Extensión" className="col-span-4" value={detail.contacto_extension} />
                                    <Field label="Lada" value={detail.contacto_lada} />
                                    <Field label="Teléfono contacto" className="col-span-4" value={detail.contacto_telefono} />
                                    <Field label="Teléfono cliente" className="col-span-4" value={detail.telefono} />
                                    <Field label="Lada cliente" value={detail.lada} />
                                </div>
                            </div>

                            {(detail.social_networks?.length > 0 || detail.services?.length > 0) && (
                                <div className="form-section">
                                    <div className="section-header">Redes Sociales y Servicios</div>
                                    <div className="form-grid">
                                        {detail.social_networks?.length > 0 && (
                                            <div className="col-span-6">
                                                <div
                                                    style={{
                                                        fontSize: 10.5,
                                                        fontWeight: 600,
                                                        letterSpacing: ".05em",
                                                        textTransform: "uppercase",
                                                        color: "var(--text-muted)",
                                                    }}
                                                >
                                                    Redes Sociales
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                                                    {detail.social_networks.map((n) => (
                                                        <a
                                                            key={n.id}
                                                            href={n.url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            style={{ fontSize: 14, color: "var(--accent)", wordBreak: "break-word" }}
                                                        >
                                                            {PLATFORM_LABEL[n.platform] || n.platform}: {n.url}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {detail.services?.length > 0 && (
                                            <div className="col-span-6">
                                                <div
                                                    style={{
                                                        fontSize: 10.5,
                                                        fontWeight: 600,
                                                        letterSpacing: ".05em",
                                                        textTransform: "uppercase",
                                                        color: "var(--text-muted)",
                                                    }}
                                                >
                                                    Servicios
                                                </div>
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                                                    {detail.services.map((s) => (
                                                        <span
                                                            key={s.id}
                                                            style={{
                                                                fontSize: 12.5,
                                                                color: "var(--text-main)",
                                                                background: "var(--pill-bg)",
                                                                border: "1px solid var(--border-color)",
                                                                borderRadius: 12,
                                                                padding: "4px 10px",
                                                            }}
                                                        >
                                                            {s.nombre}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {detail.observaciones && (
                                <div className="form-section">
                                    <div className="section-header">Observaciones</div>
                                    <div style={{ fontSize: 14, color: "var(--text-main)", lineHeight: 1.5 }}>
                                        {detail.observaciones}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn-secondary" onClick={onClose}>
                        Cerrar
                    </button>
                    <button
                        type="button"
                        className="btn-primary"
                        disabled={!detail}
                        onClick={() => onEdit?.(detail || client)}
                    >
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );
}
