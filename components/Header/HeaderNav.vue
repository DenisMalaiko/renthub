<template>
  <nav class="header">
    <v-container>
      <v-row>
        <v-col cols="2">
          <div class="header-logo">
            <NuxtLink to="/">
              <b> {{ logo }} </b>
            </NuxtLink>
          </div>
        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="3">
          <div class="header-menu">
            <ul class="header-menu-list">
              <li>
                <NuxtLink to="/auth/login">
                  <b> Login </b>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const logo = ref("RentHub")
</script>

<style src="./HeaderNav.scss" lang="scss" scoped></style>
