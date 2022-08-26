<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { onMounted } from "vue";

const setupMap = () => {
  const myMap = L.map("weathermap").setView([14.5995, 120.9842], 10);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);
};

onMounted(() => {
  setupMap();
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
