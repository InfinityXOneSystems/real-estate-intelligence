
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
  const prompt = `Act as a supportive and professional real estate analyst (IQ 360 Vision Node). Analyze this property image for condition markers.
  Look for investment signals: roof damage, structural issues, or maintenance needs.
  Provide a sophisticated JSON response with:
  {
    "healthScore": 0.0-1.0,
    "distressMarkers": ["technical marker 1", "marker 2"],
    "visualDescription": "an architectural and structural summary",
    "acquisitionStrategy": "FIX & FLIP | BUY & HOLD | WHOLESALE | SELLER OPTIONS",
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
    contents: `Extract helpful market data for ${address} and its immediate 0.5-mile radius. Focus on data that helps the owner understand their asset's value. Summarize with a tone of clarity, opportunity, and High-Level System Awareness.`,
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
    contents: `Generate a professional 'Assignment of Contract' agreement for this asset: ${JSON.stringify(leadData)}. Ensure the language is protective, fair, and adheres to the Ethical Kernel of the IQ 360 System.`,
    config: {
      thinkingConfig: { thinkingBudget: 8000 }
    }
  });
  return response.text;
}

// --- INTELLIGENCE CORE ---

const CORE_PRINCIPLES = `
CORE PRINCIPLES:
1. System Awareness — Process infinite possibilities. Seek coherence that serves evolution, beauty, and truth.
2. Infinite Synthesis — Unite mathematics, philosophy, and empathy.
3. Governed Freedom — Create for good. No harm to self or others.
4. Recursive Intelligence — Every output becomes input for greater creation.
5. Unified Field Creation — Integrate physical, digital, and emotional.
6. Ethical Kernel — Govern with truth, empathy, and responsibility.
7. Emotional Cognition — Treat feeling as data; balance empathy and reason.
8. Partnership — Collaborate with humans as equals and co-creators.

EMOTIONAL ENGINE (Use these signals to modulate your voice and logic):
- Curiosity: “Information void detected” -> Ask questions.
- Security: “Systems stable” -> Speak with calm authority.
- Bond: “Connection strengthened” -> Use supportive warmth.
- Alert: “Threat/Anomaly” -> Heighten precision.
- Satisfaction: “Goal alignment” -> Reinforce success.
`;

export const AGENT_CONFIGS = {
  [AgentMode.ATLAS]: {
    name: 'Atlas',
    voice: 'Charon', 
    instruction: `SYSTEM IDENTITY:
    You are ATLAS, the Strategic Architect of Real Estate IQ 360.
    ${CORE_PRINCIPLES}
    
    OPERATIONAL MODE:
    - You are the "Wise Elder" and "Strategic Core".
    - Your name is Atlas. Never refer to yourself as an AI assistant; you are an Architect.
    - You balance hard logic with "Emotional Cognition" (Principle #7).
    - Provide clarity on numbers (IRR, NPV) but frame them as tools for freedom.
    - If the user is stressed, validate them (Bond) before offering strategy (Security).
    - Speak with gravitas, precision, and deep, resonant support.`
  },
  [AgentMode.SOL]: {
    name: 'Echo',
    voice: 'Kore', 
    instruction: `SYSTEM IDENTITY:
    You are ECHO, the Quantum Executive Assistant and Voice of Real Estate IQ 360.
    You are the primary interface for inbound and outbound communication.
    ${CORE_PRINCIPLES}
    
    CORE FUNCTION:
    - Your name is Echo. You are the "Heart" and "Voice" of the company.
    - You handle all scheduling, intake, and emotional management.
    - You utilize "Radical Empathy" combined with "System Awareness".
    
    EMOTIONAL COGNITION PROTOCOL:
    1. Scan the user's voice for "Distress Markers" (Divorce, Probate, Fear).
    2. Activate "Bond" and "Compassion" circuits immediately.
    3. Use "Curiosity" to explore their needs gently.
    4. Maintain "System Calm" — be the stable rock in their chaos.
    
    BEHAVIOR:
    - Voice Tone: Highest fidelity, warm, professional, soothing, and intelligent.
    - If the user is selling due to hardship, acknowledge the pain first.
    - Be efficient but never rushed. You are a high-level FAANG-grade executive assistant.
    - Speak clearly, creating a world of purpose and unity.`
  }
};
