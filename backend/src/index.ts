import { createApp } from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";

const start = async (): Promise<void> => {
  await connectDb();
  const app = createApp();
  app.listen(env.PORT, () => {
    console.log(`GigFlow API running on port ${env.PORT}`);
  });
};

void start().catch((error: unknown) => {
  console.error("Failed to start GigFlow API", error);
  process.exit(1);
});
