<script setup>
import TextfieldDatePicker from "./TextfieldDatePicker.vue";
import TextfieldTimePicker from "./TextfieldTimePicker.vue";

const props = defineProps({
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

function handleSubmit(val) {
  console.log(val, props.formData);
}
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <v-container fluid>
      <v-row>
        <v-col class="py-0">
          <div class="d-flex flex-row">
            <v-switch v-model="formData.value.isOpen" color="red-lighten-1">
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
            v-model="formData.value.openAt"
            label="Open time"
            :max="formData.value.closeAt"
            :disabled="!formData.value.isOpen"
            :error-messages="errors[`days[${idx}].openAt`]"
          />
        </v-col>
        <v-col>
          <textfield-time-picker
            v-model="formData.value.closeAt"
            label="Close time"
            :min="formData.value.openAt"
            :disabled="!formData.value.isOpen"
            :error-messages="errors[`days[${idx}].closeAt`]"
          />
        </v-col>
      </v-row>

      <v-divider />

      <v-row class="mt-2">
        <v-col>
          <textfield-time-picker
            v-model="formData.value.lunchStart"
            :max="formData.value.lunchEnd"
            label="Lunch Start"
            :disabled="!formData.value.isOpen"
            :error-messages="errors[`days[${idx}].lunchStart`]"
          />
        </v-col>
        <v-col>
          <textfield-time-picker
            v-model="formData.value.lunchEnd"
            :min="formData.value.lunchStart"
            label="Lunch End"
            :disabled="!formData.value.isOpen"
            :error-messages="errors[`days[${idx}].lunchEnd`]"
          />
        </v-col>
      </v-row>

      <v-divider />

      <v-row class="mt-2">
        <v-col class="d-flex align-center">
          <v-checkbox
            v-model="formData.value.isEveryOtherWeek"
            label="Every other week"
            color="red-lighten-1"
            :disabled="!formData.value.isOpen"
          />
        </v-col>
        <v-col>
          <textfield-date-picker
            v-model="formData.value.otherWeekStartDate"
            label="Start date"
            :disabled="
              !formData.value.isEveryOtherWeek || !formData.value.isOpen
            "
          />
        </v-col>
      </v-row>

      <v-row>
        <v-spacer />
        <v-btn variant="tonal" color="red-lighten-1" type="submit">Save</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<style scoped></style>
