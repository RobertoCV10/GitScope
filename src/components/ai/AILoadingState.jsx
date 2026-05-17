const AILoadingState = ({ type = "profile" }) => {
  const isProfile = type === "profile";
  const skeletonBar = (width, height = "h-4") => (
    <div
      className={`${height} ${width} rounded-full animate-shimmer bg-md-surface-container-low`}
    />
  );
  const skeletonCircle = (size = "w-12 h-12") => (
    <div
      className={`${size} rounded-full animate-shimmer bg-md-surface-container-low`}
    />
  );
  if (isProfile) {
    return (
      <div className="p-5 sm:p-6 rounded-[24px] bg-md-surface-container shadow-md-sm animate-fade-in min-h-[200px]">
        {" "}
        <div className="flex items-center gap-3 mb-6">
          {" "}
          {skeletonCircle("w-10 h-10")}{" "}
          <div className="space-y-2">
            {" "}
            {skeletonBar("w-40", "h-5")} {skeletonBar("w-24", "h-3")}{" "}
          </div>{" "}
        </div>{" "}
        <div className="space-y-5">
          {" "}
          <div className="space-y-2">
            {" "}
            <div className="flex items-center gap-2 mb-2">
              {" "}
              {skeletonCircle("w-6 h-6")} {skeletonBar("w-32", "h-4")}{" "}
            </div>{" "}
            {skeletonBar("w-full", "h-3")} {skeletonBar("w-3/4", "h-3")}{" "}
            {skeletonBar("w-5/6", "h-3")}{" "}
          </div>{" "}
          <div className="space-y-2">
            {" "}
            <div className="flex items-center gap-2 mb-2">
              {" "}
              {skeletonCircle("w-6 h-6")} {skeletonBar("w-36", "h-4")}{" "}
            </div>{" "}
            {skeletonBar("w-full", "h-3")} {skeletonBar("w-2/3", "h-3")}{" "}
            {skeletonBar("w-4/5", "h-3")}{" "}
          </div>{" "}
          <div className="space-y-2">
            {" "}
            <div className="flex items-center gap-2 mb-2">
              {" "}
              {skeletonCircle("w-6 h-6")} {skeletonBar("w-44", "h-4")}{" "}
            </div>{" "}
            {skeletonBar("w-11/12", "h-3")} {skeletonBar("w-5/6", "h-3")}{" "}
            {skeletonBar("w-3/4", "h-3")}{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
  return (
    <div className="p-5 sm:p-6 rounded-[24px] bg-md-surface-container shadow-md-sm animate-fade-in min-h-[200px]">
      {" "}
      <div className="flex items-center gap-3 mb-6">
        {" "}
        {skeletonCircle("w-10 h-10")}{" "}
        <div className="space-y-2">
          {" "}
          {skeletonBar("w-48", "h-5")} {skeletonBar("w-28", "h-3")}{" "}
        </div>{" "}
      </div>{" "}
      <div className="flex justify-center mb-6">
        {" "}
        {skeletonCircle("w-24 h-24")}{" "}
      </div>{" "}
      <div className="space-y-4">
        {" "}
        <div className="space-y-2">
          {" "}
          <div className="flex items-center gap-2">
            {" "}
            {skeletonCircle("w-6 h-6")} {skeletonBar("w-28", "h-4")}{" "}
          </div>{" "}
          {skeletonBar("w-48", "h-3")}{" "}
        </div>{" "}
        <div className="space-y-2">
          {" "}
          <div className="flex items-center gap-2">
            {" "}
            {skeletonCircle("w-6 h-6")} {skeletonBar("w-36", "h-4")}{" "}
          </div>{" "}
          {skeletonBar("w-full", "h-3")} {skeletonBar("w-4/5", "h-3")}{" "}
        </div>{" "}
        <div className="space-y-2">
          {" "}
          <div className="flex items-center gap-2">
            {" "}
            {skeletonCircle("w-6 h-6")} {skeletonBar("w-44", "h-4")}{" "}
          </div>{" "}
          {skeletonBar("w-5/6", "h-3")} {skeletonBar("w-3/4", "h-3")}{" "}
          {skeletonBar("w-2/3", "h-3")}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default AILoadingState;
