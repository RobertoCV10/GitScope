/** * Utilidades para el formateo y procesamiento de datos de IA */ /** * Obtiene el nivel de empleabilidad basado en el puntaje * @param {number} score - Puntaje de empleabilidad (0-100) * @param {string} language - Idioma ('es' | 'en') * @returns {{ label: string, color: string, icon: string }} */ export const getEmployabilityLevel =
  (score, language = "es") => {
    const isEnglish = language === "en";
    if (score >= 90) {
      return {
        label: isEnglish ? "Excellent" : "Excelente",
        color: "from-emerald-500 to-green-500",
        textColor: "text-emerald-400",
        bgColor: "bg-emerald-500/20",
        borderColor: "border-emerald-500/30",
        icon: "mdi:trophy",
      };
    }
    if (score >= 75) {
      return {
        label: isEnglish ? "Very Good" : "Muy Bueno",
        color: "from-primary-500 to-primary-600",
        textColor: "text-blue-400",
        bgColor: "bg-blue-500/20",
        borderColor: "border-blue-500/30",
        icon: "mdi:arm-flex",
      };
    }
    if (score >= 60) {
      return {
        label: isEnglish ? "Good" : "Bueno",
        color: "from-teal-500 to-cyan-500",
        textColor: "text-teal-400",
        bgColor: "bg-teal-500/20",
        borderColor: "border-teal-500/30",
        icon: "mdi:thumb-up",
      };
    }
    if (score >= 40) {
      return {
        label: isEnglish ? "Fair" : "Regular",
        color: "from-yellow-500 to-orange-500",
        textColor: "text-yellow-400",
        bgColor: "bg-yellow-500/20",
        borderColor: "border-yellow-500/30",
        icon: "mdi:chart-line",
      };
    }
    return {
      label: isEnglish ? "Needs Improvement" : "Necesita Mejorar",
      color: "from-red-500 to-pink-500",
      textColor: "text-red-400",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/30",
        icon: "mdi:seed",
    };
  };
/** * Formatea un rango salarial * @param {string} range - Rango salarial (ej: "$80,000 - $120,000") * @returns {string} */ export const formatSalaryRange =
  (range) => {
    if (!range) return "$0 - $0";
    return range;
  };
/** * Obtiene el texto del score de empleabilidad con formato corto * @param {number} score * @returns {string} */ export const getScoreLabel =
  (score) => {
    if (score >= 90) return `${score}/100`;
    if (score >= 75) return `${score}/100`;
    if (score >= 60) return `${score}/100`;
    if (score >= 40) return `${score}/100`;
    return `${score}/100`;
  };
/** * Trunca texto si es muy largo * @param {string} text - Texto a truncar * @param {number} maxLength - Longitud máxima * @returns {string} */ export const truncateText =
  (text, maxLength = 200) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };
/** * Obtiene un color basado en el score para gráficos * @param {number} score - Puntaje (0-100) * @returns {string} - Color hex */ export const getScoreColor =
  (score) => {
    if (score >= 90) return "#10b981";
    if (score >= 75) return "#3b82f6";
    if (score >= 60) return "#14b8a6";
    if (score >= 40) return "#eab308";
    return "#ef4444";
  };
/** * Genera un ID único para elementos de lista * @returns {string} */ export const generateId =
  () => {
    return `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };
/** * Determina si se deben mostrar los insights de IA basado en datos disponibles * @param {Object} user - Datos del usuario * @param {Array} repos - Lista de repositorios * @returns {boolean} */ export const canShowAIInsights =
  (user, repos) => {
    return !!user && Array.isArray(repos) && repos.length > 0;
  };
export default {
  getEmployabilityLevel,
  formatSalaryRange,
  getScoreLabel,
  truncateText,
  getScoreColor,
  generateId,
  canShowAIInsights,
};
