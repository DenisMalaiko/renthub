<template>
  <v-card class="product-card">
    <NuxtLink :to="`/products/${product._id}`">
      <v-img :src="product.photo" cover height="250px" alt="no image"></v-img>
    </NuxtLink>

    <v-card-text>
      <h3>{{product.name}}</h3>
      <p>${{product.price}} per day</p>
      <span>{{product?.city?.fullAddress}}</span>
    </v-card-text>

    <v-card-actions v-if="isAuth && isProfile">
      <v-btn
        @click="deleteProduct(product._id)"
        color="red"
        icon="mdi-delete"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useCardLogic } from "./ProductCard.ts";
import {Product} from "~/models/Product";

const { product, isProfile } = defineProps<{
  product: Product
  isProfile: boolean
}>()

const { deleteProduct, isAuth } = useCardLogic();
</script>

<style src="./ProductCard.scss" lang="scss" scoped></style>