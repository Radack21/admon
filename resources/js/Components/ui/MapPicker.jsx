import { useState } from "react";

const BASE_LAT = 20.6736;
const BASE_LNG = -103.344;
const SPAN = 0.1;

function pinFromCoords(lat, lng) {
    const xPct = (lng - (BASE_LNG - SPAN / 2)) / SPAN;
    const yPct = (lat - (BASE_LAT + SPAN / 2)) / -SPAN;
    return { x: xPct * 100, y: yPct * 100 };
}

export default function MapPicker({ className = "" }) {
    const [lat, setLat] = useState(BASE_LAT);
    const [lng, setLng] = useState(BASE_LNG);
    const [pin, setPin] = useState({ x: 50, y: 50 });

    const onMapClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const xPct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const yPct = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
        setPin({ x: xPct * 100, y: yPct * 100 });
        setLng(BASE_LNG + (xPct - 0.5) * SPAN);
        setLat(BASE_LAT - (yPct - 0.5) * SPAN);
    };

    const onLatChange = (v) => {
        setLat(v);
        setPin(pinFromCoords(v, lng));
    };

    const onLngChange = (v) => {
        setLng(v);
        setPin(pinFromCoords(lat, v));
    };

    return (
        <div className={`map-monolithic-wrapper ${className}`}>
            <div className="map-canvas-area" onClick={onMapClick} />
            <div className="map-top-bar">
                <div className="search-simple-container">
                    <input
                        type="text"
                        className="search-input-field"
                        placeholder="Buscar ubicación para registrar..."
                    />
                </div>
            </div>
            <div className="map-pin" style={{ top: `${pin.y}%`, left: `${pin.x}%` }}>
                <svg viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
            </div>
            <div className="map-footer-telemetry">
                <div className="coord-group">
                    <div className="coord-field-pill">
                        <span className="coord-floating-label">Latitud</span>
                        <input
                            className="coord-input"
                            value={lat.toFixed(4)}
                            onChange={(e) => onLatChange(Number(e.target.value))}
                        />
                    </div>
                    <div className="coord-field-pill">
                        <span className="coord-floating-label">Longitud</span>
                        <input
                            className="coord-input"
                            value={lng.toFixed(4)}
                            onChange={(e) => onLngChange(Number(e.target.value))}
                        />
                    </div>
                </div>
                <span style={{ fontSize: 11 }}>Haga clic en el mapa o edite los campos</span>
            </div>
        </div>
    );
}
