export default function IconAsistente({ className, ...props }) {
  return (
    <svg className={`icon-svg ${className || ""}`} {...props}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Burbuja de chat principal */}
      <rect
        x="6"
        y="10"
        width="44"
        height="32"
        rx="10"
        fill="#7C2D12"
        fillOpacity="0.55"
      />
      <rect
        x="6"
        y="10"
        width="44"
        height="32"
        rx="10"
        fill="none"
        stroke="#F97316"
        strokeWidth="1.2"
        strokeOpacity="0.6"
      />
      {/* Cola de la burbuja */}
      <path
        d="M14 42 L12 52 L22 44 Z"
        fill="#7C2D12"
        fillOpacity="0.55"
      />
      <path
        d="M14 42 L12 52 L22 44"
        fill="none"
        stroke="#F97316"
        strokeWidth="1.2"
        strokeOpacity="0.6"
        strokeLinejoin="round"
      />

      {/* Tres puntos de conversación */}
      <circle cx="17" cy="26" r="2.6" fill="#F97316" fillOpacity="0.95" />
      <circle cx="28" cy="26" r="2.6" fill="#FB923C" fillOpacity="0.85" />
      <circle cx="39" cy="26" r="2.6" fill="#FDBA74" fillOpacity="0.7" />

      {/* Destello superior derecho (spark) */}
      <path
        d="M50 6 C50 6 52 12 50 18 C48 12 50 6 50 6Z"
        fill="#EF4444"
        fillOpacity="0.9"
      />
      <path
        d="M58 14 C58 14 58.8 17.5 58 21 C57.2 17.5 58 14 58 14Z"
        fill="#F97316"
        fillOpacity="0.75"
      />
      <circle cx="50" cy="24" r="1.4" fill="#F97316" fillOpacity="0.7" />
      <circle cx="44" cy="18" r="1.1" fill="#FB923C" fillOpacity="0.6" />
    </svg>
  );
}
