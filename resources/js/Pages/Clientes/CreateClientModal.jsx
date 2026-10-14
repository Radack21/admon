import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import Tabs from "@/Components/ui/Tabs";
import Input from "@/Components/ui/Input";
import Select from "@/Components/ui/Select";
import MultiSelect from "@/Components/ui/MultiSelect";
import PhoneInput from "@/Components/ui/PhoneInput";
import SavingOverlay from "@/Components/ui/SavingOverlay";

const SUCURSALES = [
    { value: "León", label: "León" },
    { value: "Guanajuato", label: "Guanajuato" },
];

const SOCIAL = [
    { key: "web", label: "Página web", placeholder: "https://..." },
    { key: "facebook", label: "Facebook", placeholder: "" },
    { key: "twitter", label: "Twitter", placeholder: "" },
    { key: "linkedin", label: "LinkedIn", placeholder: "" },
    { key: "google", label: "Google+", placeholder: "" },
];

const opts = (list) => (list || []).map((o) => ({ value: o.id, label: o.nombre }));

export default function CreateClientModal({ onClose, type = "directorio", client = null }) {
    const isEdit = Boolean(client?.id);
    const clientType = client?.type || (type === "potenciales" ? "prospect" : "active");
    const isPotencial = clientType === "prospect";
    const [catalogos, setCatalogos] = useState(null);
    const [estados, setEstados] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [subtipos, setSubtipos] = useState([]);
    const [tab, setTab] = useState("generales");

    const { data, setData, post, put, processing, errors } = useForm({
        nombre_comercial: "",
        razon_social: "",
        rfc: "",
        curp: "",
        representante_legal: "",
        responsable_id: "",
        sucursal: "",
        fuente: "",
        persona_tipo_id: "",
        uso_cfdi_id: "",
        subtipo_cliente_id: "",
        regimen_fiscal_id: "",
        forma_juridica_id: "",
        ambito_id: "",
        tamanio_id: "",
        sector_id: "",
        clasificacion_id: "",
        rama_id: "",
        domicilio_calle: "",
        domicilio_numero: "",
        domicilio_colonia: "",
        domicilio_cp: "",
        pais_id: "",
        estado_id: "",
        ciudad_id: "",
        lada: "",
        telefono: "",
        contacto_nombre: "",
        contacto_profesion: "",
        contacto_puesto: "",
        contacto_email: "",
        contacto_lada: "",
        contacto_telefono: "",
        contacto_extension: "",
        social_networks: { web: "", facebook: "", twitter: "", linkedin: "", google: "" },
        services: [],
        type: clientType,
    });

    const set = (key, value) => setData((prev) => ({ ...prev, [key]: value }));

    const setSocial = (platform, value) =>
        setData((prev) => ({ ...prev, social_networks: { ...prev.social_networks, [platform]: value } }));

    useEffect(() => {
        (async () => {
            try {
                const { data: cats } = await axios.get(route("api.clientes.catalogos"));
                setCatalogos(cats);
            } catch (e) {
                console.error("Error loading catalogs", e);
            }
        })();
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape" && !processing) onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [processing, onClose]);

    const fetchEstados = async (paisId) => {
        if (!paisId) {
            setEstados([]);
            return;
        }
        try {
            const { data: res } = await axios.get(route("api.estados", paisId));
            setEstados(res);
        } catch {
            setEstados([]);
        }
    };

    const fetchCiudades = async (estadoId) => {
        if (!estadoId) {
            setCiudades([]);
            return;
        }
        try {
            const { data: res } = await axios.get(route("api.ciudades", estadoId));
            setCiudades(res);
        } catch {
            setCiudades([]);
        }
    };

    const fetchSubtipos = async (usoCfdiId) => {
        if (!usoCfdiId) {
            setSubtipos([]);
            return;
        }
        try {
            const { data: res } = await axios.get(route("api.subtipos", { uso_cfdi_id: usoCfdiId }));
            setSubtipos(res);
        } catch {
            setSubtipos([]);
        }
    };

    const loadEstados = async (paisId) => {
        setData((d) => ({ ...d, pais_id: paisId, estado_id: "", ciudad_id: "" }));
        setCiudades([]);
        await fetchEstados(paisId);
    };

    const loadCiudades = async (estadoId) => {
        setData((d) => ({ ...d, estado_id: estadoId, ciudad_id: "" }));
        await fetchCiudades(estadoId);
    };

    const loadSubtipos = async (usoCfdiId) => {
        setData((d) => ({ ...d, uso_cfdi_id: usoCfdiId, subtipo_cliente_id: "" }));
        await fetchSubtipos(usoCfdiId);
    };

    useEffect(() => {
        if (!isEdit) return;
        (async () => {
            try {
                const { data: c } = await axios.get(route("api.clientes.show", client.id));
                const networks = Object.fromEntries(
                    (c.social_networks || []).map((n) => [n.platform, n.url])
                );
                setData((prev) => ({
                    ...prev,
                    nombre_comercial: c.nombre_comercial ?? "",
                    razon_social: c.razon_social ?? "",
                    rfc: c.rfc ?? "",
                    curp: c.curp ?? "",
                    representante_legal: c.representante_legal ?? "",
                    responsable_id: c.responsable_id ?? "",
                    sucursal: c.sucursal ?? "",
                    fuente: c.fuente ?? "",
                    persona_tipo_id: c.persona_tipo_id ?? "",
                    uso_cfdi_id: c.uso_cfdi_id ?? "",
                    subtipo_cliente_id: c.subtipo_cliente_id ?? "",
                    regimen_fiscal_id: c.regimen_fiscal_id ?? "",
                    forma_juridica_id: c.forma_juridica_id ?? "",
                    ambito_id: c.ambito_id ?? "",
                    tamanio_id: c.tamanio_id ?? "",
                    sector_id: c.sector_id ?? "",
                    clasificacion_id: c.clasificacion_id ?? "",
                    rama_id: c.rama_id ?? "",
                    domicilio_calle: c.domicilio_calle ?? "",
                    domicilio_numero: c.domicilio_numero ?? "",
                    domicilio_colonia: c.domicilio_colonia ?? "",
                    domicilio_cp: c.domicilio_cp ?? "",
                    pais_id: c.pais_id ?? "",
                    estado_id: c.estado_id ?? "",
                    ciudad_id: c.ciudad_id ?? "",
                    lada: c.lada ?? "",
                    telefono: c.telefono ?? "",
                    contacto_nombre: c.contacto_nombre ?? "",
                    contacto_profesion: c.contacto_profesion ?? "",
                    contacto_puesto: c.contacto_puesto ?? "",
                    contacto_email: c.contacto_email ?? "",
                    contacto_lada: c.contacto_lada ?? "",
                    contacto_telefono: c.contacto_telefono ?? "",
                    contacto_extension: c.contacto_extension ?? "",
                    social_networks: { ...prev.social_networks, ...networks },
                    services: (c.services || []).map((s) => s.id),
                    type: c.type,
                }));

                await Promise.all([
                    fetchEstados(c.pais_id),
                    fetchCiudades(c.estado_id),
                    fetchSubtipos(c.uso_cfdi_id),
                ]);
            } catch (e) {
                console.error("Error loading client", e);
            }
        })();
    }, [isEdit, client?.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = { onSuccess: () => onClose(), preserveScroll: true };
        if (isEdit) {
            put(route("clientes.update", client.id), options);
        } else {
            post(route("clientes.store"), options);
        }
    };

    const usuarios = (catalogos?.usuarios || []).map((u) => ({
        value: u.id,
        label: `${u.nombre} ${u.apellido_paterno}`,
    }));

    return (
        <div className="modal-overlay active">
            <div className="modal-card">
                <div className="modal-header">
                    <div className="modal-header-top">
                        <h2>
                            {isEdit ? "Editar" : "Nuevo"} {isPotencial ? "Potencial" : "Cliente"}
                        </h2>
                        <button
                            type="button"
                            className="icon-btn delete-btn"
                            onClick={onClose}
                            aria-label="Cerrar formulario"
                            data-tooltip="Cerrar ventana"
                            data-tooltip-align="left"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                    <Tabs
                        variant="underline"
                        value={tab}
                        onChange={setTab}
                        tabs={[
                            { label: "Datos Generales", value: "generales" },
                            { label: "Configuración Operativa", value: "operativa" },
                        ]}
                    />
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
                    <div className="modal-body">
                        {tab === "generales" ? (
                            <>
                                <div className="form-section">
                                    <div className="section-header">Identificación</div>
                                    <div className="form-grid">
                                        <div className="col-span-6">
                                            <Input label="Nombre comercial" required value={data.nombre_comercial} onChange={(e) => set("nombre_comercial", e.target.value)} invalid={!!errors.nombre_comercial} />
                                            {errors.nombre_comercial && <p className="error-text">{errors.nombre_comercial}</p>}
                                        </div>
                                        <div className="col-span-6">
                                            <Input label="Razón social" value={data.razon_social} onChange={(e) => set("razon_social", e.target.value)} />
                                        </div>
                                        <div className="col-span-4">
                                            <Input label="RFC" value={data.rfc} onChange={(e) => set("rfc", e.target.value.toUpperCase())} maxLength={13} />
                                        </div>
                                        <div className="col-span-4">
                                            <Input label="CURP" value={data.curp} onChange={(e) => set("curp", e.target.value.toUpperCase())} maxLength={18} />
                                        </div>
                                        <div className="col-span-4">
                                            <Input label="Representante legal" value={data.representante_legal} onChange={(e) => set("representante_legal", e.target.value)} />
                                        </div>
                                        <div className="col-span-4">
                                            <Select label="Responsable" searchable options={usuarios} value={data.responsable_id} onChange={(v) => set("responsable_id", v)} />
                                        </div>
                                        <div className="col-span-4">
                                            <Select label="Sucursal" options={SUCURSALES} value={data.sucursal} onChange={(v) => set("sucursal", v)} />
                                        </div>
                                        {isPotencial && (
                                            <div className="col-span-4">
                                                <Input label="Fuente" value={data.fuente} onChange={(e) => set("fuente", e.target.value)} />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-section">
                                    <div className="section-header">Clasificación Fiscal</div>
                                    <div className="form-grid">
                                        <div className="col-span-4">
                                            <Select label="Tipo de persona" options={opts(catalogos?.persona_tipos)} value={data.persona_tipo_id} onChange={(v) => set("persona_tipo_id", v)} searchable />
                                        </div>
                                        <div className="col-span-4">
                                            <Select label="Uso CFDI" options={opts(catalogos?.uso_cfdi)} value={data.uso_cfdi_id} onChange={loadSubtipos} searchable />
                                        </div>
                                        <div className="col-span-4">
                                            <Select label="Subtipo" options={opts(subtipos)} value={data.subtipo_cliente_id} onChange={(v) => set("subtipo_cliente_id", v)} searchable />
                                        </div>
                                        <div className="col-span-4">
                                            <Select label="Régimen fiscal" options={opts(catalogos?.regimenes_fiscales)} value={data.regimen_fiscal_id} onChange={(v) => set("regimen_fiscal_id", v)} searchable />
                                        </div>
                                        <div className="col-span-4">
                                            <Select label="Forma jurídica" options={opts(catalogos?.formas_juridicas)} value={data.forma_juridica_id} onChange={(v) => set("forma_juridica_id", v)} />
                                        </div>
                                        <div className="col-span-4">
                                            <Select label="Ámbito" options={opts(catalogos?.ambitos)} value={data.ambito_id} onChange={(v) => set("ambito_id", v)} />
                                        </div>
                                        <div className="col-span-4">
                                            <Select label="Tamaño" options={opts(catalogos?.tamanios)} value={data.tamanio_id} onChange={(v) => set("tamanio_id", v)} />
                                        </div>
                                        <div className="col-span-4">
                                            <Select label="Sector" options={opts(catalogos?.sectores)} value={data.sector_id} onChange={(v) => set("sector_id", v)} />
                                        </div>
                                        <div className="col-span-4">
                                            <Select label="Clasificación" options={opts(catalogos?.clasificaciones)} value={data.clasificacion_id} onChange={(v) => set("clasificacion_id", v)} />
                                        </div>
                                        <div className="col-span-4">
                                            <Select label="Rama" options={opts(catalogos?.ramas)} value={data.rama_id} onChange={(v) => set("rama_id", v)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <div className="section-header">Dirección</div>
                                    <div className="form-grid">
                                        <div className="col-span-6">
                                            <Input label="Calle" value={data.domicilio_calle} onChange={(e) => set("domicilio_calle", e.target.value)} />
                                        </div>
                                        <div className="col-span-6">
                                            <Input label="Número" value={data.domicilio_numero} onChange={(e) => set("domicilio_numero", e.target.value)} />
                                        </div>
                                        <div className="col-span-6">
                                            <Input label="Colonia" value={data.domicilio_colonia} onChange={(e) => set("domicilio_colonia", e.target.value)} />
                                        </div>
                                        <div className="col-span-6">
                                            <Input label="Código postal" value={data.domicilio_cp} onChange={(e) => set("domicilio_cp", e.target.value)} maxLength={10} />
                                        </div>
                                        <div className="col-span-4">
                                            <Select label="País" options={opts(catalogos?.paises)} value={data.pais_id} onChange={loadEstados} searchable />
                                        </div>
                                        <div className="col-span-4">
                                            <Select label="Estado" options={opts(estados)} value={data.estado_id} onChange={loadCiudades} searchable />
                                        </div>
                                        <div className="col-span-4">
                                            <Select label="Ciudad" options={opts(ciudades)} value={data.ciudad_id} onChange={(v) => set("ciudad_id", v)} searchable />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="form-section">
                                    <div className="section-header">Contacto Principal</div>
                                    <div className="form-grid">
                                        <div className="col-span-6">
                                            <Input label="Nombre" value={data.contacto_nombre} onChange={(e) => set("contacto_nombre", e.target.value)} />
                                        </div>
                                        <div className="col-span-6">
                                            <Input label="Profesión" value={data.contacto_profesion} onChange={(e) => set("contacto_profesion", e.target.value)} />
                                        </div>
                                        <div className="col-span-6">
                                            <Input label="Cargo / Puesto" value={data.contacto_puesto} onChange={(e) => set("contacto_puesto", e.target.value)} />
                                        </div>
                                        <div className="col-span-6">
                                            <Input
                                                label="Correo electrónico"
                                                type="email"
                                                placeholder="nombre@ejemplo.com"
                                                value={data.contacto_email}
                                                onChange={(e) => set("contacto_email", e.target.value)}
                                                invalid={!!errors.contacto_email}
                                                icon={
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                        <polyline points="22,6 12,13 2,6" />
                                                    </svg>
                                                }
                                            />
                                            {errors.contacto_email && <p className="error-text">{errors.contacto_email}</p>}
                                        </div>
                                        <div className="col-span-4">
                                            <Input label="Lada" value={data.contacto_lada} onChange={(e) => set("contacto_lada", e.target.value)} maxLength={20} />
                                        </div>
                                        <div className="col-span-4">
                                            <PhoneInput label="Teléfono" value={data.contacto_telefono} onChange={(v) => set("contacto_telefono", v)} />
                                        </div>
                                        <div className="col-span-4">
                                            <Input label="Extensión" value={data.contacto_extension} onChange={(e) => set("contacto_extension", e.target.value)} maxLength={10} />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <div className="section-header">Teléfonos del Cliente</div>
                                    <div className="form-grid">
                                        <div className="col-span-4">
                                            <Input label="Lada" value={data.lada} onChange={(e) => set("lada", e.target.value)} maxLength={5} />
                                        </div>
                                        <div className="col-span-8">
                                            <PhoneInput label="Teléfono" value={data.telefono} onChange={(v) => set("telefono", v)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <div className="section-header">Redes Sociales</div>
                                    <div className="form-grid">
                                        {SOCIAL.map((s) => (
                                            <div className="col-span-6" key={s.key}>
                                                <Input
                                                    label={s.label}
                                                    type="url"
                                                    placeholder={s.placeholder}
                                                    value={data.social_networks[s.key]}
                                                    onChange={(e) => setSocial(s.key, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {!isPotencial && (
                                    <div className="form-section">
                                        <div className="section-header">Servicios</div>
                                        <div className="form-grid">
                                            <div className="col-span-12">
                                                <MultiSelect
                                                    label="Servicios ofrecidos"
                                                    options={opts(catalogos?.servicios)}
                                                    value={data.services}
                                                    onChange={(v) => set("services", v)}
                                                />
                                                {errors.services && <p className="error-text">{errors.services}</p>}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-primary" disabled={processing}>
                            {isEdit ? "Actualizar" : "Guardar"}
                        </button>
                    </div>
                </form>

                <SavingOverlay show={processing} title="Guardando información..." description="Procesando cambios del cliente." />
            </div>
        </div>
    );
}
