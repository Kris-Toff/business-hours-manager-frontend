<script setup>
import { computed, ref } from "vue";
import { useDate } from "vuetify";
import { useDateFormatting } from "@/composables/dateFormatting";
const date = useDate();
const { dateStringFormat } = useDateFormatting();
const model = defineModel({ type: String });
const pickerProps = defineProps({ label: { type: [String], default: null } });

const selectedDate = ref(
  model.value != null ? date.parseISO(model.value) : null
);

const dateString = computed(() => {
  return model.value != null ? date.format(model.value, "keyboardDate") : null;
});

function modelUpdate(v) {
  model.value = dateStringFormat(v, "YYYY-MM-DD");
}
</script>

<template>
  <v-text-field
    v-model="dateString"
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
