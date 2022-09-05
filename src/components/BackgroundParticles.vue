<script setup lang="ts">
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import rainConfig from "../particles/rain.json";
import snowConfig from "../particles/snow.json";

const props = defineProps<{
  weather: "rain" | "snow" | "";
}>();

const particlesInit = async (engine: Engine) => {
  await loadFull(engine);
};
</script>

<template>
  <Particles
    id="tsparticles"
    :particlesInit="particlesInit"
    :options="weather === 'rain' ? rainConfig : snowConfig"
    v-if="weather !== ''"
    :key="weather"
  />
</template>
