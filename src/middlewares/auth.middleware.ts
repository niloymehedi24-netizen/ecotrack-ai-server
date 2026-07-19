// import type { NextFunction, Request, Response } from "express";

// import { verifyToken } from "../utils/jwt.js";

// export const authenticate = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     let token = req.cookies?.["token"];

//     // fallback: check Authorization header
//     if (!token) {
//       const authHeader = req.headers.authorization;

//       if (authHeader?.startsWith("Bearer ")) {
//         token = authHeader.split(" ")[1];
//       }
//     }

//     if (!token || typeof token !== "string") {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const decoded = verifyToken(token) as {
//       userId: string;
//       role: "USER" | "ADMIN";
//     };

//     req.user = decoded;

//     next();
//   } catch (error) {
//     console.error("Authentication error:", error);

//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1. Extract token from cookie or Authorization header
    let token = req.cookies?.["token"];

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. Explicitly check if token exists and is a valid string
    if (!token || typeof token !== "string") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // 3. Verify the token using the safer function
    const decoded = verifyToken(token) as {
      userId: string;
      role: "USER" | "ADMIN";
    } | null;

    // 4. If verifyToken returned null, the token is invalid or expired
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // 5. Attach user to request and proceed
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication",
    });
  }
};
