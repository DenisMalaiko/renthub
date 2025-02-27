import { defineStore } from "pinia";
import { getCategories } from "~/composables/ProductsRequests";
import { watchEffect } from "vue";

export const CategoryModule = defineStore('categoryModel', {
  state: () => ({
    categories: [],
  }),
  actions: {
    async getCategories() {
      const { result } = await getCategories();

      watchEffect(() => {
        if (result.value) {
          this.categories = result.value?.categories;
        }
      });
    },
  }
});