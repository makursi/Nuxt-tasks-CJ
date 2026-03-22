import db from "~/lib/db/index";

export default defineEventHandler(async () => {
  // 从数据库中获取所有任务
  // 返回给前端
  const result = await db.query.tasks.findMany();
  return result;
});
