import { useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import LanguageSelector from "../common/LanguageSelector";
import Dialog from "../common/Dialog";
import ContactPage from "../../pages/ContactPage";
import AboutPage from "../../pages/AboutPage";
import { Icon, I } from "../../utils/icons";
const TopBar = ({ darkMode, onToggleDark, mode, onModeChange, onPageChange, showSidebar, onMobileMenuToggle }) => {
  const { t } = useLanguage();
  const [dialog, setDialog] = useState(null);

  const infoLinks = [
    { id: "contact", labelKey: "navContact", icon: I.contact },
    { id: "about", labelKey: "navAbout", icon: I.about },
  ];

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 py-3 backdrop-blur-sm border-b border-md-outline/15 bg-md-surface-container/80">
      <div className="flex items-center gap-2 min-w-0">
        {showSidebar && (
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-md-on-surface-variant hover:bg-md-primary/10 hover:text-md-on-surface transition-all duration-200 active:scale-90 min-w-[44px] min-h-[44px]"
            aria-label="Toggle menu"
            title="Toggle menu"
          >
            <Icon icon={I.hamburger} size="1.5em" />
          </button>
        )}
        <button
          onClick={() => onPageChange?.("overview")}
          className="hidden lg:flex items-center gap-3 min-w-0 transition-opacity hover:opacity-80 active:scale-[0.97]"
          title={t("navOverview")}
        >
          <img
            src={darkMode ? "/icons/dark3.png" : "/icons/light2.png"}
            alt="Logo"
            className="h-16 w-auto object-contain"
          />
        </button>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        {infoLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setDialog(link.id)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 text-md-on-surface-variant hover:text-md-on-surface hover:bg-md-primary/10"
          >
            <Icon icon={link.icon} size="1em" />
            <span className="hidden md:inline">{t(link.labelKey)}</span>
          </button>
        ))}
        {infoLinks.filter(l => l.id === "contact").map((link) => (
          <button
            key={`${link.id}-m`}
            onClick={() => setDialog(link.id)}
            className="sm:hidden w-10 h-10 rounded-full flex items-center justify-center text-md-on-surface-variant hover:bg-md-primary/10 hover:text-md-on-surface transition-all duration-200 min-w-[44px] min-h-[44px]"
            aria-label={t(link.labelKey)}
            title={t(link.labelKey)}
          >
            <Icon icon={link.icon} size="1.25em" />
          </button>
        ))}
        <div className="h-5 w-px bg-md-outline/20 mx-1" />
        <div className="flex p-0.5 rounded-full bg-md-surface-container-low">
          <button
            onClick={() => onModeChange("single")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 min-h-[36px] ${mode === "single" ? "bg-md-primary text-md-on-primary shadow-sm" : "text-md-on-surface-variant hover:text-md-on-surface"}`}
          >
            {t("singleMode")}
          </button>
          <button
            onClick={() => onModeChange("vs")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 min-h-[36px] ${mode === "vs" ? "bg-md-primary text-md-on-primary shadow-sm" : "text-md-on-surface-variant hover:text-md-on-surface"}`}
          >
            VS
          </button>
        </div>
        <LanguageSelector />
        <button
          onClick={onToggleDark}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] bg-md-surface-container-low hover:bg-md-primary/10 text-md-on-surface-variant active:scale-95 min-w-[44px] min-h-[44px]"
          aria-label={darkMode ? t("lightMode") : t("darkMode")}
        >
          <Icon icon={darkMode ? I.sun : I.moon} size="1.25em" />
        </button>
      </div>
      <Dialog
        open={dialog === "contact"}
        onClose={() => setDialog(null)}
        title={t("contactTitle")}
      >
        <ContactPage />
      </Dialog>
      <Dialog
        open={dialog === "about"}
        onClose={() => setDialog(null)}
        title={t("aboutTitle")}
      >
        <AboutPage />
      </Dialog>
    </header>
  );
};
export default TopBar;
