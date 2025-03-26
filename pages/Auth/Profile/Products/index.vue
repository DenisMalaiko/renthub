<template>
  <section class="profile-section">
    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn @click="addProduct()" color="primary">Add new</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="product in productsUser" cols="3">
        <v-card>
          <v-img :src="product.photo" cover height="250px" alt="no image"></v-img>
          <v-card-text>
            <p>{{product.name}}</p>
            <b>{{product.price}} $</b>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <ProductDlg ref="productDlgRef"/>
  </section>
</template>

<script lang="ts" setup>
import {definePageMeta} from "~/.nuxt/imports";
import {useProductsLogic} from "~/pages/Auth/Profile/Products/products";
import ProductDlg from "~/components/ProductDlg/ProductDlg.vue";

definePageMeta({
  layout: "profile"
});

const {
  addProduct,
  productDlgRef,
  productsUser
} = useProductsLogic();
</script>

<style>
</style>