<script setup>
import { ref } from "vue";
import TextfieldDatePicker from "./TextfieldDatePicker.vue";
import TextfieldTimePicker from "./TextfieldTimePicker.vue";

const openTime = ref(null);
const closeTime = ref(null);
const lunchStart = ref(null);
const lunchEnd = ref(null);
const startIntervalDate = ref(null);
</script>

<template>
  <!-- prepend-icon="mdi:mdi-check-bold" -->
  <!-- <v-card class="mx-auto" width="400">
    <template #title>
      <span class="font-weight-black">Monday</span>
      <v-checkbox color="red-lighten-1">
        <template #label>
          <span class="font-weight-black">Monday</span>
        </template>
      </v-checkbox>
    </template>

    <v-card-item class="bg-surface-light pt-4">
      <v-row>
        <v-col>
          <textfield-time-picker label="Open time" v-model="openTime" />
        </v-col>
        <v-col>
          <textfield-time-picker label="Close time" v-model="closeTime" />
        </v-col>
      </v-row>
    </v-card-item>

    <v-divider />

    <v-card-item class="bg-surface-light pt-4">
      <v-row>
        <v-col>
          <textfield-time-picker label="Lunch Start" v-model="lunchStart" />
        </v-col>
        <v-col>
          <textfield-time-picker label="Lunch End" v-model="lunchEnd" />
        </v-col>
      </v-row>
    </v-card-item>

    <v-divider />

    <v-card-item class="bg-surface-light pt-4">
      <v-row>
        <v-col class="d-flex align-center">
          <v-checkbox
            label="Every other week"
            color="red-lighten-1"
          ></v-checkbox>
        </v-col>
        <v-col>
          <textfield-date-picker
            label="Start date"
            v-model="startIntervalDate"
          />
        </v-col>
      </v-row>
    </v-card-item>

    <v-divider />

    <v-card-actions>
      <v-spacer />
      <v-btn variant="tonal" color="red-lighten-1">Save</v-btn>
    </v-card-actions>
  </v-card> -->
  <v-container fluid>
    <v-row>
      <v-col>
        <textfield-time-picker label="Open time" v-model="openTime" />
      </v-col>
      <v-col>
        <textfield-time-picker label="Close time" v-model="closeTime" />
      </v-col>
    </v-row>

    <v-divider />

    <v-row class="mt-2">
      <v-col>
        <textfield-time-picker label="Lunch Start" v-model="lunchStart" />
      </v-col>
      <v-col>
        <textfield-time-picker label="Lunch End" v-model="lunchEnd" />
      </v-col>
    </v-row>

    <v-divider />

    <v-row class="mt-2">
      <v-col class="d-flex align-center">
        <v-checkbox label="Every other week" color="red-lighten-1"></v-checkbox>
      </v-col>
      <v-col>
        <textfield-date-picker label="Start date" v-model="startIntervalDate" />
      </v-col>
    </v-row>

    <v-row>
      <v-spacer />
      <v-btn variant="tonal" color="red-lighten-1">Save</v-btn>
    </v-row>
  </v-container>
</template>

<style scoped></style>
