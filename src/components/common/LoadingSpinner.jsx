const sizeClasses = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};
const LoadingSpinner = ({ size = "md", text }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {" "}
      <div className="relative">
        {" "}
        <div
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full animate-spin border-4 border-md-secondary-container border-t-md-primary`}
        />{" "}
        <div
          className={`absolute inset-0 ${sizeClasses[size] || sizeClasses.md} rounded-full animate-spin border-4 border-transparent border-t-md-primary/50`}
          style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
        />{" "}
        <div
          className={`absolute inset-0 ${sizeClasses[size] || sizeClasses.md} flex items-center justify-center`}
        >
          {" "}
          <div className="w-2 h-2 rounded-full bg-md-primary animate-pulse" />{" "}
        </div>{" "}
      </div>{" "}
      {text && (
        <p className="text-sm font-medium animate-pulse text-md-on-surface-variant">
          {" "}
          {text}{" "}
        </p>
      )}{" "}
    </div>
  );
};
export default LoadingSpinner;
