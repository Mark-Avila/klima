<script setup lang="ts">
import MapButton from "./MapButton.vue";
import LeafletMap from "./LeafletMap.vue";
</script>

<template>
  <div class="map__body">
    <LeafletMap />
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

@media only screen and (min-width: 1240px) {
  .map__buttons {
    left: 2%;
  }
}
</style>
