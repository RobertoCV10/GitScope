import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = 'gemini-2.5-flash';

let genAI = null;
let model = null;

const initializeGemini = () => {
  if (!API_KEY) {
    console.warn('VITE_GEMINI_API_KEY no configurada. Las funcionalidades AI no estarán disponibles.');
    return false;
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: MODEL_NAME });
  }
  return true;
};

const LANGUAGE_MAP = {
  es: 'Español',
  en: 'English'
};

const buildLanguageInstruction = (language) => {
  
  if (language === 'es') {
    return `## INSTRUCCIÓN DE IDIOMA
Idioma: Español
IMPORTANTE: Debes responder ESTRICTAMENTE en Español.
Todo el texto de análisis, recomendaciones, explicaciones y valores de texto DEBEN estar escritos en Español.
Las claves del JSON deben permanecer en inglés, pero TODOS los valores de tipo string deben estar en Español.

## FORMATO DE RESPUESTA
- Devuelve ÚNICAMENTE JSON válido
- No incluyas bloques de código markdown (\`\`\`)
- No incluyas texto adicional fuera del JSON
- Las claves del JSON van en inglés, los valores string en Español
- Los arrays de strings deben tener cada elemento en Español`;
  }
  return `## LANGUAGE INSTRUCTION
Language: English
IMPORTANT: You MUST respond in English.
All analysis text, recommendations, explanations, and string values MUST be written in English.
JSON keys must remain in English, and ALL string values must also be in English.

## RESPONSE FORMAT
- Return ONLY valid JSON
- Do not include markdown code blocks (\`\`\`)
- Do not include additional text outside the JSON
- JSON keys in English, string values in English
- String arrays must have each element in English`;
};

const generateContent = async (prompt) => {
  if (!initializeGemini()) {
    throw new Error('Gemini API key not configured');
  }
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    if (error.message?.includes('API_KEY') || error.message?.includes('API key')) {
      throw new Error('API key inválida o no configurada. Revisa VITE_GEMINI_API_KEY en .env');
    }
    if (error.message?.includes('SAFETY')) {
      throw new Error('La respuesta fue bloqueada por seguridad. Intenta con un perfil diferente.');
    }
    if (error.message?.includes('RATE_LIMIT') || error.status === 429) {
      throw new Error('Límite de tasa de Gemini excedido. Espera un momento e intenta de nuevo.');
    }
    throw new Error(`Error de conexión con Gemini: ${error.message}`);
  }
};

const extractJSON = (text) => {
  if (!text) return null;
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(text);
  } catch {
    return null;
  }
};

export const analyzeGitHubProfile = async (user, repos, language = 'en') => {
  const langInstruction = buildLanguageInstruction(language);
  const prompt = `${langInstruction}

## USER DATA
Analyze the following GitHub profile and provide insights.

User: ${user.login}
Name: ${user.name || 'N/A'}
Bio: ${user.bio || 'N/A'}
Location: ${user.location || 'N/A'}
Company: ${user.company || 'N/A'}
Followers: ${user.followers}
Following: ${user.following}
Public Repos: ${user.public_repos}
Account Created: ${user.created_at}
Total Stars: ${repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)}
Total Forks: ${repos.reduce((sum, r) => sum + (r.forks_count || 0), 0)}
Languages: ${[...new Set(repos.map(r => r.language).filter(Boolean))].join(', ')}
Topics: ${[...new Set(repos.flatMap(r => r.topics || []))].join(', ')}

Top Repositories:
${repos.slice(0, 5).map(r => `- ${r.name}: ${r.stargazers_count} stars, ${r.forks_count} forks, ${r.language || 'N/A'}`).join('\n')}

## JSON RESPONSE
{
  "profile_analysis": {
    "strengths": "string (${LANGUAGE_MAP[language] || 'English'})",
    "growth_areas": "string (${LANGUAGE_MAP[language] || 'English'})",
    "unique_value": "string (${LANGUAGE_MAP[language] || 'English'})",
    "recommendations": ["string (${LANGUAGE_MAP[language] || 'English'})", "string (${LANGUAGE_MAP[language] || 'English'})", "string (${LANGUAGE_MAP[language] || 'English'})"]
  }
}`;

  try {
    const responseText = await generateContent(prompt);
    const parsed = extractJSON(responseText);
    if (parsed && parsed.profile_analysis) {
      return parsed.profile_analysis;
    }
    return parseProfileAnalysis(responseText, language);
  } catch (error) {
    console.error('Profile analysis error:', error);
    throw error;
  }
};

