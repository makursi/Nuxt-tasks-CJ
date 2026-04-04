
import db from "~/lib/db/index";
import { tasks } from "~/lib/db/schema"
import { eq } from "drizzle-orm"
export default defineEventHandler(async (event) => {
  // 从数据库中获取单个任务任务
  const id = parseInt(event.context.params?.id || "", 10);

  if (isNaN(id)) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: "Invalid task ID"
    }))
  }
  //查询单条数据并返回
  const result = await db.query.tasks.findFirst({
     where:eq(tasks.id,id)
  })

  return result;
});
