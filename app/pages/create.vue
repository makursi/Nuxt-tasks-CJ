<script setup lang="ts">
import type { FetchError } from "ofetch";
const task = ref({
    title: "",
    description: "",
});
const loading = ref(false);
const ErrorMessage = ref("");
const onSubmit = async () => {
    // 非空判断
    if (!task.value.title.trim()) {
        ErrorMessage.value = "Task is required.";
        return;
    }

    try {
        loading.value = true;

        await $fetch("/api/task", {
            method: "POST",
            body: {
                title: task.value.title,
                description: task.value.description,
            },
        });
        task.value = { title: "", description: "" };
    } catch (e) {
        const error = e as FetchError;
        ErrorMessage.value = error.statusMessage || "a unknow error occured";
        loading.value = false;
    }
};
</script>

<template>
    <div>
        <form @submit.prevent="onSubmit">
            <h1>Create Task</h1>
            <div v-if="ErrorMessage">{{ ErrorMessage }}</div>
            <label>title: <input type="text" v-model="task.title" /></label>
            <label
                >description:
                <textarea type="textarea" v-model="task.description" />
            </label>
            <button type="submit">Create</button>
        </form>
    </div>
</template>

<style lang="css" scoped></style>
