import "express";

declare global {
  namespace Express {
    interface UserPayload {
      userId: string;
      role: "USER" | "ADMIN";
    }

    interface Request {
      user?: UserPayload;
    }
  }
}

export {};
