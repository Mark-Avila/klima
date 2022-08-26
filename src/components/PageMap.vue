<script setup lang="ts">
import LeafletMap from "./LeafletMap.vue";
const emit = defineEmits<{
  (e: "backClicked", pageToOpen: "home" | "info" | "map"): void;
}>();
</script>

<template>
  <div class="wrapper">
    <div class="map__back__wrapper">
      <button @click="$emit('backClicked')" class="map__back__button">
        Back
      </button>
    </div>
    <div class="map__body">
      <LeafletMap />
      <div class="map__buttons">
        <button></button>
      </div>
    </div>
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

.map__body {
  height: 100%;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
}
</style>
