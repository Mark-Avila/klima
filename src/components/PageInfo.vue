<script setup lang="ts">
import InfoBox from "./InfoBox.vue";
import InfoGeneral from "./InfoGeneral.vue";
import InfoForecast from "./InfoForecast.vue";

const emit = defineEmits<{
  (e: "backClicked", pageToOpen: "home" | "info" | "map"): void;
  (e: "mapClicked", pageToOpen: "home" | "info" | "map"): void;
}>();
</script>

<template>
  <div class="info">
    <div class="info__back__wrapper">
      <button @click="$emit('backClicked')" class="info__back__button">
        Back
      </button>
    </div>
    <div class="info__list">
      <InfoBox id="general">
        <InfoGeneral />
      </InfoBox>
      <InfoBox id="forecast">
        <InfoForecast />
      </InfoBox>
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
</style>
