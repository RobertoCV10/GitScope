import React, { useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { Icon, I } from "../../utils/icons";
const SearchBar = ({ onSearch, loading }) => {
  const { t } = useLanguage();
  const [username, setUsername] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && !loading) {
      onSearch(username.trim());
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {" "}
      <div className="relative flex items-center gap-2 sm:gap-3 p-0 rounded-t-[12px] rounded-b-none bg-md-surface-container-low border-b-2 border-md-outline transition-colors duration-200 focus-within:border-md-primary">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 bg-md-primary/10 text-md-primary ml-1 sm:ml-2">
          <Icon icon={I.magnify} size="1.25em" />
        </div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="flex-1 h-10 sm:h-12 bg-transparent border-none outline-none text-sm sm:text-lg text-md-on-background placeholder:text-md-on-surface-variant/50"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !username.trim()}
          className={`h-10 px-4 sm:px-6 rounded-full font-semibold text-sm flex items-center gap-1.5 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] whitespace-nowrap active:scale-95 ${loading || !username.trim() ? "bg-md-surface-container-low text-md-on-surface-variant/50 cursor-not-allowed" : "bg-md-primary text-md-on-primary hover:bg-md-primary/90"}`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="hidden sm:inline">{t("searching")}</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <span className="hidden sm:inline">{t("searchButton")}</span>
              <span className="sm:hidden"><Icon icon={I.magnify} size="1em" /></span>
              <span>→</span>
            </span>
          )}
        </button>
        <div className="w-1 sm:w-2" />
      </div>{" "}
      <p className="mt-4 text-center text-sm text-md-on-surface-variant">
        {" "}
        {t("searchExamples")}{" "}
        <span
          className="font-medium cursor-pointer text-md-primary hover:underline"
          onClick={() => {
            setUsername("octocat");
          }}
        >
          {" "}
          octocat{" "}
        </span>
        ,{" "}
        <span
          className="font-medium cursor-pointer text-md-primary hover:underline"
          onClick={() => {
            setUsername("facebook");
          }}
        >
          {" "}
          facebook{" "}
        </span>
        ,{" "}
        <span
          className="font-medium cursor-pointer text-md-primary hover:underline"
          onClick={() => {
            setUsername("torvalds");
          }}
        >
          {" "}
          torvalds{" "}
        </span>{" "}
      </p>{" "}
    </form>
  );
};
export default SearchBar;


