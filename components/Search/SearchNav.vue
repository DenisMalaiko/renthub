<template>
  <section class="search">
    <v-container class="px-0">
      <v-row>
        <v-col cols="11">
          <v-row>
            <v-col cols="3">
              <v-combobox
                v-model="searchForm.product"
                v-model:search="searchProductQuery"
                label="What"
                placeholder="Search product..."
                :loading="loading.product"
              />
            </v-col>

            <v-col>
              <v-select
                v-model="searchForm.categories"
                :items="categories"
                item-title="name"
                item-value="_id"
                label="Categories"
                color="primary"
                multiple
              />
            </v-col>

            <v-col cols="3">
              <v-combobox
                v-model="searchForm.city"
                v-model:search="searchCityQuery"
                :items="cities"
                item-title="cityName"
                label="Where"
                :loading="loading.city"
              />
            </v-col>

            <v-col cols="3">
              <v-date-input
                v-model="searchForm.range"
                label="Dates"
                max-width="368"
                multiple="range"
                :min="today"
              ></v-date-input>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="1 d-flex align-center justify-end">
          <v-btn color="primary">
            Search
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { setupSearchComponent } from './SearchNav.ts';

const { loading, today, searchForm, searchProductQuery, products, searchCityQuery, cities, categories } = setupSearchComponent();
</script>
