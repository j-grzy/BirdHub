import { createContext, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => (localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")) : { display: { en: "dark", de: "dunkel" }, class: "dark" }));
  const themeList = [
    { display: { en: "dark", de: "dunkel" }, class: "dark" },
    { display: { en: "light", de: "hell" }, class: "light" },
    { display: { en: "high contrast", de: "hoher Kontrast" }, class: "high-contrast" },
  ];

  return <ThemeContext.Provider value={{ theme, setTheme, themeList }}>{children}</ThemeContext.Provider>;
}
