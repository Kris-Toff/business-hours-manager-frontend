<script setup>
const props = defineProps({
  lunchStart: {
    type: [String],
    default: "",
    required: true,
    validator(v) {
      if (typeof v != "string") {
        return false;
      }
      return true;
    },
  },
  lunchEnd: {
    type: [String],
    default: "",
    required: true,
    validator(v) {
      if (typeof v != "string") {
        return false;
      }
      return true;
    },
  },
});
</script>

<template>
  <v-sheet
    :elevation="1"
    class="sheet-msg pa-6 text-center"
    color="yellow-lighten-3"
  >
    <h3>Close for lunch break</h3>

    <span>{{ lunchStart }} - {{ lunchEnd }}</span>

    <div class="mt-2">
      <p>be back in:</p>
    </div>
  </v-sheet>
</template>

<style scoped></style>
