import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js"; // Note the .js extension

const app = express();

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (_, res) => {
  res.send("EcoTrack AI Server Running...");
});

app.listen(ENV.PORT, () => {
  console.log(`🚀 Server running on port ${ENV.PORT}`);
});
