<script setup>
import { ref } from "vue";
import { useDate } from "vuetify";
const date = useDate();
const model = defineModel();
const pickerProps = defineProps({ label: { type: [String], default: null } });
const selectedDate = ref(null);

function modelUpdate(v) {
  model.value = date.format(v, "keyboardDate");
}
</script>

<template>
  <v-text-field
    v-model="model"
    density="compact"
    type="text"
    class="mt-2"
    color="red-lighten-1"
    variant="outlined"
    :label="pickerProps.label"
    readonly
  >
    <template #append-inner>
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi:mdi-calendar-blank"
            variant="text"
            class="menu-btn"
            density="compact"
            color="red-lighten-1"
          />
        </template>
        <v-date-picker
          v-model="selectedDate"
          color="red-lighten-1"
          @update:model-value="modelUpdate"
        />
      </v-menu>
    </template>
  </v-text-field>
</template>

<style scoped></style>
