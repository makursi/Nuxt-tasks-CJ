import { z } from "zod";

import tryParseEnv from "./try-parse-env";

const EnvSchema = z.object({
  TURSO_DATABASE_URL: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

tryParseEnv(EnvSchema);

// 导出解析后的环境变量
export default EnvSchema.parse(process.env);
