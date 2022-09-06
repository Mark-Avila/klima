<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { onMounted, ref, toRefs } from "vue";
import type { MapLayers } from "@/types";

const props = defineProps<{
  layer: MapLayers;
  lat: number;
  lon: number;
}>();

const { layer, lat, lon } = toRefs(props);

const initMap = (layer: MapLayers, lat: number, lon: number) => {
  const weathermap = L.map("weathermap", {
    preferCanvas: true,
  }).setView([lat, lon], 5);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(weathermap);

  L.tileLayer(
    `https://tile.openweatherMap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${
      import.meta.env.VITE_OWMKEY
    }`
  ).addTo(weathermap);

  L.tileLayer(
    `https://tile.openweatherMap.org/map/${layer}/{z}/{x}/{y}.png?appid=${
      import.meta.env.VITE_OWMKEY
    }`
  ).addTo(weathermap);
};

defineExpose({
  initMap,
});

onMounted(() => {
  initMap(layer.value, lat.value, lon.value);
});
</script>

<template>
  <div id="weathermap"></div>
</template>

<style scoped>
#weathermap {
  height: 100%;
  width: 100%;
  z-index: 9;
  box-sizing: border-box;
}
</style>
