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
              label="Password"
              class="mb-2"
            ></v-text-field>

            <div class="d-flex align-center">
              <v-btn class="mr-5" type="submit">
                Sign In
              </v-btn>

              <span>
                Don't have an account?
                <NuxtLink to="register">Sign Up</NuxtLink>
              </span>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import {reactive, ref, computed} from "vue";
import {ValidationsRules} from "~/utils/validations-rules";
import {Auth} from "~/models/Auth";

const signInFormRef = ref();
const signInForm: Auth = reactive(new Auth());

const rules = computed(() => {
  return {
    email: [ValidationsRules.required],
    password: [ValidationsRules.required],
  }
})

async function login(){
  const valid = signInFormRef.value.isValid;

  if(valid) {
    console.log("VALID")
  }
}
</script>
