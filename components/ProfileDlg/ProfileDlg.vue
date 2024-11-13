<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title>
        Edit Profile
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useProfileDlgLogic } from "./ProfileDlg.ts";

const { dialog, open } = useProfileDlgLogic();

defineExpose({
  open
});
</script>

<style scoped>

</style>