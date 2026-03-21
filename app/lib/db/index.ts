// 连接数据库, 导出数据库实例
import "dotenv/config";
import { drizzle } from "drizzle-orm/tursodatabase/database";

// 导入解析后的环境变量
import env from "../env";

// 导入数据库表
import * as schema from "./schema";

const db = drizzle({
  connection: {
    url: env.DB_FILE_NAME,
  },
  casing: "snake_case",
  schema,
});

export default db;
