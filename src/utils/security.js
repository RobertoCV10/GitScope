/**
 * Utilidades de seguridad para validar y sanitizar datos
 */

/**
 * Valida que una URL sea segura (solo http/https)
 * @param {string} urlString - URL a validar
 * @returns {boolean}
 */
export const isSafeUrl = (urlString) => {
  if (!urlString || typeof urlString !== "string") {
    return false;
  }
  try {
    const url = new URL(urlString);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    const dangerousProtocols = ["javascript:", "data:", "vbscript:"];
    return !dangerousProtocols.some((protocol) =>
      urlString.toLowerCase().startsWith(protocol),
    );
  }
};

/**
 * Normaliza una URL de blog/link externo
 * Añade https:// si falta el protocolo
 * @param {string} urlString - URL a normalizar
 * @returns {string|null} URL normalizada o null si es insegura
 */
export const normalizeUrl = (urlString) => {
  if (!urlString) return null;
  const trimmed = urlString.trim();
  if (!trimmed) return null;
  if (!isSafeUrl(trimmed)) {
    return null;
  }
  try {
    if (!trimmed.match(/^[a-zA-Z][a-zA-Z\d+\-.]*:/)) {
      return `https://${trimmed}`;
    }
    return trimmed;
  } catch {
    return null;
  }
};

/**
 * Escapa caracteres HTML para prevenir XSS
 * @param {string} text - Texto a escapar
 * @returns {string}
 */
export const escapeHtml = (text) => {
  if (!text || typeof text !== "string") {
    return "";
  }
  const htmlEscapes = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  return text.replace(/[&<>"'/]/g, (char) => htmlEscapes[char]);
};

/**
 * Valida y sanitiza el input de búsqueda
 * @param {string} input - Input del usuario
 * @returns {{ safe: boolean, sanitized: string, error?: string }}
 */
export const sanitizeSearchInput = (input) => {
  if (!input || typeof input !== "string") {
    return { safe: false, sanitized: "", error: "Input inválido" };
  }
  const trimmed = input.trim();
  if (trimmed.length > 39) {
    return { safe: false, sanitized: "", error: "Excede longitud máxima" };
  }
  const sanitized = trimmed.replace(/[<>"'\\]/g, "").replace(/\s+/g, " ");
  return { safe: true, sanitized };
};

