<template>
  <section class="auth login">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="4">

          <h1 class="text-left mb-3">Sign In</h1>

          <v-form ref="signInFormRef" @submit.prevent="login()">
            <v-text-field
              v-model="signInForm.email"
              :rules="rules.email"
              label="Email"
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="signInForm.password"
              :rules="rules.password"
              :append-icon="password.isShowRepeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="password.isShowRepeatPassword ? 'text' : 'password'"
              @click:append="password.isShowRepeatPassword = !password.isShowRepeatPassword"
              label="Password"
              class="mb-2"
            ></v-text-field>

            <div class="d-flex align-center">
              <v-btn
                class="mr-5"
                type="submit"
                :disabled="loading.creating"
                :loading="loading.creating"
                color="primary"
              >
                Sign In
              </v-btn>

              <span>
                Don't have an account?
                <NuxtLink to="/auth/register">Sign Up</NuxtLink>
                <br>
                Or can go back to
                <NuxtLink to="/">Home</NuxtLink>
              </span>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>

    <ToastAlert ref="toastAlertRef"/>
  </section>
</template>

<script lang="ts" setup>
import { useLoginLogic } from "./login";
import { definePageMeta } from "~/.nuxt/imports";
import ToastAlert from "~/components/Toast/ToastAlert.vue";

definePageMeta({
  layout: 'auth'
})

const {
  signInForm,
  signInFormRef,
  rules,
  login,
  toastAlertRef,
  loading,
  password
} = useLoginLogic();
</script>
