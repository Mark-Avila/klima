import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import Particles from "vue3-particles";
import App from "./App.vue";

library.add(faCloudRain);

createApp(App)
  .use(Particles)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

export {};
