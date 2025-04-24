<script setup>
import { onBeforeUnmount, ref, watch } from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Sign from "@/components/Sign.vue";
import DateChecker from "@/components/DateChecker.vue";
import { useHome } from "@/composables/home";
import { useTimeFormatting } from "@/composables/timeFormatting";
import { useDateFormatting } from "@/composables/dateFormatting";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.tz.setDefault("Asia/Hong_Kong");

const { data, loading, nextOpeningData, nextOpening, getNextOpeningByDate } =
  useHome();
const { timeComparisons, countdownTimer, humanizeTime } = useTimeFormatting();
const { humanizeDate, dateStringFormat } = useDateFormatting();
const dateNow = ref(null);
const dayOfTheWeek = ref(null);
const storeStatus = ref({
  isBefore: false,
  isBetween: false,
  isAfter: false,
});
const lunchStatus = ref({ isBefore: false, isBetween: false, isAfter: false });
const lunchTimerHumanized = ref(null);
const timeNow = ref(dayjs.tz(dayjs()).format("HH:mm:ss"));
const nextOpeningByDateData = ref(null);
const dateCheckerLoading = ref(false);

const clock = setInterval(() => {
  const dayjsLocal = dayjs();

  timeNow.value = dayjs.tz(dayjsLocal).format("HH:mm:ss");
  dateNow.value = dayjs.tz(dayjsLocal).format("YYYY-MM-DD");
  dayOfTheWeek.value = dayjs.tz(dayjsLocal).format("dddd");
}, 60000); // 1 min

function setupStatus(time) {
  // check current time is between open and close time
  storeStatus.value = timeComparisons(
    time,
    data.value.openAt,
    data.value.closeAt
  );

  // check current time is between lunch  start and end
  lunchStatus.value = timeComparisons(
    time,
    data.value.lunchStart,
    data.value.lunchEnd
  );

  if (lunchStatus.value.isBetween) {
    const lunchTimer = countdownTimer(time, data.value.lunchEnd);
    lunchTimerHumanized.value = humanizeTime(lunchTimer);
  }
}

async function checkDate(data) {
  dateCheckerLoading.value = true;
  nextOpeningByDateData.value = await getNextOpeningByDate(data.date);
  dateCheckerLoading.value = false;
}

watch(timeNow, (v) => {
  setupStatus(v);
});

watch(data, () => {
  setupStatus(timeNow.value);
  if (!storeStatus.value.isBetween) {
    if (data.value.isOpen && storeStatus.value.isBefore) {
      // To Do
      // get next opening by hours
      console.log("is before");
    } else {
      // get next opening by day
      console.log("after");
      nextOpening();
    }
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
        :status="data?.isOpen && storeStatus.isBetween"
        :loading="loading"
        :is-lunch="lunchStatus.isBetween"
      >
        <div v-if="lunchStatus.isBetween">
          <h3>Close for lunch break</h3>

          <div class="mt-3">
            <p>be back in: {{ lunchTimerHumanized }}</p>
          </div>
        </div>
        <div v-else>
          <h3 v-if="data?.isOpen && storeStatus.isBetween">Yes, we're open!</h3>
          <div v-else>
            <h3>Sorry, we're close today.</h3>
            <p class="mt-3" v-if="nextOpeningData">
              Next opening: {{ humanizeDate(nextOpeningData.date) }}
            </p>
            <p class="mt-1" v-if="nextOpeningData">
              {{ dateStringFormat(nextOpeningData.date, "dddd MMM DD, YYYY") }}
            </p>
          </div>
        </div>
      </sign>
    </v-card-text>

    <v-card-text class="mt-6">
      <date-checker @date-checker="checkDate" />
      <sign
        v-if="nextOpeningByDateData"
        :status="nextOpeningByDateData.result.isOpen"
        :loading="dateCheckerLoading"
        class="mt-6"
      >
        <div>
          {{ nextOpeningByDateData.isOpen }}
          <h3 v-if="nextOpeningByDateData.result.isOpen">
            Yes, we're open on this day:
            {{
              dateStringFormat(nextOpeningByDateData.date, "dddd MMM DD, YYYY")
            }}
          </h3>
          <div v-else>
            <h3>
              Sorry, we're close on this day:
              {{
                dateStringFormat(
                  nextOpeningByDateData.date,
                  "dddd MMM DD, YYYY"
                )
              }}
            </h3>
          </div>
        </div>
      </sign>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.sheet-msg {
  border-radius: 5px;
}
</style>
