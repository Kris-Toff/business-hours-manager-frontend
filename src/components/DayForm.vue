<script setup>
import TextfieldDatePicker from "./TextfieldDatePicker.vue";
import TextfieldTimePicker from "./TextfieldTimePicker.vue";
import { useBusinessHours } from "@/composables/businessHours";

defineProps({
  formData: {
    type: [Object],
    required: true,
  },
  errors: {
    type: [Object],
    default: null,
    required: false,
  },
  idx: {
    type: [Number],
    default: null,
    required: true,
  },
});

const { saving, updateBusinessHours } = useBusinessHours();
</script>

<template>
  <v-form @submit.prevent="updateBusinessHours">
    <v-container fluid>
      <v-row>
        <v-col class="py-0">
          <div class="d-flex flex-row">
            <v-switch v-model="formData.isOpen" color="red-lighten-1">
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
          <!-- :error-messages="errors[`days[${idx}].openAt`]" -->
          <textfield-time-picker
            v-model="formData.openAt"
            :max="formData.closeAt"
            label="Open time"
            :disabled="!formData.isOpen"
          />
        </v-col>
        <v-col>
          <!-- :error-messages="errors[`days[${idx}].closeAt`]" -->
          <textfield-time-picker
            v-model="formData.closeAt"
            :min="formData.openAt"
            label="Close time"
            :disabled="!formData.isOpen"
          />
        </v-col>
      </v-row>

      <v-divider />

      <v-row class="mt-2">
        <v-col>
          <!-- :error-messages="errors[`days[${idx}].lunchStart`]" -->
          <textfield-time-picker
            v-model="formData.lunchStart"
            :max="formData.lunchEnd"
            label="Lunch Start"
            :disabled="!formData.isOpen"
          />
        </v-col>
        <v-col>
          <!-- :error-messages="errors[`days[${idx}].lunchEnd`]" -->
          <textfield-time-picker
            v-model="formData.lunchEnd"
            :min="formData.lunchStart"
            label="Lunch End"
            :disabled="!formData.isOpen"
          />
        </v-col>
      </v-row>

      <v-divider />

      <v-row class="mt-2">
        <v-col class="d-flex align-center">
          <v-checkbox
            v-model="formData.isEveryOtherWeek"
            label="Every other week"
            color="red-lighten-1"
            :disabled="!formData.isOpen"
          />
        </v-col>
        <v-col>
          <!-- :error-messages="errors[`days[${idx}].otherWeekStartDate`]" -->
          <textfield-date-picker
            v-model="formData.otherWeekStartDate"
            label="Start date"
            :disabled="!formData.isEveryOtherWeek || !formData.isOpen"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-spacer />
        <v-btn
          variant="tonal"
          color="red-lighten-1"
          type="submit"
          :loading="saving"
        >
          Save
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<style scoped></style>
