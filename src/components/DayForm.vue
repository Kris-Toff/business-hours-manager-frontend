<script setup>
import { ref } from "vue";
import TextfieldDatePicker from "./TextfieldDatePicker.vue";
import TextfieldTimePicker from "./TextfieldTimePicker.vue";

const props = defineProps({
  formData: {
    type: [Object],
    required: true,
  },
});
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col class="py-0">
        <div class="d-flex flex-row">
          <v-switch v-model="formData.status" color="red-lighten-1">
            <template #prepend>
              <span>Close</span>
            </template>
            <template #append>
              <span>Open</span>
            </template>
          </v-switch>
        </div>
      </v-col>
    </v-row>

    <v-divider />

    <v-row class="mt-2">
      <v-col>
        <textfield-time-picker
          v-model="formData.openTime"
          label="Open time"
          :disabled="!formData.status"
        />
      </v-col>
      <v-col>
        <textfield-time-picker
          v-model="formData.closeTime"
          label="Close time"
          :disabled="!formData.status"
        />
      </v-col>
    </v-row>

    <v-divider />

    <v-row class="mt-2">
      <v-col>
        <textfield-time-picker
          v-model="formData.lunchStart"
          label="Lunch Start"
          :disabled="!formData.status"
        />
      </v-col>
      <v-col>
        <textfield-time-picker
          v-model="formData.lunchEnd"
          label="Lunch End"
          :disabled="!formData.status"
        />
      </v-col>
    </v-row>

    <v-divider />

    <v-row class="mt-2">
      <v-col class="d-flex align-center">
        <v-checkbox
          v-model="formData.otherWeek"
          label="Every other week"
          color="red-lighten-1"
          :disabled="!formData.status"
        ></v-checkbox>
      </v-col>
      <v-col>
        <textfield-date-picker
          v-model="formData.startIntervalDate"
          label="Start date"
          :disabled="!formData.otherWeek || !formData.status"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-spacer />
      <v-btn variant="tonal" color="red-lighten-1" :disabled="!formData.status"
        >Save</v-btn
      >
    </v-row>
  </v-container>
</template>

<style scoped></style>
