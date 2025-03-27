<template>
  <section class="section home">
    <SearchNav />

    <section>
      <v-container>
        <v-row>
          <v-col v-for="product in products" cols="3">
            <ProductCard
              :product="product"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>
  </section>
</template>

<script setup lang="ts">
import SearchNav from "~/components/Search/SearchNav.vue";
import ProductCard from "~/components/ProductCard/ProductCard.vue";
import {useHomeLogic} from "~/pages/home";

const { products } = useHomeLogic();
</script>
