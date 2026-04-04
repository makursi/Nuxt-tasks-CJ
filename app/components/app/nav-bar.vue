<script setup lang="ts">
// 使用props 进行封装组件
const props = defineProps(["title", "description"]);
</script>

<template>
    <div>
        <nav class="container">
            <div>
                <NuxtLink to="/">Show Tasks</NuxtLink>
            </div>
            <div>
                <NuxtLink :to="{ name: 'create' }">Create Tasks</NuxtLink>
            </div>
        </nav>
    </div>
</template>

<style lang="css" scoped></style>
