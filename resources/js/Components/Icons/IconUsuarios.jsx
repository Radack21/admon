export default function IconUsuarios({ className, ...props }) {
  return (
    <svg className={`icon-svg ${className || ""}`} {...props}
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* líneas de conexión (detrás de los escudos) */}
                    <line
                      x1="18"
                      y1="28"
                      x2="32"
                      y2="20"
                      stroke="#FF8FA3"
                      strokeWidth="1.2"
                      strokeOpacity="0.55"
                    />
                    <line
                      x1="46"
                      y1="28"
                      x2="32"
                      y2="20"
                      stroke="#FF8FA3"
                      strokeWidth="1.2"
                      strokeOpacity="0.55"
                    />
                    <line
                      x1="10"
                      y1="50"
                      x2="18"
                      y2="38"
                      stroke="#FF8FA3"
                      strokeWidth="1.2"
                      strokeOpacity="0.45"
                    />
                    <line
                      x1="26"
                      y1="50"
                      x2="18"
                      y2="38"
                      stroke="#FF8FA3"
                      strokeWidth="1.2"
                      strokeOpacity="0.45"
                    />
                    <line
                      x1="38"
                      y1="50"
                      x2="46"
                      y2="38"
                      stroke="#FF8FA3"
                      strokeWidth="1.2"
                      strokeOpacity="0.45"
                    />
                    <line
                      x1="54"
                      y1="50"
                      x2="46"
                      y2="38"
                      stroke="#FF8FA3"
                      strokeWidth="1.2"
                      strokeOpacity="0.45"
                    />
                    {/* nodos de conexión */}
                    <circle
                      cx="32"
                      cy="20"
                      r="1.8"
                      fill="#FF8FA3"
                      fillOpacity="0.7"
                    />
                    <circle
                      cx="18"
                      cy="38"
                      r="1.8"
                      fill="#FF8FA3"
                      fillOpacity="0.6"
                    />
                    <circle
                      cx="46"
                      cy="38"
                      r="1.8"
                      fill="#FF8FA3"
                      fillOpacity="0.6"
                    />

                    {/* escudo central (top) — nivel 1: más luminoso */}
                    <path
                      d="M32 6 L40 10 L40 20 Q40 26 32 30 Q24 26 24 20 L24 10 Z"
                      fill="#C8304E"
                      fillOpacity="0.80"
                    />
                    <path
                      d="M32 6 L40 10 L40 20 Q40 26 32 30 Q24 26 24 20 L24 10 Z"
                      fill="none"
                      stroke="#FFB8CC"
                      strokeWidth="1.2"
                      strokeOpacity="0.90"
                    />
                    {/* avatar escudo central — nivel 1: más brillante */}
                    <circle
                      cx="32"
                      cy="16"
                      r="2.8"
                      fill="#FFB8CC"
                      fillOpacity="1.0"
                    />
                    <path
                      d="M26.5 25 Q26.5 20.5 32 20.5 Q37.5 20.5 37.5 25 Z"
                      fill="#FFB8CC"
                      fillOpacity="0.90"
                    />

                    {/* escudo izquierdo (mid) — nivel 2: tono medio */}
                    <path
                      d="M18 26 L25 29.5 L25 38 Q25 43 18 46 Q11 43 11 38 L11 29.5 Z"
                      fill="#B8284A"
                      fillOpacity="0.55"
                    />
                    <path
                      d="M18 26 L25 29.5 L25 38 Q25 43 18 46 Q11 43 11 38 L11 29.5 Z"
                      fill="none"
                      stroke="#FF8FA3"
                      strokeWidth="0.9"
                      strokeOpacity="0.55"
                    />
                    {/* avatar escudo izquierdo */}
                    <circle
                      cx="18"
                      cy="33"
                      r="2.2"
                      fill="#FF8FA3"
                      fillOpacity="0.85"
                    />
                    <path
                      d="M13.5 40.5 Q13.5 36.8 18 36.8 Q22.5 36.8 22.5 40.5 Z"
                      fill="#FF8FA3"
                      fillOpacity="0.68"
                    />

                    {/* escudo derecho (mid) — nivel 2: tono medio */}
                    <path
                      d="M46 26 L53 29.5 L53 38 Q53 43 46 46 Q39 43 39 38 L39 29.5 Z"
                      fill="#B8284A"
                      fillOpacity="0.55"
                    />
                    <path
                      d="M46 26 L53 29.5 L53 38 Q53 43 46 46 Q39 43 39 38 L39 29.5 Z"
                      fill="none"
                      stroke="#FF8FA3"
                      strokeWidth="0.9"
                      strokeOpacity="0.55"
                    />
                    {/* avatar escudo derecho */}
                    <circle
                      cx="46"
                      cy="33"
                      r="2.2"
                      fill="#FF8FA3"
                      fillOpacity="0.85"
                    />
                    <path
                      d="M41.5 40.5 Q41.5 36.8 46 36.8 Q50.5 36.8 50.5 40.5 Z"
                      fill="#FF8FA3"
                      fillOpacity="0.68"
                    />

                    {/* escudo inf izq (small) — nivel 3: más oscuro/tenue */}
                    <path
                      d="M10 48 L15 50.5 L15 56 Q15 59 10 61 Q5 59 5 56 L5 50.5 Z"
                      fill="#7A1030"
                      fillOpacity="0.70"
                    />
                    <path
                      d="M10 48 L15 50.5 L15 56 Q15 59 10 61 Q5 59 5 56 L5 50.5 Z"
                      fill="none"
                      stroke="#FF8FA3"
                      strokeWidth="0.8"
                      strokeOpacity="0.35"
                    />
                    <circle
                      cx="10"
                      cy="52.5"
                      r="1.4"
                      fill="#FF8FA3"
                      fillOpacity="0.55"
                    />
                    <path
                      d="M7.2 57 Q7.2 54.7 10 54.7 Q12.8 54.7 12.8 57 Z"
                      fill="#FF8FA3"
                      fillOpacity="0.42"
                    />

                    {/* escudo inf centro-izq (small) — nivel 3 */}
                    <path
                      d="M26 48 L31 50.5 L31 56 Q31 59 26 61 Q21 59 21 56 L21 50.5 Z"
                      fill="#7A1030"
                      fillOpacity="0.70"
                    />
                    <path
                      d="M26 48 L31 50.5 L31 56 Q31 59 26 61 Q21 59 21 56 L21 50.5 Z"
                      fill="none"
                      stroke="#FF8FA3"
                      strokeWidth="0.8"
                      strokeOpacity="0.35"
                    />
                    <circle
                      cx="26"
                      cy="52.5"
                      r="1.4"
                      fill="#FF8FA3"
                      fillOpacity="0.55"
                    />
                    <path
                      d="M23.2 57 Q23.2 54.7 26 54.7 Q28.8 54.7 28.8 57 Z"
                      fill="#FF8FA3"
                      fillOpacity="0.42"
                    />

                    {/* escudo inf centro-der (small) — nivel 3 */}
                    <path
                      d="M38 48 L43 50.5 L43 56 Q43 59 38 61 Q33 59 33 56 L33 50.5 Z"
                      fill="#7A1030"
                      fillOpacity="0.70"
                    />
                    <path
                      d="M38 48 L43 50.5 L43 56 Q43 59 38 61 Q33 59 33 56 L33 50.5 Z"
                      fill="none"
                      stroke="#FF8FA3"
                      strokeWidth="0.8"
                      strokeOpacity="0.35"
                    />
                    <circle
                      cx="38"
                      cy="52.5"
                      r="1.4"
                      fill="#FF8FA3"
                      fillOpacity="0.55"
                    />
                    <path
                      d="M35.2 57 Q35.2 54.7 38 54.7 Q40.8 54.7 40.8 57 Z"
                      fill="#FF8FA3"
                      fillOpacity="0.42"
                    />

                    {/* escudo inf der (small) — nivel 3 */}
                    <path
                      d="M54 48 L59 50.5 L59 56 Q59 59 54 61 Q49 59 49 56 L49 50.5 Z"
                      fill="#7A1030"
                      fillOpacity="0.70"
                    />
                    <path
                      d="M54 48 L59 50.5 L59 56 Q59 59 54 61 Q49 59 49 56 L49 50.5 Z"
                      fill="none"
                      stroke="#FF8FA3"
                      strokeWidth="0.8"
                      strokeOpacity="0.35"
                    />
                    <circle
                      cx="54"
                      cy="52.5"
                      r="1.4"
                      fill="#FF8FA3"
                      fillOpacity="0.55"
                    />
                    <path
                      d="M51.2 57 Q51.2 54.7 54 54.7 Q56.8 54.7 56.8 57 Z"
                      fill="#FF8FA3"
                      fillOpacity="0.42"
                    />
                  </svg>
  );
}
