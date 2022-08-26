<script setup lang="ts">
import PageHome from "./components/PageHome.vue";
import PageFooter from "./components/PageFooter.vue";
import PageBackground from "./components/PageBackground.vue";
import { ref } from "vue";
import PageInfo from "./components/PageInfo.vue";

const isOpen = ref({
  home: true,
  info: false,
  map: false,
});

const handleIsOpen = (pageToOpen: "home" | "info" | "map") => {
  const initialState = {
    home: false,
    info: false,
    map: false,
  };

  isOpen.value = { ...initialState, [pageToOpen]: true };
};
</script>

<template>
  <main>
    <PageBackground />

    <div class="content">
      <PageHome v-if="isOpen.home" @more-info-clicked="handleIsOpen('info')" />

      <PageInfo
        v-if="isOpen.info"
        @back-clicked="handleIsOpen('home')"
        @map-clicked="handleIsOpen('map')"
      />
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

.content {
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
