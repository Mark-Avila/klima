<script setup lang="ts">
import type { Suggestion } from "@/types";
import { inject, ref, toRefs } from "vue";

// const emit = defineEmits<{
//   (e: "onItemClick", lat: number, lon: number, location: string): void;
// }>();

const loading = inject("suggestionLoading");

const props = defineProps<{
  onInput: () => void;
  suggestions: Suggestion[];
  onItemClick: (lat: number, lon: number, location?: string) => void;
}>();

const inputFocus = ref<boolean>(false);
const { onInput, suggestions, onItemClick } = toRefs(props);

const toggleFocus = (value: boolean) => {
  //Function has a slight delay to prevent closing suggestions before button click
  setTimeout(() => {
    inputFocus.value = value;
  }, 200);
};
</script>

<template>
  <div class="input__wrapper">
    <div class="input__inner__wrapper">
      <input
        placeholder="Search city"
        class="search"
        type="text"
        @input="onInput"
        @focusout="toggleFocus(false)"
        @focus="toggleFocus(true)"
      />
      <span :class="`input__spinner${loading ? '' : '--hide'}`">
        <font-awesome-icon icon="fa-solid fa-spinner" />
      </span>
    </div>
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
          @click="onItemClick(item.lat, item.lon, item.name)"
        >
          <span class="item__btn__location">
            {{ item.name }}, {{ item.country }}
          </span>
          <span class="item__icon__wrapper">
            <img
              class="item__icon"
              :src="`https://countryflagsapi.com/svg/${item.country}`"
              type="image/svg+xml"
            />
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.input__wrapper {
  position: relative;
  box-sizing: border-box;
  background-color: white;
  margin-top: 1rem;
  border-radius: 50px;
}

.input__inner__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
}

.input__spinner {
  color: rgba(0, 0, 0, 0.8);
  animation: spin 1s infinite;
  visibility: visible;
}

.input__spinne--hide {
  visibility: hidden;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.search {
  position: relative;
  padding: 1rem 0;
  width: 100%;
  outline: none;
  border: none;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.8);
  z-index: 10;
  background: none;
  width: 250px;
}

.item__icon {
  position: relative;
}

.item__icon {
  height: 12px;
  width: 19px;
}

.search__suggestions {
  position: absolute;
  margin: 0;
  margin-top: -20px;
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

.search__item__btn {
  color: rgba(0, 0, 0, 0.7);
  font-family: "Roboto", sans-serif;
  border: none;
  outline: none;
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  background: none;
  font-size: 0.7rem;
}

.search__item__btn:hover {
  background-color: rgba(231, 231, 231, 0.7);
  cursor: pointer;
}

.search__item__btn:active {
  background-color: rgb(208, 208, 208);
}

@media only screen and (min-width: 1024px) {
  .search {
    font-size: 0.8rem;
    padding: 0.7rem 0rem;
    width: 200px;
  }

  .input__inner__wrapper {
    padding: 0 1.2rem;
  }
}
</style>
