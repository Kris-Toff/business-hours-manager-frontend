<script setup>
import Sign from "@/components/Sign.vue";
</script>

<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title class="bg-red-lighten-1">
      <span class="font-weight-black text-wrap text-center">
        <h2>Welcome to Apple Cafe</h2>
      </span>
    </v-card-title>

    <v-card-text class="mt-6">
      <sign>Yes, we're open!</sign>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.sheet-msg {
  border-radius: 5px;
}
</style>
