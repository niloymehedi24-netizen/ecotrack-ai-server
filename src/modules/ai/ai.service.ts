import { GoogleGenerativeAI } from "@google/generative-ai";

import { ENV } from "../../config/env.js";

import { aiConversationCollection } from "./ai.collection.js";

import type { AIMessage, AIConversation } from "./ai.types.js";

const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);

export const generateAIResponse = async (message: string, userId: string) => {
  const collection = aiConversationCollection();

  const previousConversation = await collection.findOne<AIConversation>({
    userId,
  });

  const history: AIMessage[] = previousConversation
    ? previousConversation.messages
    : [];

  const conversationText = history
    .map((msg: AIMessage) => `${msg.role}: ${msg.content}`)
    .join("\n");

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const prompt = `
You are EcoTrack AI Assistant.

Your job is to help users with:
- sustainability
- eco-friendly lifestyle
- energy saving
- waste reduction
- environmental improvement

Previous conversation:

${conversationText}


Current user message:

${message}


Give practical, professional and concise advice.
`;

  const result = await model.generateContent(prompt);

  const response = result.response.text();

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
    {
      userId,
    },

    {
      $set: {
        userId,

        messages: updatedMessages,

        createdAt: new Date(),
      },
    },

    {
      upsert: true,
    },
  );

  return response;
};

export const getAIHistory = async (userId: string) => {
  const history = await aiConversationCollection().findOne<AIConversation>({
    userId,
  });

  return history;
};
