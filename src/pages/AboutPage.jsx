import { useLanguage } from "../hooks/useLanguage";
import { Icon, I } from "../utils/icons";

const highlights = [
  { icon: I.magnify, key: "aboutDesc1" },
  { icon: I.chartBar, key: "aboutDesc2" },
];

const howItWorks = [
  { icon: I.github, key: "aboutHow1" },
  { icon: I.chartLine, key: "aboutHow2" },
  { icon: I.lightning, key: "aboutHow3" },
  { icon: I.clock, key: "aboutHow4" },
];

const AboutPage = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-4">
      {highlights.map((h, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-3.5 rounded-xl bg-md-surface-container-low border border-md-outline/10"
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-md-primary/10 text-md-primary flex-shrink-0 mt-0.5">
            <Icon icon={h.icon} size="1.1em" />
          </div>
          <p className="text-sm text-md-on-surface leading-relaxed">{t(h.key)}</p>
        </div>
      ))}
      <h2 className="text-base font-bold font-display text-md-on-surface flex items-center gap-2 pt-1">
        <Icon icon={I.hammer} size="1.1em" className="text-md-primary" />
        {t("aboutHow")}
      </h2>
      <div className="grid gap-2">
        {howItWorks.map((h, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-lg bg-md-surface-container-low border border-md-outline/10"
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-md-tertiary/10 text-md-tertiary flex-shrink-0">
              <Icon icon={h.icon} size="0.9em" />
            </div>
            <p className="text-xs text-md-on-surface-variant">{t(h.key)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
