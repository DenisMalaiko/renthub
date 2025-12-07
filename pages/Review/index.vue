<script setup lang="ts">
  import Child from './Child/Child.vue';
  import {onBeforeMount, onMounted, reactive, ref, shallowRef, watch, watchEffect} from "vue";
  import type { User } from "~/pages/Review/interfaces/User";
  import { useUserForm } from "~/pages/Review/composable/useUserForm";
  const { message, messageComputed, log } = useUserForm();

  const user = shallowRef<User>({
    name: "",
    email: "",
    age: null,
    location: {
      country: "",
      city: "",
    }
  });

  const showAlert = ref(false)

  const getForm = (user: User) => {
    console.log("GET FORM IN PARENT")
    console.log(user)
  }

  const updateUser = () => {
    user.value = {
      name: "Name",
      email: "Email",
      age: 25,
      location: {
        country: "Ukraine",
        city: "Lviv",
      }
    }
  }

  const openModal = () => {
    console.log("OPEN MODAL");
    showAlert.value = !showAlert.value;
  }

  onBeforeMount(() => {
    console.log("ON BEFORE MOUNT PARENT")
  })

  onMounted(() => {
    console.log("ON MOUNTED PARENT")
  })
</script>

<template>
  <section class="mt-15">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h3>Parent</h3>
          <pre>{{ user }}</pre>
          <v-btn @click="updateUser">Update User</v-btn>
          <v-btn @click="log">Log</v-btn>

          <br><br><br><br><br>
          <v-btn @click="openModal">Open Modal {{ showAlert }}</v-btn>
          <teleport to="#alert">
            <div v-if="showAlert" class="alert">
              TELEPORT ALERT
            </div>
          </teleport>

          <br><br><br><br><br>
          <Suspense>
            <template #default>
              <Child
                v-model:user="user"
                @sendForm="getForm"
              ></Child>
            </template>

            <template #fallback>
              Loading child...
            </template>
          </Suspense>

          <br><br><br><br><br>
          <v-text-field v-model="message" label="Message"></v-text-field>
          <p>Message Computed: {{ messageComputed }}</p>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>

</style>