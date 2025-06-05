<template>
  <Loader v-if="loading"/>

  <section v-else class="section">
    <v-alert
      v-if="!isAuth"
      color="info"
      icon="$info"
      title="🔒 Sign In Required"
      text="Please sign in to your account to book this product."
    ></v-alert>

    <v-alert
      v-if="isAuth && isOwner"
      color="info"
      icon="$info"
      title="⚠️ Action Not Allowed"
      text="You can't book your own product."
    ></v-alert>

    <v-container>
      <v-row>
        <v-col cols="6">
          <v-img :src="product?.photo"></v-img>
        </v-col>

        <v-col cols="6">
          <h2>{{product?.name}}</h2>
          <b>$ {{product?.price}}</b>
          <p>{{product?.description}}</p>
          <p>Categories: {{ categories }}</p>
          <v-btn class="mt-3" color="primary" @click="bookProduct" :disabled="!isAuth || isOwner">Book Product</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <BookDlg ref="bookDlgRef"/>
  </section>
</template>

<script setup lang="ts">
import Loader from "~/components/Loader/Loader.vue";
import BookDlg from "~/components/BookDlg/BookDlg.vue";
import { useProductLogic } from "~/pages/Products/product";

const {
  product,
  categories,
  bookProduct,
  bookDlgRef,
  isAuth,
  isOwner,
  loading
} = useProductLogic()
</script>

<style scoped>
</style>