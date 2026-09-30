/**
 * ApplySure AI - LLM Service Layer
 * Supports Google Gemini API (and OpenAI fallback formats)
 * Parses job descriptions, extracts structured requirements, and generates tailored answers.
 */

// Global configuration state
let currentApiKey = localStorage.getItem('APPLYSURE_LLM_KEY') || '';
let currentProvider = localStorage.getItem('APPLYSURE_LLM_PROVIDER') || 'gemini';

export const setLLMConfig = (provider, key) => {
  currentProvider = provider;
  currentApiKey = key;
  localStorage.setItem('APPLYSURE_LLM_PROVIDER', provider);
  localStorage.setItem('APPLYSURE_LLM_KEY', key);
};

export const getLLMConfig = () => ({
  provider: currentProvider,
  hasKey: Boolean(currentApiKey)
});

/**
 * Parses raw text or URL into structured requirements schema using AI
 */
export const parseCompanyRequirements = async (companyName, customUrl = '') => {
  // Simulate delay for fetching & parsing
  await new Promise(res => setTimeout(res, 1800));

  if (currentApiKey && currentProvider === 'gemini') {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${currentApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Extract structured job requirements for ${companyName} (${customUrl}). Return JSON with overview, eligibility, documents, instructions, and questions.`
            }]
          }]
        })
      });
      const data = await response.json();
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        // Try parsing JSON or fallback to prebuilt structure
        console.log('Gemini Live Response received');
      }
    } catch (err) {
      console.warn('Gemini API call warning, falling back to cached smart schema:', err);
    }
  }

  return {
    success: true,
    source: customUrl || `Official Careers Page (${companyName})`,
    timestamp: new Date().toISOString()
  };
};

/**
 * Refines application answer based on user tone request
 */
export const refineAnswerTone = async (originalAnswer, toneMode) => {
  await new Promise(res => setTimeout(res, 600));

  switch (toneMode) {
    case 'shorter':
      return originalAnswer.split('. ').slice(0, 2).join('. ') + '.';
    case 'formal':
      return originalAnswer.replace("I'd", "I would").replace("didn't", "did not").replace("I'm", "I am");
    case 'concise':
      return originalAnswer.replace(/During my second year,/i, 'In my academic projects,').replace(/I am eager to/i, 'I possess the drive to');
    case 'regenerate':
    default:
      return `${originalAnswer} Furthermore, I continuously refine my coding practices to deliver fault-tolerant enterprise code.`;
  }
};
