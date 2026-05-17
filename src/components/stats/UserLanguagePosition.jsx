import { useLanguage } from "../../hooks/useLanguage";
import { Icon, I } from "../../utils/icons";
const UserLanguagePosition = ({ userPosition, userLanguages = [] }) => {
  const { t } = useLanguage();
  const hasUserData = userLanguages?.length > 0;
  if (!hasUserData) {
    return (
      <div className="p-6 rounded-[24px] bg-md-surface-container text-center">
        {" "}
        <Icon icon={I.user} className="text-4xl mb-4 block mx-auto" />{" "}
        <h3 className="text-lg font-bold mb-2 font-display text-md-on-surface">
          {" "}
          {t("langNoUserData") || "No user language data"}{" "}
        </h3>{" "}
        <p className="text-sm text-md-on-surface-variant">
          {" "}
          {t("langNoUserDataDesc") ||
            "Search for a GitHub user to see your language position"}{" "}
        </p>{" "}
      </div>
    );
  }
  const { position, processedUserLanguages = [], insights = [] } = userPosition;
  return (
    <div className="space-y-6">
      {" "}
      {position && (
        <div className="p-6 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300">
          {" "}
          <div className="flex flex-col md:flex-row items-center gap-6">
            {" "}
            <div className="relative w-32 h-32 rounded-full flex items-center justify-center bg-md-primary text-md-on-primary shadow-md-md">
              {" "}
              <div className="text-center">
                {" "}
                <span className="text-4xl font-bold">
                  {" "}
                  #{position.rank || "N/A"}{" "}
                </span>{" "}
                <p className="text-xs text-md-on-primary/70 mt-1">
                  {" "}
                  {t("langGlobalRank") || "Global Rank"}{" "}
                </p>{" "}
              </div>{" "}
              {position.percentile && (
                <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center bg-md-background border-2 border-md-primary shadow-lg">
                  {" "}
                  <span className="text-xs font-bold text-md-primary">
                    {" "}
                    {position.percentile}%{" "}
                  </span>{" "}
                </div>
              )}{" "}
            </div>{" "}
            <div className="flex-1 text-center md:text-left">
              {" "}
              <h3 className="text-2xl font-bold mb-2 font-display text-md-on-surface">
                {" "}
                {t("langYourPosition") || "Your Position"}{" "}
              </h3>{" "}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {" "}
                <div className="px-4 py-2 rounded-full bg-md-surface-container-low">
                  {" "}
                  <p className="text-xs text-md-on-surface-variant">
                    {" "}
                    {t("langTotalLanguages") || "Total Languages"}{" "}
                  </p>{" "}
                  <p className="text-xl font-bold text-md-on-surface">
                    {" "}
                    {position.totalLanguages}{" "}
                  </p>{" "}
                </div>{" "}
                <div className="px-4 py-2 rounded-full bg-md-surface-container-low">
                  {" "}
                  <p className="text-xs text-md-on-surface-variant">
                    {" "}
                    {t("langPercentile") || "Percentile"}{" "}
                  </p>{" "}
                  <p className="text-xl font-bold text-md-on-surface">
                    {" "}
                    {position.percentile
                      ? `${position.percentile}%`
                      : "N/A"}{" "}
                  </p>{" "}
                </div>{" "}
                <div className="px-4 py-2 rounded-full bg-md-surface-container-low">
                  {" "}
                  <p className="text-xs text-md-on-surface-variant">
                    {" "}
                    {t("langTier") || "Tier"}{" "}
                  </p>{" "}
                  <p className="text-xl font-bold text-md-primary">
                    {" "}
                    {position.label || "N/A"}{" "}
                  </p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
      <div className="p-5 rounded-[24px] bg-md-surface-container shadow-md-sm">
        {" "}
        <h3 className="text-lg font-bold mb-4 font-display text-md-on-surface">
          {" "}
          <Icon icon={I.languages} className="inline-block mr-2" />{t("langYourLanguages") || "Your Languages"}{" "}
        </h3>{" "}
        <div className="space-y-3">
          {" "}
          {processedUserLanguages.slice(0, 8).map((lang, index) => (
            <div
              key={lang.name}
              className="flex items-center justify-between p-3 rounded-full bg-md-surface-container-low transition-all duration-300 hover:scale-[1.01] hover:bg-md-primary/10"
            >
              {" "}
              <div className="flex items-center gap-3">
                {" "}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? "bg-md-primary text-md-on-primary" : "bg-md-surface-container text-md-on-surface-variant"}`}
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
              <div className="flex items-center gap-4">
                {" "}
                <div className="text-right">
                  {" "}
                  <p className="text-sm font-medium text-md-on-surface-variant">
                    {" "}
                    {lang.percentage}%{" "}
                  </p>{" "}
                  <p className="text-xs text-md-on-surface-variant/60">
                    {" "}
                    {lang.formattedCount} repos{" "}
                  </p>{" "}
                </div>{" "}
                <div className="w-20 h-2 bg-md-surface-container-low rounded-full overflow-hidden">
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
          ))}{" "}
        </div>{" "}
      </div>{" "}
      {insights.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {" "}
          {insights.map((insight, index) => (
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
  );
};
export default UserLanguagePosition;
