<template>
  <v-app>
    <HeaderNav />

    <v-main>
      <NuxtPage />
    </v-main>

    <Chat />
  </v-app>
</template>

<script lang="ts" setup>
import HeaderNav from "~/components/Header/HeaderNav.vue";
import Chat from "~/components/Chat/Chat.vue";
</script>

<style scoped></style>