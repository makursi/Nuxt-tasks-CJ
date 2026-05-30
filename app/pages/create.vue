<script setup lang="ts">
import type { FetchError } from "ofetch";

interface TaskForm {
  title: string;
  description: string;
}

const task = ref<TaskForm>({ title: "", description: "" });
const loading = ref(false);
const errorMessage = ref("");

const onSubmit = async () => {
  if (!task.value.title.trim()) {
    errorMessage.value = "Task is required.";
    return;
  }

  errorMessage.value = "";
  loading.value = true;

  try {
    await $fetch("/api/task", {
      method: "POST",
      body: {
        title: task.value.title,
        description: task.value.description,
      },
    });
    task.value = { title: "", description: "" };
    navigateTo("/");
  } catch (e) {
    const error = e as FetchError;
    errorMessage.value = error.statusMessage || "An unknown error occurred";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit">
      <h1>Create Task</h1>
      <div v-if="errorMessage">{{ errorMessage }}</div>
      <label>title: <input type="text" v-model="task.title" /></label>
      <label>
        description:
        <textarea v-model="task.description"></textarea>
      </label>
      <button type="submit" :disabled="loading">
        {{ loading ? "Creating..." : "Create" }}
      </button>
    </form>
  </div>
</template>

<style lang="css" scoped></style>
