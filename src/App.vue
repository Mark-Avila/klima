<script setup lang="ts">
import PageHome from "./components/PageHome.vue";
import PageFooter from "./components/PageFooter.vue";
import PageBackground from "./components/PageBackground.vue";
import { reactive } from "vue";
import PageInfo from "./components/PageInfo.vue";

const state = reactive({
  infoIsOpen: false,
});
</script>

<template>
  <main>
    <PageBackground />

    <PageInfo v-if="!state.infoIsOpen" />

    <div class="home" v-else>
      <PageHome />
    </div>
    <PageFooter />
  </main>
</template>

<style>
html,
body,
#app {
  box-sizing: border-box;
  margin: 0;
  height: 100%;
}

main {
  box-sizing: border-box;
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.home {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.shadow {
  text-shadow: 0px 4px 2px rgba(0, 0, 0, 0.3);
}
</style>
