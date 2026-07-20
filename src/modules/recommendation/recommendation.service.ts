import Groq from "groq-sdk";
import { ENV } from "../../config/env.js";
import type { RecommendationInput } from "./recommendation.types.js";

const groq = new Groq({
  apiKey: ENV.GROQ_API_KEY,
});

export const generateRecommendations = async (data: RecommendationInput) => {
  const prompt = `
You are EcoTrack AI, a professional sustainability recommendation assistant.

User preferences:
- Preferred category: ${data.category}
- Monthly budget: $${data.budget}
- Sustainability goal: ${data.goal}
- Living type: ${data.livingType}

Generate 3-5 personalized eco-friendly recommendations.

For each recommendation, provide:
1. Recommendation title
2. Why it is suitable for the user
3. Estimated impact or benefit

Keep the response concise, practical, and professional.
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are EcoTrack AI, an expert in sustainability and eco-friendly recommendations.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 600,
  });

  return completion.choices[0]?.message?.content ?? "";
};
