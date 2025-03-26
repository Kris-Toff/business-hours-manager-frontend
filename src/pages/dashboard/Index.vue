<script setup>
import { ref } from "vue";
import DayForm from "@/components/DayForm.vue";

const days = ref([
  { id: 0, day: "Monday", status: 1 },
  { id: 1, day: "Tuesday", status: 1 },
  { id: 2, day: "Wednesday", status: 0 },
  { id: 3, day: "Thursday", status: 1 },
  { id: 4, day: "Friday", status: 1 },
  { id: 5, day: "Saturday", status: 0 },
  { id: 6, day: "Sunday", status: 0 },
]);
</script>

<template>
  <div>
    <v-card class="mx-auto" width="600" flat>
      <v-expansion-panels multiple>
        <v-expansion-panel
          color="grey-lighten-1"
          v-for="day in days"
          :key="day.id"
        >
          <v-expansion-panel-title>
            <span class="font-weight-black mr-6">{{ day.day }}</span>
            <span>
              <v-icon
                icon="mdi:mdi-circle-medium"
                :color="day.status ? 'green' : 'red'"
              />
            </span>
            <span> {{ day.status ? "Active" : "Inactive" }} </span>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <day-form />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<style scoped></style>
