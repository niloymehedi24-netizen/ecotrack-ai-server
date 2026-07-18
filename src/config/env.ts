import dotenv from "dotenv";
dotenv.config();

// Create a safe reference to process.env
const env = process.env as Record<string, string | undefined>;

const getEnvVar = (key: string): string => {
  const value = env[key];
  if (!value) {
    console.error(`❌ Missing environment variable: ${key}`);
    process.exit(1);
  }
  return value;
};

export const ENV = {
  PORT: env["PORT"] ?? "8000",
  MONGODB_URI: getEnvVar("MONGODB_URI"),
  JWT_SECRET: getEnvVar("JWT_SECRET"),
  CLIENT_URL: getEnvVar("CLIENT_URL"),
} as const;
