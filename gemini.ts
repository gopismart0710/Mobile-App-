
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const processDocumentWithAI = async (base64Image: string, lang: 'en' | 'ta') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image.split(',')[1] || base64Image,
            },
          },
          {
            text: `Analyze this bookkeeping document. Extract the following details: 
            - Total Amount
            - GST Amount
            - Date
            - Invoice Number
            
            Return ONLY a valid JSON object. 
            Use English keys: "totalAmount", "gstAmount", "date", "invoiceNumber".
            Language preference for values: ${lang === 'ta' ? 'Tamil' : 'English'}.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) return null;
    
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError, "Raw text:", text);
      return null;
    }
  } catch (error) {
    console.error("AI Processing Error:", error);
    return null;
  }
};

/**
 * Verifies GSTIN using Google Search grounding via Gemini
 * to simulate fetching data from the GST portal or public records.
 */
export const verifyGSTIN = async (gstin: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Look up the GSTIN "${gstin}" and find the registered "Legal Name of Business" or "Trade Name". 
      Check official GST records or public business registries. 
      Return the answer in JSON format with keys: "isValid" (boolean), "businessName" (string), "address" (optional object with street, city, district, state, pincode). 
      If not found, set isValid to false.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      },
    });

    const text = response.text;
    if (!text) return null;
    
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("GSTIN verification parse error", e);
      return null;
    }
  } catch (error) {
    console.error("GSTIN Verification Error:", error);
    return null;
  }
};
