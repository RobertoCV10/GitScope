import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { sanitizeSearchInput } from "../utils/security";
import VsSearchBar from "../components/comparison/VsSearchBar";
import VsUserCard from "../components/comparison/VsUserCard";
import VsMetricsTable from "../components/comparison/VsMetricsTable";
import VsHead2Head from "../components/comparison/VsHead2Head";
import VsRadarChart from "../components/comparison/VsRadarChart";
import LoadingSpinner from "../components/common/LoadingSpinner";
import useVsComparison from "../hooks/useVsComparison";
import { Icon, I } from "../utils/icons";
const VsPage = ({ onBack }) => {
  const { t } = useLanguage();
  const {
    user1,
    user2,
    loading,
    loadingUser1,
    loadingUser2,
    error,
    compare,
    clearComparison,
  } = useVsComparison();
  const [comparisonData, setComparisonData] = useState(null);
  const [initialSearchDone, setInitialSearchDone] = useState(false);
  const handleCompare = useCallback(
    async (username1, username2) => {
      setInitialSearchDone(true);
      const result = await compare(username1, username2);
      setComparisonData(result);
    },
    [compare],
  );
  const handleReset = useCallback(() => {
    clearComparison();
    setComparisonData(null);
    setInitialSearchDone(false);
  }, [clearComparison]);
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.pathname + window.location.search,
    );
    const rawU1 = params.get("u1");
    const rawU2 = params.get("u2");
    if (rawU1 && rawU2 && !initialSearchDone) {
      const safeU1 = sanitizeSearchInput(rawU1);
      const safeU2 = sanitizeSearchInput(rawU2);
      if (safeU1.safe && safeU2.safe) {
        handleCompare(safeU1.sanitized, safeU2.sanitized);
      }
    }
  }, [initialSearchDone, handleCompare]);
  const handleShare = () => {
    if (user1 && user2) {
      const url = `${window.location.origin}${window.location.pathname}?u1=${user1.login}&u2=${user2.login}&mode=vs`;
      navigator.clipboard.writeText(url);
      alert(t("vsShareCopied") || "Link copied to clipboard!");
    }
  };
  return (
    <div className="animate-fade-in">
      {" "}
      <div className="mb-6">
        {" "}
        <button
          onClick={onBack}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] active:scale-95 bg-md-surface-container text-md-on-surface-variant hover:text-md-on-surface hover:bg-md-primary/10 border border-md-outline/20"
        >
          {" "}
          <span className="text-lg group-hover:-translate-x-1 transition-transform duration-300">
            ←
          </span>{" "}
          <span>{t("vsBack") || "Back to Dashboard"}</span>{" "}
        </button>{" "}
      </div>{" "}
      <div className="text-center mb-8">
        {" "}
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-md-on-surface">
          {" "}
          <Icon icon={I.swordCross} className="inline-block mr-2" /> VS Mode{" "}
        </h1>{" "}
        <p className="mt-2 text-base text-md-on-surface-variant">
          {" "}
          {t("vsSubtitle")}{" "}
        </p>{" "}
      </div>{" "}
      <div className="mb-8">
        {" "}
        <VsSearchBar onCompare={handleCompare} loading={loading} />{" "}
      </div>{" "}
      {error && (
        <div className="mb-6 p-5 rounded-[24px] bg-md-error/10 border border-md-error/30">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <Icon icon={I.alert} className="text-2xl" />{" "}
            <p className="text-md-error font-medium">{error}</p>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {loading && (
        <div className="py-16">
          {" "}
          <LoadingSpinner size="lg" text={t("loadingUser")} />{" "}
        </div>
      )}{" "}
      {comparisonData && !loading && (
        <div className="space-y-6">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {" "}
            <VsUserCard
              user={comparisonData.user1}
              metrics={comparisonData.metrics1}
              isWinner={
                comparisonData.scores.user1Score >
                comparisonData.scores.user2Score
              }
              position="left"
              loading={loadingUser1}
            />{" "}
            <VsUserCard
              user={comparisonData.user2}
              metrics={comparisonData.metrics2}
              isWinner={
                comparisonData.scores.user2Score >
                comparisonData.scores.user1Score
              }
              position="right"
              loading={loadingUser2}
            />{" "}
          </div>{" "}
          <VsHead2Head
            scores={comparisonData.scores}
            user1={comparisonData.user1}
            user2={comparisonData.user2}
            insights={comparisonData.insights}
          />{" "}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {" "}
            <VsRadarChart radarData={comparisonData.radarData} />{" "}
            <div className="p-5 sm:p-6 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300">
              {" "}
              <h3 className="text-lg sm:text-xl font-bold font-display mb-4 text-md-on-surface">
                {" "}
                <Icon icon={I.languages} className="inline-block mr-2" />{t("vsLanguages") || "Languages"}{" "}
              </h3>{" "}
              {comparisonData.commonLanguages?.length > 0 && (
                <div className="mb-4">
                  {" "}
                  <h4 className="text-sm font-semibold mb-2 text-md-on-surface-variant">
                    {" "}
                    {t("vsCommonLanguages") || "Common Languages"}{" "}
                  </h4>{" "}
                  <div className="flex flex-wrap gap-2">
                    {" "}
                    {comparisonData.commonLanguages.map((lang) => (
                      <span
                        key={lang}
                        className="px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-500"
                      >
                        {" "}
                        {lang}{" "}
                      </span>
                    ))}{" "}
                  </div>{" "}
                </div>
              )}{" "}
              <div className="grid grid-cols-2 gap-4">
                {" "}
                <div>
                  {" "}
                  <h4 className="text-sm font-semibold mb-2 text-md-primary">
                    {" "}
                    {comparisonData.user1?.login}{" "}
                  </h4>{" "}
                  <div className="flex flex-wrap gap-2">
                    {" "}
                    {comparisonData.uniqueLangs1?.slice(0, 5).map((lang) => (
                      <span
                        key={lang}
                        className="px-2.5 py-1 rounded-full text-xs bg-md-surface-container-low text-md-on-surface-variant"
                      >
                        {" "}
                        {lang}{" "}
                      </span>
                    ))}{" "}
                  </div>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h4 className="text-sm font-semibold mb-2 text-md-tertiary">
                    {" "}
                    {comparisonData.user2?.login}{" "}
                  </h4>{" "}
                  <div className="flex flex-wrap gap-2">
                    {" "}
                    {comparisonData.uniqueLangs2?.slice(0, 5).map((lang) => (
                      <span
                        key={lang}
                        className="px-2.5 py-1 rounded-full text-xs bg-md-surface-container-low text-md-on-surface-variant"
                      >
                        {" "}
                        {lang}{" "}
                      </span>
                    ))}{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <VsMetricsTable
            comparison={comparisonData.comparison}
            metrics1={comparisonData.metrics1}
            metrics2={comparisonData.metrics2}
          />{" "}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {" "}
            <button
              onClick={handleShare}
              className="h-11 px-6 rounded-full font-medium transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] active:scale-95 bg-md-primary text-md-on-primary hover:bg-md-primary/90"
            >
              {" "}
              <Icon icon={I.link} className="inline-block mr-2" />{t("vsShare") || "Share Comparison"}{" "}
            </button>{" "}
            <button
              onClick={handleReset}
              className="h-11 px-6 rounded-full font-medium text-sm transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] active:scale-95 text-md-on-surface-variant hover:text-md-on-surface hover:bg-md-primary/10"
            >
              {" "}
              {t("vsNewComparison") || "Start New Comparison"}{" "}
            </button>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {!comparisonData && !loading && !error && (
        <div className="text-center py-16">
          {" "}
          <div className="text-7xl mb-6"><Icon icon={I.swordCross} /></div>{" "}
          <h2 className="text-2xl sm:text-3xl font-bold font-display mb-4 text-md-on-surface">
            {" "}
            {t("vsReady") || "Ready to Battle"}{" "}
          </h2>{" "}
          <p className="text-lg max-w-md mx-auto text-md-on-surface-variant">
            {" "}
            {t("vsEmptyDesc") ||
              "Enter two GitHub usernames above to compare their profiles!"}{" "}
          </p>{" "}
        </div>
      )}{" "}
    </div>
  );
};
export default VsPage;


