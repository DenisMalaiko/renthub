<template>
  <v-app>
    <HeaderNav />

    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import HeaderNav from "~/components/Header/HeaderNav.vue";
</script>

<style scoped></style>