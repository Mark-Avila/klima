<script setup lang="ts">
import PageHome from "./components/PageHome.vue";
import PageFooter from "./components/PageFooter.vue";
</script>

<template>
  <main>
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
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
