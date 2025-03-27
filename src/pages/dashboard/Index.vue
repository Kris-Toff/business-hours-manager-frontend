<script setup>
import { ref } from "vue";
import DayForm from "@/components/DayForm.vue";

const days = ref([
  {
    id: 0,
    day: "Monday",
    status: true,
    openTime: "08:00",
    closeTime: "17:00",
    lunchStart: "12:00",
    lunchEnd: "12:45",
    otherWeek: false,
    startIntervalDate: "2025-10-15",
  },
  {
    id: 1,
    day: "Tuesday",
    status: true,
    openTime: "08:00",
    closeTime: "17:00",
    lunchStart: "12:00",
    lunchEnd: "12:45",
    otherWeek: false,
    startIntervalDate: null,
  },
  {
    id: 2,
    day: "Wednesday",
    status: false,
    openTime: "08:00",
    closeTime: "17:00",
    lunchStart: "12:00",
    lunchEnd: "12:45",
    otherWeek: false,
    startIntervalDate: null,
  },
  {
    id: 3,
    day: "Thursday",
    status: true,
    openTime: "08:00",
    closeTime: "17:00",
    lunchStart: "12:00",
    lunchEnd: "12:45",
    otherWeek: false,
    startIntervalDate: null,
  },
  {
    id: 4,
    day: "Friday",
    status: false,
    openTime: "08:00",
    closeTime: "17:00",
    lunchStart: "12:00",
    lunchEnd: "12:45",
    otherWeek: false,
    startIntervalDate: null,
  },
  {
    id: 5,
    day: "Saturday",
    status: false,
    openTime: "08:00",
    closeTime: "17:00",
    lunchStart: "12:00",
    lunchEnd: "12:45",
    otherWeek: false,
    startIntervalDate: null,
  },
  {
    id: 6,
    day: "Sunday",
    status: false,
    openTime: "08:00",
    closeTime: "17:00",
    lunchStart: "12:00",
    lunchEnd: "12:45",
    otherWeek: false,
    startIntervalDate: "2025-10-15",
  },
]);
</script>

<template>
  <div>
    <v-card class="mx-auto" max-width="600" flat>
      <v-expansion-panels multiple>
        <v-expansion-panel
          :color="day.status ? 'green-lighten-4' : 'blue-grey-lighten-4'"
          v-for="day in days"
          :key="day.id"
        >
          <v-expansion-panel-title>
            <v-row>
              <v-col cols="4" class="pt-4">
                <span class="font-weight-black">{{ day.day }}</span>
              </v-col>
              <v-col>
                <span>
                  <v-icon
                    icon="mdi:mdi-circle-medium"
                    :color="day.status ? 'green' : 'red'"
                  />
                </span>
                <span> {{ day.status ? "Open" : "Close" }}</span>
              </v-col>
            </v-row>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <day-form :form-data="day" />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<style scoped></style>
