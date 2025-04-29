<template>
  <section class="section home">
    <SearchNav />

    <section>
      <v-container>
        <v-row>
          <v-col v-for="product in products" cols="3">
            <ProductCard
              :product="product"
              :isProfile="false"
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


/*import {ProductModule} from "~/store/products";
import {useAsyncData} from "nuxt/app";
import {computed} from "vue";

const productStore = ProductModule();
await useAsyncData('products', () => productStore.getProducts());
const products = computed(() => productStore.products);*/


import {useHomeLogic} from "~/pages/home";
const { products } = useHomeLogic();
</script>
