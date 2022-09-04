<script setup lang="ts">
import PageHome from "./components/PageHome.vue";
import PageFooter from "./components/PageFooter.vue";
import PageBackground from "./components/PageBackground.vue";
import PageInfo from "./components/PageInfo.vue";
import PageMap from "./components/PageMap.vue";
import axios from "axios";
import { onMounted, provide, ref } from "vue";
import type { Current, Forecast, Suggestion } from "./types";
import { Motion, Presence } from "motion/vue";

const city = ref<string>("");
const current = ref<Current | []>([]);
const suggestions = ref<Suggestion[] | []>([]);
const forecast = ref<Forecast | []>([]);
const loading = ref<boolean>(true);
const initialLoading = ref<boolean>(true);
const initialAnimation = ref<boolean>(true);

provide("current", current);
provide("suggestions", suggestions);
provide("forecast", forecast);
provide("loading", loading);
provide("city", city);

const backgroundRef = ref();

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

const fetchWeatherData = (lat: number, lon: number, location?: string) => {
  loading.value = true;

  axios
    .get<Current>("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: lon,
        appid: import.meta.env.VITE_OWMKEY,
        units: "metric",
      },
    })
    .then((response) => {
      current.value = response.data;
      backgroundRef.value.handleUpdate(response.data.weather[0].id);
      return axios.get<Forecast>(
        "https://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            lat: lat,
            lon: lon,
            appid: import.meta.env.VITE_OWMKEY,
            units: "metric",
            cnt: 5,
          },
        }
      );
    })
    .then((response) => {
      forecast.value = response.data;
      city.value = location
        ? `${location}, ${response.data.city.country}`
        : `${response.data.city.name}, ${response.data.city.country}`;
    })
    .then(() => {
      initialLoading.value = false;
      loading.value = false;
    })
    .catch((error) => console.error("Failed to fetch weather data\n" + error));
};

const fetchLocations = (query: string) => {
  suggestions.value = [];

  if (query !== "") {
    axios
      .get("http://api.openweathermap.org/geo/1.0/direct", {
        params: {
          q: query,
          appid: import.meta.env.VITE_OWMKEY,
          limit: 5,
        },
      })
      .then((response) => {
        suggestions.value = response.data;
      });
  }
};

const initWeatherData = (lat: number, lon: number, location?: string) => {
  fetchWeatherData(lat, lon, location);
};

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        initWeatherData(position.coords.latitude, position.coords.longitude);
      },
      () => {
        initWeatherData(34.0522, -118.2437);
      }
    );
  } else {
    //Los Angeles, CA
    initWeatherData(34.0522, -118.2437);
  }
});
</script>

<template>
  <main>
    <PageBackground ref="backgroundRef" />

    <div class="content">
      <Presence :exit-before-enter="true">
        <Motion
          :initial="initialAnimation ? { opacity: 0 } : { x: -400, opacity: 0 }"
          :animate="initialAnimation ? { opacity: 1 } : { x: 0, opacity: 1 }"
          :exit="{ x: -400, opacity: 0 }"
          @motioncomplete="() => (initialAnimation = false)"
          class="motion__wrapper"
          v-if="isOpen.home && !initialLoading"
        >
          <PageHome
            @more-info-clicked="handleIsOpen('info')"
            @on-search-input="fetchLocations"
            @on-item-click="initWeatherData"
          />
        </Motion>

        <Motion
          :initial="{ x: 400, opacity: 0 }"
          :animate="{ x: 0, opacity: 1 }"
          :exit="{ x: 400, opacity: 0 }"
          class="motion__wrapper"
          v-if="isOpen.info && !initialLoading"
        >
          <PageInfo
            @back-clicked="handleIsOpen('home')"
            @map-clicked="handleIsOpen('map')"
          />
        </Motion>

        <Motion
          :initial="{ y: 400, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :exit="{ y: 400, opacity: 0 }"
          class="motion__wrapper"
          v-if="isOpen.map && !initialLoading"
        >
          <PageMap @back-clicked="handleIsOpen('info')" />
        </Motion>
      </Presence>

      <div class="loader" v-if="initialLoading">
        <font-awesome-icon icon="fa-solid fa-hurricane" />
      </div>
    </div>

    <PageFooter />
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&family=Roboto:wght@400;700&display=swap");

html,
body,
#app {
  box-sizing: border-box;
  margin: 0;
  height: 100%;
}

.motion__wrapper {
  z-index: 3;
  height: 100%;
  width: 100%;
  max-width: 1400px;
  max-height: 1200px;
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

.loader {
  z-index: 3;
  width: 50px;
  height: 50px;
  color: white;
  font-size: 2rem;
  animation: 1s spin infinite linear;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

@-moz-keyframes spin {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(-360deg);
  }
}
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-360deg);
  }
}

.shadow {
  text-shadow: 0px 4px 2px rgba(0, 0, 0, 0.3);
}
</style>
