<script setup>
import { ref } from "vue";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const timeModel = defineModel();
const pickerProps = defineProps({
  label: { type: [String], default: null },
  min: { type: [String], default: null },
  max: { type: [String], default: null },
});

const textModel = ref(
  timeModel.value != null
    ? dayjs(timeModel.value, "hh:mm").format("hh:mm a")
    : null
);

function modelUpdate(v) {
  textModel.value = dayjs(v, "hh:mm").format("hh:mm a");
}
</script>

<template>
  <v-text-field
    v-model="textModel"
    density="compact"
    type="text"
    class="mt-2"
    color="red-lighten-1"
    variant="outlined"
    :label="pickerProps.label"
    readonly
  >
    <template #append-inner>
      <v-menu :close-on-content-click="false">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi:mdi-clock-outline"
            variant="text"
            class="menu-btn"
            density="compact"
            color="red-lighten-1"
          />
        </template>
        <v-time-picker
          v-model="timeModel"
          :min="min"
          :max="max"
          color="red-lighten-1"
          ampm-in-title
          format="ampm"
          @update:model-value="modelUpdate"
        />
      </v-menu>
    </template>
  </v-text-field>
</template>

<style scoped></style>
