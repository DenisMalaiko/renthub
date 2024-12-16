<template>
  <v-dialog v-model="dialog" style="max-width: 450px">
    <v-card>
      <v-card-title>
        Edit Profile
      </v-card-title>

      <v-form ref="editProfileFormRef" @submit.prevent="editProfile()">
        <v-card-text class="pb-0">
          <v-text-field
            v-model="editProfileForm.name"
            :rules="rules.name"
            label="Name"
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="editProfileForm.login"
            :rules="rules.login"
            label="Login"
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="editProfileForm.email"
            :rules="rules.email"
            label="Email"
            class="mb-2"
          ></v-text-field>

          <v-combobox
            v-model="editProfileForm.city"
            v-model:search="searchCityQuery"
            :items="cities"
            :rules="rules.city"
            item-title="fullAddress"
            label="City"
            :loading="loadingCity"
            class="mb-2"
          />
        </v-card-text>

        <v-card-actions class="justify-end px-3 pt-0 pb-3">
          <v-btn @click="close()" color="primary">
            Close
          </v-btn>

          <v-btn type="submit" variant="flat" :loading="loading" color="primary">
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

    <ToastAlert ref="toastAlertRef"/>
  </v-dialog>
</template>

<script setup lang="ts">
import { useProfileDlgLogic } from "./ProfileDlg.ts";
import CitiesMixin from "~/composables/Cities";
import ToastAlert from "~/components/Toast/ToastAlert.vue";

const { cities, searchCityQuery, loadingCity } = CitiesMixin();
const { dialog, editProfileFormRef, editProfileForm, rules, open, close, editProfile, loading, toastAlertRef } = useProfileDlgLogic();

defineExpose({
  open
});
</script>

<style scoped>

</style>