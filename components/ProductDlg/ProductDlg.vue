<template>
  <v-dialog v-model="dialog" style="max-width: 450px">
    <v-card>
      <v-card-title>
        Add Product
      </v-card-title>

      <v-form ref="addProductFormRef" @submit.prevent="addProduct()">
        <v-card-text class="pb-0">
          <v-text-field
            v-model="addProductForm.name"
            :rules="rules.name"
            label="Name"
            class="mb-2"
          ></v-text-field>

          <v-textarea
            v-model="addProductForm.description"
            :rules="rules.description"
            label="Description"
            rows="2"
            class="mb-2"
          ></v-textarea>

          <v-text-field
            v-model.number="addProductForm.price"
            :rules="rules.price"
            label="Price per day"
            class="mb-2"
          ></v-text-field>

          <v-select
            v-model="addProductForm.categories"
            v-model:search="searchCategoryQuery"
            :items="categories"
            item-title="name"
            item-value="_id"
            :rules="rules.categories"
            label="Categories"
            color="primary"
            class="mb-2"
            multiple
          />

          <v-file-input
            v-model="addProductForm.photo"
            :rules="rules.photo"
            accept="image/*"
            label="Photo"
            placeholder="Pick a photo"
            prepend-icon="mdi-camera"
          ></v-file-input>
        </v-card-text>

        <v-card-actions class="justify-end px-3 pt-0 pb-3">
          <v-btn @click="close()" color="primary">
            Close
          </v-btn>

          <v-btn type="submit" variant="flat" :loading="loading" color="primary">
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useProductLogic } from "./ProductDlg.ts";

const { dialog, loading, addProductForm, addProductFormRef, searchCategoryQuery, rules, categories, open, close, addProduct } = useProductLogic();

defineExpose({
  open
});
</script>

<style scoped>

</style>