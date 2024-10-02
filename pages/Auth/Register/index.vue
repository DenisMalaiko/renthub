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
              v-model="signUpForm.city.cityName"
              v-model:search="searchCityQuery"
              :items="cities"
              :rules="rules.city"
              item-title="cityName"
              label="City"
              :loading="loading.city"
              class="mb-2"
            />

            <div class="label-password mb-2">
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
                :value="score.value"
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

      <v-row>
        <v-col cols="12">
          <pre>{{ signUpForm }}</pre>
        </v-col>
      </v-row>
    </v-container>

    <ToastAlert ref="toastAlertRef"/>
  </section>
</template>

<script setup lang="ts">
import ToastAlert from "~/components/Toast/ToastAlert.vue";
import {reactive, ref, computed, watch} from "vue";
import {ValidationsRules} from "~/utils/validations-rules";
import {User} from "~/models/User";

const signUpFormRef = ref();
const searchCityQuery = ref('');
let cities: any = ref([]);
const toastAlertRef = ref();


const loading = reactive({
  city: false
});
let signUpForm: User = reactive(new User());
const password = reactive({
  isShowPassword: false,
  isShowRepeatPassword: false
})



const rules = computed(() => {
  return {
    name: [ValidationsRules.required],
    login: [ValidationsRules.required],
    email: [ValidationsRules.required, ValidationsRules.email],
    city: [ValidationsRules.required],
    password: [ValidationsRules.required, ValidationsRules.minPassword, ValidationsRules.hasUpperCase, ValidationsRules.hasNumber],
    repeatPassword: [ValidationsRules.required],
    match: ValidationsRules.match,
  }
});
const score = computed(() => {
  const result = calculateScore(signUpForm.password);

  switch (result) {
    case 4:
      return {
        color: "light-blue",
        value: 100
      };
    case 3:
      return {
        color: "light-green",
        value: 75
      };
    case 2:
      return {
        color: "yellow",
        value: 50
      };
    case 1:
      return {
        color: "orange",
        value: 25
      };
    default:
      return {
        color: "red",
        value: 0
      };
  }
});


async function searchPlaces(city: string) {
  const url = `http://localhost:8080/searchCity?city=${city}`;

  try {
    loading.city = true;
    const response = await fetch(url);
    const data = await response.json();
    console.log("DATA ", data)
    cities.value = data;
    loading.city = false;
  } catch (error) {
    console.error('Помилка при пошуку місця:', error);
    return [];
  }
}

function calculateScore(password: string) {
  return rules.value.password.reduce((count, rule) => {
    return count + (rule(password) === true ? 1 : 0);
  }, 0);
}

async function createUser() {
  const valid = signUpFormRef.value.validate();

  if(!valid) {
    return;
  }

  console.log("VALID")
  console.log(signUpForm)

  const requestBody = { query: `mutation { createUser(userInput: { name: "${signUpForm.name}", login: "${signUpForm.login}", email: "${signUpForm.email}", city: { cityId: "${signUpForm.city.cityId}", cityName: "${signUpForm.city.cityName}", cityFullName: "${signUpForm.city.cityFullName}" }, password: "${signUpForm.password}" }) { _id email } }` };

  try {
    const response = await fetch('http://localhost:8080/graphql', {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const responseData = await response.json();
    console.log("RESPONSE DATA", responseData);

    if (!response.ok) {
      throw new Error(responseData.errors ? responseData.errors.map((e: any) => e.message).join(', ') : 'Unknown error');
    }

    toastAlertRef.value.open({
      status: "success",
      message: "User has been successfully created!"
    });

    signUpForm = new User();

    console.log("signUpFormRef ", signUpForm)


  } catch (err: any) {
    console.log("ERROR ", err.message)
  }
}

watch(searchCityQuery, (newValue) => {
  if(newValue && newValue.length >= 3) {
    searchPlaces(newValue);
  }
});
</script>
