import { useMemo } from "react";
import {
  generateTimelineEvents,
  groupEventsByYear,
  calculateTimelineStats,
  EVENT_TYPES,
} from "../utils/timelineUtils";
const useActivityTimeline = (user, repos, userEvents, language = "es") => {
  const timelineData = useMemo(() => {
    const eventTypes = EVENT_TYPES;
    if (!user) {
      return {
        events: [],
        groupedEvents: [],
        stats: {
          totalEvents: 0,
          milestones: 0,
          accountAge: 0,
          totalStars: 0,
          totalForks: 0,
          topRepo: null,
        },
        eventTypes: eventTypes,
        hasData: false,
      };
    }
    const generatedEvents = generateTimelineEvents(
      user,
      repos,
      userEvents,
      language,
    );
    const groupedEvents = groupEventsByYear(generatedEvents);
    const stats = calculateTimelineStats(generatedEvents, user);
    return {
      events: generatedEvents,
      groupedEvents,
      stats,
      eventTypes: eventTypes,
      hasData: generatedEvents.length > 0,
    };
  }, [user, repos, userEvents, language]);
  return timelineData;
};
export default useActivityTimeline;
export { EVENT_TYPES };
