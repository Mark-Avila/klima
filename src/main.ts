import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faDroplet,
  faWeight,
  faWind,
  faTemperatureQuarter,
  faCloud, //Clouds
  faCloudRain, //Drizzle
  faCloudShowersHeavy, //Rain
  faCloudBolt, //Thunderstorm
  faSnowflake, //Snow
  faSmog, //Haze / smog / fog
  faSun, //Clear
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import Particles from "vue3-particles";
import App from "./App.vue";

library.add(
  faCloudRain,
  faDroplet,
  faWeight,
  faWind,
  faTemperatureQuarter,
  faCloud,
  faCloudShowersHeavy,
  faCloudBolt,
  faSnowflake,
  faSmog,
  faSun,
  faAngleLeft
);

createApp(App)
  .use(Particles)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

export {};
