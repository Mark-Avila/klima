<script setup lang="ts">
import InfoBox from "./InfoBox.vue";
import InfoGeneral from "./InfoGeneral.vue";
import InfoForecast from "./InfoForecast.vue";
import Weathermap from "./WeatherMap.vue";
import type { Current, Forecast } from "@/types";
import { inject } from "vue";

defineEmits<{
  (e: "backClicked", pageToOpen: "home" | "info" | "map"): void;
  (e: "mapClicked", pageToOpen: "home" | "info" | "map"): void;
}>();

const current: Current | undefined = inject("current");
const forecast: Forecast | undefined = inject("forecast");
const city: string | undefined = inject("city");
</script>

<template>
  <div class="info">
    <div class="info__back__wrapper">
      <button @click="$emit('backClicked')" class="info__back__button">
        <font-awesome-icon icon="fa-solid fa-angle-left" />
        <span>Back</span>
      </button>
    </div>
    <div class="info__list">
      <InfoBox id="general">
        <InfoGeneral
          :timezone="current?.timezone || 0"
          :city="city || 'NA'"
          :feels-like="current?.main.feels_like || 0"
          :temp="current?.main.temp || 0"
          :windSpeed="current?.wind.speed || 0"
          :pressure="current?.main.pressure || 0"
          :humidity="current?.main.humidity || 0"
          :visibility="current?.visibility || 0"
        />
      </InfoBox>
      <InfoBox id="forecast">
        <InfoForecast
          :forecastData="forecast"
          :timezone="current?.timezone || 0"
          v-if="forecast"
        />
      </InfoBox>
      <span class="weathermap">
        <Weathermap
          :lat="current?.coord.lat || 14"
          :lon="current?.coord.lon || 120"
        />
      </span>
    </div>
    <button @click="$emit('mapClicked')" id="weathermap-btn">
      View weather map
    </button>
  </div>
</template>

<style scoped>
.info {
  height: 100%;
  width: 100%;
  max-width: 1400px;
  max-height: 600px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  box-sizing: border-box;
}

.info__back__wrapper {
  margin: 0.5rem 0;
}

.info__back__button {
  padding: 0.4rem 0.5rem;
  background: none;
  outline: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.info__back__button:hover {
  color: rgba(255, 255, 255, 0.7);
}

.info__back__button > span {
  margin-left: 0.5rem;
}

.info__list {
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 200px);
  gap: 0.5rem;
}

#weathermap-btn {
  background: white;
  margin-top: 0.5rem;
  padding: 0.8rem 0;
  border: none;
  color: rgba(0, 0, 0, 0.9);
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 12px;
}

#weathermap-btn:active {
  background-color: rgb(236, 236, 236);
}

.weathermap {
  display: none;
}

/** Vertical Tablets */
@media only screen and (min-width: 820px) {
  .info__list {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 200px auto;
    height: 100%;
  }

  #weathermap-btn {
    display: none;
  }

  .weathermap {
    display: block;
    grid-column: 1 / 3;
  }
}

/** Horizontal Large Tablets or Small Laptops */
@media only screen and (min-width: 1180px) {
  .info__list {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 50% 50%;
  }

  .info {
    padding: 5rem 2rem;
  }

  #general {
    grid-column: 1/2;
    grid-row: 1/2;
  }

  #forecast {
    grid-column: 1/2;
    grid-row: 2/3;
  }

  .weathermap {
    display: block;
    grid-column: 2 / 4;
    grid-row: 1 / 3;
  }
}

@media only screen and (min-width: 1240px) {
  .info {
    padding: 3rem 7rem;
  }
}

@media only screen and (min-width: 1366px) {
  .info {
    padding: 5rem 2rem;
  }
}

/* @media only screen and (min-width: 1600px) {
  .info {
    width: 60%;
    height: 70%;
  }
} */
</style>
