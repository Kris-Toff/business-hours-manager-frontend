<script setup>
import AppBar from "@/components/AppBar.vue";
</script>

<template>
  <app-bar />
  <v-container>
    <v-row>
      <v-col>
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
