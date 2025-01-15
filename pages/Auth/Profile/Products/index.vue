<template>
  <section class="profile-section">
    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn @click="addProduct()" color="primary">Add new</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <pre>{{products}}</pre>
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
  products
} = useProductsLogic();
</script>

<style>
</style>