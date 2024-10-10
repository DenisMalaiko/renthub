<template>
  <section class="auth profile">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="4">
          <h1>Profile:</h1>
          <pre>{{ user }}</pre>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { useProfileLogic } from "./profile";

const { user } = useProfileLogic();
</script>