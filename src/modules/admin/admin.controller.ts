import type { Request, Response } from "express";
import {
  getDashboardStats,
  getAllUsers,
  getAnalytics,
} from "./admin.service.js";

export const dashboardStatsController = async (req: Request, res: Response) => {
  try {
    const data = await getDashboardStats();
    res.json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to load dashboard" });
  }
};

export const usersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to load users" });
  }
};

export const analyticsController = async (req: Request, res: Response) => {
  try {
    const analytics = await getAnalytics();
    res.json({ success: true, analytics });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed analytics" });
  }
};
