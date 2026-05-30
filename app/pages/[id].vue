<script setup lang="ts">
import type { FetchError } from "ofetch";

const route = useRoute();
const errorMessage = ref("");
const form = ref<{ title: string; description: string }>({
  title: "",
  description: "",
});

const id = parseInt(route.params.id as string);

const { data: task, status } = useFetch(`/api/${id}`, {
  immediate: true,
  transform(data) {
    form.value = { title: data.title, description: data.description || "" };
    return data;
  },
});

const updateTask = async () => {
  try {
    await $fetch(`/api/${id}`, {
      method: "PUT",
      body: {
        title: form.value.title,
        description: form.value.description,
      },
    });
    navigateTo("/");
  } catch (e) {
    const error = e as FetchError;
    errorMessage.value = error.statusMessage || "An unknown error occurred";
  }
};
</script>

<template>
  <div>
    <p v-if="status === 'pending'">Loading...</p>
    <template v-else>
      <h1>Update Task</h1>
      <div v-if="errorMessage">{{ errorMessage }}</div>
      <form @submit.prevent="updateTask">
        <label for="title">
          Title:
          <input type="text" name="title" v-model="form.title" />
        </label>
        <p>
          <label for="description">
            Description:
            <textarea name="description" v-model="form.description"></textarea>
          </label>
        </p>
        <button type="submit">Save</button>
      </form>
    </template>
  </div>
</template>

<style lang="css" scoped></style>
