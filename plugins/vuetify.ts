import {VDateInput, VCalendar} from "vuetify/labs/components";

export default defineNuxtPlugin((app) => {
  app.vueApp.component('VDateInput', VDateInput);
  app.vueApp.component('VCalendar', VCalendar);
});
