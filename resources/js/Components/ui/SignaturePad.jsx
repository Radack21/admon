import { useEffect, useRef, useState } from "react";

export default function SignaturePad({ label = "Firma", className = "" }) {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const drawing = useRef(false);
    const snapshots = useRef([]);
    const [hasStroke, setHasStroke] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;

        const setup = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            ctx.scale(dpr, dpr);
            ctx.lineWidth = 2;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.strokeStyle = getComputedStyle(canvas).color || "#18181b";
            ctxRef.current = ctx;
        };

        setup();
        window.addEventListener("resize", setup);
        return () => window.removeEventListener("resize", setup);
    }, []);

    const getPos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const start = (e) => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        snapshots.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        drawing.current = true;
        const p = getPos(e);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        setHasStroke(true);
    };

    const move = (e) => {
        if (!drawing.current) return;
        const ctx = ctxRef.current;
        const p = getPos(e);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    };

    const stop = () => {
        if (!drawing.current) return;
        drawing.current = false;
        ctxRef.current.closePath();
    };

    const undo = () => {
        const snap = snapshots.current.pop();
        if (snap) ctxRef.current.putImageData(snap, 0, 0);
        setHasStroke(snapshots.current.length > 0);
    };

    const clear = () => {
        const canvas = canvasRef.current;
        ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
        snapshots.current = [];
        setHasStroke(false);
    };

    return (
        <div className={`signature-integral-wrapper ${hasStroke ? "has-stroke" : ""} ${className}`}>
            <div className="integral-top-actions">
                <button type="button" className="icon-action-btn" title="Deshacer trazo" onClick={undo}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 7v6h6" />
                        <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                    </svg>
                </button>
                <button type="button" className="icon-action-btn" title="Limpiar firma" onClick={clear}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                </button>
            </div>
            <canvas
                ref={canvasRef}
                className="draw-canvas"
                onPointerDown={start}
                onPointerMove={move}
                onPointerUp={stop}
                onPointerLeave={stop}
            />
            <div className="signature-guide-line">
                <span className="guide-label">{label}</span>
            </div>
        </div>
    );
}
