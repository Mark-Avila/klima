<script setup lang="ts">
import type { Current } from "@/types";
import { inject } from "vue";
import Weathermap from "./WeatherMap.vue";
const emit = defineEmits<{
  (e: "backClicked", pageToOpen: "home" | "info" | "map"): void;
}>();

const current = inject<Current>("current");
</script>

<template>
  <div class="wrapper">
    <div class="map__back__wrapper">
      <button @click="$emit('backClicked')" class="map__back__button">
        Back
      </button>
    </div>
    <Weathermap
      :lat="current?.coord.lat || 14"
      :lon="current?.coord.lon || 14"
    />
  </div>
</template>

<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  box-sizing: border-box;
}

.map__back__wrapper {
  margin: 0.5rem 0;
}

.map__back__button {
  padding: 0.4rem 0.5rem;
  background: none;
  outline: none;
  border: none;
  color: white;
  font-size: 1rem;
}
</style>
