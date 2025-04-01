<script setup>
import DayForm from "@/components/DayForm.vue";
import { useBusinessHours } from "@/composables/businessHours";

const { fields, loading, errors, getBusinessHours } = useBusinessHours();

getBusinessHours();
</script>

<template>
  <div>
    <v-skeleton-loader
      v-if="loading"
      type="table"
      max-width="600"
      class="mx-auto"
    />
    <v-card class="mx-auto" max-width="600" flat v-else>
      <v-expansion-panels multiple>
        <v-expansion-panel
          v-for="(day, idx) in fields"
          :key="day.key"
          :color="day.value.isOpen ? 'green-lighten-4' : 'blue-grey-lighten-4'"
        >
          <v-expansion-panel-title>
            <v-row>
              <v-col cols="4" class="pt-4">
                <span class="font-weight-black">{{ day.value.day }}</span>
              </v-col>
              <v-col>
                <span>
                  <v-icon
                    icon="mdi:mdi-circle-medium"
                    :color="day.value.isOpen ? 'green' : 'red'"
                  />
                </span>
                <span> {{ day.value.isOpen ? "Open" : "Close" }}</span>
              </v-col>
            </v-row>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <day-form :form-data="day" :errors="errors" :idx="idx" />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<style scoped></style>