export const generateJobMarketInsights = async (user, repos, analytics, language = 'en') => {
  const langInstruction = buildLanguageInstruction(language);
  const topLanguages = analytics?.languages?.slice(0, 5).map(l => l.name).join(', ') || 'N/A';
  const prompt = `${langInstruction}

## USER DATA
Based on the following GitHub profile, provide job market insights.

User: ${user.login}
Top Languages: ${topLanguages}
Total Repos: ${repos.length}
Total Stars: ${repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)}
Total Forks: ${repos.reduce((sum, r) => sum + (r.forks_count || 0), 0)}

## JSON RESPONSE
{
  "job_market": {
    "employability_score": 85,
    "employability_explanation": "string (${LANGUAGE_MAP[language] || 'English'})",
    "current_roles": ["string (${LANGUAGE_MAP[language] || 'English'})", "string (${LANGUAGE_MAP[language] || 'English'})"],
    "demand_level": "string (${LANGUAGE_MAP[language] || 'English'})",
    "salary_entry": "$80,000 - $150,000",
    "salary_mid": "$80,000 - $150,000",
    "salary_senior": "$80,000 - $150,000",
    "salary_ceiling": "$150,000 - $250,000",
    "salary_potential": "$200,000 - $500,000+",
    "salary_key_factor": "string (${LANGUAGE_MAP[language] || 'English'})",
    "top_demand_skills": ["string (${LANGUAGE_MAP[language] || 'English'})", "string (${LANGUAGE_MAP[language] || 'English'})", "string (${LANGUAGE_MAP[language] || 'English'})"],
    "skill_gaps": ["string (${LANGUAGE_MAP[language] || 'English'})", "string (${LANGUAGE_MAP[language] || 'English'})"],
    "recommendations": ["string (${LANGUAGE_MAP[language] || 'English'})", "string (${LANGUAGE_MAP[language] || 'English'})", "string (${LANGUAGE_MAP[language] || 'English'})"]
  }
}`;

  try {
    const responseText = await generateContent(prompt);
    const parsed = extractJSON(responseText);
    if (parsed && parsed.job_market) {
      return parsed.job_market;
    }
    return parseJobMarketInsights(responseText, language);
  } catch (error) {
    console.error('Job market insights error:', error);
    throw error;
  }
};

export const generateCombinedAIInsights = async (user, repos, analytics, language = 'en') => {
  const langInstruction = buildLanguageInstruction(language);
  const topLanguages = analytics?.languages?.slice(0, 5).map(l => l.name).join(', ') || 'N/A';
  const prompt = `${langInstruction}

## USER DATA
Analyze this GitHub profile and provide both profile analysis and job market insights.

User: ${user.login}
Bio: ${user.bio || 'N/A'}
Followers: ${user.followers}
Following: ${user.following}
Public Repos: ${user.public_repos}
Top Languages: ${topLanguages}
Total Repos: ${repos.length}
Total Stars: ${repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)}
Total Forks: ${repos.reduce((sum, r) => sum + (r.forks_count || 0), 0)}

## JSON RESPONSE
{
  "profile_analysis": {
    "strengths": "string (${LANGUAGE_MAP[language] || 'English'})",
    "growth_areas": "string (${LANGUAGE_MAP[language] || 'English'})",
    "unique_value": "string (${LANGUAGE_MAP[language] || 'English'})",
    "recommendations": ["string (${LANGUAGE_MAP[language] || 'English'})", "string (${LANGUAGE_MAP[language] || 'English'})", "string (${LANGUAGE_MAP[language] || 'English'})"]
  },
  "job_market": {
    "employability_score": 85,
    "employability_explanation": "string (${LANGUAGE_MAP[language] || 'English'})",
    "current_roles": ["string (${LANGUAGE_MAP[language] || 'English'})", "string (${LANGUAGE_MAP[language] || 'English'})"],
    "demand_level": "string (${LANGUAGE_MAP[language] || 'English'})",
    "salary_range": "$80,000 - $150,000",
    "salary_growth_potential": "string (${LANGUAGE_MAP[language] || 'English'})",
    "market_demand_skills": ["string (${LANGUAGE_MAP[language] || 'English'})", "string (${LANGUAGE_MAP[language] || 'English'})", "string (${LANGUAGE_MAP[language] || 'English'})"],
    "skill_gaps": ["string (${LANGUAGE_MAP[language] || 'English'})", "string (${LANGUAGE_MAP[language] || 'English'})"],
    "recommendations": ["string (${LANGUAGE_MAP[language] || 'English'})", "string (${LANGUAGE_MAP[language] || 'English'})", "string (${LANGUAGE_MAP[language] || 'English'})"]
  }
}`;

  try {
    const responseText = await generateContent(prompt);
    const parsed = extractJSON(responseText);
    if (parsed && parsed.profile_analysis && parsed.job_market) {
      return parsed;
    }
    return {
      profile_analysis: parseProfileAnalysis(responseText, language),
      job_market: parseJobMarketInsights(responseText, language)
    };
  } catch (error) {
    console.error('Combined AI insights error:', error);
    throw error;
  }
};

