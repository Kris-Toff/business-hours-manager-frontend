<script setup>
import { onBeforeUnmount, ref, watch } from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Sign from "@/components/Sign.vue";
import DateChecker from "@/components/DateChecker.vue";
import { useHome } from "@/composables/home";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Hong_Kong");

const { data } = useHome();
const timeNow = ref(null);
const dateNow = ref(null);
const dayOfTheWeek = ref(null);
const isOpenByTime = ref(false);
const isLunch = ref(false);
const isChecking = ref(true);

const clock = setInterval(() => {
  const dayjsLocal = dayjs();

  timeNow.value = dayjs.tz(dayjsLocal).format("HH:mm:ss");
  dateNow.value = dayjs.tz(dayjsLocal).format("YYYY-MM-DD");
  dayOfTheWeek.value = dayjs.tz(dayjsLocal).format("dddd");
}, 1000);

function timeBetween(currentTime, startTime, endTime) {
  let status = false;

  let [startHours, startMinutes] = startTime.split(":");
  let [endHours, endMinutes] = endTime.split(":");
  let [currentHours, currentMinutes] = currentTime.split(":");

  let start = dayjs().hour(startHours).minute(startMinutes);
  let end = dayjs().hour(endHours).minute(endMinutes);
  let current = dayjs().hour(currentHours).minute(currentMinutes);

  let diffStart = current.diff(start, "minute");
  let diffEnd = current.diff(end, "minute");

  if (diffStart > 0 && diffEnd < 0) status = true;

  return status;
}

watch(timeNow, (v) => {
  if (data.value) {
    // check open time and end time
    const isOpenTimeBetween = timeBetween(
      v,
      data.value.openAt,
      data.value.closeAt
    );

    // check lunch start and lunch end
    const isLunchTimeBetween = timeBetween(
      v,
      data.value.lunchStart,
      data.value.lunchEnd
    );

    if (isOpenTimeBetween && !isLunchTimeBetween) {
      isOpenByTime.value = true;
      isLunch.value = false;
    } else {
      isOpenByTime.value = false;
      isLunch.value = true;
    }

    if (isChecking.value) isChecking.value = false;
  }
});

onBeforeUnmount(() => {
  clearInterval(clock);
});
</script>

<template>
  <v-card class="mx-auto mt-16" max-width="400">
    <v-card-title class="bg-red-lighten-1">
      <span class="font-weight-black text-wrap text-center">
        <h2>Welcome to Apple Cafe</h2>
      </span>
    </v-card-title>

    <v-card-text class="mt-6">
      <sign
        :status="data?.isOpen && isOpenByTime"
        :loading="isChecking"
        :is-lunch="isLunch"
      >
        <div v-if="isLunch">
          <span> Close for lunch break </span>

          <div class="mt-3">
            <p>be back in: {{ timeNow }}</p>
          </div>
        </div>
        <div v-else>
          <span v-if="data?.isOpen && isOpenByTime">
            Yes, we're open! {{ timeNow }}
          </span>
          <span v-else>Sorry, we're close today.</span>
        </div>
      </sign>
    </v-card-text>

    <v-card-text class="mt-6">
      <date-checker />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.sheet-msg {
  border-radius: 5px;
}
</style>
