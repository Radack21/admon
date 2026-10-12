import { useEffect, useRef, useState } from "react";
import Select from "./Select";

const MANOS = [
    { value: "Izquierda", label: "Izquierda" },
    { value: "Derecha", label: "Derecha" },
];

const DEDOS = [
    { value: "Índice", label: "Índice" },
    { value: "Medio", label: "Medio" },
    { value: "Anular", label: "Anular" },
    { value: "Meñique", label: "Meñique" },
    { value: "Pulgar", label: "Pulgar" },
];

const STATUS_TEXT = {
    idle: "Esperando lectura...",
    scanning: "Capturando huella...",
    captured: "Huella registrada",
};

const QUALITY = {
    idle: "Inactivo",
    scanning: "Escaneando",
    captured: "Óptima",
};

export default function FingerprintScanner({ className = "" }) {
    const [mano, setMano] = useState("Izquierda");
    const [dedo, setDedo] = useState("Índice");
    const [status, setStatus] = useState("idle");
    const timer = useRef(null);

    useEffect(() => () => clearTimeout(timer.current), []);

    const start = () => {
        if (status === "captured") {
            setStatus("idle");
            return;
        }
        setStatus("scanning");
        timer.current = setTimeout(() => setStatus("captured"), 1600);
    };

    return (
        <div className={`monolithic-biometric-card ${status} ${className}`}>
            <div className="card-top-bar">
                <div className="selectors-group">
                    <Select label="Mano" options={MANOS} value={mano} onChange={setMano} />
                    <Select label="Dedo" options={DEDOS} value={dedo} onChange={setDedo} />
                </div>
                <button type="button" className="action-btn-main" onClick={start}>
                    {status === "idle" ? "Iniciar" : status === "scanning" ? "Escaneando..." : "Reiniciar"}
                </button>
            </div>
            <div className="canvas-area">
                <div className="scan-laser" />
                <svg className="fingerprint-vector" viewBox="0 0 100 120">
                    <path d="M50 15 C30 15 15 30 15 55 C15 85 30 105 50 105 C70 105 85 85 85 55 C85 30 70 15 50 15 Z" />
                    <path d="M50 25 C36 25 25 36 25 55 C25 78 36 95 50 95 C64 95 75 78 75 55 C75 36 64 25 50 25 Z" />
                    <path d="M50 35 C42 35 35 42 35 55 C35 70 42 85 50 85 C58 85 65 70 65 55 C65 42 58 35 50 35 Z" />
                    <path d="M50 45 C46 45 42 48 42 55 C42 63 46 75 50 75 C54 75 58 63 58 55 C58 48 54 45 50 45 Z" />
                    <path d="M50 55 C49 55 48 56 48 58 C48 61 49 65 50 65 C51 65 52 61 52 58 C52 56 51 55 50 55 Z" />
                </svg>
            </div>
            <div className="footer-telemetry">
                <span>{STATUS_TEXT[status]}</span>
                <span className="quality-pill">{QUALITY[status]}</span>
            </div>
        </div>
    );
}
