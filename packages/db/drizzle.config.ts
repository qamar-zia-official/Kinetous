import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// The repo-root `.env` is the shared source of truth for database tooling.
config({ path: "../../.env" });

export default defineConfig({
    out: "./drizzle",
    schema: "./src/schemas/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
