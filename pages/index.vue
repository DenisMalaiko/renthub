<template>
  <section class="section home">
    <SearchNav />

    <section>
      <v-container>
        <v-row>
          <v-col v-for="product in products" cols="3">
            <v-card>
              <img src="" alt="no image">
              <v-card-text>
                <p>{{product.name}}</p>
                <b>{{product.price}} $</b>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </section>
</template>

<script setup lang="ts">
import SearchNav from "~/components/Search/SearchNav.vue";
import {useHomeLogic} from "~/pages/home";

const { products } = useHomeLogic();
</script>
