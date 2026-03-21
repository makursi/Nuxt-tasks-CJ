// 它的目的是在应用程序启动时，自动检查 .env 文件中的环境变量是否符合预定义的规则。
// 如果缺少必填项或格式错误，它会立即抛出清晰的错误提示，防止程序在配置缺失的情况下“带病运行”。

import type { ZodObject, ZodRawShape } from "zod";

import { ZodError } from "zod";

export default function tryParseEnv<T extends ZodRawShape>(
  EnvSchema: ZodObject<T>,
  buildEnv: Record<string, string | undefined> = process.env,
) {
  try {
    EnvSchema.parse(buildEnv);
  } catch (error) {
    if (error instanceof ZodError) {
      let message = "Missing required values in .env:\n";
      error.issues.forEach((issue) => {
        message += `${issue.path[0]}\n`;
      });
      const e = new Error(message);
      e.stack = "";
      throw e;
    } else {
      console.error(error);
    }
  }
}
