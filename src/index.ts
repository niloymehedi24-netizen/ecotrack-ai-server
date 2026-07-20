import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { ENV } from "./config/env.js";

import { connectDB } from "./config/db.js";
import router from "./routes/index.js";
import helmet from "helmet";

const app = express();

app.use(
  helmet({
    crossOriginOpenerPolicy: {
      policy: "unsafe-none",
    },
  }),
);

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

// API routes
app.use("/api", router);

app.get("/", (_, res) => {
  res.send("EcoTrack AI Server Running...");
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(ENV.PORT, () => {
      console.log(`🚀 Server running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);

    process.exit(1);
  }
};

startServer();
