<template>
  <div>
    <p class="weather">Sunny</p>
    <p class="temp">34</p>
    <p class="location">Manila</p>
    <input class="search" type="text" />
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&family=Roboto:wght@400;700&display=swap");

div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search {
  padding: 0.5rem;
  margin-top: 1rem;
  width: 250px;
  outline: none;
  border: 1px solid black;
  border-radius: 50px;
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
  font-size: 1.2em;
  font-family: "Roboto", sans-serif;
}
.weather {
  padding: 0;
  margin: 0;
  font-family: "Roboto", sans-serif;
}
</style>
