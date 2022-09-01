import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCloudRain,
  faDroplet,
  faWeight,
  faWind,
  faTemperatureQuarter,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import Particles from "vue3-particles";
import App from "./App.vue";

library.add(
  faCloudRain,
  faDroplet,
  faWeight,
  faWind,
  faTemperatureQuarter,
  faCloud
);

createApp(App)
  .use(Particles)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

export {};
