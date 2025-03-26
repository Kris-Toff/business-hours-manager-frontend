<script setup>
import { ref, watch } from "vue";
import { useDate } from "vuetify";
const date = useDate();

const selectedDate = ref(null);
const formattedDate = ref(null);

watch(selectedDate, (v) => {
  formattedDate.value = date.format(v, "keyboardDate");
});
</script>

<template>
  <div class="d-flex flex-column">
    <h4>Check if we are open:</h4>
    <v-text-field
      v-model="formattedDate"
      type="text"
      class="mt-2"
      color="red-lighten-1"
      variant="outlined"
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
          <v-date-picker v-model="selectedDate" color="red-lighten-1" />
        </v-menu>
      </template>
    </v-text-field>
    <v-btn variant="tonal" color="red-lighten-1" class="align-self-end">
      Check
    </v-btn>
  </div>
</template>

<style scoped></style>
