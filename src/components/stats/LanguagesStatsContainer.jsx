import { useLanguage } from "../../hooks/useLanguage";
import useLanguagesStats from "../../hooks/useLanguagesStats";
import useUserLanguagePosition from "../../hooks/useUserLanguagePosition";
import GlobalLanguagesChart from "../charts/GlobalLanguagesChart";
import LanguageCard from "./LanguageCard";
import LoadingSpinner from "../common/LoadingSpinner";
import { Icon, I } from "../../utils/icons";
const LanguagesStatsContainer = ({ userLanguages = [], darkMode = true }) => {
  const { t, language } = useLanguage();
  const {
    globalLanguages,
    categories,
    loading: globalLoading,
    error: globalError,
    refresh: refreshGlobal,
  } = useLanguagesStats();
  const userPosition = useUserLanguagePosition(
    userLanguages,
    globalLanguages,
    language,
  );
  const hasUserData = userLanguages?.length > 0;
  const isLoading = globalLoading;
  const error = globalError;
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="py-16">
          {" "}
          <LoadingSpinner
            size="md"
            text={t("loadingLanguages") || "Loading languages..."}
          />{" "}
        </div>
      );
    }
    if (error) {
      return (
        <div className="p-6 rounded-[24px] bg-md-error/10 border border-md-error/30 text-center">
          {" "}
          <Icon icon={I.alert} className="text-2xl mb-2 block" />{" "}
          <p className="text-md-error">{error}</p>{" "}
          <button
            onClick={refreshGlobal}
            className="mt-4 px-4 py-2 rounded-full text-sm font-medium text-md-error hover:bg-md-error/10 transition-colors"
          >
            {" "}
            {t("retry") || "Retry"}{" "}
          </button>{" "}
        </div>
      );
    }
    return (
      <div className="space-y-6">
        {" "}
        {hasUserData && userPosition.processedUserLanguages?.length > 0 && (
          <div className="space-y-6">
            {" "}
            {userPosition.position && (
              <div className="p-6 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300">
                {" "}
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {" "}
                  <div className="relative w-28 h-28 rounded-full flex items-center justify-center bg-md-primary text-md-on-primary shadow-md-md">
                    {" "}
                    <div className="text-center">
                      {" "}
                      <span className="text-3xl font-bold">
                        {" "}
                        #{userPosition.position.rank || "N/A"}{" "}
                      </span>{" "}
                      <p className="text-xs text-md-on-primary/70 mt-1">
                        {" "}
                        {t("langGlobalRank") || "Global"}{" "}
                      </p>{" "}
                    </div>{" "}
                    {userPosition.position.percentile && (
                      <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-md-background border-2 border-md-primary shadow-lg text-md-primary">
                        {" "}
                        {userPosition.position.percentile}%{" "}
                      </div>
                    )}{" "}
                  </div>{" "}
                  <div className="flex-1 text-center md:text-left">
                    {" "}
                    <h3 className="text-xl font-bold font-display mb-3 text-md-on-surface">
                      {" "}
                      <Icon icon={I.user} className="inline-block mr-2" />{t("langYourPosition") || "Tu Posición"}{" "}
                    </h3>{" "}
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                      {" "}
                      <div className="px-4 py-2 rounded-full bg-md-surface-container-low">
                        {" "}
                        <p className="text-xs text-md-on-surface-variant">
                          {" "}
                          {t("langTotalLanguages") || "Lenguajes"}{" "}
                        </p>{" "}
                        <p className="text-lg font-bold text-md-on-surface">
                          {" "}
                          {userPosition.position.totalLanguages}{" "}
                        </p>{" "}
                      </div>{" "}
                      <div className="px-4 py-2 rounded-full bg-md-surface-container-low">
                        {" "}
                        <p className="text-xs text-md-on-surface-variant">
                          {" "}
                          {t("langTier") || "Nivel"}{" "}
                        </p>{" "}
                        <p className="text-lg font-bold text-md-primary">
                          {" "}
                          {userPosition.position.label || "N/A"}{" "}
                        </p>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>
            )}{" "}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {" "}
              <div className="p-5 rounded-[24px] bg-md-surface-container shadow-md-sm">
                {" "}
                <h3 className="text-lg font-bold mb-4 font-display text-md-on-surface">
                  {" "}
                  <Icon icon={I.languages} className="inline-block mr-2" />{t("langYourLanguages") || "Tus Lenguajes"}{" "}
                </h3>{" "}
                <div className="space-y-2">
                  {" "}
                  {userPosition.processedUserLanguages
                    .slice(0, 8)
                    .map((lang, index) => {
                      const globalLang = globalLanguages.find(
                        (g) => g.name.toLowerCase() === lang.name.toLowerCase(),
                      );
                      const globalRank = globalLang?.rank || "N/A";
                      return (
                        <div
                          key={lang.name}
                          className="flex items-center justify-between p-3 rounded-2xl bg-md-surface-container-low transition-all duration-300 hover:bg-md-primary/10 hover:scale-[1.01]"
                        >
                          {" "}
                          <div className="flex items-center gap-3">
                            {" "}
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? "bg-md-primary text-md-on-primary" : "bg-md-surface-container text-md-on-surface-variant"}`}
                            >
                              {" "}
                              {index + 1}{" "}
                            </div>{" "}
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: lang.color }}
                            ></div>{" "}
                            <span className="font-medium text-md-on-surface">
                              {" "}
                              {lang.name}{" "}
                            </span>{" "}
                          </div>{" "}
                          <div className="flex items-center gap-3">
                            {" "}
                            <div className="text-right">
                              {" "}
                              <p className="text-sm font-medium text-md-on-surface-variant">
                                {" "}
                                {lang.percentage}%{" "}
                              </p>{" "}
                              <p className="text-xs text-md-on-surface-variant/60">
                                {" "}
                                #{globalRank} global{" "}
                              </p>{" "}
                            </div>{" "}
                            <div className="w-16 h-2 bg-md-surface-container-low rounded-full overflow-hidden">
                              {" "}
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${lang.percentage}%`,
                                  backgroundColor: lang.color,
                                }}
                              ></div>{" "}
                            </div>{" "}
                          </div>{" "}
                        </div>
                      );
                    })}{" "}
                </div>{" "}
              </div>{" "}
              <div className="p-5 rounded-[24px] bg-md-surface-container shadow-md-sm">
                {" "}
                <h3 className="text-lg font-bold mb-4 font-display text-md-on-surface">
                  {" "}
                  <Icon icon={I.scale} className="inline-block mr-2" />{t("langCompareGlobal") || "vs Promedio Global"}{" "}
                </h3>{" "}
                <div className="space-y-2">
                  {" "}
                  {userPosition.comparisonData?.slice(0, 6).map((item) => (
                    <div
                      key={item.name}
                      className="p-3 rounded-2xl bg-md-surface-container-low transition-all duration-300"
                    >
                      {" "}
                      <div className="flex items-center justify-between mb-2">
                        {" "}
                        <div className="flex items-center gap-2">
                          {" "}
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>{" "}
                          <span className="font-medium text-md-on-surface">
                            {" "}
                            {item.name}{" "}
                          </span>{" "}
                        </div>{" "}
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.comparison === "above" ? "bg-emerald-500/20 text-emerald-500" : item.comparison === "below" ? "bg-md-error/20 text-md-error" : "bg-md-surface-container text-md-on-surface-variant"}`}
                        >
                          {" "}
                          {item.comparison === "above"
                            ? t("langAbove") || "↑"
                            : item.comparison === "below"
                              ? t("langBelow") || "↓"
                              : "="}{" "}
                        </span>{" "}
                      </div>{" "}
                      <div className="flex items-center gap-4 text-sm">
                        {" "}
                        <div className="flex-1">
                          {" "}
                          <div className="flex justify-between mb-1">
                            {" "}
                            <span className="text-md-on-surface-variant">
                              Tú
                            </span>{" "}
                            <span className="font-medium text-md-primary">
                              {" "}
                              {item.userPercentage}%{" "}
                            </span>{" "}
                          </div>{" "}
                          <div className="h-1.5 bg-md-surface-container-low rounded-full overflow-hidden">
                            {" "}
                            <div
                              className="h-full bg-md-primary rounded-full"
                              style={{
                                width: `${Math.min(item.userPercentage, 100)}%`,
                              }}
                            ></div>{" "}
                          </div>{" "}
                        </div>{" "}
                        <div className="flex-1">
                          {" "}
                          <div className="flex justify-between mb-1">
                            {" "}
                            <span className="text-md-on-surface-variant">
                              Global
                            </span>{" "}
                            <span className="font-medium text-md-on-surface-variant">
                              {" "}
                              {item.globalPercentage}%{" "}
                            </span>{" "}
                          </div>{" "}
                          <div className="h-1.5 bg-md-surface-container-low rounded-full overflow-hidden">
                            {" "}
                            <div
                              className="h-full bg-md-on-surface-variant/30 rounded-full"
                              style={{
                                width: `${Math.min(item.globalPercentage, 100)}%`,
                              }}
                            ></div>{" "}
                          </div>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {userPosition.insights?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {" "}
                {userPosition.insights.map((insight, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:scale-[1.02] hover:shadow-md-md"
                  >
                    {" "}
                    <Icon icon={insight.icon} className="text-2xl mb-2 block" />{" "}
                    <h4 className="font-bold mb-1 text-md-on-surface">
                      {" "}
                      {insight.title}{" "}
                    </h4>{" "}
                    <p className="text-sm text-md-on-surface-variant">
                      {" "}
                      {insight.description}{" "}
                    </p>{" "}
                  </div>
                ))}{" "}
              </div>
            )}{" "}
          </div>
        )}{" "}
        {!hasUserData && (
          <div className="space-y-6">
            {" "}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {" "}
              <GlobalLanguagesChart
                languages={globalLanguages.slice(0, 10)}
                darkMode={darkMode}
                title={t("langMostPopular") || "Lenguajes Más Populares"}
              />{" "}
              <div className="space-y-4">
                {" "}
                <h3 className="text-lg font-bold font-display text-md-on-surface">
                  {" "}
                  <Icon icon={I.trophy} className="inline-block mr-2" />{t("langTop10") || "Top 10 Global"}{" "}
                </h3>{" "}
                <div className="space-y-2">
                  {" "}
                  {globalLanguages.slice(0, 10).map((lang, index) => (
                    <LanguageCard
                      key={lang.name}
                      language={lang}
                      rank={index + 1}
                      compact
                    />
                  ))}{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {" "}
              <div className="p-5 rounded-[24px] bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 transition-all duration-300">
                {" "}
                <Icon icon={I.fire} className="text-2xl mb-2 block" />{" "}
                <h4 className="font-bold text-lg text-emerald-500">
                  {" "}
                  {t("langTrending") || "Tendencias"}{" "}
                </h4>{" "}
                <p className="text-sm text-md-on-surface-variant">
                  {" "}
                  {categories.trending?.length || 0}{" "}
                  {t("langLanguages") || "lenguajes"}{" "}
                </p>{" "}
                <div className="mt-3 flex flex-wrap gap-1">
                  {" "}
                  {categories.trending?.slice(0, 3).map((lang) => (
                    <span
                      key={lang.name}
                      className="px-2 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-500"
                    >
                      {" "}
                      {lang.name}{" "}
                    </span>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
              <div className="p-5 rounded-[24px] bg-gradient-to-br from-violet-500/10 to-purple-600/10 border border-violet-500/20 transition-all duration-300">
                {" "}
                <Icon icon={I.diamond} className="text-2xl mb-2 block" />{" "}
                <h4 className="font-bold text-lg text-violet-400">
                  {" "}
                  {t("langEmerging") || "Emergentes"}{" "}
                </h4>{" "}
                <p className="text-sm text-md-on-surface-variant">
                  {" "}
                  {categories.emerging?.length || 0}{" "}
                  {t("langLanguages") || "lenguajes"}{" "}
                </p>{" "}
                <div className="mt-3 flex flex-wrap gap-1">
                  {" "}
                  {categories.emerging?.slice(0, 3).map((lang) => (
                    <span
                      key={lang.name}
                      className="px-2 py-1 text-xs rounded-full bg-violet-500/20 text-violet-400"
                    >
                      {" "}
                      {lang.name}{" "}
                    </span>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
              <div className="p-5 rounded-[24px] bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 transition-all duration-300">
                {" "}
                <Icon icon={I.chartBar} className="text-2xl mb-2 block" />{" "}
                <h4 className="font-bold text-lg text-blue-400">
                  {" "}
                  {t("langStable") || "Estables"}{" "}
                </h4>{" "}
                <p className="text-sm text-md-on-surface-variant">
                  {" "}
                  {categories.stable?.length || 0}{" "}
                  {t("langLanguages") || "lenguajes"}{" "}
                </p>{" "}
                <div className="mt-3 flex flex-wrap gap-1">
                  {" "}
                  {categories.stable?.slice(0, 3).map((lang) => (
                    <span
                      key={lang.name}
                      className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400"
                    >
                      {" "}
                      {lang.name}{" "}
                    </span>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
              <div className="p-5 rounded-[24px] bg-gradient-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/20 transition-all duration-300">
                {" "}
                <Icon icon={I.chartLine} className="text-2xl mb-2 block" />{" "}
                <h4 className="font-bold text-lg text-amber-400">
                  {" "}
                  {t("langDeclining") || "Declinando"}{" "}
                </h4>{" "}
                <p className="text-sm text-md-on-surface-variant">
                  {" "}
                  {categories.declining?.length || 0}{" "}
                  {t("langLanguages") || "lenguajes"}{" "}
                </p>{" "}
                <div className="mt-3 flex flex-wrap gap-1">
                  {" "}
                  {categories.declining?.slice(0, 3).map((lang) => (
                    <span
                      key={lang.name}
                      className="px-2 py-1 text-xs rounded-full bg-amber-500/20 text-amber-400"
                    >
                      {" "}
                      {lang.name}{" "}
                    </span>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        )}{" "}
      </div>
    );
  };
  return (
    <div className="p-5 sm:p-6 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300 animate-slide-up">
      {" "}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {" "}
        <div>
          {" "}
          <h2 className="text-2xl font-bold font-display text-md-on-surface">
            {" "}
            <Icon icon={I.chartBar} className="inline-block mr-2" />{t("langStatsTitle") || "Estadísticas de Lenguajes"}{" "}
          </h2>{" "}
          <p className="text-sm text-md-on-surface-variant">
            {" "}
            {hasUserData
              ? t("langStatsSubtitleUser") ||
                "Tu posición en el ecosistema de lenguajes"
              : t("langStatsSubtitleGlobal") ||
                "Los lenguajes más populares en GitHub"}{" "}
          </p>{" "}
        </div>{" "}
        <button
          onClick={refreshGlobal}
          className="px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 text-md-on-surface-variant hover:bg-md-primary/10 hover:text-md-primary"
        >
          {" "}
          <Icon icon={I.refresh} className="inline-block mr-2" />{t("refresh") || "Actualizar"}{" "}
        </button>{" "}
      </div>{" "}
      {renderContent()}{" "}
    </div>
  );
};
export default LanguagesStatsContainer;
