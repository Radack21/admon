import { useEffect, useState } from "react";

const STORAGE_KEY = "briefdata-theme";

export default function useTheme(defaultTheme = "light") {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") return defaultTheme;
        return localStorage.getItem(STORAGE_KEY) || defaultTheme;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    return {
        theme,
        setTheme,
        toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    };
}
