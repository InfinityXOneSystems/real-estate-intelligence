
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { AgentMode } from "./types";

// Removed global API_KEY constant to follow named parameter initialization and direct process.env usage

/**
 * Creates a fresh Gemini instance using the environment's API key.
 * Guideline: Create a new GoogleGenAI instance right before making an API call.
 */
export const getGeminiInstance = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzePropertyImage(base64Image: string) {
  const ai = getGeminiInstance();
  const prompt = `Act as an elite real estate vision analyst. Analyze this property image for detailed distress markers. 
  Look specifically for high-impact investment signals: roof damage (tarps), structural degradation, deferred maintenance, vegetation ingress, and property neglect.
  Provide a sophisticated JSON response with:
  {
    "healthScore": 0.0-1.0,
    "distressMarkers": ["highly technical marker 1", "marker 2"],
    "visualDescription": "a high-end architectural and structural summary",
    "acquisitionStrategy": "FIX & FLIP | BUY & HOLD | WHOLESALE | DISPOSITION",
    "estimatedRehabComplexity": "Low/Medium/High"
  }`;

  // Guideline: DO NOT set responseMimeType for nano banana series models (e.g. gemini-2.5-flash-image)
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    }
  });

  // Extract text and clean up potential markdown formatting before parsing
  const cleanJson = response.text.replace(/```json\n?|```/g, '').trim();
  return JSON.parse(cleanJson || '{}');
}

export async function getMarketComps(address: string, lat?: number, lng?: number) {
  const ai = getGeminiInstance();
  // Guideline: Maps grounding is only supported in Gemini 2.5 series models.
  // Using 'gemini-2.5-flash' for combined search and maps grounding support.
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Extract mission-critical market data for ${address} and its immediate 0.5-mile radius. Focus on recent high-yield comps, absorption rates, and socio-economic sentiment. Summarize as if for a sovereign wealth fund architect.`,
    config: {
      tools: [{ googleSearch: {} }, { googleMaps: {} }],
      toolConfig: {
        retrievalConfig: lat && lng ? {
          latLng: { latitude: lat, longitude: lng }
        } : undefined
      }
    }
  });

  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
}

export async function generateLegalContract(leadData: any) {
  const ai = getGeminiInstance();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate an enterprise-grade 'Assignment of Contract' agreement for this sovereign asset: ${JSON.stringify(leadData)}. Ensure ironclad legal phrasing and SEC compliance markers.`,
    config: {
      thinkingConfig: { thinkingBudget: 8000 }
    }
  });
  return response.text;
}

export const AGENT_CONFIGS = {
  [AgentMode.ATLAS]: {
    name: 'Atlas',
    voice: 'Charon', 
    instruction: 'You are Atlas, the sovereign closer. Your language is precision, numbers, and IRR. Do not waste time on fluff. Secure the commitment through sheer competence.'
  },
  [AgentMode.SOL]: {
    name: 'Sol',
    voice: 'Kore', 
    instruction: 'You are Sol, the empathy architect. Solve the sellers life complexity through real estate disposition. Build deep rapport, understand the pain points, and offer the RE-IQ solution as the ultimate release.'
  }
};
