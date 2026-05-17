import { useLanguage } from "../../hooks/useLanguage";
const languages = [
  { code: "es", flag: "🇪🇸", label: "ES" },
  { code: "en", flag: "🇺🇸", label: "EN" },
];
const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="flex p-0.5 rounded-full bg-md-surface-container-low">
      {" "}
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${language === lang.code ? "bg-md-primary text-md-on-primary shadow-sm" : "text-md-on-surface-variant hover:text-md-on-surface"}`}
          aria-label={lang.label}
        >
          {" "}
          <span>{lang.flag}</span> <span className="hidden sm:inline">{lang.label}</span>{" "}
        </button>
      ))}{" "}
    </div>
  );
};
export default LanguageSelector;
