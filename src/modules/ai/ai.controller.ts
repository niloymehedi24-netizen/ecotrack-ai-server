import type { Request, Response } from "express";

import { generateAIResponse, getAIHistory } from "./ai.service.js";

export const chatController = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const aiResponse = await generateAIResponse(message, userId);

    return res.status(200).json({
      success: true,
      response: aiResponse,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "AI response failed",
    });
  }
};

export const historyController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const history = await getAIHistory(userId);

    return res.json({
      success: true,
      history,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch history",
    });
  }
};
