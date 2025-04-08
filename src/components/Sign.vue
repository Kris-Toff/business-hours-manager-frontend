<script setup>
import { computed } from "vue";

const props = defineProps({
  status: {
    default: false,
    type: [Boolean],
    validator(v) {
      if (typeof v != "boolean") {
        console.warn(`Invalid type: ${v}. Valid option is type boolean `);
        return false;
      }
      return true;
    },
  },
  loading: {
    default: false,
    type: [Boolean],
    validator(v) {
      if (typeof v != "boolean") {
        console.warn(`Invalid type: ${v}. Valid option is type boolean `);
        return false;
      }
      return true;
    },
  },
  isLunch: {
    default: false,
    type: [Boolean],
    validator(v) {
      if (typeof v != "boolean") {
        console.warn(`Invalid type: ${v}. Valid option is type boolean `);
        return false;
      }
      return true;
    },
  },
});

const colorStatus = computed(() => {
  if (props.isLunch) return "yellow-lighten-3";
  else if (props.status) return "green-lighten-3";
  else return "red-lighten-3";
});
</script>

<template>
  <v-skeleton-loader type="article" v-if="loading" />
  <v-sheet
    v-else
    :elevation="1"
    class="sheet-msg pa-6 text-center"
    :color="colorStatus"
  >
    <slot />
  </v-sheet>
</template>

<style scoped></style>
