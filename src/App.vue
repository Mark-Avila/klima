<script setup lang="ts">
import PageHome from "./components/PageHome.vue";
import PageFooter from "./components/PageFooter.vue";
import PageBackground from "./components/PageBackground.vue";
import PageInfo from "./components/PageInfo.vue";
import PageMap from "./components/PageMap.vue";
import axios from "axios";
import { onMounted, provide, ref } from "vue";
import type { Current, Forecast } from "./types";

const isOpen = ref({
  home: true,
  info: false,
  map: false,
});

const handleIsOpen = (pageToOpen: "home" | "info" | "map") => {
  const initialState = {
    home: false,
    info: false,
    map: false,
  };

  isOpen.value = { ...initialState, [pageToOpen]: true };
};

const current = ref<Current | []>([]);
const forecast = ref<Forecast | []>([]);
const loading = ref<boolean>(true);

provide("current", current);
provide("forecast", forecast);
provide("loading", loading);

onMounted(() => {
  axios
    .get<Current>("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: 14,
        lon: 120,
        appid: import.meta.env.VITE_OWMKEY,
        units: "metric",
      },
    })
    .then((response) => {
      current.value = response.data;
      return axios.get<Forecast>(
        "https://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            lat: 14,
            lon: 120,
            appid: import.meta.env.VITE_OWMKEY,
            units: "metric",
            cnt: 5,
          },
        }
      );
    })
    .then((response) => {
      forecast.value = response.data;
    })
    .then(() => (loading.value = false))
    .catch((error) => console.error("Failed to fetch weather data\n" + error));
});
</script>

<template>
  <main>
    <PageBackground />

    <div class="content">
      <PageHome
        v-if="isOpen.home && !loading"
        @more-info-clicked="handleIsOpen('info')"
      />

      <PageInfo
        v-if="isOpen.info && !loading"
        @back-clicked="handleIsOpen('home')"
        @map-clicked="handleIsOpen('map')"
      />

      <PageMap
        v-if="isOpen.map && !loading"
        @back-clicked="handleIsOpen('info')"
      />

      <div class="loader" v-else>
        <p>Loading</p>
      </div>
    </div>

    <PageFooter />
  </main>
</template>

<style>
html,
body,
#app {
  box-sizing: border-box;
  margin: 0;
  height: 100%;
}

main {
  box-sizing: border-box;
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.content {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
}

.shadow {
  text-shadow: 0px 4px 2px rgba(0, 0, 0, 0.3);
}
</style>
