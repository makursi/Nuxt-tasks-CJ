import db from "~/lib/db/index";

import { tasks } from "~/lib/db/schema"
import { eq } from "drizzle-orm"

export default defineEventHandler(async (event)=>{
      try {
            const id = parseInt(event.context.params?.id || "", 10);
            const body = await readBody(event)

            //Id不规范报错
            if (isNaN(id)) {
                  return sendError(event, createError({ statusCode: 400, statusMessage: "Invalid ID" }))
            }


            const result = await db.update(tasks).set({
                  title: body.title,
                  description: body.description
            }).where(eq(tasks.id, id)).returning()


            if (result.length === 0) {
                  return sendError(event, createError({
                        statusCode: 404,
                        statusMessage: '未查找到该文章'
                  }))
            }


            return {
                  success: true,
                  data: result[0]
            }
}
      catch(error){
            console.error(error)
            return sendError(event,createError({
                   statusCode:500,
                   statusMessage:"Server Error"
            }))
      }
})

