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
  color: rgba(255, 255, 255, 0.7);
  padding: 0.5rem 1rem;
  z-index: 2;
}

.weatherdata {
  display: none;
}

a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  font-weight: bold;
}

@media only screen and (min-width: 768px) {
  .weatherdata {
    display: block;
  }

  footer {
    justify-content: space-between;
    margin: 0 2rem;
  }
}

@media only screen and (min-width: 1024px) {
  .weatherdata {
    display: block;
  }

  p {
    font-size: 0.7rem;
  }

  footer {
    justify-content: space-between;
    margin: 0 2rem;
    flex-shrink: 0;
  }
}
</style>
