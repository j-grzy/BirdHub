import { createContext, useState } from "react";

export const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => (localStorage.getItem("language") ? JSON.parse(localStorage.getItem("language")) : { name: "english", code: "en" }));
  const languageList = [
    { name: "deutsch", code: "de" },
    { name: "english", code: "en" },
  ];

  return <LanguageContext.Provider value={{ language, setLanguage, languageList }}>{children}</LanguageContext.Provider>;
}
