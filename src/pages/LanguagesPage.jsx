import { useLanguage } from "../hooks/useLanguage";
import LanguagesStatsContainer from "../components/stats/LanguagesStatsContainer";
import { Icon, I } from "../utils/icons";
const LanguagesPage = ({ analytics, darkMode }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6 animate-fade-in">
      {" "}
      <h2 className="text-2xl font-bold font-display text-md-on-surface">
        {" "}
        <Icon icon={I.languages} className="inline-block mr-2" />{t("navLanguages")}{" "}
      </h2>{" "}
      <div className="animate-slide-up stagger-1">
        {" "}
        <LanguagesStatsContainer
          userLanguages={analytics.languages}
          darkMode={darkMode}
        />{" "}
      </div>{" "}
    </div>
  );
};
export default LanguagesPage;
