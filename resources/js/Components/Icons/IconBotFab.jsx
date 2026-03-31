export default function IconBotFab({ className, ...props }) {
  return (
    <svg className={className} {...props}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Punta arriba */}
            <path
              d="M12 2 C12 2 12.8 7.5 12 12 C11.2 7.5 12 2 12 2Z"
              fill="white"
              fillOpacity="0.95"
            />
            {/* Punta abajo */}
            <path
              d="M12 22 C12 22 12.8 16.5 12 12 C11.2 16.5 12 22 12 22Z"
              fill="white"
              fillOpacity="0.95"
            />
            {/* Punta derecha */}
            <path
              d="M22 12 C22 12 16.5 12.8 12 12 C16.5 11.2 22 12 22 12Z"
              fill="white"
              fillOpacity="0.95"
            />
            {/* Punta izquierda */}
            <path
              d="M2 12 C2 12 7.5 12.8 12 12 C7.5 11.2 2 12 2 12Z"
              fill="white"
              fillOpacity="0.95"
            />
            {/* Punto central */}
            <circle cx="12" cy="12" r="1.5" fill="white" />
            {/* Destellos diagonales pequeños */}
            <path
              d="M17.5 6.5 C17.5 6.5 15.2 9.2 12 12 C14.7 9.2 17.5 6.5 17.5 6.5Z"
              fill="white"
              fillOpacity="0.45"
            />
            <path
              d="M6.5 17.5 C6.5 17.5 8.8 14.8 12 12 C9.3 14.8 6.5 17.5 6.5 17.5Z"
              fill="white"
              fillOpacity="0.45"
            />
            <path
              d="M17.5 17.5 C17.5 17.5 14.8 14.8 12 12 C14.8 9.2 17.5 6.5 17.5 6.5Z"
              fill="white"
              fillOpacity="0.45"
            />
            <path
              d="M6.5 6.5 C6.5 6.5 9.2 9.2 12 12 C9.2 14.8 6.5 17.5 6.5 17.5Z"
              fill="white"
              fillOpacity="0.45"
            />
          </svg>
  );
}
