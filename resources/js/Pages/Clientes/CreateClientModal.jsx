import { useState, useEffect, useMemo } from "react";
import { useForm } from "@inertiajs/react";
import { X } from "lucide-react";
import Section from "@/Components/ui/Section";
import SelectSearchable from "@/Components/ui/SelectSearchable";
import MultiSelect from "@/Components/ui/MultiSelect";
import axios from "axios";

export default function CreateClientModal({ onClose, type = "directorio" }) {
    const isPotencial = type === "potenciales";
    const [catalogos, setCatalogos] = useState(null);
    const [estados, setEstados] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [subtipos, setSubtipos] = useState([]);
    const [openSections, setOpenSections] = useState(new Set());

    const { data, setData, post, processing, errors } = useForm({
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
        type: isPotencial ? "prospect" : "active",
    });

    const toggleSection = (title) => {
        setOpenSections((prev) => {
            const next = new Set(prev);
            if (next.has(title)) next.delete(title);
            else next.add(title);
            return next;
        });
    };

    const loadCatalogos = async () => {
        if (catalogos) return;
        try {
            const { data: cats } = await axios.get(route("api.clientes.catalogos"));
            setCatalogos(cats);
        } catch (e) {
            console.error("Error loading catalogs", e);
        }
    };

    const loadEstados = async (paisId) => {
        setData((d) => ({ ...d, pais_id: paisId, estado_id: "", ciudad_id: "" }));
        if (!paisId) { setEstados([]); setCiudades([]); return; }
        try {
            const { data } = await axios.get(route("api.estados", paisId));
            setEstados(data);
        } catch (e) { setEstados([]); }
    };

    const loadCiudades = async (estadoId) => {
        setData((d) => ({ ...d, estado_id: estadoId, ciudad_id: "" }));
        if (!estadoId) { setCiudades([]); return; }
        try {
            const { data } = await axios.get(route("api.ciudades", estadoId));
            setCiudades(data);
        } catch (e) { setCiudades([]); }
    };

    const loadSubtipos = async (usoCfdiId) => {
        setData((d) => ({ ...d, uso_cfdi_id: usoCfdiId, subtipo_cliente_id: "" }));
        if (!usoCfdiId) { setSubtipos([]); return; }
        try {
            const { data } = await axios.get(route("api.subtipos", { uso_cfdi_id: usoCfdiId }));
            setSubtipos(data);
        } catch (e) { setSubtipos([]); }
    };

    useEffect(() => { loadCatalogos(); }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("clientes.store"), {
            onSuccess: () => onClose(),
            preserveScroll: true,
        });
    };

    const set = (key, value) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };

    const setSocial = (platform, value) => {
        setData((prev) => ({
            ...prev,
            social_networks: { ...prev.social_networks, [platform]: value },
        }));
    };

    const personas = catalogos?.persona_tipos || [];
    const usosCfdi = catalogos?.uso_cfdi || [];
    const regimenes = catalogos?.regimenes_fiscales || [];
    const formas = catalogos?.formas_juridicas || [];
    const ambitos = catalogos?.ambitos || [];
    const tamanios = catalogos?.tamanios || [];
    const sectores = catalogos?.sectores || [];
    const clasificaciones = catalogos?.clasificaciones || [];
    const ramas = catalogos?.ramas || [];
    const paises = catalogos?.paises || [];
    const usuarios = catalogos?.usuarios?.map((u) => ({ id: u.id, nombre: `${u.nombre} ${u.apellido_paterno}` })) || [];
    const servicios = catalogos?.servicios || [];

    const sections = [
        { key: "generales", title: "Datos Generales", alwaysOpen: true },
        { key: "clasificacion", title: "Clasificación Fiscal" },
        { key: "direccion", title: "Dirección" },
        { key: "contacto", title: "Contacto Principal", alwaysOpen: true },
        { key: "telefonos", title: "Teléfonos del Cliente" },
        { key: "redes", title: "Redes Sociales" },
        ...(!isPotencial ? [{ key: "servicios", title: "Servicios" }] : []),
    ];

    const filledSections = useMemo(() => {
        let count = 0;
        if (data.nombre_comercial) count++;
        if (data.regimen_fiscal_id) count++;
        if (data.domicilio_calle || data.pais_id) count++;
        if (data.contacto_nombre || data.contacto_email) count++;
        if (data.telefono) count++;
        if (data.social_networks?.web || data.social_networks?.facebook) count++;
        if (data.services?.length > 0) count++;
        return count;
    }, [data]);

    const progressPct = Math.round((filledSections / sections.length) * 100);

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-2xl max-h-[85vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            {isPotencial ? "Nuevo Potencial" : "Nuevo Cliente"}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="h-1.5 w-48 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                                    style={{ width: `${progressPct}%` }}
                                />
                            </div>
                            <span className="text-xs text-gray-400">
                                {filledSections}/{sections.length} secciones
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                    {/* Sección 1: Datos Generales */}
                    <Section title="Datos Generales" defaultOpen={true}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre comercial<span className="text-red-500 ml-0.5">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nombre_comercial}
                                    onChange={(e) => set("nombre_comercial", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    required
                                />
                                {errors.nombre_comercial && <p className="mt-1 text-xs text-red-600">{errors.nombre_comercial}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Razón social</label>
                                <input type="text" value={data.razon_social} onChange={(e) => set("razon_social", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">RFC</label>
                                <input type="text" value={data.rfc} onChange={(e) => set("rfc", e.target.value.toUpperCase())} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" maxLength={13} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CURP</label>
                                <input type="text" value={data.curp} onChange={(e) => set("curp", e.target.value.toUpperCase())} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" maxLength={18} />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Representante legal</label>
                                <input type="text" value={data.representante_legal} onChange={(e) => set("representante_legal", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <SelectSearchable label="Responsable" name="responsable_id" options={usuarios} value={data.responsable_id} onChange={(v) => set("responsable_id", v)} placeholder="Seleccionar usuario..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sucursal</label>
                                <select value={data.sucursal} onChange={(e) => set("sucursal", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                    <option value="">Seleccionar...</option>
                                    <option value="León">León</option>
                                    <option value="Guanajuato">Guanajuato</option>
                                </select>
                            </div>
                            {isPotencial && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fuente</label>
                                    <input type="text" value={data.fuente} onChange={(e) => set("fuente", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                                </div>
                            )}
                        </div>
                    </Section>

                    {/* Sección 2: Clasificación Fiscal */}
                    <Section title="Clasificación Fiscal">
                        <div className="grid grid-cols-3 gap-4">
                            <SelectSearchable label="Tipo de persona" name="persona_tipo_id" options={personas} value={data.persona_tipo_id} onChange={(v) => set("persona_tipo_id", v)} />
                            <SelectSearchable label="Uso CFDI" name="uso_cfdi_id" options={usosCfdi} value={data.uso_cfdi_id} onChange={(v) => loadSubtipos(v)} />
                            <SelectSearchable label="Subtipo" name="subtipo_cliente_id" options={subtipos} value={data.subtipo_cliente_id} onChange={(v) => set("subtipo_cliente_id", v)} />
                            <SelectSearchable label="Régimen fiscal" name="regimen_fiscal_id" options={regimenes} value={data.regimen_fiscal_id} onChange={(v) => set("regimen_fiscal_id", v)} />
                            <SelectSearchable label="Forma jurídica" name="forma_juridica_id" options={formas} value={data.forma_juridica_id} onChange={(v) => set("forma_juridica_id", v)} />
                            <SelectSearchable label="Ámbito" name="ambito_id" options={ambitos} value={data.ambito_id} onChange={(v) => set("ambito_id", v)} />
                            <SelectSearchable label="Tamaño" name="tamanio_id" options={tamanios} value={data.tamanio_id} onChange={(v) => set("tamanio_id", v)} />
                            <SelectSearchable label="Sector" name="sector_id" options={sectores} value={data.sector_id} onChange={(v) => set("sector_id", v)} />
                            <SelectSearchable label="Clasificación" name="clasificacion_id" options={clasificaciones} value={data.clasificacion_id} onChange={(v) => set("clasificacion_id", v)} />
                            <SelectSearchable label="Rama" name="rama_id" options={ramas} value={data.rama_id} onChange={(v) => set("rama_id", v)} />
                        </div>
                    </Section>

                    {/* Sección 3: Dirección */}
                    <Section title="Dirección">
                        <div className="grid grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Calle</label>
                                <input type="text" value={data.domicilio_calle} onChange={(e) => set("domicilio_calle", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">No.</label>
                                <input type="text" value={data.domicilio_numero} onChange={(e) => set("domicilio_numero", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Colonia</label>
                                <input type="text" value={data.domicilio_colonia} onChange={(e) => set("domicilio_colonia", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CP</label>
                                <input type="text" value={data.domicilio_cp} onChange={(e) => set("domicilio_cp", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" maxLength={10} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <SelectSearchable label="País" name="pais_id" options={paises} value={data.pais_id} onChange={(v) => loadEstados(v)} />
                            <SelectSearchable label="Estado" name="estado_id" options={estados} value={data.estado_id} onChange={(v) => loadCiudades(v)} />
                            <SelectSearchable label="Ciudad" name="ciudad_id" options={ciudades} value={data.ciudad_id} onChange={(v) => set("ciudad_id", v)} />
                        </div>
                    </Section>

                    {/* Sección 4: Contacto Principal */}
                    <Section title="Contacto Principal" defaultOpen={true}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input type="text" value={data.contacto_nombre} onChange={(e) => set("contacto_nombre", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profesión</label>
                                <input type="text" value={data.contacto_profesion} onChange={(e) => set("contacto_profesion", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo / Puesto</label>
                                <input type="text" value={data.contacto_puesto} onChange={(e) => set("contacto_puesto", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" value={data.contacto_email} onChange={(e) => set("contacto_email", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                                {errors.contacto_email && <p className="mt-1 text-xs text-red-600">{errors.contacto_email}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Lada</label>
                                <input type="text" value={data.contacto_lada} onChange={(e) => set("contacto_lada", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                <input type="tel" value={data.contacto_telefono} onChange={(e) => set("contacto_telefono", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ext</label>
                                <input type="text" value={data.contacto_extension} onChange={(e) => set("contacto_extension", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                        </div>
                    </Section>

                    {/* Sección 5: Teléfonos */}
                    <Section title="Teléfonos del Cliente">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Lada</label>
                                <input type="text" value={data.lada} onChange={(e) => set("lada", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                <input type="tel" value={data.telefono} onChange={(e) => set("telefono", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                        </div>
                    </Section>

                    {/* Sección 6: Redes Sociales */}
                    <Section title="Redes Sociales">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Página web</label>
                                <input type="url" value={data.social_networks.web} onChange={(e) => setSocial("web", e.target.value)} placeholder="https://..." className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                                <input type="url" value={data.social_networks.facebook} onChange={(e) => setSocial("facebook", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                                <input type="url" value={data.social_networks.twitter} onChange={(e) => setSocial("twitter", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                                <input type="url" value={data.social_networks.linkedin} onChange={(e) => setSocial("linkedin", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Google+</label>
                                <input type="url" value={data.social_networks.google} onChange={(e) => setSocial("google", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                        </div>
                    </Section>

                    {/* Sección 7: Servicios */}
                    {!isPotencial && (
                        <Section title="Servicios">
                            <MultiSelect
                                label="Servicios ofrecidos"
                                name="services"
                                options={servicios}
                                value={data.services}
                                onChange={(v) => set("services", v)}
                                placeholder="Seleccionar servicios..."
                            />
                            {errors.services && <p className="mt-1 text-xs text-red-600">{errors.services}</p>}
                        </Section>
                    )}
                </form>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={processing}
                        className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-[#b83030] rounded-md hover:from-orange-500 hover:to-red-500 transition-all disabled:opacity-50 shadow-sm"
                    >
                        {processing ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </div>
        </div>
    );
}
