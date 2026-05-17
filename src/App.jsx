import { useState, useEffect } from "react";
import { LanguageProvider, useLanguage } from "./hooks/useLanguage";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import OverviewPage from "./pages/OverviewPage";
import ReposPage from "./pages/ReposPage";
import ActivityPage from "./pages/ActivityPage";
import LanguagesPage from "./pages/LanguagesPage";
import AIPage from "./pages/AIPage";
import VsPage from "./pages/VsPage";
import RateLimitTracker from "./components/rateLimit/RateLimitTracker";
import useGitHubUser from "./hooks/useGitHubUser";
import useGitHubRepos from "./hooks/useGitHubRepos";
import useAnalytics from "./hooks/useAnalytics";
import useExport from "./hooks/useExport";
import { Icon, I } from "./utils/icons";

const AppContent = () => {
  const { t, language } = useLanguage();

  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("darkMode");
      return saved ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [mode, setMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("mode") === "vs" ? "vs" : "single";
  });

  const [activePage, setActivePage] = useState("overview");

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem("sidebarCollapsed");
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [useBadgeMode, setUseBadgeMode] = useState(() => window.innerWidth < 640);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const handler = (e) => setUseBadgeMode(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const { user, loading, error, fetchUser, clearUser } = useGitHubUser();
  const { repos, events, loading: reposLoading } = useGitHubRepos(user);
  const analytics = useAnalytics(repos, events, language);

  const exportData = user ? { user, repos, events, analytics } : null;
  const { exportState, exportToCSV, exportToJSON, exportToPDF } = useExport(
    exportData,
    language,
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (mode === "vs") {
      params.set("mode", "vs");
    } else {
      params.delete("mode");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [mode]);

  useEffect(() => {
    if (user) {
      setActivePage("overview");
    }
  }, [user?.login]);

  const handleSearch = (username) => {
    setActivePage("overview");
    closeMobileSidebar();
    fetchUser(username);
  };

  const handleClear = () => {
    clearUser();
    setActivePage("overview");
    closeMobileSidebar();
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === "single") {
      clearUser();
    }
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);
  const toggleMobileSidebar = () => setMobileSidebarOpen((prev) => !prev);
  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  if (mode === "vs") {
    return (
      <div className="min-h-screen transition-all duration-500 bg-md-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
          <VsPage
            darkMode={darkMode}
            onBack={() => handleModeChange("single")}
          />
        </div>
        <div className="fixed bottom-4 right-4 z-50">
          <RateLimitTracker
            darkMode={darkMode}
            position={useBadgeMode ? "badge" : "widget"}
            language={language}
          />
        </div>
      </div>
    );
  }

  const isLoading = loading || reposLoading;
  const hasUserData = user && !isLoading;

  const renderPage = () => {
    if (!user && !isLoading && !error) {
      return (
        <HomePage
          onSearch={handleSearch}
          loading={loading}
          darkMode={darkMode}
        />
      );
    }

    if (isLoading) {
      return (
        <OverviewPage
          user={user}
          analytics={analytics}
          loading={true}
          darkMode={darkMode}
        />
      );
    }

    if (error && !user) {
      return (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/30 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <Icon icon={I.alert} className="text-2xl" />
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          </div>
          <HomePage
            onSearch={handleSearch}
            loading={loading}
            darkMode={darkMode}
          />
        </div>
      );
    }

    if (hasUserData) {
      switch (activePage) {
        case "overview":
          return (
            <OverviewPage
              user={user}
              analytics={analytics}
              loading={false}
              darkMode={darkMode}
              exportData={exportData}
              exportState={exportState}
              onExportCSV={exportToCSV}
              onExportJSON={exportToJSON}
              onExportPDF={exportToPDF}
            />
          );
        case "repos":
          return <ReposPage analytics={analytics} darkMode={darkMode} />;
        case "activity":
          return (
            <ActivityPage
              user={user}
              repos={repos}
              events={events}
              analytics={analytics}
              darkMode={darkMode}
            />
          );
        case "languages":
          return <LanguagesPage analytics={analytics} darkMode={darkMode} />;
        case "ai":
          return (
            <AIPage
              user={user}
              repos={repos}
              analytics={analytics}
              darkMode={darkMode}
            />
          );
        default:
          return null;
      }
    }

    return null;
  };

  return (
    <AppLayout
      darkMode={darkMode}
      onToggleDark={() => setDarkMode(!darkMode)}
      mode={mode}
      onModeChange={handleModeChange}
      activePage={hasUserData ? activePage : null}
      onPageChange={handlePageChange}
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={toggleSidebar}
      mobileSidebarOpen={mobileSidebarOpen}
      onMobileSidebarToggle={toggleMobileSidebar}
      onMobileSidebarClose={closeMobileSidebar}
      onClear={handleClear}
    >
      {error && hasUserData && (
        <div className="mb-6 p-5 rounded-2xl bg-red-500/10 border border-red-500/30 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Icon icon={I.alert} className="text-2xl" />
            <p className="text-red-400 font-medium">{error}</p>
          </div>
        </div>
      )}

      {renderPage()}

      {!user && !isLoading && (
        <footer className="mt-16 pt-8 border-t border-md-outline/20 text-center">
          <p className="text-sm text-md-on-surface-variant">{t("footer")}</p>
        </footer>
      )}

      <div className="fixed bottom-4 right-4 z-50">
        <RateLimitTracker
          darkMode={darkMode}
          position={useBadgeMode ? "badge" : "widget"}
          language={language}
        />
      </div>
    </AppLayout>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;

