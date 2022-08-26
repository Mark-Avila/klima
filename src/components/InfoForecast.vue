<template>
  <div class="wrapper">
    <div class="item" v-for="index in 5" :key="index">
      <p class="item__day text__less">Thur</p>
      <span class="icon">
        <font-awesome-icon icon="fa-solid fa-cloud-rain" />
      </span>
      <p class="item__weather text__less">Rain</p>
      <p class="item__temp text__less">32 C</p>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  box-sizing: border-box;
  height: 100%;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  padding: 1.2rem 0;
}

/* .item__day {
  margin-bottom: 1rem;
}

.icon {
  margin-bottom: 1rem;
}

.item__weather {
  margin-bottom: 1rem;
} */

.icon {
  font-size: 1.5rem;
}

.text__less {
  color: rgba(255, 255, 255, 0.7);
}

p {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
