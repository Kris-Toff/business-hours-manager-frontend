<script setup>
import TextfieldTimePicker from "@/components/TextfieldTimePicker.vue";
import TextfieldDatePicker from "@/components/TextfieldDatePicker.vue";
import { useBusinessHours } from "@/composables/businessHours";

const { data, saving, forms, loading, getBusinessHours, updateBusinessHours } =
  useBusinessHours();

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
          v-for="(day, index) in data"
          :key="day.id"
          :color="
            forms[index]?.isOpen ? 'green-lighten-4' : 'blue-grey-lighten-4'
          "
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
                    :color="forms[index]?.isOpen ? 'green' : 'red'"
                  />
                </span>
                <span> {{ forms[index]?.isOpen ? "Open" : "Close" }} </span>
              </v-col>
            </v-row>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-form @submit.prevent="updateBusinessHours(index)">
              <v-container fluid>
                <v-row>
                  <v-col class="py-0">
                    <div class="d-flex flex-row">
                      <v-switch
                        v-model="forms[index].isOpen"
                        color="red-lighten-1"
                      >
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
                      v-model="forms[index].openAt"
                      :v-bind-attrs="forms[index].openAtAttrs"
                      :max="forms[index].closeAt"
                      label="Open time"
                      :disabled="!forms[index].isOpen"
                    />
                  </v-col>
                  <v-col>
                    <textfield-time-picker
                      v-model="forms[index].closeAt"
                      :v-bind-attrs="forms[index].closeAtAttrs"
                      :min="forms[index].openAt"
                      label="Close time"
                      :disabled="!forms[index].isOpen"
                    />
                  </v-col>
                </v-row>

                <v-divider />

                <v-row class="mt-2">
                  <v-col>
                    <textfield-time-picker
                      v-model="forms[index].lunchStart"
                      :v-bind-attrs="forms[index].lunchStartAttrs"
                      :min="forms[index].openAt"
                      :max="forms[index].lunchEnd"
                      label="Lunch Start"
                      :disabled="!forms[index].isOpen"
                    />
                  </v-col>
                  <v-col>
                    <textfield-time-picker
                      v-model="forms[index].lunchEnd"
                      :v-bind-attrs="forms[index].lunchEndAttrs"
                      :min="forms[index].lunchStart"
                      :max="forms[index].closeAt"
                      label="Lunch End"
                      :disabled="!forms[index].isOpen"
                    />
                  </v-col>
                </v-row>

                <v-divider />

                <v-row class="mt-2">
                  <v-col class="d-flex align-center">
                    <v-checkbox
                      v-model="forms[index].isEveryOtherWeek"
                      label="Every other week"
                      color="red-lighten-1"
                      :disabled="!forms[index].isOpen"
                    />
                  </v-col>
                  <v-col>
                    <textfield-date-picker
                      v-model="forms[index].otherWeekStartDate"
                      :v-bind-attrs="forms[index].otherWeekStartDateAttrs"
                      :day-of-the-week="day.day"
                      label="Start date"
                      :disabled="
                        !forms[index].isEveryOtherWeek || !forms[index].isOpen
                      "
                      :error-messages="forms[index].errors.otherWeekStartDate"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-spacer />
                  <v-btn
                    variant="tonal"
                    color="red-lighten-1"
                    type="submit"
                    :loading="saving[index]"
                  >
                    Save
                  </v-btn>
                </v-row>
              </v-container>
            </v-form>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<style scoped></style>
