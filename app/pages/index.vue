<script setup lang="ts">
const { data: tasks, error, status } = await useFetch("/api/task");

const deleteTask = async (id: number) => {
  try {
    await $fetch(`/api/${id}`, { method: "DELETE" });
    tasks.value = tasks.value?.filter((t: any) => t.id !== id);
  } catch (e) {
    console.error("Delete failed:", e);
  }
};
</script>

<template>
  <div class="container">
    <p v-if="status === 'pending'">Loading...</p>
    <p v-else-if="error">Failed to load tasks.</p>
    <article v-for="task in tasks" :key="task.id">
      <h2>{{ task.title }}</h2>
      <p>{{ task.description }}</p>
      <div style="display: flex; gap: 0.5rem;">
        <NuxtLink :to="`/${task.id}`">
          <button class="btn btn-primary">Edit</button>
        </NuxtLink>
        <button class="btn btn-primary" @click="deleteTask(task.id)">
          Delete
        </button>
      </div>
    </article>
  </div>
</template>

<style scoped></style>