export const parseProfileAnalysis = (text, language = 'en') => {
  if (!text) {
    return getDefaultProfileAnalysis(language);
  }
  const defaults = getDefaultProfileAnalysis(language);
  return {
    strengths: extractSection(text, ['strengths', 'coding style', 'coding abilities', 'fortalezas', 'estilo'], defaults.strengths),
    growth_areas: extractSection(text, ['growth areas', 'growth', 'areas for growth', 'improve', 'áreas de mejora', 'mejora'], defaults.growth_areas),
    unique_value: extractSection(text, ['unique value', 'unique', 'stands out', 'positioning', 'valor único', 'destaca'], defaults.unique_value),
    recommendations: extractBullets(text, defaults.recommendations)
  };
};

export const parseJobMarketInsights = (text, language = 'en') => {
  if (!text) {
    return getDefaultJobMarketInsights(language);
  }
  const defaults = getDefaultJobMarketInsights(language);
  return {
    employability_score: extractNumber(text, ['employability', 'empleabilidad', 'puntaje', 'score'], 72),
    employability_explanation: extractSection(text, ['employability', 'marketability', 'empleabilidad'], defaults.employability_explanation),
    current_roles: extractListItems(text, ['roles', 'position', 'suited', 'roles', 'posición'], defaults.current_roles),
    demand_level: extractSection(text, ['demand', 'market demand', 'demanda'], defaults.demand_level),
    competitive_advantages: extractSection(text, ['competitive advantages', 'advantages', 'ventajas'], defaults.competitive_advantages),
    salary_entry: extractSalary(text, 'entry', '$55,000 - $75,000'),
    salary_mid: extractSalary(text, 'mid', '$80,000 - $110,000'),
    salary_senior: extractSalary(text, 'senior', '$115,000 - $150,000'),
    salary_ceiling: extractSalary(text, 'ceiling', defaults.salary_ceiling),
    salary_potential: extractSalary(text, 'potential', defaults.salary_potential),
    salary_key_factor: extractSection(text, ['key factor', 'factor', 'increase', 'clave'], defaults.salary_key_factor),
    top_demand_skills: extractListItems(text, ['demand skills', 'in-demand', 'demand_skills', 'demanda', 'demandadas'], defaults.top_demand_skills),
    gaining_demand: extractListItems(text, ['gaining', 'growing', 'crecimiento', 'ganando'], []),
    declining: extractListItems(text, ['declining', 'declive', 'declinando'], []),
    skill_gaps: extractListItems(text, ['skill gaps', 'gaps', 'missing', 'brechas'], defaults.skill_gaps),
    salary_impact_per_gap: [],
    time_to_learn: [],
    recommendations: extractBullets(text, defaults.recommendations),
    salary_increase_per_rec: [],
    timelines: []
  };
};

const getDefaultProfileAnalysis = (language = 'en') => {
  if (language === 'es') {
    return {
      strengths: 'Habilidades de desarrollo sólidas con enfoque en proyectos prácticos.',
      growth_areas: 'Considera expandir la diversidad de lenguajes y contribuir a proyectos open-source más grandes.',
      unique_value: 'Desarrollador activo con un portafolio en crecimiento.',
      recommendations: [
        'Construye un proyecto full-stack combinando tus lenguajes principales',
        'Contribuye a proyectos open-source populares en tu ecosistema',
        'Crea documentación completa y archivos README de calidad',
        'Comparte tu conocimiento a través de blogs o tutoriales'
      ]
    };
  }
  return {
    strengths: 'Strong development skills with a focus on practical projects.',
    growth_areas: 'Consider expanding language diversity and contributing to larger open-source projects.',
    unique_value: 'Active developer with a growing portfolio and consistent contribution pattern.',
    recommendations: [
      'Build a full-stack project combining your primary languages',
      'Contribute to trending open-source projects in your ecosystem',
      'Create comprehensive documentation and README files',
      'Share your knowledge through blog posts or tutorials'
    ]
  };
};

