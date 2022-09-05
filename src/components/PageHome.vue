<script setup lang="ts">
import type { Current, Suggestion } from "@/types";
import useIcon from "@/use/useIcon";
import { inject } from "vue";
import HomeInput from "./HomeInput.vue";
const emit = defineEmits<{
  (e: "moreInfoClicked"): void;
  (e: "onSearchInput", query: string): void;
  (e: "onItemClick", lat: number, lon: number, location?: string): void;
}>();

const current: Current | undefined = inject("current");
const suggestions: Suggestion[] | undefined = inject("suggestions");
const city: string | undefined = inject("city");

const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timeout: number | null = null;

  return (...args: []) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const onInput = debounce((event: Event) => {
  emit("onSearchInput", (event.target as HTMLInputElement).value);
}, 500);

const handleOnItemClick = (lat: number, lon: number, location?: string) => {
  emit("onItemClick", lat, lon, location);
};
</script>

<template>
  <div class="wrapper">
    <span class="icon">
      <font-awesome-icon
        :icon="'fa-solid ' + useIcon(current?.weather[0].id || 800)"
      />
    </span>
    <p class="weather shadow">{{ current?.weather[0].description || "NA" }}</p>
    <p class="temp shadow">
      {{ Math.round(current ? current.main.temp : 0) }}°
    </p>
    <p class="location shadow">{{ city }}</p>
    <HomeInput
      :onInput="onInput"
      :suggestions="(suggestions || [] as Suggestion[])"
      :onItemClick="handleOnItemClick"
    />
    <button class="view__more" type="button" @click="$emit('moreInfoClicked')">
      View more information
      <font-awesome-icon
        class="view__more__icon"
        icon="fa-solid fa-angle-right"
      />
    </button>
  </div>
</template>

<style scoped>
.wrapper {
  z-index: 3;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
}

.icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.view__more {
  background: none;
  border: none;
  outline: none;
  color: white;
  margin-top: 1rem;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.view__more__icon {
  margin-left: 1rem;
}

.view__more:hover {
  color: rgba(255, 255, 255, 0.7);
}

.temp {
  font-family: "Montserrat", sans-serif;
  font-size: 5rem;
  padding: 0;
  margin: 0;
}

.location {
  padding: 0;
  margin: 0;
  font-size: 1.4em;
  font-family: "Montserrat", sans-serif;
}

.weather {
  padding: 0;
  margin: 0;
  font-family: "Montserrat", sans-serif;
  text-transform: capitalize;
}

@media only screen and (min-width: 1024px) {
  .search {
    font-size: 0.8rem;
    padding: 0.7rem 1rem;
    width: 200px;
  }

  .weather {
    font-size: 0.8rem;
  }

  .location {
    font-size: 1rem;
  }

  .temp {
    font-size: 4rem;
  }

  button {
    font-size: 0.7rem;
  }

  .icon {
    font-size: 1.2rem;
  }
}
</style>
