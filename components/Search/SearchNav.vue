<template>
  <section class="search">
    <v-container class="px-0">
      <v-row>
        <v-col cols="10">
          <v-row>
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
              <v-combobox
                v-model="searchForm.product"
                :search-input.sync="searchProductQuery"
                label="What"
                placeholder="Search product..."
                :loading="loading.product"
              />
            </v-col>

            <v-col cols="3">
              <v-menu
                v-model="menuStart"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-model="searchForm.startDate"
                    label="Start date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="props"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="searchForm.startDate"
                  @input="menuStart = false"
                  :min="today"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="3">
              <v-menu
                v-model="menuEnd"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-model="searchForm.endDate"
                    label="End date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="props"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="searchForm.endDate"
                  @input="menuEnd = false"
                  :min="searchForm.startDate"
                ></v-date-picker>
              </v-menu>
            </v-col>

          </v-row>
        </v-col>

        <v-col cols="2 d-flex align-center justify-end">
          <v-btn color="primary">
            Search
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">

          <pre>{{cities}}</pre>
          <pre>{{ searchForm }}</pre>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { setupSearchComponent } from './SearchNav.ts';

const { loading, today, searchForm, menuStart, menuEnd, searchProductQuery, products, searchCityQuery, cities } = setupSearchComponent();
</script>
