<template>
  <section class="auth register">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="4">

          <h1 class="text-left mb-3">Sign Up</h1>

          <v-form ref="signUpFormRef" @submit.prevent="createUser()">

            <v-text-field
              v-model="signUpForm.name"
              :rules="rules.name"
              label="Name"
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="signUpForm.login"
              :rules="rules.login"
              label="Login"
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="signUpForm.email"
              :rules="rules.email"
              label="Email"
              class="mb-2"
            ></v-text-field>

            <v-combobox
              v-model="signUpForm.city"
              v-model:search="searchCityQuery"
              :items="cities"
              :rules="rules.city"
              item-title="fullAddress"
              label="City"
              :loading="loading.city"
              class="mb-2"
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
              ></v-text-field>

              <v-progress-linear
                :color="score.color"
                :model-value="score.value"
              ></v-progress-linear>
            </div>

            <v-text-field
              v-model="signUpForm.repeatPassword"
              :rules="[rules.repeatPassword, (v) => rules.match(v, signUpForm.password)]"
              :append-icon="password.isShowRepeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="password.isShowRepeatPassword ? 'text' : 'password'"
              @click:append="password.isShowRepeatPassword = !password.isShowRepeatPassword"
              label="Repeat password"
              class="mb-2"
            ></v-text-field>

            <div class="d-flex align-center">
              <v-btn class="mr-5" type="submit">
                Sign Up
              </v-btn>

              <span>
                Have an account?
                <NuxtLink to="login">Sign In</NuxtLink>
              </span>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>

    <ToastAlert ref="toastAlertRef"/>
  </section>
</template>

<script setup lang="ts">
import { useRegisterLogic } from './register';
import ToastAlert from "~/components/Toast/ToastAlert.vue";

const {
  signUpFormRef,
  signUpForm,
  searchCityQuery,
  cities,
  loading,
  password,
  rules,
  score,
  createUser,
  toastAlertRef
} = useRegisterLogic();
</script>
