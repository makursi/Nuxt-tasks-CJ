<script setup lang="ts">
</script>

<template>
  <nav class="container">
    <ul>
      <li><NuxtLink to="/">Show Tasks</NuxtLink></li>
      <li><NuxtLink :to="{ name: 'create' }">Create Tasks</NuxtLink></li>
    </ul>
  </nav>
</template>

<style lang="css" scoped></style>
