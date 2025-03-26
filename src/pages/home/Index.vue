<script setup>
import Sign from "@/components/Sign.vue";
import LunchBreakSign from "@/components/LunchBreakSign.vue";
import DateChecker from "@/components/DateChecker.vue";
</script>

<template>
  <v-card class="mx-auto mt-16" max-width="400">
    <v-card-title class="bg-red-lighten-1">
      <span class="font-weight-black text-wrap text-center">
        <h2>Welcome to Apple Cafe</h2>
      </span>
    </v-card-title>

    <v-card-text class="mt-6">
      <sign>Yes, we're open!</sign>
    </v-card-text>

    <v-card-text class="mt-6">
      <lunch-break-sign />
    </v-card-text>

    <v-card-text class="mt-6">
      <date-checker />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.sheet-msg {
  border-radius: 5px;
}
</style>
