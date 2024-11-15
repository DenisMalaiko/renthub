<template>
  <section class="profile-section">
    <ul class="profile-section-list">
      <li>
        <b>Name: </b> {{ user.name }}
      </li>
      <li>
        <b>Login: </b> {{ user.login }}
      </li>
      <li>
        <b>Email: </b> {{ user.email }}
      </li>
      <li>
        <b>City: </b> {{ user.city?.fullAddress }}
      </li>
    </ul>

    <div class="profile-section-actions">
      <v-btn @click="editProfile()" color="primary">
        Edit
      </v-btn>
    </div>

    <ProfileDlg ref="profileDlgRef"/>
  </section>
</template>

<script lang="ts" setup>
import {definePageMeta} from "~/.nuxt/imports";
import {useProfileLogic} from "~/pages/Auth/Profile/profile";
import ProfileDlg from "~/components/ProfileDlg/ProfileDlg.vue";

definePageMeta({
  layout: "profile"
})

const {
  user,
  profileDlgRef,
  editProfile
} = useProfileLogic()
</script>

<style>
</style>