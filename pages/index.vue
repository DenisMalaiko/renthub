<template>
  <section class="section home">
    <SearchNav />

    <Loader v-if="loading"/>

    <section v-else>
      <v-container class="px-0">
        <v-row>
          <v-col cols="12">
            <h4>Catalog</h4>
          </v-col>

          <v-col cols="3">
            <v-list v-model:selected="selectedCategories" select-strategy="multiple">
              <v-list-subheader>Categories</v-list-subheader>

              <v-list-item
                v-for="item in data?.categories"
                :key="item._id"
                :title="item.name"
                :value="item._id"
              >
                <template v-slot:prepend="{ isSelected, select }">
                  <v-list-item-action start>
                    <v-checkbox-btn
                      :model-value="isSelected"
                      @update:model-value="select"
                      color="primary"
                    />
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col cols="9">
            <v-row>
              <v-col v-for="product in products" :key="product._id" cols="4">
                <ProductCard :product="product" :isProfile="false" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </section>
</template>

<script setup lang="ts">
import Loader from "~/components/Loader/Loader.vue";
import SearchNav from "~/components/Search/SearchNav.vue";
import ProductCard from "~/components/ProductCard/ProductCard.vue";
import { useHomeLogic } from "~/pages/home";
const { products, selectedCategories, data, loading } = useHomeLogic();
</script>
