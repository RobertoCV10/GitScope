import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
const AppLayout = ({
  children,
  darkMode,
  onToggleDark,
  mode,
  onModeChange,
  activePage,
  onPageChange,
  sidebarCollapsed = false,
  onToggleSidebar,
  onClear,
  mobileSidebarOpen = false,
  onMobileSidebarToggle,
  onMobileSidebarClose,
}) => {
  const showSidebar = mode === "single" && activePage;
  return (
    <div className="min-h-screen transition-all duration-500 bg-md-background relative overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-tr-[20px] rounded-[100px] bg-md-primary opacity-[0.08] blur-3xl" />
        <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] rounded-full bg-md-secondary-container opacity-[0.12] blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-[450px] h-[450px] rounded-full bg-md-tertiary opacity-[0.06] blur-3xl" />
      </div>
      <TopBar
        darkMode={darkMode}
        onToggleDark={onToggleDark}
        mode={mode}
        onModeChange={onModeChange}
        onPageChange={onPageChange}
        showSidebar={showSidebar}
        onMobileMenuToggle={onMobileSidebarToggle}
      />
      <div
        className={`flex transition-[margin] duration-300 ease-in-out ${showSidebar ? (sidebarCollapsed ? "lg:ml-14" : "lg:ml-52") : ""}`}
      >
        {showSidebar && (
          <Sidebar
            activePage={activePage}
            onNavigate={onPageChange}
            darkMode={darkMode}
            collapsed={sidebarCollapsed}
            onToggle={onToggleSidebar}
            onClear={onClear}
            mobileOpen={mobileSidebarOpen}
            onMobileClose={onMobileSidebarClose}
          />
        )}
        <main className="flex-1 min-w-0 relative w-full">
          <div data-sidebar-sentinel className="absolute top-0 left-0 w-0 h-0 pointer-events-none" />
          <div className="w-full h-full px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default AppLayout;