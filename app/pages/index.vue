<script setup lang="ts">
// 使用$fetch 获取数据
const { data: tasks, error, status } = await useFetch("/api/task");
</script>

<template>
    <div class="container">
        <article v-for="task in tasks" key="task.id">
            <h2>{{ task.title }}</h2>
            <p>{{ task.description }}</p>
        </article>
    </div>
</template>

<style scoped></style>
