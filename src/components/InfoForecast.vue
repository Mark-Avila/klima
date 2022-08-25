<template>
  <div class="wrapper">
    <div class="item">
      <p class="item__day">Thur</p>
      <p class="item__icon">Icon</p>
      <p class="item__weather">Rain</p>
      <p class="item__temp">32/ 34 C</p>
    </div>
    <div class="item">
      <p class="item__day">Thur</p>
      <p class="item__icon">Icon</p>
      <p class="item__weather">Rain</p>
      <p class="item__temp">32/ 34 C</p>
    </div>
    <div class="item">
      <p class="item__day">Thur</p>
      <p class="item__icon">Icon</p>
      <p class="item__weather">Rain</p>
      <p class="item__temp">32/ 34 C</p>
    </div>
    <div class="item">
      <p class="item__day">Thur</p>
      <p class="item__icon">Icon</p>
      <p class="item__weather">Rain</p>
      <p class="item__temp">32/ 34 C</p>
    </div>
    <div class="item">
      <p class="item__day">Thur</p>
      <p class="item__icon">Icon</p>
      <p class="item__weather">Rain</p>
      <p class="item__temp">32/ 34 C</p>
    </div>
  </div>
</template>

<style>
.wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  box-sizing: border-box;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
}

p {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
