import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import env from "./app/lib/env";

export default defineConfig({
  out: "./app/lib/db/migrations",
  schema: "./app/lib/db/schema.ts",
  casing: "snake_case",
  dialect: "turso",
  dbCredentials: {
    url: env.DB_FILE_NAME,
  },
});
