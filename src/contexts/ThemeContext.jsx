import {createContext, useState, useEffect} from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({children}) {
  const [preferedColorMode, setPreferedColorMode] = useState(() =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? {display: {en: "dark", de: "dunkel"}, class: "dark"} : {display: {en: "light", de: "hell"}, class: "light"}
  );
  const [theme, setTheme] = useState(() => (localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")) : preferedColorMode));
  const themeList = [
    {display: {en: "dark", de: "dunkel"}, class: "dark"},
    {display: {en: "light", de: "hell"}, class: "light"},
    {display: {en: "high contrast", de: "hoher Kontrast"}, class: "high-contrast"},
  ];

  useEffect(() => {
    for (let item of themeList) {
      document.body.classList.remove(item.class);
    }
    document.body.classList.add(theme.class);
  }, [theme]);

  return <ThemeContext.Provider value={{theme, setTheme, themeList}}>{children}</ThemeContext.Provider>;
}
