<script setup lang="ts">
import MapButton from "./MapButton.vue";
import LeafletMap from "./LeafletMap.vue";
import { ref } from "vue";
import type { MapLayers } from "@/types";

defineProps<{
  lat: number;
  lon: number;
}>();

const mode = ref<MapLayers>("precipitation");
const wmRef = ref();

const changeMode = (newMode: MapLayers) => {
  mode.value = newMode;
};
</script>

<template>
  <div class="map__body">
    <LeafletMap ref="wmRef" :layer="mode" :lat="lat" :lon="lon" :key="mode" />
    <div class="map__buttons">
      <MapButton
        placeholder="Precipitation"
        @button-clicked="changeMode('precipitation')"
      >
        <font-awesome-icon icon="fa-solid fa-droplet" />
      </MapButton>
      <MapButton
        placeholder="Pressure"
        @button-clicked="changeMode('pressure_new')"
      >
        <font-awesome-icon icon="fa-solid fa-weight" />
      </MapButton>
      <MapButton
        placeholder="Wind Speed"
        @button-clicked="changeMode('wind_new')"
      >
        <font-awesome-icon icon="fa-solid fa-wind" />
      </MapButton>
      <MapButton
        placeholder="Temperature"
        @button-clicked="changeMode('temp_new')"
      >
        <font-awesome-icon icon="fa-solid fa-temperature-quarter" />
      </MapButton>
    </div>
  </div>
</template>

<style scoped>
.map__body {
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
}

.map__buttons {
  z-index: 10;
  position: absolute;
  left: 5%;
  bottom: 5%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 1fr);
  gap: 0.5rem;
}

@media only screen and (min-width: 1024px) {
  .map__buttons {
    left: 2%;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(4, 1fr);
  }
}

@media only screen and (min-width: 1240px) {
  .map__buttons {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
}
</style>
