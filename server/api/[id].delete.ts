import db from "~/lib/db/index";

import {tasks} from "~/lib/db/schema"
import { eq } from "drizzle-orm"
export default defineEventHandler(async (event)=>{
   
try {
  const taskId = parseInt(event.context.params?.id || "",10);

  if (isNaN(taskId)){
     return sendError(event,createError({
       statusCode:400,
       statusMessage:"Invalid task ID"
     }))
  }


  //从数据库删除文章

   const result = await db.delete(tasks).where(eq(tasks.id,taskId))

    if(
       result.rowsAffected === 0
    ){
      return sendError(
        event,
         createError({
          statusCode:404,
          statusMessage:"Task not found"
         })
      )
    }
     
    return { 
       success:true,
       message:"Task deleted successfully"
    }
} catch (error) {
  console.error("Error deleting task:", error);

  return sendError(event,createError({
     statusCode:500,
     statusMessage:"Server error"
  }))
}
})