<script setup lang="ts">
import { loadFull } from "tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import rainConfig from "../particles/rain.json";
import snowConfig from "../particles/snow.json";

const props = defineProps<{
  weather: "rain" | "snow" | "";
}>();

const particlesInit = async (engine: Engine) => {
  await loadFull(engine);
};

const particlesLoaded = async (container: Container) => {
  console.log("Particles container loaded", container);
};
</script>

<template>
  <Particles
    id="tsparticles"
    :particlesInit="particlesInit"
    :particlesLoaded="particlesLoaded"
    :options="weather === 'rain' ? rainConfig : snowConfig"
    v-if="weather !== ''"
    :key="weather"
  />
</template>
