import type { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { registerUser, loginUser } from "./auth.service.js";

import { registerSchema, loginSchema } from "./auth.validation.js";

import { usersCollection } from "./auth.collection.js";

import { createToken } from "../../utils/jwt.js";

import { googleLoginService } from "./google.service.js";

export const registerController = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const user = await registerUser(validatedData);

    const token = createToken({
      userId: user._id.toString(),
      role: user.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Change to true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Registration failed",
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = await loginUser(validatedData);

    const token = createToken({
      userId: user._id.toString(),
      role: user.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Change to true in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
};

export const googleLoginController = async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required",
      });
    }

    const result = await googleLoginService(credential);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Google login successful",
      user: result.user,
    });
  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Google login failed",
    });
  }
};

export const logoutController = (_req: Request, res: Response) => {
  res.clearCookie("token");

  return res.json({
    success: true,
    message: "Logged out successfully",
  });
};

export const meController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await usersCollection().findOne({
      _id: new ObjectId(req.user.userId),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
