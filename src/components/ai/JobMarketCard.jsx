import { useLanguage } from "../../hooks/useLanguage";
import {
  getEmployabilityLevel,
  getScoreColor,
  generateId,
} from "../../utils/aiUtils";
import { Icon, I } from "../../utils/icons";
const JobMarketCard = ({ insights }) => {
  const { t, language } = useLanguage();
  if (!insights) return null;
  const {
    employability_score = 0,
    employability_explanation,
    current_roles = [],
    demand_level,
    competitive_advantages,
    salary_entry,
    salary_mid,
    salary_senior,
    salary_ceiling,
    salary_potential,
    salary_key_factor,
    top_demand_skills = [],
    skill_gaps = [],
    recommendations = [],
    timelines = [],
  } = insights;
  const level = getEmployabilityLevel(employability_score, language);
  const scoreColor = getScoreColor(employability_score);
  return (
    <div className="p-5 sm:p-6 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300 animate-slide-up">
      {" "}
      <div className="flex items-center gap-3 mb-6">
        {" "}
        <div className="w-10 h-10 rounded-[16px] flex items-center justify-center text-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md-sm">
          {" "}
          <Icon icon={I.briefcase} size="1.25em" />{" "}
        </div>{" "}
        <div>
          {" "}
          <h3 className="text-lg sm:text-xl font-bold font-display text-md-on-surface">
            {" "}
            {t("aiJobMarketTitle") || "Job Market Insights"}{" "}
          </h3>{" "}
          <p className="text-xs text-md-on-surface-variant">
            {" "}
            {t("aiJobMarketSubtitle") ||
              "Market analysis & salary estimates"}{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
      <div className="p-4 sm:p-5 rounded-2xl bg-md-surface-container-low mb-5">
        {" "}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {" "}
          <div className="relative flex-shrink-0">
            {" "}
            <svg
              className="w-28 h-28 transform -rotate-90"
              viewBox="0 0 120 120"
            >
              {" "}
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="var(--md-surface-container)"
                strokeWidth="10"
              />{" "}
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={scoreColor}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(employability_score / 100) * 339.292} 339.292`}
                className="transition-all duration-1000 ease-out"
              />{" "}
            </svg>{" "}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {" "}
              <span className="text-3xl font-bold font-display text-md-on-surface">
                {" "}
                {employability_score}{" "}
              </span>{" "}
              <span className={`text-xs font-medium ${level.textColor}`}>
                {" "}
                {level.label}{" "}
              </span>{" "}
            </div>{" "}
          </div>{" "}
          <div className="flex-1 text-center sm:text-left">
            {" "}
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2 ${level.bgColor} ${level.textColor} ${level.borderColor} border`}
            >
              {" "}
              <Icon icon={level.icon} /> <span>{level.label}</span>{" "}
            </div>{" "}
            {employability_explanation && (
              <p className="text-sm text-md-on-surface-variant">
                {" "}
                {employability_explanation}{" "}
              </p>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="space-y-5">
        {" "}
        {(current_roles.length > 0 || demand_level) && (
          <div className="p-4 sm:p-5 rounded-2xl bg-md-surface-container-low">
            {" "}
            <div className="flex items-center gap-2 text-base font-bold mb-3 text-md-on-surface">
              {" "}
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-base bg-md-primary/10 text-md-primary">
                <Icon icon={I.target} />
              </div>{" "}
              <span>{t("aiCurrentPosition") || "Market Position"}</span>{" "}
            </div>{" "}
            {current_roles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {" "}
                {current_roles.map((role) => (
                  <span
                    key={generateId()}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-md-primary-container text-md-on-primary-container"
                  >
                    {" "}
                    {role}{" "}
                  </span>
                ))}{" "}
              </div>
            )}{" "}
            {demand_level && (
              <p className="text-sm leading-relaxed text-md-on-surface-variant">
                {" "}
                <span className="font-semibold">
                  {t("aiDemandLevel") || "Demand:"}
                </span>{" "}
                {demand_level}{" "}
              </p>
            )}{" "}
            {competitive_advantages && (
              <p className="text-sm leading-relaxed text-md-on-surface-variant mt-2">
                {" "}
                <span className="font-semibold">
                  {t("aiAdvantages") || "Advantages:"}
                </span>{" "}
                {competitive_advantages}{" "}
              </p>
            )}{" "}
          </div>
        )}{" "}
        {(salary_entry || salary_mid || salary_senior) && (
          <div className="p-4 sm:p-5 rounded-2xl bg-md-surface-container-low">
            {" "}
            <div className="flex items-center gap-2 text-base font-bold mb-3 text-md-on-surface">
              {" "}
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-base bg-emerald-500/10 text-emerald-500">
                <Icon icon="mdi:currency-usd" />
              </div>{" "}
              <span>
                {t("aiSalaryEstimation") || "Salary Estimation (US Market)"}
              </span>{" "}
            </div>{" "}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {" "}
              {salary_entry && (
                <SalaryLevel
                  level={t("aiSalaryEntry") || "Entry"}
                  range={salary_entry}
                />
              )}{" "}
              {salary_mid && (
                <SalaryLevel
                  level={t("aiSalaryMid") || "Mid"}
                  range={salary_mid}
                  highlighted
                />
              )}{" "}
              {salary_senior && (
                <SalaryLevel
                  level={t("aiSalarySenior") || "Senior"}
                  range={salary_senior}
                />
              )}{" "}
            </div>{" "}
          </div>
        )}{" "}
        {(salary_ceiling || salary_potential) && (
          <div className="p-4 sm:p-5 rounded-2xl bg-md-surface-container-low">
            {" "}
            <div className="flex items-center gap-2 text-base font-bold mb-3 text-md-on-surface">
              {" "}
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-base bg-md-primary/10 text-md-primary">
                <Icon icon={I.chartLine} />
              </div>{" "}
              <span>
                {t("aiSalaryGrowth") || "Salary Growth Potential"}
              </span>{" "}
            </div>{" "}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {" "}
              {salary_ceiling && (
                <div className="p-3 rounded-2xl text-center bg-md-surface-container">
                  {" "}
                  <span className="text-xs text-md-on-surface-variant">
                    {" "}
                    {t("aiCurrentCeiling") || "Current Ceiling"}{" "}
                  </span>{" "}
                  <p className="text-lg font-bold font-display mt-1 text-md-on-surface">
                    {" "}
                    {salary_ceiling}{" "}
                  </p>{" "}
                </div>
              )}{" "}
              {salary_potential && (
                <div className="p-3 rounded-2xl text-center bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                  {" "}
                  <span className="text-xs text-emerald-500">
                    {" "}
                    {t("aiWithImprovements") || "With Improvements"}{" "}
                  </span>{" "}
                  <p className="text-lg font-bold mt-1 text-emerald-500">
                    {" "}
                    {salary_potential}{" "}
                  </p>{" "}
                </div>
              )}{" "}
            </div>{" "}
            {salary_key_factor && (
              <p className="text-sm leading-relaxed text-md-on-surface-variant mt-3">
                {" "}
                <span className="font-semibold">
                  {t("aiKeyFactor") || "Key factor:"}
                </span>{" "}
                {salary_key_factor}{" "}
              </p>
            )}{" "}
          </div>
        )}{" "}
        {top_demand_skills.length > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-md-surface-container-low">
            {" "}
            <div className="flex items-center gap-2 text-base font-bold mb-3 text-md-on-surface">
              {" "}
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-base bg-cyan-500/10 text-cyan-500">
                <Icon icon={I.fire} />
              </div>{" "}
              <span>{t("aiDemandSkills") || "In-Demand Skills"}</span>{" "}
            </div>{" "}
            <div className="flex flex-wrap gap-2">
              {" "}
              {top_demand_skills.map((skill) => (
                <span
                  key={generateId()}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-500"
                >
                  {" "}
                  {skill}{" "}
                </span>
              ))}{" "}
            </div>{" "}
          </div>
        )}{" "}
        {skill_gaps.length > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-md-surface-container-low">
            {" "}
            <div className="flex items-center gap-2 text-base font-bold mb-3 text-md-on-surface">
              {" "}
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-base bg-md-error/10 text-md-error">
                <Icon icon={I.warning} />
              </div>{" "}
              <span>
                {t("aiSkillGaps") || "Skill Gaps Affecting Salary"}
              </span>{" "}
            </div>{" "}
            <ul className="space-y-2">
              {" "}
              {skill_gaps.map((gap) => (
                <li
                  key={generateId()}
                  className="flex items-start gap-2 p-3 rounded-2xl text-sm bg-md-error/5"
                >
                  {" "}
                  <span className="flex-shrink-0 mt-0.5">•</span>{" "}
                  <span className="text-md-on-surface-variant">{gap}</span>{" "}
                </li>
              ))}{" "}
            </ul>{" "}
          </div>
        )}{" "}
        {recommendations.length > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-md-surface-container-low">
            {" "}
            <div className="flex items-center gap-2 text-base font-bold mb-3 text-md-on-surface">
              {" "}
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-base bg-md-primary/10 text-md-primary">
                <Icon icon={I.lightbulb} />
              </div>{" "}
              <span>
                {t("aiMarketRecommendations") ||
                  "Recommendations to Increase Value"}
              </span>{" "}
            </div>{" "}
            <ul className="space-y-2">
              {" "}
              {recommendations.map((rec, index) => (
                <li
                  key={generateId()}
                  className="flex items-start gap-2.5 p-3 rounded-2xl text-sm transition-all duration-200 hover:translate-x-1 bg-md-surface-container hover:bg-md-primary/10"
                >
                  {" "}
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                    {" "}
                    {index + 1}{" "}
                  </span>{" "}
                  <div className="flex-1">
                    {" "}
                    <p className="text-md-on-surface-variant">{rec}</p>{" "}
                    {timelines[index] && (
                      <p className="text-xs mt-1 text-md-on-surface-variant/60">
                        {" "}
                        <Icon icon="mdi:timer-outline" className="inline-block mr-1" /> {timelines[index]}{" "}
                      </p>
                    )}{" "}
                  </div>{" "}
                </li>
              ))}{" "}
            </ul>{" "}
          </div>
        )}{" "}
      </div>{" "}
      <div className="mt-5 pt-4 border-t border-md-outline/20 text-xs text-md-on-surface-variant">
        {" "}
        {t("aiGeneratedDisclaimer") ||
          "These insights are AI-generated and may not reflect actual capabilities. Use as guidance."}{" "}
      </div>{" "}
    </div>
  );
};
const SalaryLevel = ({ level, range, highlighted = false }) => {
  if (highlighted) {
    return (
      <div className="relative p-3 rounded-2xl text-center bg-gradient-to-br from-md-primary/10 to-md-primary/10 border border-md-primary/20">
        {" "}
        <span className="text-xs text-md-primary font-semibold">
          {level}
        </span>{" "}
        <p className="text-base font-bold font-display mt-1 text-md-primary">
          {" "}
          {range}{" "}
        </p>{" "}
        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-md-primary flex items-center justify-center text-white text-[10px] shadow-md-sm">
          {" "}
          <Icon icon={I.star} size="0.8em" />{" "}
        </div>{" "}
      </div>
    );
  }
  return (
    <div className="p-3 rounded-2xl text-center bg-md-surface-container">
      {" "}
      <span className="text-xs text-md-on-surface-variant"> {level} </span>{" "}
      <p className="text-base font-bold font-display mt-1 text-md-on-surface">
        {" "}
        {range}{" "}
      </p>{" "}
    </div>
  );
};
export default JobMarketCard;
