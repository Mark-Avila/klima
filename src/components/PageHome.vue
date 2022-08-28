<script setup lang="ts">
const emit = defineEmits<{
  (e: "moreInfoClicked", pageToOpen: "home" | "info" | "map"): void;
}>();
</script>

<template>
  <div>
    <span class="icon">
      <font-awesome-icon icon="fa-solid fa-cloud-rain" />
    </span>
    <p class="weather shadow">Sunny</p>
    <p class="temp shadow">34</p>
    <p class="location shadow">Manila</p>
    <input placeholder="Search city" class="search" type="text" />
    <button @click="$emit('moreInfoClicked')">View more information</button>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&family=Roboto:wght@400;700&display=swap");

div {
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

button {
  background: none;
  border: none;
  outline: none;
  color: white;
  margin-top: 1rem;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
}

.search {
  padding: 0.7rem 1.5rem;
  margin-top: 1rem;
  width: 250px;
  outline: none;
  border-radius: 50px;
  border: none;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.5);
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.2);
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
