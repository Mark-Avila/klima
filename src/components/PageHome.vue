<template>
  <div>
    <p class="weather shadow">Sunny</p>
    <p class="temp shadow">34</p>
    <p class="location shadow">Manila</p>
    <input class="search" type="text" />
    <button>View more information</button>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&family=Roboto:wght@400;700&display=swap");

div {
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding-bottom: 3rem;
}

button {
  background: none;
  border: none;
  outline: none;
  color: white;
  margin-top: 1rem;
  font-family: "Montserrat", sans-serif;
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
  }
}
</style>
