<template>
  <section class="section home">
    <SearchNav />

    <Loader v-if="!products"/>

    <section v-else>
      <v-container class="px-0">
        <v-row>
          <v-col v-for="product in products" :key="product._id" cols="3">
            <ProductCard :product="product" :isProfile="false" />
          </v-col>
        </v-row>
      </v-container>
    </section>
  </section>
</template>

<script setup lang="ts">
import SearchNav from "~/components/Search/SearchNav.vue";
import Loader from "~/components/Loader/Loader.vue";
import ProductCard from "~/components/ProductCard/ProductCard.vue";
import {useHomeLogic} from "~/pages/home";

const { products, loading } = useHomeLogic();
</script>
