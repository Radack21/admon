export default function IconClientes({ className, ...props }) {
  return (
    <svg className={`icon-svg ${className || ""}`} {...props}
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g transform="translate(0,-6)">
                      {/* folder trasero */}
                      <path
                        d="M8 16 Q8 14 10 14 L24 14 Q26.5 14 27.5 16 L30 20 L56 20 Q58 20 58 22 L58 50 Q58 52 56 52 L10 52 Q8 52 8 50 Z"
                        fill="#1B5E6E"
                        fillOpacity="0.20"
                      />
                      <path
                        d="M8 16 Q8 14 10 14 L24 14 Q26.5 14 27.5 16 L30 20 L56 20"
                        fill="none"
                        stroke="#4ECDC4"
                        strokeWidth="1"
                        strokeOpacity="0.30"
                      />
                      {/* folder medio */}
                      <path
                        d="M5 21 Q5 19 7 19 L22 19 Q24.5 19 25.5 21 L28 25 L57 25 Q59 25 59 27 L59 53 Q59 55 57 55 L7 55 Q5 55 5 53 Z"
                        fill="#1B5E6E"
                        fillOpacity="0.38"
                      />
                      <path
                        d="M5 21 Q5 19 7 19 L22 19 Q24.5 19 25.5 21 L28 25 L57 25"
                        fill="none"
                        stroke="#4ECDC4"
                        strokeWidth="1"
                        strokeOpacity="0.40"
                      />
                      {/* folder principal (frente) */}
                      <path
                        d="M3 27 Q3 25 5 25 L21 25 Q23.5 25 24.5 27 L27 31 L59 31 Q61 31 61 33 L61 57 Q61 59 59 59 L5 59 Q3 59 3 57 Z"
                        fill="#1B5E6E"
                        fillOpacity="0.55"
                      />
                      {/* borde superior luminoso del folder frontal */}
                      <path
                        d="M3 27 Q3 25 5 25 L21 25 Q23.5 25 24.5 27 L27 31 L61 31"
                        fill="none"
                        stroke="#4ECDC4"
                        strokeWidth="1.2"
                        strokeOpacity="0.55"
                      />
                      {/* línea separadora header */}
                      <rect
                        x="3"
                        y="31"
                        width="58"
                        height="1.2"
                        fill="#4ECDC4"
                        fillOpacity="0.18"
                      />
                      {/* tarjeta ID dentro del folder */}
                      <rect
                        x="8"
                        y="36"
                        width="36"
                        height="20"
                        rx="3"
                        fill="#1B5E6E"
                        fillOpacity="0.30"
                      />
                      <rect
                        x="8"
                        y="36"
                        width="36"
                        height="20"
                        rx="3"
                        fill="#4ECDC4"
                        fillOpacity="0.12"
                      />
                      <rect
                        x="8"
                        y="36"
                        width="36"
                        height="20"
                        rx="3"
                        fill="none"
                        stroke="#4ECDC4"
                        strokeWidth="1"
                        strokeOpacity="0.45"
                      />
                      {/* header de tarjeta glass */}
                      <rect
                        x="8"
                        y="36"
                        width="36"
                        height="7"
                        rx="3"
                        fill="#4ECDC4"
                        fillOpacity="0.28"
                      />
                      <rect
                        x="8"
                        y="40"
                        width="36"
                        height="3"
                        fill="#4ECDC4"
                        fillOpacity="0.28"
                      />
                      {/* avatar tarjeta — estilo Usuarios */}
                      <circle
                        cx="18"
                        cy="47"
                        r="2"
                        fill="#4ECDC4"
                        fillOpacity="0.90"
                      />
                      <path
                        d="M13.5 53 Q13.5 49.5 18 49.5 Q22.5 49.5 22.5 53 Z"
                        fill="#4ECDC4"
                        fillOpacity="0.72"
                      />
                      {/* líneas de datos glass */}
                      <rect
                        x="25"
                        y="45"
                        width="15"
                        height="2"
                        rx="1"
                        fill="#4ECDC4"
                        fillOpacity="0.50"
                      />
                      <rect
                        x="25"
                        y="49.5"
                        width="10"
                        height="1.8"
                        rx="0.9"
                        fill="#4ECDC4"
                        fillOpacity="0.30"
                      />
                    </g>
                  </svg>
  );
}
