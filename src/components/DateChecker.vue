<script setup>
import { ref } from "vue";
import TextfieldDatePicker from "./TextfieldDatePicker.vue";

const selectedDate = ref(null);
</script>

<template>
  <div class="d-flex flex-column">
    <h4>Check if we are open:</h4>
    <textfield-date-picker v-model="selectedDate" label="Checker" />
    <v-btn
      variant="tonal"
      color="red-lighten-1"
      class="align-self-end"
      @click="$emit('dateChecker', { date: selectedDate })"
    >
      Check
    </v-btn>
  </div>
</template>

<style scoped></style>
