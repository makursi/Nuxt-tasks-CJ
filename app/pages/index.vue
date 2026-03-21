<script setup lang="ts">
// 使用$fetch 获取数据
const { data: tasks, error, status } = await useFetch("/api/task");
</script>

<template>
    <div class="container">
        <article v-for="task in tasks" key="task.id"></article>
    </div>
</template>

<style scoped></style>
