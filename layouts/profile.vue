<template>
  <v-app>
    <HeaderNav />

    <section class="profile">
      <v-layout>
        <v-navigation-drawer :width="233">
          <v-list-item class="profile-name" :title="user.name" :subtitle="user.email"></v-list-item>
          <v-divider></v-divider>
          <v-list-item link to="/auth/profile/" title="Profile"></v-list-item>
          <v-list-item link to="/auth/profile/products" title="Products"></v-list-item>
        </v-navigation-drawer>

        <v-main>
          <NuxtPage />
        </v-main>
      </v-layout>
    </section>
  </v-app>
</template>

<script lang="ts" setup>
import { UserModule } from "~/store/user";
import {UserProfile} from "~/models/user/UserProfile";
import HeaderNav from "~/components/Header/HeaderNav.vue";
import {onMounted} from "vue";
import {useRouter} from "nuxt/app";

const router = useRouter()
const userModule = UserModule();
const user: UserProfile = userModule.user;

onMounted(() => {
  if(!user.token) {
    router.push('/auth/login')
  }
})
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

.profile-section {
  padding: 20px;
}

.profile-section-list li {
  margin-bottom: 5px;
}
</style>