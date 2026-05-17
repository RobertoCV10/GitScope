import { useEffect, useCallback } from "react";
import { Icon, I } from "../../utils/icons";

const Dialog = ({ open, onClose, children, title = "" }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 bg-black/50 backdrop-blur-sm z-30 animate-fade-in"
        style={{ top: "88px" }}
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-md-surface-container border border-md-outline/20 shadow-2xl z-50">
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-md-outline/10 bg-md-surface-container/90 backdrop-blur-sm rounded-t-2xl">
          <h2 className="text-lg font-bold font-display text-md-on-surface">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-md-on-surface-variant hover:bg-md-error/10 hover:text-md-error transition-all duration-200 active:scale-90"
            aria-label="Close"
          >
            <Icon icon={I.close} size="1.25em" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </>
  );
};

export default Dialog;
