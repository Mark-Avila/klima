<script setup lang="ts">
import moment from "moment-timezone";
import { toRefs } from "vue";
import { computed } from "vue";

const props = defineProps<{
  timezone: number;
  city: string;
  feelsLike: number;
  temp: number;
  windSpeed: number;
  pressure: number;
  humidity: number;
  visibility: number;
}>();

const { timezone } = toRefs(props);

const fullDate = computed<string>(() => {
  const timezoneInMinutes = timezone.value / 60;
  const currTime = moment()
    .utcOffset(timezoneInMinutes)
    .format("MMMM Do YYYY, h:mm a");
  return currTime;
});
</script>

<template>
  <div class="wrapper">
    <div class="upper">
      <div>
        <p id="current-time" class="text__less">{{ fullDate }}</p>
        <p id="current-loc">{{ city }}</p>
        <p id="current-feels" class="text__less">
          Feels like <span>{{ feelsLike }}°</span>
        </p>
      </div>
      <div>
        <p id="current-temp">{{ Math.round(temp) }}°</p>
      </div>
    </div>
    <div class="lower">
      <div class="lower__item">
        <p class="lower__title text__less">Wind Speed</p>
        <p class="lower__data" id="wind-data">{{ windSpeed }} m/s</p>
      </div>
      <div class="lower__item">
        <p class="lower__title text__less">Pressure</p>
        <p class="lower__data" id="pressure-data">{{ pressure }} pHA</p>
      </div>
      <div class="lower__item">
        <p class="lower__title text__less">Humidity</p>
        <p class="lower__data" id="humid-data">{{ humidity }}%</p>
      </div>
      <div class="lower__item">
        <p class="lower__title text__less">Visibility</p>
        <p class="lower__data" id="vis-data">{{ visibility / 1000 }} km</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.upper {
  display: flex;
  justify-content: space-between;
}
#current-loc {
  font-family: "Montserrat", sans-serif;
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

#current-feels > span {
  font-weight: bold;
  color: white;
}

#current-temp {
  font-size: 3.5rem;
  font-family: "Montserrat", sans-serif;
}

.text__less {
  color: rgba(255, 255, 255, 0.7);
}
.lower {
  margin-top: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.lower__item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lower__title {
  margin-bottom: 1rem;
}

p {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  font-size: 0.8rem;
}

@media only screen and (min-width: 1180px) {
  .lower {
    margin-bottom: 1rem;
  }

  .lower__item {
    justify-content: center;
    align-items: center;
  }

  p {
    font-size: 0.9rem;
  }
}

@media only screen and (min-width: 1240px) {
  p {
    font-size: 0.7rem;
  }
}
</style>
