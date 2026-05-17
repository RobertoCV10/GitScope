import React, { useState, useEffect } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import useActivityTimeline, {
  EVENT_TYPES,
} from "../../hooks/useActivityTimeline";
import { Icon, I } from "../../utils/icons";

const TimelineEvent = ({ event, isLast, onClick, animationDelay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();
  const eventType = event.type;

  const getLabel = () => {
    const labels = {
      account_anniversary: t("timelineAccountAnniversary"),
      first_repo: t("timelineFirstRepo"),
      milestone_stars: t("timelineMilestoneStars"),
      milestone_followers: t("timelineMilestoneFollowers"),
      first_contribution: t("timelineFirstContribution"),
      trending_repo: t("timelineTrendingRepo"),
      popular_pr: t("timelinePopularPR"),
      fork_milestone: t("timelineForkMilestone"),
      repo_created: t("timelineRepoCreated"),
      org_join: t("timelineOrgJoin"),
      year_review: t("timelineYearReview"),
    };
    return labels[eventType.id] || eventType.label;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className={`relative flex gap-4 transition-all duration-300 cursor-pointer ${animationDelay ? "md-entrance" : ""}`}
      style={{
        animationDelay: `${animationDelay || 0}ms`,
        animationFillMode: "both",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick && onClick(event)}
    >
      {" "}
      {/* SOLUCIÓN: Agregado padding-right y z-index apropiado */}
      <div className="relative flex-shrink-0 flex items-center justify-center" style={{ width: "3rem", minWidth: "3rem", paddingRight: event.isMilestone ? "0.75rem" : "0" }}>
        {" "}
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md-md transition-all duration-300 flex items-center justify-center relative`}
          style={{
            background: `linear-gradient(135deg, ${eventType.color}40, ${eventType.color}80)`,
          }}
        >
          {" "}
          <span className="text-2xl flex items-center justify-center">
            <Icon icon={eventType.icon} className="text-2xl" />
          </span>{" "}
          {event.isMilestone && (
            <div className="absolute -top-1 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center animate-bounce-soft shadow-md-sm z-10">
              {" "}
              <Icon icon={I.sparkles} className="text-xs" />{" "}
            </div>
          )}{" "}
        </div>{" "}
        {!isLast && (
          <div
            className="absolute top-14 left-1/2 w-0.5 -translate-x-1/2 min-h-[60px]"
            style={{
              background: `linear-gradient(to bottom, ${eventType.color}60, ${eventType.color}20)`,
              display: "none" // Oculta la línea
            }}
          />
        )}{" "}
      </div>{" "}
      <div className={`flex-1 pb-6 overflow-hidden ${isLast ? "pb-0" : ""}`}>
        {" "}
        <div
          className={`p-4 sm:p-5 rounded-[24px] transition-all duration-300 bg-md-surface-container-low ${isHovered ? "shadow-md-md" : "shadow-md-sm"}`}
        >
          {" "}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {" "}
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-md-surface-container text-md-on-surface-variant">
              {" "}
              {formatDate(event.date)}{" "}
            </span>{" "}
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: `${eventType.color}20`,
                color: eventType.color,
              }}
            >
              {" "}
              {getLabel()}{" "}
            </span>{" "}
          </div>{" "}
          <h4 className="text-base sm:text-lg font-bold font-display mb-1 text-md-on-surface">
            {" "}
            {event.title}{" "}
          </h4>{" "}
          <p className="text-sm text-md-on-surface-variant">
            {" "}
            {event.description}{" "}
          </p>{" "}
          <div
            className={`mt-3 pt-3 border-t transition-all duration-300 border-md-outline/20`}
            style={{
              maxHeight: isHovered && event.metadata ? "200px" : "0",
              opacity: isHovered && event.metadata ? 1 : 0,
              overflow: "hidden",
            }}
          >
            {" "}
            <div className="flex flex-wrap gap-2">
              {" "}
              {event.metadata &&
                Object.entries(event.metadata).map(([key, value]) => (
                  <span
                    key={key}
                    className="text-xs px-2.5 py-1 rounded-full bg-md-surface-container text-md-on-surface-variant"
                  >
                    {" "}
                    {key}: {value}{" "}
                  </span>
                ))}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

const YearSection = ({ year, events, isExpanded, onToggle, groupIndex }) => {
  useLanguage();
  const eventCount = events.length;
  const milestoneCount = events.filter((e) => e.isMilestone).length;

  return (
    <div className="mb-2">
      {" "}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 sm:p-4 rounded-full transition-all duration-300 bg-md-surface-container-low hover:bg-md-primary/10"
      >
        {" "}
        <div className="flex items-center gap-3">
          {" "}
          <div className="px-3 sm:px-4 py-1.5 rounded-full text-sm font-bold bg-md-primary text-md-on-primary shadow-md-sm">
            {" "}
            {year}{" "}
          </div>{" "}
          <span className="text-sm text-md-on-surface-variant">
            {" "}
            {eventCount} {eventCount === 1 ? "event" : "events"}{" "}
            {milestoneCount > 0 && (
              <span className="ml-2 text-amber-500">
                • {milestoneCount} milestones
              </span>
            )}{" "}
          </span>{" "}
        </div>{" "}
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 bg-md-surface-container ${isExpanded ? "rotate-180" : ""}`}
        >
          {" "}
          <svg
            className="w-4 h-4 text-md-on-surface-variant"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />{" "}
          </svg>{" "}
        </div>{" "}
      </button>{" "}
      <div
        className={`        overflow-hidden transition-all duration-500 ease-in-out        ${isExpanded ? "max-h-[2000px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"}      `}
      >
        {" "}
        <div className="space-y-2 pl-2 sm:pl-4">
          {" "}
          {events.map((event, eventIndex) => (
            <TimelineEvent
              key={event.id}
              event={event}
              isLast={eventIndex === events.length - 1}
              animationDelay={
                isExpanded ? groupIndex * 100 + eventIndex * 50 + 1 : 0
              }
            />
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

const TimelineStats = ({ stats }) => {
  const { t } = useLanguage();
  if (!stats || stats.totalEvents === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5 p-4 sm:p-5 rounded-[24px] bg-md-surface-container-low">
      {" "}
      <div className="text-center p-3 rounded-full bg-md-surface-container">
        {" "}
        <div className="text-2xl sm:text-3xl font-bold text-md-on-surface">
          {" "}
          {stats.accountAge}{" "}
        </div>{" "}
        <div className="text-xs mt-1 text-md-on-surface-variant">
          {" "}
          {t("timelineAccountAge")} ({t("timelineYears")}){" "}
        </div>{" "}
      </div>{" "}
      <div className="text-center p-3 rounded-full bg-md-surface-container">
        {" "}
        <div className="text-2xl sm:text-3xl font-bold text-md-on-surface">
          {" "}
          {stats.totalEvents}{" "}
        </div>{" "}
        <div className="text-xs mt-1 text-md-on-surface-variant">
          {" "}
          {t("timelineTotalEvents")}{" "}
        </div>{" "}
      </div>{" "}
      <div className="text-center p-3 rounded-full bg-md-surface-container">
        {" "}
        <div className="text-2xl sm:text-3xl font-bold text-amber-500">
          {" "}
          {stats.milestones}{" "}
        </div>{" "}
        <div className="text-xs mt-1 text-md-on-surface-variant">
          {" "}
          {t("timelineMilestones")}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

const TimelineLegend = () => {
  const { t } = useLanguage();
  const legendItems = [
    { key: "account_anniversary", label: t("timelineAccountAnniversary") },
    { key: "first_repo", label: t("timelineFirstRepo") },
    { key: "milestone_stars", label: t("timelineMilestoneStars") },
    { key: "milestone_followers", label: t("timelineMilestoneFollowers") },
    { key: "first_contribution", label: t("timelineFirstContribution") },
    { key: "trending_repo", label: t("timelineTrendingRepo") },
    { key: "repo_created", label: t("timelineRepoCreated") },
  ];

  return (
    <div className="mt-5 p-4 sm:p-5 rounded-[24px] bg-md-surface-container-low">
      {" "}
      <h4 className="text-sm font-semibold mb-3 text-md-on-surface-variant">
        {" "}
        {t("timelineLegend")}{" "}
      </h4>{" "}
      <div className="flex flex-wrap gap-3 sm:gap-4">
        {" "}
        {legendItems.map((item) => {
          const type = Object.values(EVENT_TYPES).find(
            (e) => e.id === item.key,
          );
          if (!type) return null;
          return (
            <div key={item.key} className="flex items-center gap-2">
              {" "}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-sm shadow-md-sm"
                style={{ backgroundColor: `${type.color}30` }}
              >
                <Icon icon={type.icon} className="text-sm" />
              </div>{" "}
              <span className="text-xs text-md-on-surface-variant">
                {" "}
                {item.label}{" "}
              </span>{" "}
            </div>
          );
        })}{" "}
      </div>{" "}
    </div>
  );
};

const ActivityTimeline = ({ user, repos, events }) => {
  const { t, language } = useLanguage();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [expandedYears, setExpandedYears] = useState({});
  const timelineData = useActivityTimeline(user, repos, events, language);

  useEffect(() => {
    if (timelineData.groupedEvents.length > 0) {
      const initialState = {};
      timelineData.groupedEvents.forEach((group, index) => {
        initialState[group.year] = index === 0;
      });
      setExpandedYears(initialState);
    }
  }, [timelineData.groupedEvents]);

  const toggleYear = (year) => {
    setExpandedYears((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  const expandAll = () => {
    const allExpanded = {};
    timelineData.groupedEvents.forEach((group) => {
      allExpanded[group.year] = true;
    });
    setExpandedYears(allExpanded);
  };

  const collapseAll = () => {
    const allCollapsed = {};
    timelineData.groupedEvents.forEach((group) => {
      allCollapsed[group.year] = false;
    });
    setExpandedYears(allCollapsed);
  };

  const allExpanded = timelineData.groupedEvents.every(
    (group) => expandedYears[group.year] === true,
  );

  const allCollapsed = timelineData.groupedEvents.every(
    (group) => expandedYears[group.year] === false,
  );

  if (!user) {
    return null;
  }

  const { groupedEvents, stats, hasData } = timelineData;

  if (!hasData) {
    return (
      <div className="p-5 sm:p-6 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300">
        {" "}
        <h3 className="text-lg sm:text-xl font-bold mb-4 font-display text-md-on-surface">
          {" "}
          <Icon icon={I.clock} className="inline-block mr-2" />{t("timelineTitle")}{" "}
        </h3>{" "}
        <div className="h-32 flex items-center justify-center text-md-on-surface-variant">
          {" "}
          {t("timelineNoEvents")}{" "}
        </div>{" "}
      </div>
    );
  }

  return (
    <div className="pt-7 sm:pt-9 pb-5 sm:pb-6 px-5 sm:px-6 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300">
      {" "}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        {" "}
        <div>
          {" "}
          <h3 className="text-lg sm:text-xl font-bold font-display text-md-on-surface">
            {" "}
            <Icon icon={I.clock} className="inline-block mr-2" />{t("timelineTitle")}{" "}
          </h3>{" "}
          <p className="text-sm mt-1 text-md-on-surface-variant">
            {" "}
            {t("timelineSubtitle")}{" "}
          </p>{" "}
        </div>{" "}
        <div className="flex gap-2">
          {" "}
          <button
            onClick={expandAll}
            disabled={allExpanded}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] active:scale-95 ${allExpanded ? "opacity-50 cursor-not-allowed bg-md-surface-container-low text-md-on-surface-variant" : "bg-md-primary text-md-on-primary hover:bg-md-primary/90"}`}
          >
            {" "}
            ▼ {language === "en" ? "Expand" : "Expandir"}{" "}
          </button>{" "}
          <button
            onClick={collapseAll}
            disabled={allCollapsed}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] active:scale-95 ${allCollapsed ? "opacity-50 cursor-not-allowed bg-md-surface-container-low text-md-on-surface-variant" : "bg-md-surface-container-low text-md-on-surface hover:bg-md-primary/10"}`}
          >
            {" "}
            ▲ {language === "en" ? "Collapse" : "Contraer"}{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      <TimelineStats stats={stats} />{" "}
      <div className="relative space-y-1">
        {" "}
        {groupedEvents.map((group, groupIndex) => (
          <YearSection
            key={group.year}
            year={group.year}
            events={group.events}
            isExpanded={expandedYears[group.year] || false}
            onToggle={() => toggleYear(group.year)}
            groupIndex={groupIndex}
          />
        ))}{" "}
      </div>{" "}
      <TimelineLegend /> {" "}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          {" "}
          <div
            className="w-full max-w-md p-6 sm:p-8 rounded-[24px] bg-md-surface-container shadow-md-xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {" "}
            <div className="flex items-center justify-between mb-4">
              {" "}
              <div className="flex items-center gap-3">
                {" "}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${selectedEvent.type.color}40, ${selectedEvent.type.color}80)`,
                  }}
                >
                  <Icon icon={selectedEvent.type.icon} className="text-2xl" />
                </div>{" "}
                <div>
                  {" "}
                  <h3 className="text-lg font-bold text-md-on-surface">
                    {" "}
                    {selectedEvent.title}{" "}
                  </h3>{" "}
                  <p className="text-sm text-md-on-surface-variant">
                    {" "}
                    {new Date(selectedEvent.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                  </p>{" "}
                </div>{" "}
              </div>{" "}
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-2 rounded-full transition-colors hover:bg-md-primary/10 text-md-on-surface-variant"
              >
                {" "}
                <Icon icon={I.close} />{" "}
              </button>{" "}
            </div>{" "}
            <p className="mb-4 text-md-on-surface">
              {" "}
              {selectedEvent.description}{" "}
            </p>{" "}
            {selectedEvent.metadata && (
              <div className="p-4 rounded-full bg-md-surface-container-low">
                {" "}
                <h4 className="text-sm font-semibold mb-2 text-md-on-surface-variant">
                  {" "}
                  Details{" "}
                </h4>{" "}
                <div className="space-y-2">
                  {" "}
                  {Object.entries(selectedEvent.metadata).map(
                    ([key, value]) => (
                      <div key={key} className="flex justify-between">
                        {" "}
                        <span className="text-sm text-md-on-surface-variant">
                          {" "}
                          {key}{" "}
                        </span>{" "}
                        <span className="text-sm font-medium text-md-on-surface">
                          {" "}
                          {value}{" "}
                        </span>{" "}
                      </div>
                    ),
                  )}{" "}
                </div>{" "}
              </div>
            )}{" "}
            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-4 w-full py-3 rounded-full font-medium transition-all duration-300 bg-md-primary text-md-on-primary hover:bg-md-primary/90"
            >
              {" "}
              Close{" "}
            </button>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
};

export default ActivityTimeline;