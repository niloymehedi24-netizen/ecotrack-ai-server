import type { Request, Response } from "express";
import { recommendationValidationSchema } from "./recommendation.validation.js";
import { generateRecommendations } from "./recommendation.service.js";

export const recommendationController = async (req: Request, res: Response) => {
  try {
    const validation = recommendationValidationSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: validation.error.message,
      });
    }

    const recommendations = await generateRecommendations(validation.data);

    res.status(200).json({
      success: true,
      recommendations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate recommendations",
    });
  }
};
