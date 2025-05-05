<template>
  <section class="section">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-img :src="product.photo"></v-img>
        </v-col>

        <v-col cols="6">
          <h2>{{product.name}}</h2>
          <b>$ {{product.price}}</b>
          <p>Categories: {{ categories }}</p>
          <v-btn class="mt-3" color="primary" @click="bookProduct">Book Product</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <BookDlg ref="bookDlgRef"/>
  </section>
</template>

<script setup lang="ts">
import BookDlg from "~/components/BookDlg/BookDlg.vue";
import {useProductLogic} from "~/pages/Products/product";

const {
  product,
  categories,
  bookProduct,
  bookDlgRef
} = useProductLogic()
</script>

<style scoped>
</style>