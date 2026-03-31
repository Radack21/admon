export default function IconSprints({ className, ...props }) {
  return (
    <svg className={`icon-svg ${className || ""}`} {...props}
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* área de fondo bajo la curva ideal (línea diagonal) */}
                    <path
                      d="M8 10 L56 56 L56 56 L8 56 Z"
                      fill="#A87010"
                      fillOpacity="0.08"
                    />
                    {/* línea ideal (diagonal — trabajo ideal restante) */}
                    <line
                      x1="8"
                      y1="10"
                      x2="56"
                      y2="56"
                      stroke="#A87010"
                      strokeWidth="1.4"
                      strokeOpacity="0.35"
                      strokeDasharray="3 3"
                    />
                    {/* grid horizontal sutil */}
                    <line
                      x1="8"
                      y1="24"
                      x2="56"
                      y2="24"
                      stroke="#A87010"
                      strokeWidth="0.8"
                      strokeOpacity="0.18"
                    />
                    <line
                      x1="8"
                      y1="38"
                      x2="56"
                      y2="38"
                      stroke="#A87010"
                      strokeWidth="0.8"
                      strokeOpacity="0.18"
                    />
                    {/* ejes */}
                    <line
                      x1="8"
                      y1="8"
                      x2="8"
                      y2="57"
                      stroke="#A87010"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeOpacity="0.75"
                    />
                    <line
                      x1="7"
                      y1="57"
                      x2="57"
                      y2="57"
                      stroke="#A87010"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeOpacity="0.75"
                    />
                    {/* línea real burndown (baja escalonada, más rápida que lo ideal) */}
                    <polyline
                      points="8,10 16,18 22,22 28,32 34,30 40,42 48,48 56,54"
                      fill="none"
                      stroke="#FFE566"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* área bajo curva real */}
                    <path
                      d="M8 10 L16 18 L22 22 L28 32 L34 30 L40 42 L48 48 L56 54 L56 57 L8 57 Z"
                      fill="#FFE566"
                      fillOpacity="0.10"
                    />
                    {/* puntos en la curva real */}
                    <circle
                      cx="16"
                      cy="18"
                      r="2.2"
                      fill="#FFE566"
                      fillOpacity="0.9"
                    />
                    <circle
                      cx="28"
                      cy="32"
                      r="2.2"
                      fill="#FFE566"
                      fillOpacity="0.9"
                    />
                    <circle
                      cx="40"
                      cy="42"
                      r="2.2"
                      fill="#FFE566"
                      fillOpacity="0.9"
                    />
                    <circle
                      cx="56"
                      cy="54"
                      r="2.2"
                      fill="#FFE566"
                      fillOpacity="0.9"
                    />
                    {/* flag de fin de sprint */}
                    <line
                      x1="56"
                      y1="8"
                      x2="56"
                      y2="54"
                      stroke="#A87010"
                      strokeWidth="1.2"
                      strokeOpacity="0.4"
                      strokeDasharray="2 2"
                    />
                    <path
                      d="M56 8 L63 11 L56 14 Z"
                      fill="#FFE566"
                      fillOpacity="0.8"
                    />
                  </svg>
  );
}
