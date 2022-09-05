<script setup lang="ts">
const emit = defineEmits<{
  (e: "buttonClicked"): void;
}>();

defineProps<{
  placeholder: string;
}>();
</script>

<template>
  <div class="wrapper">
    <button @click="$emit('buttonClicked')">
      <slot>NA</slot>
    </button>
    <div class="box">
      <p class="box__text">
        {{ placeholder }}
      </p>
    </div>
  </div>
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

.wrapper {
  display: flex;
  position: relative;
}

.box {
  display: none;
  position: absolute;
  left: 100%;
  top: 50%;
  margin-left: 0.8rem;
  padding: 0 1rem;
  transform: translateY(-50%);
  width: 5rem;
  background-color: white;
  border-radius: 50px;
}

.box__text {
  color: rgba(0, 0, 0, 0.8);
  font-size: 0.6rem;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}

button:hover {
  background: rgb(152, 214, 255);
  color: white;
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

  button:hover + .box {
    display: block;
  }
}
</style>
