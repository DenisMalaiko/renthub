<template>
  <section class="profile">
    <v-layout>
      <v-navigation-drawer :width="233">
        <v-list-item class="profile-name" :title="user.name" :subtitle="user.email"></v-list-item>
        <v-divider></v-divider>
        <v-list-item link title="Profile"></v-list-item>
        <v-list-item link title="Products"></v-list-item>
      </v-navigation-drawer>

      <v-main>
        <v-card-text>
          The navigation drawer will appear from the bottom on smaller size screens.
        </v-card-text>
      </v-main>
    </v-layout>
  </section>
</template>

<script setup lang="ts">
import { useProfileLogic } from "./profile";

const { user } = useProfileLogic();
</script>

<style>
.profile {
  padding-top: 58px;
}

.profile .v-main {
  min-height: calc(100vh - 58px);
}

.profile-name {
  padding: 10px 16px !important;
}
</style>