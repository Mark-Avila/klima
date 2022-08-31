<script setup lang="ts">
import type { Current, Suggestion } from "@/types";
import { inject, ref } from "vue";
const emit = defineEmits<{
  (e: "moreInfoClicked", pageToOpen: "home" | "info" | "map"): void;
  (e: "onSearchInput", query: string): void;
  (e: "onItemClick", lat: number, lon: number, location: string): void;
}>();

const current: Current | undefined = inject("current");
const suggestions: Suggestion[] | undefined = inject("suggestions");
const city: string | undefined = inject("city");
const inputFocus = ref<boolean>(false);

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

const toggleFocus = (value: boolean) => {
  //Function has a slight delay to prevent closing suggestions before button click
  setTimeout(() => {
    inputFocus.value = value;
  }, 100);
};

const onInput = debounce((event: Event) => {
  emit("onSearchInput", (event.target as HTMLInputElement).value);
}, 500);
</script>

<template>
  <div class="wrapper">
    <span class="icon">
      <font-awesome-icon icon="fa-solid fa-cloud-rain" />
    </span>
    <p class="weather shadow">{{ current?.weather[0].main }}</p>
    <p class="temp shadow">
      {{ Math.round(current ? current.main.temp : 0) }}°
    </p>
    <p class="location shadow">{{ city }}, {{ current?.sys.country }}</p>
    <div class="input__wrapper">
      <input
        placeholder="Search city"
        class="search"
        type="text"
        @input="onInput"
        @focusout="toggleFocus(false)"
        @focus="toggleFocus(true)"
      />
      <ul
        class="search__suggestions"
        v-if="suggestions && suggestions.length > 0 && inputFocus"
      >
        <li
          class="search__item"
          v-for="(item, index) in suggestions"
          :key="index"
        >
          <button
            class="search__item__btn"
            @click="$emit('onItemClick', item.lat, item.lon, item.name)"
          >
            {{ item.name }}, {{ item.country }}
          </button>
        </li>
      </ul>
    </div>
    <button class="view__more" type="button" @click="$emit('moreInfoClicked')">
      View more information
    </button>
  </div>
</template>

<style scoped>
.wrapper {
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding-bottom: 3rem;
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
}

.search {
  position: relative;
  padding: 0.7rem 1.5rem;
  margin-top: 1rem;
  width: 250px;
  outline: none;
  border-radius: 50px;
  border: none;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.search__suggestions {
  position: absolute;
  margin: 0;
  margin-top: -15px;
  border-radius: 0 0 12px 12px;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
  background-color: white;
  z-index: 9;
}

.input__wrapper {
  position: relative;
  box-sizing: border-box;
}

.search__item__btn {
  color: rgba(0, 0, 0, 0.7);
  font-family: "Roboto", sans-serif;
  border: none;
  outline: none;
  width: 100%;
  padding: 0.7rem 0.5rem;
  text-align: left;
  background: none;
}

.search__item__btn:hover {
  background-color: rgba(231, 231, 231, 0.7);
  cursor: pointer;
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
