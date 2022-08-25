<script setup lang="ts">
import PageHome from "./components/PageHome.vue";
import PageFooter from "./components/PageFooter.vue";
import PageBackground from "./components/PageBackground.vue";
</script>

<template>
  <main>
    <PageBackground />
    <div class="page">
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
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shadow {
  text-shadow: 0px 4px 2px rgba(0, 0, 0, 0.3);
}
</style>
