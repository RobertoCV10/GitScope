import AIInsightsPanel from "../components/ai/AIInsightsPanel";
const AIPage = ({ user, repos, analytics, darkMode }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {" "}
      <AIInsightsPanel
        user={user}
        repos={repos}
        analytics={analytics}
        darkMode={darkMode}
      />{" "}
    </div>
  );
};
export default AIPage;