const getDefaultJobMarketInsights = (language = 'en') => {
  if (language === 'es') {
    return {
      employability_score: 72,
      employability_explanation: 'Buena base técnica con espacio para crecer en áreas de alta demanda.',
      current_roles: ['Desarrollador Junior', 'Desarrollador Full-stack'],
      demand_level: 'Demanda moderada para su conjunto de habilidades actual',
      competitive_advantages: 'Perfil de GitHub activo con contribuciones consistentes',
      salary_entry: '$55,000 - $75,000',
      salary_mid: '$80,000 - $110,000',
      salary_senior: '$115,000 - $150,000',
      salary_ceiling: '$110,000 USD',
      salary_potential: '$150,000 USD',
      salary_key_factor: 'Especializarse en tecnologías de alta demanda',
      top_demand_skills: ['JavaScript', 'React', 'TypeScript'],
      gaining_demand: [],
      declining: [],
      skill_gaps: [],
      salary_impact_per_gap: [],
      time_to_learn: [],
      recommendations: [
        'Especialízate en un framework o tecnología de alta demanda',
        'Construye un proyecto de portafolio que demuestre habilidades de arquitectura de software',
        'Contribuye a open source para aumentar tu visibilidad'
      ],
      salary_increase_per_rec: [],
      timelines: []
    };
  }
  return {
    employability_score: 72,
    employability_explanation: 'Solid technical foundation with room for growth in high-demand areas.',
    current_roles: ['Junior Developer', 'Full-stack Developer'],
    demand_level: 'Moderate demand for their current skill set',
    competitive_advantages: 'Active GitHub profile with consistent contributions',
    salary_entry: '$55,000 - $75,000',
    salary_mid: '$80,000 - $110,000',
    salary_senior: '$115,000 - $150,000',
    salary_ceiling: '$110,000',
    salary_potential: '$150,000',
    salary_key_factor: 'Building specialized expertise in high-demand technologies',
    top_demand_skills: ['JavaScript', 'React', 'TypeScript'],
    gaining_demand: [],
    declining: [],
    skill_gaps: [],
    salary_impact_per_gap: [],
    time_to_learn: [],
    recommendations: [
      'Specialize in a high-demand framework or technology',
      'Build a portfolio project demonstrating software architecture skills',
      'Contribute to open source to increase visibility'
    ],
    salary_increase_per_rec: [],
    timelines: []
  };
};

const extractSection = (text, keywords, fallback) => {
  if (!text) return fallback;
  const keywordsList = Array.isArray(keywords) ? keywords : [keywords];
  for (const keyword of keywordsList) {
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(
      `(?:${escapedKeyword}[\\s\\S]{0,20}?)[:\\s]*(.+?)(?:\n\n|\n(?=[A-Z\\d#ÁÉÍÓÚÑ])|$)`,
      'ims'
    );
    const match = text.match(regex);
    if (match) {
      const extracted = match[1].trim();
      if (extracted.length > 10 && extracted.length < 800) {
        return extracted;
      }
    }
  }
  return fallback;
};

const extractNumber = (text, keywords, fallback) => {
  if (!text) return fallback;
  const keywordsList = Array.isArray(keywords) ? keywords : [keywords];
  for (const keyword of keywordsList) {
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`${escapedKeyword}[\\s\\S]{0,30}?(\\d{1,3})`, 'i');
    const match = text.match(regex);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num >= 0 && num <= 100) return num;
    }
  }
  return fallback;
};

const extractSalary = (text, level, fallback) => {
  if (!text) return fallback;
  const regex = new RegExp(
    `${level}[\\s\\S]{0,30}?\\$?(\\d{2,3}[,\\d]*)\\s*-\\s*\\$?(\\d{2,3}[,\\d]*)`,
    'i'
  );
  const match = text.match(regex);
  if (match) {
    return `$${match[1]} - $${match[2]}`;
  }
  return fallback;
};

const extractListItems = (text, keywords, fallback) => {
  if (!text) return fallback;
  for (const keyword of keywords) {
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const sectionRegex = new RegExp(
      `${escapedKeyword}[\\s\\S]{0,50}?:?\\s*\\n((?:[-•*]\\s*.+\\n?)*)`,
      'i'
    );
    const sectionMatch = text.match(sectionRegex);
    if (sectionMatch) {
      const items = sectionMatch[1]
        .split('\n')
        .map(line => line.replace(/^[-•*]\s*/, '').trim())
        .filter(item => item.length > 0);
      if (items.length > 0) return items;
    }
  }
  return fallback;
};

const extractBullets = (text, fallback) => {
  if (!text) return fallback;
  const bullets = text.match(/[-•*]\s+.+/g);
  if (bullets && bullets.length > 0) {
    return bullets.map(b => b.replace(/^[-•*]\s+/, '').trim());
  }
  return fallback;
};

export const isGeminiConfigured = () => {
  return !!API_KEY;
};

export default {
  analyzeGitHubProfile,
  generateJobMarketInsights,
  generateCombinedAIInsights,
  parseProfileAnalysis,
  parseJobMarketInsights,
  isGeminiConfigured
};

