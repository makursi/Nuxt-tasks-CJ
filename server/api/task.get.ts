import db from "~/lib/db/index";

export default defineEventHandler(async (event) => {
  const result = await db.query.tasks.findMany();
  return result;
});
