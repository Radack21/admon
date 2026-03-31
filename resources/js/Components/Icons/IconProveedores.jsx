export default function IconProveedores({ className, ...props }) {
  return (
    <svg className={`icon-svg ${className || ""}`} {...props}
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* ══ CAMIÓN (vista lateral, llegando de izq a der) ══ */}

                    {/* remolque — caja de carga */}
                    <rect
                      x="14"
                      y="16"
                      width="23"
                      height="22"
                      rx="1.5"
                      fill="#4A6070"
                      fillOpacity="0.40"
                    />
                    <rect
                      x="14"
                      y="16"
                      width="23"
                      height="22"
                      rx="1.5"
                      fill="none"
                      stroke="#90E0EF"
                      strokeWidth="1.1"
                      strokeOpacity="0.55"
                    />
                    {/* línea horizontal de refuerzo del remolque */}
                    <line
                      x1="14"
                      y1="27"
                      x2="37"
                      y2="27"
                      stroke="#90E0EF"
                      strokeWidth="0.5"
                      strokeOpacity="0.25"
                    />
                    {/* puertas traseras del remolque (2 paneles) */}
                    <line
                      x1="25"
                      y1="16"
                      x2="25"
                      y2="38"
                      stroke="#90E0EF"
                      strokeWidth="0.5"
                      strokeOpacity="0.30"
                    />
                    <line
                      x1="19"
                      y1="16"
                      x2="19"
                      y2="38"
                      stroke="#90E0EF"
                      strokeWidth="0.4"
                      strokeOpacity="0.18"
                    />
                    <line
                      x1="31"
                      y1="16"
                      x2="31"
                      y2="38"
                      stroke="#90E0EF"
                      strokeWidth="0.4"
                      strokeOpacity="0.18"
                    />
                    {/* enganche remolque-cabina */}
                    <rect
                      x="12"
                      y="34"
                      width="3"
                      height="4"
                      rx="0.5"
                      fill="#4A6070"
                      fillOpacity="0.70"
                    />

                    {/* cabina — perfil realista */}
                    {/* cuerpo principal cabina */}
                    <path
                      d="M2 28 L2 38 Q2 40 4 40 L14 40 L14 22 Q14 20 12 20 L8 20 Q5 20 4 22 Z"
                      fill="#4A6070"
                      fillOpacity="0.72"
                    />
                    <path
                      d="M2 28 L2 38 Q2 40 4 40 L14 40 L14 22 Q14 20 12 20 L8 20 Q5 20 4 22 Z"
                      fill="none"
                      stroke="#90E0EF"
                      strokeWidth="0.9"
                      strokeOpacity="0.50"
                    />
                    {/* parabrisas — inclinado, realista */}
                    <path
                      d="M5 22 L5 30 L13 30 L13 22 Q10 20 5 22 Z"
                      fill="#90E0EF"
                      fillOpacity="0.22"
                    />
                    <path
                      d="M5 22 L5 30 L13 30 L13 22 Q10 20 5 22 Z"
                      fill="none"
                      stroke="#90E0EF"
                      strokeWidth="0.7"
                      strokeOpacity="0.55"
                    />
                    {/* pilar A (separador parabrisas-cabina) */}
                    <line
                      x1="5"
                      y1="22"
                      x2="5"
                      y2="30"
                      stroke="#4A6070"
                      strokeWidth="1.2"
                      strokeOpacity="0.60"
                    />
                    {/* espejo retrovisor */}
                    <rect
                      x="1"
                      y="26"
                      width="2"
                      height="1.5"
                      rx="0.4"
                      fill="#90E0EF"
                      fillOpacity="0.55"
                    />
                    {/* faro delantero (doble línea fina) */}
                    <rect
                      x="2"
                      y="36"
                      width="3"
                      height="1.5"
                      rx="0.4"
                      fill="#90E0EF"
                      fillOpacity="0.90"
                    />
                    <rect
                      x="2"
                      y="34"
                      width="2"
                      height="1"
                      rx="0.3"
                      fill="#90E0EF"
                      fillOpacity="0.40"
                    />
                    {/* parachoques frontal */}
                    <rect
                      x="2"
                      y="38"
                      width="5"
                      height="2"
                      rx="0.5"
                      fill="#4A6070"
                      fillOpacity="0.80"
                    />
                    <line
                      x1="2"
                      y1="39"
                      x2="7"
                      y2="39"
                      stroke="#90E0EF"
                      strokeWidth="0.4"
                      strokeOpacity="0.35"
                    />
                    {/* estribo / paso */}
                    <rect
                      x="4"
                      y="40"
                      width="8"
                      height="1.5"
                      rx="0.4"
                      fill="#4A6070"
                      fillOpacity="0.50"
                    />

                    {/* rueda delantera */}
                    <circle
                      cx="8"
                      cy="43"
                      r="4.8"
                      fill="#4A6070"
                      fillOpacity="0.88"
                    />
                    <circle
                      cx="8"
                      cy="43"
                      r="4.8"
                      fill="none"
                      stroke="#90E0EF"
                      strokeWidth="0.6"
                      strokeOpacity="0.35"
                    />
                    <circle cx="8" cy="43" r="2.2" fill="#060e14" />
                    <circle
                      cx="8"
                      cy="43"
                      r="1"
                      fill="#4A6070"
                      fillOpacity="0.50"
                    />
                    {/* perno rueda delantera (4 puntos) */}
                    <circle
                      cx="8"
                      cy="40.8"
                      r="0.5"
                      fill="#90E0EF"
                      fillOpacity="0.40"
                    />
                    <circle
                      cx="8"
                      cy="45.2"
                      r="0.5"
                      fill="#90E0EF"
                      fillOpacity="0.40"
                    />
                    <circle
                      cx="5.8"
                      cy="43"
                      r="0.5"
                      fill="#90E0EF"
                      fillOpacity="0.40"
                    />
                    <circle
                      cx="10.2"
                      cy="43"
                      r="0.5"
                      fill="#90E0EF"
                      fillOpacity="0.40"
                    />

                    {/* rueda trasera (doble) */}
                    <circle
                      cx="28"
                      cy="43"
                      r="4.8"
                      fill="#4A6070"
                      fillOpacity="0.88"
                    />
                    <circle
                      cx="28"
                      cy="43"
                      r="4.8"
                      fill="none"
                      stroke="#90E0EF"
                      strokeWidth="0.6"
                      strokeOpacity="0.35"
                    />
                    <circle cx="28" cy="43" r="2.2" fill="#060e14" />
                    <circle
                      cx="28"
                      cy="43"
                      r="1"
                      fill="#4A6070"
                      fillOpacity="0.50"
                    />
                    <circle
                      cx="28"
                      cy="40.8"
                      r="0.5"
                      fill="#90E0EF"
                      fillOpacity="0.40"
                    />
                    <circle
                      cx="28"
                      cy="45.2"
                      r="0.5"
                      fill="#90E0EF"
                      fillOpacity="0.40"
                    />
                    <circle
                      cx="25.8"
                      cy="43"
                      r="0.5"
                      fill="#90E0EF"
                      fillOpacity="0.40"
                    />
                    <circle
                      cx="30.2"
                      cy="43"
                      r="0.5"
                      fill="#90E0EF"
                      fillOpacity="0.40"
                    />
                    {/* eje / chasis entre ruedas */}
                    <line
                      x1="13"
                      y1="43"
                      x2="23"
                      y2="43"
                      stroke="#4A6070"
                      strokeWidth="1.5"
                      strokeOpacity="0.55"
                    />

                    {/* suelo continuo */}
                    <line
                      x1="1"
                      y1="49"
                      x2="62"
                      y2="49"
                      stroke="#4A6070"
                      strokeWidth="0.8"
                      strokeOpacity="0.22"
                    />

                    {/* ══ DIVISOR ══ */}
                    <line
                      x1="38"
                      y1="13"
                      x2="38"
                      y2="49"
                      stroke="#90E0EF"
                      strokeWidth="0.7"
                      strokeOpacity="0.20"
                      strokeDasharray="2 2"
                    />

                    {/* ══ BANDA + 2 CAJAS (derecha) ══ */}
                    {/* caja 1 */}
                    <rect
                      x="40"
                      y="21"
                      width="9"
                      height="9"
                      rx="1.5"
                      fill="#4A6070"
                      fillOpacity="0.52"
                    />
                    <rect
                      x="40"
                      y="21"
                      width="9"
                      height="9"
                      rx="1.5"
                      fill="none"
                      stroke="#90E0EF"
                      strokeWidth="0.9"
                      strokeOpacity="0.60"
                    />
                    <line
                      x1="44.5"
                      y1="21"
                      x2="44.5"
                      y2="30"
                      stroke="#90E0EF"
                      strokeWidth="0.6"
                      strokeOpacity="0.32"
                    />
                    <line
                      x1="40"
                      y1="25.5"
                      x2="49"
                      y2="25.5"
                      stroke="#90E0EF"
                      strokeWidth="0.6"
                      strokeOpacity="0.32"
                    />
                    {/* caja 2 */}
                    <rect
                      x="51"
                      y="21"
                      width="9"
                      height="9"
                      rx="1.5"
                      fill="#4A6070"
                      fillOpacity="0.38"
                    />
                    <rect
                      x="51"
                      y="21"
                      width="9"
                      height="9"
                      rx="1.5"
                      fill="none"
                      stroke="#90E0EF"
                      strokeWidth="0.9"
                      strokeOpacity="0.42"
                    />
                    <line
                      x1="55.5"
                      y1="21"
                      x2="55.5"
                      y2="30"
                      stroke="#90E0EF"
                      strokeWidth="0.6"
                      strokeOpacity="0.24"
                    />
                    <line
                      x1="51"
                      y1="25.5"
                      x2="60"
                      y2="25.5"
                      stroke="#90E0EF"
                      strokeWidth="0.6"
                      strokeOpacity="0.24"
                    />
                    {/* banda */}
                    <rect
                      x="40"
                      y="32"
                      width="21"
                      height="5"
                      rx="2.5"
                      fill="#4A6070"
                      fillOpacity="0.45"
                    />
                    {/* rodillos */}
                    <circle
                      cx="44"
                      cy="34.5"
                      r="2.8"
                      fill="#4A6070"
                      fillOpacity="0.88"
                    />
                    <circle cx="44" cy="34.5" r="1.2" fill="#050c10" />
                    <circle
                      cx="55"
                      cy="34.5"
                      r="2.8"
                      fill="#4A6070"
                      fillOpacity="0.88"
                    />
                    <circle cx="55" cy="34.5" r="1.2" fill="#050c10" />
                  </svg>
  );
}
