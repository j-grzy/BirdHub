import {createContext, useState} from "react";

export const LanguageContext = createContext();

export default function LanguageProvider({children}) {
  const [language, setLanguage] = useState({name: "english", code: "en"});
  const languageList = [
    {name: "deutsch", code: "de"},
    {name: "english", code: "en"},
  ];

  return <LanguageContext.Provider value={{language, setLanguage, languageList}}>{children}</LanguageContext.Provider>;
}
