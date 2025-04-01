<script setup>
import TextfieldDatePicker from "./TextfieldDatePicker.vue";
import TextfieldTimePicker from "./TextfieldTimePicker.vue";

defineProps({
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
          <v-switch v-model="formData.is_open" color="red-lighten-1">
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
          v-model="formData.open_at"
          label="Open time"
          :max="formData.close_at"
          :disabled="!formData.is_open"
        />
      </v-col>
      <v-col>
        <textfield-time-picker
          v-model="formData.close_at"
          label="Close time"
          :min="formData.open_at"
          :disabled="!formData.is_open"
        />
      </v-col>
    </v-row>

    <v-divider />

    <v-row class="mt-2">
      <v-col>
        <textfield-time-picker
          v-model="formData.lunch_start"
          :max="formData.lunch_end"
          label="Lunch Start"
          :disabled="!formData.is_open"
        />
      </v-col>
      <v-col>
        <textfield-time-picker
          v-model="formData.lunch_end"
          :min="formData.lunch_start"
          label="Lunch End"
          :disabled="!formData.is_open"
        />
      </v-col>
    </v-row>

    <v-divider />

    <v-row class="mt-2">
      <v-col class="d-flex align-center">
        <v-checkbox
          v-model="formData.is_every_other_week"
          label="Every other week"
          color="red-lighten-1"
          :disabled="!formData.is_open"
        ></v-checkbox>
      </v-col>
      <v-col>
        <textfield-date-picker
          v-model="formData.other_week_start_date"
          label="Start date"
          :disabled="!formData.is_every_other_week || !formData.is_open"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-spacer />
      <v-btn variant="tonal" color="red-lighten-1">Save</v-btn>
    </v-row>
  </v-container>
</template>

<style scoped></style>
