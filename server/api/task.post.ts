// 导入数据库实例
import db from "~/lib/db/index";
// 导入插入数据schema
import { InsertTasksSchema, tasks } from "~/lib/db/schema";

export default defineEventHandler(async (event) => {
  try {
    const result = await readValidatedBody(event, InsertTasksSchema.safeParse);

    // 如果解析失败，返回错误
    if (!result.success) {
      return sendError(
        event,
        createError({
          statusCode: 500,
          statusMessage: "Server error",
        }),
      );
    }

    // 进行插入数据库操作
    const [created] = await db.insert(tasks).values(result.data).returning();
    return created;
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invalid input",
      }),
    );
  }
});
