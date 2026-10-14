import { createContext, useContext, useEffect } from "react";
import useTheme from "@/hooks/useTheme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const theme = useTheme("dark");

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme.theme === "dark");
    }, [theme.theme]);

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
    return useContext(ThemeContext) || { theme: "dark", setTheme: () => {}, toggle: () => {} };
}
