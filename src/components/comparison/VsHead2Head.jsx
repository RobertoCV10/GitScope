import { useLanguage } from "../../hooks/useLanguage";
import { Icon, I } from "../../utils/icons";
const VsHead2Head = ({ scores, user1, user2, insights = [] }) => {
  const { t } = useLanguage();
  const winner =
    scores.user1Score > scores.user2Score
      ? user1
      : scores.user2Score > scores.user1Score
        ? user2
        : null;
  return (
    <div className="p-6 rounded-[24px] bg-md-surface-container shadow-md-sm">
      {" "}
      <h3 className="text-xl font-bold font-display mb-6 text-center text-md-on-surface">
        {" "}
        <Icon icon={I.swordCross} className="inline-block mr-2" />{t("vsHeadToHead") || "Head to Head"}{" "}
      </h3>{" "}
      <div className="relative mb-8">
        {" "}
        <div className="h-16 rounded-full overflow-hidden flex bg-md-surface-container-low">
          {" "}
          <div
            className="flex items-center justify-center transition-all duration-1000 bg-md-primary"
            style={{ width: `${scores.user1Score}%` }}
          >
            {" "}
            <span className="text-md-on-primary font-bold text-lg">
              {scores.user1Score}%
            </span>{" "}
          </div>{" "}
          <div
            className="flex items-center justify-center transition-all duration-1000 bg-md-tertiary"
            style={{ width: `${scores.user2Score}%` }}
          >
            {" "}
            <span className="text-md-on-tertiary font-bold text-lg">
              {scores.user2Score}%
            </span>{" "}
          </div>{" "}
        </div>{" "}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-md-background border-4 border-md-outline/30 flex items-center justify-center font-bold text-sm shadow-md-md z-10 text-md-on-surface">
          {" "}
          VS{" "}
        </div>{" "}
      </div>{" "}
      <div className="flex justify-center gap-8 mb-6">
        {" "}
        <div className="text-center">
          {" "}
          <div className="text-3xl font-bold text-md-primary">
            {" "}
            {scores.user1Wins}{" "}
          </div>{" "}
          <div className="text-sm text-md-on-surface-variant">
            {" "}
            {user1?.login} wins{" "}
          </div>{" "}
        </div>{" "}
        <div className="text-center">
          {" "}
          <div className="text-3xl font-bold text-md-on-surface-variant">
            {" "}
            {scores.ties}{" "}
          </div>{" "}
          <div className="text-sm text-md-on-surface-variant"> Ties </div>{" "}
        </div>{" "}
        <div className="text-center">
          {" "}
          <div className="text-3xl font-bold text-md-tertiary">
            {" "}
            {scores.user2Wins}{" "}
          </div>{" "}
          <div className="text-sm text-md-on-surface-variant">
            {" "}
            {user2?.login} wins{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {winner && (
        <div className="text-center p-4 rounded-full mb-6 bg-md-primary-container text-md-on-primary-container font-bold text-lg">
          {" "}
          <Icon icon={I.trophy} className="inline-block mr-2" /> {winner.login} takes the lead!{" "}
        </div>
      )}{" "}
      {insights.length > 0 && (
        <div className="space-y-2">
          {" "}
          <h4 className="font-semibold text-md-on-surface">
            {" "}
            <Icon icon={I.lightbulb} className="inline-block mr-1" /> Insights{" "}
          </h4>{" "}
          {insights.map((insight, index) => (
            <div
              key={index}
              className="p-3 rounded-full text-sm bg-md-surface-container-low text-md-on-surface-variant"
            >
              {" "}
              {insight}{" "}
            </div>
          ))}{" "}
        </div>
      )}{" "}
    </div>
  );
};
export default VsHead2Head;
