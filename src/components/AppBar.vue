<script setup>
import { useAuth } from "@/composables/auth";

const { logout } = useAuth();
</script>

<template>
  <v-app-bar :elevation="2">
    <template #prepend>
      <v-app-bar-nav-icon icon="mdi:mdi-view-dashboard" color="red-lighten-1" />
    </template>

    <template #append>
      <v-btn
        icon="mdi:mdi-power"
        title="Logout"
        color="red-lighten-1"
        @click="logout"
      >
        <v-icon icon="mdi:mdi-power"></v-icon>
        <v-tooltip activator="parent" location="end">Logout</v-tooltip>
      </v-btn>
    </template>

    <v-app-bar-title>Dashboard</v-app-bar-title>
  </v-app-bar>
</template>

<style scoped></style>
