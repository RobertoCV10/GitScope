import { useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import useGeminiAI from "../../hooks/useGeminiAI";
import { canShowAIInsights } from "../../utils/aiUtils";
import ProfileAnalysisCard from "./ProfileAnalysisCard";
import JobMarketCard from "./JobMarketCard";
import AILoadingState from "./AILoadingState";
import AIErrorState from "./AIErrorState";
import { Icon, I } from "../../utils/icons";
const AIInsightsPanel = ({ user, repos, analytics }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("profile");
  const {
    profileAnalysis,
    profileLoading,
    profileError,
    retryProfileAnalysis,
    jobMarketInsights,
    jobMarketLoading,
    jobMarketError,
    retryJobMarket,
    configured,
  } = useGeminiAI(user, repos, analytics, language);
  if (!canShowAIInsights(user, repos)) {
    return null;
  }
  if (!configured) {
    return (
      <div className="md-entrance" style={{ animationDelay: "500ms" }}>
        {" "}
        <div className="mb-6">
          {" "}
          <SectionHeader />{" "}
        </div>{" "}
        <AIErrorState type="config" />{" "}
      </div>
    );
  }
  const tabs = [
    {
      id: "profile",
      label: t("aiTabProfile") || "Profile Analysis",
      icon: I.ai,
      loading: profileLoading,
      hasError: !!profileError,
      hasData: !!profileAnalysis,
    },
    {
      id: "jobmarket",
      label: t("aiTabJobMarket") || "Job Market",
      icon: I.briefcase,
      loading: jobMarketLoading,
      hasError: !!jobMarketError,
      hasData: !!jobMarketInsights,
    },
  ];
  return (
    <div className="md-entrance" style={{ animationDelay: "500ms" }}>
      {" "}
      <div className="mb-6">
        {" "}
        <SectionHeader />{" "}
      </div>{" "}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {" "}
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            disabled={tab.loading}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] whitespace-nowrap ${activeTab === tab.id ? "bg-md-primary text-md-on-primary shadow-md-sm" : "text-md-on-surface-variant hover:text-md-on-surface hover:bg-md-primary/10"} ${tab.loading ? "opacity-60 cursor-wait" : "cursor-pointer"}`}
          >
            {" "}
            <Icon icon={tab.icon} className="text-lg" />{" "}
            <span className="hidden sm:inline">{tab.label}</span>{" "}
            {tab.loading && (
              <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            )}{" "}
            {tab.hasData && !tab.loading && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            )}{" "}
            {tab.hasError && !tab.loading && (
              <Icon icon={I.warning} className="text-md-error" />
            )}{" "}
          </button>
        ))}{" "}
      </div>{" "}
      <div className="min-h-[300px]">
        {" "}
        {activeTab === "profile" && (
          <>
            {" "}
            {profileLoading && <AILoadingState type="profile" />}{" "}
            {profileError && !profileLoading && (
              <AIErrorState
                type="profile"
                message={profileError}
                onRetry={retryProfileAnalysis}
              />
            )}{" "}
            {profileAnalysis && !profileLoading && (
              <ProfileAnalysisCard analysis={profileAnalysis} />
            )}{" "}
            {!profileLoading && !profileError && !profileAnalysis && (
              <AILoadingState type="profile" />
            )}{" "}
          </>
        )}{" "}
        {activeTab === "jobmarket" && (
          <>
            {" "}
            {jobMarketLoading && <AILoadingState type="jobmarket" />}{" "}
            {jobMarketError && !jobMarketLoading && (
              <AIErrorState
                type="jobmarket"
                message={jobMarketError}
                onRetry={retryJobMarket}
              />
            )}{" "}
            {jobMarketInsights && !jobMarketLoading && (
              <JobMarketCard insights={jobMarketInsights} />
            )}{" "}
            {!jobMarketLoading && !jobMarketError && !jobMarketInsights && (
              <AILoadingState type="jobmarket" />
            )}{" "}
          </>
        )}{" "}
      </div>{" "}
      <div className="mt-4 pt-3 border-t border-md-outline/20 text-[11px] leading-relaxed text-md-on-surface-variant">
        {" "}
        <span className="inline-flex items-center gap-1.5">
          {" "}
          <Icon icon={I.shield} /> <span>{t("aiPrivacyNotice")}</span>{" "}
        </span>{" "}
      </div>{" "}
    </div>
  );
};
const SectionHeader = () => {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-3">
      {" "}
      <div className="w-12 h-12 rounded-[16px] flex items-center justify-center text-2xl bg-md-primary text-md-on-primary shadow-md-sm">
        {" "}
        <Icon icon={I.brain} size="1.5em" />{" "}
      </div>{" "}
      <div>
        {" "}
        <h2 className="text-xl sm:text-2xl font-bold font-display text-md-on-surface">
          {" "}
          {t("aiSectionTitle") || "AI-Powered Insights"}{" "}
        </h2>{" "}
        <p className="text-sm text-md-on-surface-variant">
          {" "}
          {t("aiSectionSubtitle") || "Powered by Google Gemini 2.5 Flash"}{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
};
export default AIInsightsPanel;

