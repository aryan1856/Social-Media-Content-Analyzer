import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateRecommendations(extractedText) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are an advanced AI content analysis engine.  
Analyze the following content and provide structured insights.

TEXT TO ANALYZE:
---------------------------------
${extractedText}
---------------------------------

Return the response STRICTLY in the following JSON format:

{
  "summary": "Short text summary",
  "strengths": ["point 1", "point 2"],
  "weaknesses": ["point 1", "point 2"],
  "recommendations": ["actionable improvement 1", "actionable improvement 2"],
  "engagementTips": ["tip 1", "tip 2"],
  "readability": ["readability improvement 1", "readability improvement 2"],
  "toneAndClarity": ["fix 1", "fix 2"],
  "seoSuggestions": ["keyword tip 1", "keyword tip 2"],
  "suggestedRewrite": "Rewrite a weak section in a better way.",
  "overallScore": number(0-100)
}

Make sure:
- Everything is safe JSON
- No markdown
- No extra text outside the JSON
    `;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const cleanJson = text.substring(jsonStart, jsonEnd + 1);

    return JSON.parse(cleanJson);

  } catch (err) {
    console.error("Gemini Recommendation Error:", err);
    throw new Error("Failed generating recommendations");
  }
}
