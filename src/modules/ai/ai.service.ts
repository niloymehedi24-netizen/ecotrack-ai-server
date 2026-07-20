import Groq from "groq-sdk";

import { ENV } from "../../config/env.js";
import { aiConversationCollection } from "./ai.collection.js";

import type { AIMessage, AIConversation } from "./ai.types.js";

const groq = new Groq({
  apiKey: ENV.GROQ_API_KEY,
});

export const generateAIResponse = async (message: string, userId: string) => {
  const collection = aiConversationCollection();

  const previousConversation = await collection.findOne<AIConversation>({
    userId,
  });

  const history: AIMessage[] = previousConversation?.messages ?? [];

  const messagesForGroq = [
    {
      role: "system" as const,
      content:
        "You are EcoTrack AI Assistant. Help users with sustainability, eco-friendly lifestyle, energy saving, waste reduction, and environmental improvement. Give practical, professional, and concise advice.",
    },

    ...history.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),

    {
      role: "user" as const,
      content: message,
    },
  ];

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: messagesForGroq,
    temperature: 0.7,
    max_tokens: 500,
  });

  const response =
    completion.choices[0]?.message?.content ??
    "Sorry, I could not generate a response.";

  const updatedMessages: AIMessage[] = [
    ...history,
    {
      role: "user",
      content: message,
    },
    {
      role: "assistant",
      content: response,
    },
  ];

  await collection.updateOne(
    { userId },
    {
      $set: {
        userId,
        messages: updatedMessages,
        createdAt: new Date(),
      },
    },
    { upsert: true },
  );

  return response;
};

export const getAIHistory = async (userId: string) => {
  return aiConversationCollection().findOne<AIConversation>({
    userId,
  });
};
