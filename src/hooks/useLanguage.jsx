import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import {
  getLanguage,
  setLanguage as saveLanguage,
  translations,
} from "../utils/translations";
const LanguageContext = createContext();
export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => getLanguage());
  useEffect(() => {
    saveLanguage(language);
    document.documentElement.lang = language;
  }, [language]);
  const setLanguage = useCallback((lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
    }
  }, []);
  const t = useCallback(
    (key) => {
      return translations[language]?.[key] || translations.es[key] || key;
    },
    [language],
  );
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {" "}
      {children}{" "}
    </LanguageContext.Provider>
  );
};
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
