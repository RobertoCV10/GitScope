import { useLanguage } from "../../hooks/useLanguage";
import { normalizeUrl, escapeHtml } from "../../utils/security";
import { Icon, I } from "../../utils/icons";
const isGitHubDomain = (urlString, expectedHost) => {
  if (!urlString || typeof urlString !== "string") return false;
  try {
    const url = new URL(urlString);
    if (url.protocol !== "https:") return false;
    if (expectedHost === "github.com") {
      return (
        url.hostname === "github.com" || url.hostname.endsWith(".github.com")
      );
    }
    return url.hostname === expectedHost;
  } catch {
    return false;
  }
};
const UserCard = ({ user }) => {
  const { t } = useLanguage();
  if (!user) return null;
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      t("appTitle") === "GitHub Analytics" &&
        document.documentElement.lang === "es"
        ? "es-ES"
        : "en-US",
      { year: "numeric", month: "short", day: "numeric" },
    );
  };
  const blogUrl = normalizeUrl(user.blog);
  const profileUrl = isGitHubDomain(user.html_url, "github.com")
    ? user.html_url
    : null;
  const avatarUrl = isGitHubDomain(
    user.avatar_url,
    "avatars.githubusercontent.com",
  )
    ? user.avatar_url
    : `https://avatars.githubusercontent.com/${encodeURIComponent(user.login || "")}`;
  const safeBio = user.bio ? escapeHtml(user.bio) : null;
  const safeLocation = user.location ? escapeHtml(user.location) : null;
  return (
    <div className="relative p-5 sm:p-6 rounded-[24px] bg-md-surface-container shadow-md-sm transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:shadow-md-md animate-slide-up">
      {" "}
      <div className="flex flex-col md:flex-row gap-5 sm:gap-6 items-start">
        {" "}
        <div className="relative flex-shrink-0">
          {" "}
          <img
            src={avatarUrl}
            alt={`${user.login} avatar`}
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-[16px] border-2 border-md-outline/30 shadow-md-md transition-transform duration-300 hover:scale-105"
          />{" "}
          <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full flex items-center justify-center text-lg bg-md-primary text-md-on-primary shadow-md-sm">
            {" "}
            <Icon icon={user.type === "Organization" ? I.building : I.user} size="1.25em" />{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex-1 min-w-0">
          {" "}
          <div className="flex items-center gap-3 flex-wrap mb-2">
            {" "}
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-md-on-surface">
              {" "}
              {user.name || user.login}{" "}
            </h2>{" "}
            {user.type === "Organization" && (
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-md-primary text-md-on-primary">
                {" "}
                {t("organization")}{" "}
              </span>
            )}{" "}
          </div>{" "}
          {profileUrl ? (
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-md-primary hover:text-md-primary/80 transition-all duration-300 hover:scale-105"
            >
              {" "}
              @{user.login}{" "}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />{" "}
              </svg>{" "}
            </a>
          ) : (
            <span className="font-medium text-md-on-surface-variant">
              {" "}
              @{user.login}{" "}
            </span>
          )}{" "}
          {safeBio && (
            <p className="mt-3 text-base text-md-on-surface-variant">
              {" "}
              {safeBio}{" "}
            </p>
          )}{" "}
          <div className="mt-5 flex flex-wrap gap-3 sm:gap-4">
            {" "}
            {[
              { icon: I.users, label: t("followers"), value: user.followers },
              { icon: I.user, label: t("following"), value: user.following },
              { icon: I.package, label: t("repos"), value: user.public_repos },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-md-surface-container-low transition-all duration-300 hover:bg-md-primary/10 hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {" "}
                <Icon icon={stat.icon} className="text-lg" />{" "}
                <span className="font-bold text-md-on-surface">
                  {" "}
                  {stat.value?.toLocaleString()}{" "}
                </span>{" "}
                <span className="text-sm text-md-on-surface-variant">
                  {" "}
                  {stat.label}{" "}
                </span>{" "}
              </div>
            ))}{" "}
          </div>{" "}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {" "}
            {safeLocation && (
              <span className="flex items-center gap-1.5 text-md-on-surface-variant">
                {" "}
                <Icon icon="mdi:map-marker" className="text-lg" /> {safeLocation}{" "}
              </span>
            )}{" "}
            {user.blog && blogUrl && (
              <a
                href={blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-md-primary hover:text-md-primary/80 transition-colors duration-300"
              >
                {" "}
                <Icon icon={I.link} className="text-lg" /> {user.blog}{" "}
              </a>
            )}{" "}
            {user.created_at && (
              <span className="flex items-center gap-1.5 text-md-on-surface-variant">
                {" "}
                <Icon icon={I.calendar} className="text-lg" /> {t("joined")} {formatDate(user.created_at)}{" "}
              </span>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default UserCard;


