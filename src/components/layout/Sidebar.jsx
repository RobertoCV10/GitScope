import { useState, useEffect } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { Icon, I } from "../../utils/icons";

const navItems = [
  { id: "overview", labelKey: "navOverview", icon: I.overview },
  { id: "repos", labelKey: "navRepos", icon: I.repos },
  { id: "activity", labelKey: "navActivity", icon: I.activity },
  { id: "languages", labelKey: "navLanguages", icon: I.languages },
  { id: "ai", labelKey: "navAI", icon: I.ai },
];

const Sidebar = ({
  activePage,
  onNavigate,
  _darkMode = true,
  collapsed = false,
  onToggle,
  onClear,
  mobileOpen = false,
  onMobileClose,
}) => {
  const { t } = useLanguage();
  const [topBarOffScreen, setTopBarOffScreen] = useState(false);

  useEffect(() => {
    const sentinel = document.querySelector("[data-sidebar-sentinel]");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setTopBarOffScreen(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (id) => {
    onNavigate(id);
    onMobileClose?.();
  };

  const gifSection = (alwaysVisible = false) => {
    const show = alwaysVisible || (!collapsed && topBarOffScreen);
    return (
      <div
        className={`absolute top-0 left-0 right-0 z-10 px-4 pt-3 pb-1 transition-all duration-700 ease-in-out ${show ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"}`}
      >
        <div className="aspect-square w-full max-w-[5rem] mx-auto overflow-hidden rounded-xl bg-md-surface/50 ring-1 ring-md-outline/10">
          <img
            src="https://media.giphy.com/media/MT5UUV1d4CXE2A37Dg/giphy.gif"
            alt="coding ninja"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  };

  const navList = () => (
    <ul className="space-y-0.5">
      {navItems.map((item) => {
        const isActive = activePage === item.id;
        return (
          <li key={item.id}>
            <button
              onClick={() => handleNavigate(item.id)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] ${isActive ? "bg-md-secondary-container text-md-on-secondary-container" : "text-md-on-surface-variant hover:text-md-on-surface hover:bg-md-primary/10"}`}
              title={t(item.labelKey)}
            >
              <span className="text-lg flex-shrink-0">
                <Icon icon={item.icon} />
              </span>
              {!collapsed && (
                <span className="truncate">{t(item.labelKey)}</span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );

  const sidebarFooter = (showGif) => {
    const showCollapse = !showGif;
    return (
      <div className="flex-shrink-0 border-t border-md-outline/10 bg-md-surface-container-low/20 backdrop-blur-sm">
        <div className="space-y-0.5">
          {onClear && (
            <button
              onClick={() => { onClear(); onMobileClose?.(); }}
              title={t("clear")}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] text-md-on-surface-variant hover:bg-md-error/10 hover:text-md-error active:scale-95"
            >
              <span className="text-lg flex-shrink-0">
                <Icon icon={I.close} />
              </span>
              {!collapsed && (
                <span className="truncate">{t("clear")}</span>
              )}
            </button>
          )}
          {showCollapse && (
            <button
              onClick={onToggle}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] text-md-on-surface-variant hover:bg-md-primary/10 hover:text-md-on-surface active:scale-95 min-h-[44px]"
              title={t("navCollapse")}
            >
              <span className="text-lg flex-shrink-0">
                {collapsed ? <Icon icon={I.chevronRight} /> : <Icon icon={I.chevronLeft} />}
              </span>
              {!collapsed && (
                <span className="truncate">{t("navCollapse")}</span>
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  const sidebarBody = (showGif) => (
    <div className="relative h-full overflow-hidden flex flex-col">
      {gifSection(showGif)}
      <div className="flex-1 overflow-y-auto pt-[116px] px-2">
        {navList()}
      </div>
      {sidebarFooter(showGif)}
    </div>
  );

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      <nav
        className={`fixed inset-y-0 left-0 z-50 h-screen w-64 transition-transform duration-300 ease-in-out lg:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"} bg-md-surface-container border-r border-md-outline/20 backdrop-blur-sm flex flex-col`}
      >
        {sidebarBody(true)}
      </nav>

      <nav
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 h-screen transition-[width] duration-300 ease-in-out ${collapsed ? "w-14" : "w-52"} bg-md-surface-container border-r border-md-outline/20 backdrop-blur-sm`}
      >
        {sidebarBody(false)}
      </nav>
    </>
  );
};

export default Sidebar;