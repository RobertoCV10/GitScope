import { useMemo } from "react";
import {
  calculateLanguages,
  calculateTopRepos,
  calculateActivityTimeline,
  calculateWeekdayActivity,
  generateInsights,
} from "../utils/analytics";
const useAnalytics = (repos, events, language = "es") => {
  const analytics = useMemo(() => {
    if (!repos?.length) {
      return {
        languages: [],
        topRepos: [],
        activityTimeline: [],
        weekdayActivity: [],
        insights: [],
      };
    }
    const languages = calculateLanguages(repos);
    const topRepos = calculateTopRepos(repos, 5);
    const activityTimeline = calculateActivityTimeline(repos, language);
    const weekdayActivity = calculateWeekdayActivity(events, language);
    const insights = generateInsights(repos, events, language, languages);
    return { languages, topRepos, activityTimeline, weekdayActivity, insights };
  }, [repos, events, language]);
  return analytics;
};
export default useAnalytics;
