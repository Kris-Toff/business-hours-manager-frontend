<script setup>
const props = defineProps({
  status: {
    default: "close",
    type: [String],
    validator(v) {
      const types = ["open", "close"];

      if (!types.includes(v)) {
        console.warn(`Invalid type: ${v}. Valid option is close or open`);
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
    :color="props.status == 'open' ? 'green-lighten-3' : 'red-lighten-3'"
  >
    <h3><slot /></h3>

    <div class="mt-3" v-if="status == 'close'">
      <p>Next opening:</p>
    </div>
  </v-sheet>
</template>

<style scoped></style>
