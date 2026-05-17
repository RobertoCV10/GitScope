import { useLanguage } from "../hooks/useLanguage";
import LanguagesChart from "../components/charts/LanguagesChart";
import TopReposChart from "../components/charts/TopReposChart";
import { Icon, I } from "../utils/icons";
const ReposPage = ({ analytics, darkMode }) => {
  const { t } = useLanguage();
  const { languages = [], topRepos = [] } = analytics;
  const repoCount = languages.reduce((sum, l) => sum + l.count, 0);
  const langCount = languages.length;
  const topLang = languages[0]?.name || "—";
  const topLangPct =
    repoCount > 0 && languages[0]
      ? Math.round((languages[0].count / repoCount) * 100)
      : 0;
  const hasData = languages.length > 0 || topRepos.length > 0;
  if (!hasData) {
    return (
      <div className="space-y-6 animate-fade-in">
        {" "}
        <div>
          {" "}
          <h2 className="text-2xl font-bold font-display text-md-on-surface">
            {" "}
            <Icon icon={I.repos} className="inline-block mr-2" />{t("navRepos")}{" "}
          </h2>{" "}
        </div>{" "}
        <div className="p-12 rounded-[24px] bg-md-surface-container text-center">
          {" "}
          <p className="text-lg font-medium text-md-on-surface-variant">
            {" "}
            {t("noData")}{" "}
          </p>{" "}
        </div>{" "}
      </div>
    );
  }
  const statCards = [
    {
      icon: I.package,
      label: t("totalRepos"),
      value: repoCount,
      accent: "from-primary-500/80 to-primary-600/80",
    },
    {
      icon: I.languages,
      label: t("navLanguages"),
      value: langCount,
      accent: "from-emerald-500/80 to-emerald-600/80",
    },
    {
      icon: I.trophy,
      label: t("mainLanguage"),
      value: topLang,
      sub: topLangPct > 0 ? `${topLangPct}%` : null,
      accent: "from-amber-500/80 to-amber-600/80",
    },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      {" "}
      <div>
        {" "}
        <h2 className="text-2xl font-bold font-display text-md-on-surface">
          {" "}
          <Icon icon={I.repos} className="inline-block mr-2" />{t("navRepos")}{" "}
        </h2>{" "}
        <p className="text-sm mt-1 text-md-on-surface-variant">
          {" "}
          {t("languagesTitle")} &amp; {t("topReposTitle")}{" "}
        </p>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {" "}
        {statCards.map((card, i) => (
          <div
            key={card.label}
            className="group p-4 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:scale-[1.02] hover:shadow-md-md animate-slide-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {" "}
            <div className="flex items-center gap-2 mb-1.5">
              {" "}
              <Icon icon={card.icon} className="text-xl filter group-hover:scale-110 transition-transform duration-300" />{" "}
              <span className="text-[10px] font-semibold uppercase tracking-wider text-md-on-surface-variant">
                {" "}
                {card.label}{" "}
              </span>{" "}
            </div>{" "}
            <p className="text-2xl font-bold text-md-on-surface">
              {" "}
              {card.value}{" "}
            </p>{" "}
            {card.sub && (
              <p className="text-xs mt-0.5 text-md-on-surface-variant">
                {" "}
                {card.sub}{" "}
              </p>
            )}{" "}
          </div>
        ))}{" "}
      </div>{" "}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {" "}
        <div className="animate-slide-up stagger-1">
          {" "}
          <LanguagesChart languages={languages} darkMode={darkMode} />{" "}
        </div>{" "}
        <div className="animate-slide-up stagger-2">
          {" "}
          <TopReposChart repos={topRepos} darkMode={darkMode} />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default ReposPage;
