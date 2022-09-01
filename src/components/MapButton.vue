<script setup lang="ts">
const emit = defineEmits<{
  (e: "buttonClicked", newMode: string): void;
}>();
</script>

<template>
  <button @click="$emit('buttonClicked')">
    <slot>NA</slot>
  </button>
</template>

<style scoped>
button {
  background: white;
  color: rgba(0, 0, 0, 0.4);
  border-radius: 50px;
  border: none;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
  padding: 0.5rem 1rem;
  height: 3rem;
  width: 3rem;
  transition: 100ms ease-in-out;
  outline: none;
  font-size: 1rem;
  cursor: pointer;
}

button:active {
  background: rgb(101, 193, 255);
  color: white;
  transition: 100ms ease-in-out;
}

@media only screen and (min-width: 1240px) {
  button {
    font-size: 0.8rem;
    height: 2rem;
    width: 2rem;
    padding: 0.5rem;
  }
}
</style>
