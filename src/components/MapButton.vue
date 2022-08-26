<template>
  <button>
    <slot>NA</slot>
  </button>
</template>

<style scoped>
button {
  background: white;
  color: rgba(0, 0, 0, 0.8);
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
}

button:active {
  background: rgb(101, 193, 255);
  color: white;
  transition: 100ms ease-in-out;
}
</style>
