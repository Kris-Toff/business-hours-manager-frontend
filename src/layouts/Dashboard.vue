<script setup>
import AppBar from "@/components/AppBar.vue";
import { useSnackbarStore } from "@/store/snackbar";

const snackbarStore = useSnackbarStore();
</script>

<template>
  <app-bar />
  <v-container>
    <v-row>
      <v-col>
        <router-view />
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbarStore.snackbar"
      :timeout="2000"
      :color="snackbarStore.snackbarType"
    >
      {{ snackbarStore.message }}
    </v-snackbar>
  </v-container>
</template>

<style scoped></style>
