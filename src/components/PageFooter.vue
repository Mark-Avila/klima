<template>
  <footer>
    <p>
      Developed by
      <a target="_blank" href="https://mark-avila.github.io">Mark Avila</a>
    </p>
    <p class="weatherdata">
      Weather data from
      <a target="_blank" href="https://openweathermap.org/">OpenWeatherMap</a>
    </p>
  </footer>
</template>

<style scoped>
footer {
  widows: 100%;
  display: flex;
  justify-content: space-evenly;
  font-family: "Roboto", sans-serif;
  font-size: 0.8em;
}

.weatherdata {
  display: none;
}

a {
  text-decoration: none;
  color: black;
}
</style>
