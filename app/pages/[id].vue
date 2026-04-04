<script setup lang="ts">
import { useRoute } from "nuxt/app";
import type { FetchError} from "ofetch";
//获取路由id--正常使用slug
const route = useRoute();
const ErrorMessage = ref("");
const form = ref<{ title: string, description: string }>({
  title: "",
  description: ""
})
const id = parseInt(route.params.id as string)
//1.获取数据
// 3. 获取任务详情
const { data: task } = useFetch(`/api/${id}`, {
  immediate: true,
  transform(data) {
    // 使用transform做预渲染,数据回来后，立即赋值给表单
    form.value = { ...data };
    return data;
  },
});

//本地化存储



//2.更新表单数据
const updateTask = async ()=>{ 

  try {
    const result = await $fetch(`/api/${id}`, {
      method: "PUT",
      body: {
        title: form.value.title,
        description: form.value.description,
      },
    });
    
    if(result){
       alert('更新成功')
       navigateTo('/')
    }
  } catch (e) {
    const error = e as FetchError;
    ErrorMessage.value = error.statusMessage || "a unknow error occured";
  }
}

</script>

<template>
  <div>
     
     <h1>更新任务</h1>
      <form @submit.prevent="updateTask">
        <label for="title">标题:<input type="text" name="title" v-model="form.title"></label>
        <p>
          <label for="description">描述：<textarea type="textarea" name="description" v-model="form.description"/></label>
        </p>
        <button type="submit">保存更新</button>
      </form>


  </div>
</template>

<style lang="css" scoped>

</style>