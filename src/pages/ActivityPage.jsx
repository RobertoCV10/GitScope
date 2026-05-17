import { useLanguage } from "../hooks/useLanguage";
import ContributionsHeatmap from "../components/charts/ContributionsHeatmap";
import WeekdayActivity from "../components/charts/WeekdayActivity";
import ActivityTimeline from "../components/stats/ActivityTimeline";
import { Icon, I } from "../utils/icons";
const ActivityPage = ({ user, repos, events, analytics, darkMode }) => {
  const { t } = useLanguage();
  const hasEvents = events?.length > 0;
  if (!hasEvents) {
    return (
      <div className="space-y-6 animate-fade-in">
        {" "}
        <h2 className="text-2xl font-bold font-display text-md-on-surface">
          {" "}
          <Icon icon={I.activity} className="inline-block mr-2" />{t("navActivity")}{" "}
        </h2>{" "}
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
  return (
    <div className="space-y-6 animate-fade-in">
      {" "}
      <h2 className="text-2xl font-bold font-display text-md-on-surface">
        {" "}
        <Icon icon={I.activity} className="inline-block mr-2" />{t("navActivity")}{" "}
      </h2>{" "}
      <div className="animate-slide-up stagger-1">
        {" "}
        <ContributionsHeatmap events={events} darkMode={darkMode} />{" "}
      </div>{" "}
      <div className="animate-slide-up stagger-2">
        {" "}
        <WeekdayActivity
          data={analytics.weekdayActivity}
          darkMode={darkMode}
        />{" "}
      </div>{" "}
      <div className="animate-slide-up stagger-3">
        {" "}
                <ActivityTimeline
          user={user}
          repos={repos}
          events={events}
        /> {" "}
      </div>{" "}
    </div>
  );
};
export default ActivityPage;
