<script setup lang="ts">
import type { Forecast } from "@/types";
import { computed, toRefs } from "vue";
import useIcon from "@/use/useIcon";
import moment from "moment";

const props = defineProps<{
  timezone: number;
  forecastData: Forecast;
}>();

const { timezone } = toRefs(props);

const days = computed<string[]>(() => {
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const timezoneInMinutes = timezone.value / 60;
  let startDay = moment().utcOffset(timezoneInMinutes).isoWeekday();

  const finalDays: string[] = [];
  let index = 1;
  while (index !== 7) {
    if (startDay == 7) {
      startDay = 1;
    } else {
      startDay += 1;
    }

    finalDays.push(week[startDay]);
    index++;
  }

  return finalDays;
});
</script>

<template>
  <div class="wrapper">
    <div class="item" v-for="(item, index) in forecastData.list" :key="index">
      <p class="item__day text__less">{{ days[index] }}</p>
      <span class="icon">
        <font-awesome-icon :icon="'fa-solid ' + useIcon(item.weather[0].id)" />
      </span>
      <p class="item__weather text__less">{{ item.weather[0].main }}</p>
      <p class="item__temp text__less">{{ Math.round(item.main.temp) }} C</p>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  box-sizing: border-box;
  height: 100%;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  padding: 1.2rem 0;
}

.icon {
  font-size: 1.5rem;
}

.text__less {
  color: rgba(255, 255, 255, 0.7);
}

p {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@media only screen and (min-width: 1180px) {
  .item {
    justify-content: space-evenly;
  }
}

@media only screen and (min-width: 1240px) {
  p {
    font-size: 0.8rem;
  }

  .item {
    padding: 0;
  }
}
</style>
