
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateProductListing = async (imageB64?: string, textPrompt?: string) => {
  const ai = getAI();
  const parts: any[] = [];
  
  if (imageB64) {
    parts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageB64.split(',')[1] || imageB64
      }
    });
  }
  
  const prompt = textPrompt 
    ? `Crie um anúncio de marketplace para este produto: ${textPrompt}.`
    : "Analise a imagem deste produto e crie um anúncio profissional para um marketplace estilo Mercado Livre.";

  parts.push({ text: prompt });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ parts }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Título atraente do produto" },
          description: { type: Type.STRING, description: "Descrição detalhada do produto" },
          suggestedPrice: { type: Type.NUMBER, description: "Preço sugerido baseado no mercado brasileiro (BRL)" },
          category: { type: Type.STRING, description: "Categoria do produto" },
          keywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Tags para busca" }
        },
        required: ["title", "description", "suggestedPrice", "category"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Erro ao parsear resposta da IA", e);
    return null;
  }
};

export const chatWithSellerAI = async (productTitle: string, userMessage: string, chatHistory: {role: 'user' | 'model', parts: {text: string}[]}[]) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: `Você é um vendedor prestativo no marketplace LivreStore. Você está vendendo o produto: "${productTitle}". Responda às dúvidas dos clientes de forma educada, curta e persuasiva. Use português do Brasil.`,
    }
  });

  const result = await chat.sendMessage(userMessage);
  return result.text;
};
