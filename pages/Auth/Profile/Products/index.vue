<template>
  <section class="profile-section">
    Products

    <pre>{{ list }}</pre>
  </section>
</template>

<script lang="ts" setup>
import {definePageMeta} from "~/.nuxt/imports";
import {useProductsLogic} from "~/pages/Auth/Profile/Products/products";

definePageMeta({
  layout: "profile"
});

const { list } = useProductsLogic();
</script>

<style>
</style>