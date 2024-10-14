<template>
  <section class="section">
    <v-container>
      <v-row>
        <v-col cols="4">
          <h2>{{ user.name }}</h2>
          <p>{{ user.login }}</p>


          <br><br><br>
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