<template>
  <div class="wrapper">
    <div class="upper">
      <div>
        <p id="current-time">00:00:00AM</p>
        <p id="current-loc">Manila, PH</p>
        <p id="current-feels">Feels like 34</p>
      </div>
      <div>
        <p id="current-temp">37</p>
      </div>
    </div>
    <div class="lower">
      <div class="lower__item">
        <p class="lower__title">Wind Speed</p>
        <p class="lower__data" id="wind-data">0 m/s</p>
      </div>
      <div class="lower__item">
        <p class="lower__title">Pressure</p>
        <p class="lower__data" id="pressure-data">0 pHA</p>
      </div>
      <div class="lower__item">
        <p class="lower__title">Humidity</p>
        <p class="lower__data" id="humid-data">0%</p>
      </div>
      <div class="lower__item">
        <p class="lower__title">Visibility</p>
        <p class="lower__data" id="vis-data">0 km</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.upper {
  display: flex;
  justify-content: space-between;
}
#current-loc {
  font-family: "Montserrat", sans-serif;
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

#current-temp {
  font-size: 3.5rem;
  font-family: "Montserrat", sans-serif;
}

.lower {
  margin-top: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.lower__item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

p {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  font-size: 0.8rem;
}
</style>
