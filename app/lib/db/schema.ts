import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

export const tasks = sqliteTable("tasks", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  done: int({ mode: "boolean" }).notNull().default(false),
  description: text(),
  createdAt: int().$defaultFn(() => Date.now()),
  updatedAt: int()
    .$defaultFn(() => Date.now())
    .$onUpdate(() => Date.now()),
});


//DTO, 仅定义传输数据对象schema,降低前后端耦合性
export const InsertTasksSchema = createInsertSchema(tasks, {
  title: (field) => field.min(1).max(500),
  description: (field) => field.min(1).max(500),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const PatchTasksSchema = InsertTasksSchema.partial();
