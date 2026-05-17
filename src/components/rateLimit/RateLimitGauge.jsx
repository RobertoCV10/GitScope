const RateLimitGauge = ({ percentage, status, darkMode, size = "md" }) => {
  const sizes = {
    sm: { width: 60, strokeWidth: 6, fontSize: "text-sm" },
    md: { width: 100, strokeWidth: 8, fontSize: "text-lg" },
    lg: { width: 140, strokeWidth: 10, fontSize: "text-xl" },
  };
  const { width, strokeWidth, fontSize } = sizes[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  const getStrokeColor = () => {
    switch (status) {
      case "good":
        return "#10b981";
      case "warning":
        return "#f59e0b";
      case "critical":
        return "#f97316";
      case "danger":
        return "#ef4444";
      default:
        return "#10b981";
    }
  };
  return (
    <div className="relative inline-flex items-center justify-center">
      {" "}
      <svg width={width} height={width} className="transform -rotate-90">
        {" "}
        {/* Background circle */}{" "}
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          fill="none"
          stroke={darkMode ? "#374151" : "#e5e7eb"}
          strokeWidth={strokeWidth}
        />{" "}
        {/* Progress circle */}{" "}
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          fill="none"
          stroke={getStrokeColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
          style={{ filter: `drop-shadow(0 0 4px ${getStrokeColor()}40)` }}
        />{" "}
      </svg>{" "}
      <div className="absolute inset-0 flex items-center justify-center">
        {" "}
        <span
          className={`font-bold font-display ${fontSize} text-md-on-surface`}
        >
          {" "}
          {Math.round(percentage)}%{" "}
        </span>{" "}
      </div>{" "}
    </div>
  );
};
export default RateLimitGauge;
