import type { Request, Response } from "express";

import { registerUser, loginUser } from "./auth.service.js";

import { registerSchema, loginSchema } from "./auth.validation.js";

import { createToken } from "../../utils/jwt.js";

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

      secure: false,

      sameSite: "lax",

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,

      message: "User registered successfully",

      user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message: error.message,
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

      secure: false,

      sameSite: "lax",

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,

      message: "Login successful",

      user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

export const logoutController = (req: Request, res: Response) => {
  res.clearCookie("token");

  res.json({
    success: true,

    message: "Logged out successfully",
  });
};
