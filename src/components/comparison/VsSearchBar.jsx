import React, { useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { Icon, I } from "../../utils/icons";
const VsSearchBar = ({ onCompare, loading }) => {
  const { t } = useLanguage();
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username1.trim() && username2.trim() && !loading) {
      onCompare(username1.trim(), username2.trim());
    }
  };
  const canSubmit = username1.trim() && username2.trim() && !loading;
  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      {" "}
      <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-[24px] bg-md-surface-container shadow-md-sm">
        {" "}
        <div className="flex-1 w-full">
          {" "}
          <div className="relative">
            {" "}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-lg bg-md-primary/10 text-md-primary">
              {" "}
              <Icon icon={I.user} />{" "}
            </div>{" "}
            <input
              type="text"
              value={username1}
              onChange={(e) => setUsername1(e.target.value)}
              placeholder={t("vsUser1Placeholder") || "User 1"}
              className="w-full h-12 pl-14 sm:pl-16 pr-4 rounded-t-[12px] rounded-b-none bg-md-surface-container-low border-b-2 border-md-outline text-base sm:text-lg text-md-on-background placeholder:text-md-on-surface-variant/50 focus:border-md-primary focus:outline-none transition-colors duration-200"
              disabled={loading}
            />{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex-shrink-0 relative">
          {" "}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-md-primary flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-md-md">
            {" "}
            <Icon icon={I.swordCross} size="1.5em" />{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex-1 w-full">
          {" "}
          <div className="relative">
            {" "}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-lg bg-md-primary/10 text-md-primary">
              {" "}
              <Icon icon={I.user} />{" "}
            </div>{" "}
            <input
              type="text"
              value={username2}
              onChange={(e) => setUsername2(e.target.value)}
              placeholder={t("vsUser2Placeholder") || "User 2"}
              className="w-full h-12 pl-14 sm:pl-16 pr-4 rounded-t-[12px] rounded-b-none bg-md-surface-container-low border-b-2 border-md-outline text-base sm:text-lg text-md-on-background placeholder:text-md-on-surface-variant/50 focus:border-md-primary focus:outline-none transition-colors duration-200"
              disabled={loading}
            />{" "}
          </div>{" "}
        </div>{" "}
        <button
          type="submit"
          disabled={!canSubmit}
          className={`flex-shrink-0 h-11 px-6 sm:px-8 rounded-full font-semibold transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] active:scale-95 whitespace-nowrap ${canSubmit ? "bg-md-primary text-md-on-primary hover:bg-md-primary/90" : "bg-md-surface-container-low text-md-on-surface-variant/50 cursor-not-allowed"}`}
        >
          {" "}
          {loading ? (
            <span className="flex items-center gap-2">
              {" "}
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                {" "}
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />{" "}
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />{" "}
              </svg>{" "}
              <span>...</span>{" "}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              {" "}
              <Icon icon={I.swordCross} />{" "}
              <span className="hidden sm:inline">
                {t("vsCompare") || "Compare"}
              </span>{" "}
            </span>
          )}{" "}
        </button>{" "}
      </div>{" "}
    </form>
  );
};
export default VsSearchBar;

