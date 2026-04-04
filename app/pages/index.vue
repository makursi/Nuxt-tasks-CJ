<script setup lang="ts">
// 使用$fetch 获取数据
const { data: tasks, error, status ,refresh} = await useFetch("/api/task");

const deleteTask = async (id:number)=>
{
     try 
     {
         const result = await $fetch(`/api/${id}`,{
             method:"DELETE"
         })
         refresh();
         if(result){
            alert("删除任务成功")
         }
    
     }
      catch(error){
            console.error('删除任务失败:',error)
            alert('删除任务失败,请稍后重试')
      }
}


//更新任务
const updateTask = async (id:number)=>{
    navigateTo(`/${id}`)
}
</script>

<template>
    <div class="container">
        <article v-for="task in tasks" :key="task.id">
            <h2>{{ task.title }}</h2>
            <p>{{ task.description }}</p>
            <div>
                <button class="btn btn-primary" @click="deleteTask(task.id)">
                    删除
                </button>
                <button class="btn btn-primary" @click="updateTask(task.id)">
                    编辑
                </button>
            </div>
        </article>
    </div>
</template>

<style scoped>

button {
     margin: 10px
}
 </style>
