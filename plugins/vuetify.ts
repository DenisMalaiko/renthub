import {VDateInput} from "vuetify/labs/components";

export default defineNuxtPlugin((app) => {
  app.vueApp.component('VDateInput', VDateInput);
});
