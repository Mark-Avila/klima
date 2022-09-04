<script setup lang="ts">
import type { Suggestion } from "@/types";
import { ref, toRefs } from "vue";

const props = defineProps<{
  onInput: () => void;
  suggestions: Suggestion[];
}>();

const inputFocus = ref<boolean>(false);
const { onInput } = toRefs(props);

const toggleFocus = (value: boolean) => {
  //Function has a slight delay to prevent closing suggestions before button click
  setTimeout(() => {
    inputFocus.value = value;
  }, 100);
};
</script>

<template>
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
</template>

<style scoped>
.search {
  position: relative;
  padding: 0.7rem 1.5rem;
  margin-top: 1rem;
  width: 12rem;
  outline: none;
  border-radius: 50px;
  border: none;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.5);
  z-index: 10;
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
  padding: 0.5rem;
  display: flex;
  align-items: center;
  text-align: left;
  background: none;
  font-size: 0.7rem;
}

.search__item__btn:hover {
  background-color: rgba(231, 231, 231, 0.7);
  cursor: pointer;
}
</style>
