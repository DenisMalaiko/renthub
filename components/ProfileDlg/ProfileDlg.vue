<template>
  <v-dialog v-model="dialog" style="max-width: 450px">
    <v-card>
      <v-card-title>
        Edit Profile
      </v-card-title>

      <v-form ref="editProfileFormRef" @submit.prevent="editProfile()">
        <v-card-text>
          <pre>{{editProfileForm}}</pre>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="close()" color="primary">
            Close
          </v-btn>

          <v-btn type="submit" color="primary">
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useProfileDlgLogic } from "./ProfileDlg.ts";

const { dialog, editProfileFormRef, editProfileForm, rules, open, close, editProfile } = useProfileDlgLogic();

defineExpose({
  open
});
</script>

<style scoped>

</style>