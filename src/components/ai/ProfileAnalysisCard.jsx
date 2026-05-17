import { useLanguage } from "../../hooks/useLanguage";
import { generateId } from "../../utils/aiUtils";
import { Icon, I } from "../../utils/icons";
const ProfileAnalysisCard = ({ analysis }) => {
  const { t } = useLanguage();
  if (!analysis) return null;
  const { strengths, growth_areas, unique_value, recommendations } = analysis;
  const SectionHeading = ({ bgGradient, icon, text }) => (
    <div className="flex items-center gap-2 text-base font-bold mb-3 text-md-on-surface">
      {" "}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0 ${bgGradient}`}
      >
        {" "}
        <Icon icon={icon} />{" "}
      </div>{" "}
      <span>{text}</span>{" "}
    </div>
  );
  return (
    <div className="p-5 sm:p-6 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300 animate-slide-up">
      {" "}
      <div className="flex items-center gap-3 mb-6">
        {" "}
        <div className="w-10 h-10 rounded-[16px] flex items-center justify-center text-xl bg-md-primary text-md-on-primary shadow-md-sm">
          {" "}
          <Icon icon={I.ai} size="1.25em" />{" "}
        </div>{" "}
        <div>
          {" "}
          <h3 className="text-lg sm:text-xl font-bold font-display text-md-on-surface">
            {" "}
            {t("aiProfileTitle") || "Profile Analysis"}{" "}
          </h3>{" "}
          <p className="text-xs text-md-on-surface-variant">
            {" "}
            {t("aiProfileSubtitle") ||
              "AI-powered analysis of your GitHub profile"}{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
      <div className="space-y-5">
        {" "}
        {strengths && (
          <div className="p-4 sm:p-5 rounded-2xl bg-md-surface-container-low">
            {" "}
            <SectionHeading
              bgGradient="from-emerald-500 to-teal-500"
              icon={I.armFlex}
              text={t("aiStrengths") || "Strengths"}
            />{" "}
            <p className="text-sm leading-relaxed text-md-on-surface-variant">
              {strengths}
            </p>{" "}
          </div>
        )}{" "}
        {growth_areas && (
          <div className="p-4 sm:p-5 rounded-2xl bg-md-surface-container-low">
            {" "}
            <SectionHeading
              bgGradient="from-amber-500 to-orange-500"
              icon={I.chartLine}
              text={t("aiGrowthAreas") || "Growth Areas"}
            />{" "}
            <p className="text-sm leading-relaxed text-md-on-surface-variant">
              {growth_areas}
            </p>{" "}
          </div>
        )}{" "}
        {unique_value && (
          <div className="p-4 sm:p-5 rounded-2xl bg-md-surface-container-low">
            {" "}
            <SectionHeading
              bgGradient="from-primary-500 to-primary-600"
              icon={I.diamond}
              text={t("aiUniqueValue") || "Unique Value"}
            />{" "}
            <p className="text-sm leading-relaxed text-md-on-surface-variant">
              {unique_value}
            </p>{" "}
          </div>
        )}{" "}
        {recommendations && recommendations.length > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-md-surface-container-low">
            {" "}
            <SectionHeading
              bgGradient="from-cyan-500 to-blue-500"
              icon={I.lightbulb}
              text={t("aiRecommendations") || "Recommendations"}
            />{" "}
            <ul className="space-y-2">
              {" "}
              {recommendations.map((rec, index) => (
                <li
                  key={generateId()}
                  className="flex items-start gap-2.5 p-3 rounded-2xl text-sm transition-all duration-200 hover:translate-x-1 bg-md-surface-container hover:bg-md-primary/10"
                >
                  {" "}
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-md-primary text-md-on-primary">
                    {" "}
                    {index + 1}{" "}
                  </span>{" "}
                  <span className="flex-1 text-md-on-surface-variant mt-0.5">
                    {rec}
                  </span>{" "}
                </li>
              ))}{" "}
            </ul>{" "}
          </div>
        )}{" "}
      </div>{" "}
      <div className="mt-5 pt-4 border-t border-md-outline/20 text-xs text-md-on-surface-variant">
        {" "}
        {t("aiGeneratedDisclaimer") ||
          "AI-generated analysis based on public GitHub data."}{" "}
      </div>{" "}
    </div>
  );
};
export default ProfileAnalysisCard;
