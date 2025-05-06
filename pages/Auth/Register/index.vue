<template>
  <section class="auth register">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="4">

          <h1 class="text-left mb-3">Sign Up</h1>

          <v-form ref="signUpFormRef" @submit.prevent="createUser()" data-testid="register-form">

            <v-text-field
              v-model="signUpForm.name"
              :rules="rules.name"
              label="Name"
              class="mb-2"
              data-testid="name-input"
            ></v-text-field>

            <v-text-field
              v-model="signUpForm.login"
              :rules="rules.login"
              label="Login"
              class="mb-2"
              data-testid="login-input"
            ></v-text-field>

            <v-text-field
              v-model="signUpForm.email"
              :rules="rules.email"
              label="Email"
              class="mb-2"
              data-testid="email-input"
            ></v-text-field>

            <v-combobox
              v-model="signUpForm.city"
              v-model:search="searchCityQuery"
              :items="cities"
              :rules="rules.city"
              item-title="fullAddress"
              label="City"
              :loading="loadingCity"
              class="mb-2"
              data-testid="address-input"
            />

            <div class="label-password mb-4">
              <v-text-field
                v-model="signUpForm.password"
                :rules="rules.password"
                :append-icon="password.isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="password.isShowPassword ? 'text' : 'password'"
                @click:append="password.isShowPassword = !password.isShowPassword"
                label="Password"
                validate-on-blur
                data-testid="password-input"
              ></v-text-field>

              <v-progress-linear
                :color="score.color"
                :model-value="score.value"
              ></v-progress-linear>
            </div>

            <v-text-field
              v-model="signUpForm.repeatPassword"
              :rules="rules.repeatPassword"
              :append-icon="password.isShowRepeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="password.isShowRepeatPassword ? 'text' : 'password'"
              @click:append="password.isShowRepeatPassword = !password.isShowRepeatPassword"
              label="Repeat password"
              validate-on-blur
              class="mb-2"
              data-testid="repeat-password-input"
            ></v-text-field>

            <v-radio-group v-model="signUpForm.role" inline>
              <v-radio :value="UserTypes.User" color="primary" label="User"></v-radio>
              <v-radio :value="UserTypes.Admin" color="primary" label="Admin"></v-radio>
            </v-radio-group>

            <div class="d-flex align-center">
              <v-btn
                type="submit"
                :disabled="loading.creating"
                :loading="loading.creating"
                class="mr-5"
                color="primary"
              >
                Sign Up
              </v-btn>

              <span>
                Have an account?
                <NuxtLink to="login">Sign In</NuxtLink>
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
import { useRegisterLogic } from './register';
import { definePageMeta } from "~/.nuxt/imports";
import CitiesMixin from "~/composables/Cities";
import ToastAlert from "~/components/Toast/ToastAlert.vue";

definePageMeta({
  layout: 'auth'
});

const { cities, searchCityQuery, loadingCity } = CitiesMixin();

const {
  signUpFormRef,
  signUpForm,
  loading,
  password,
  rules,
  score,
  createUser,
  toastAlertRef,
  UserTypes
} = useRegisterLogic();
</script>
