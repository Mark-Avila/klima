<script setup lang="ts">
import LeafletMap from "./LeafletMap.vue";
import MapButton from "./MapButton.vue";
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
      <span class="map__wrapper">
        <LeafletMap />
      </span>
      <div class="map__buttons">
        <MapButton>
          <font-awesome-icon icon="fa-solid fa-cloud-rain" />
        </MapButton>
        <MapButton>
          <font-awesome-icon icon="fa-solid fa-cloud-rain" />
        </MapButton>
        <MapButton>
          <font-awesome-icon icon="fa-solid fa-cloud-rain" />
        </MapButton>
        <MapButton>
          <font-awesome-icon icon="fa-solid fa-cloud-rain" />
        </MapButton>
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
</style>
