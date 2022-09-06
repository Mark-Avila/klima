<template>
  <div class="box">
    <slot>Loading</slot>
  </div>
</template>

<style scoped>
.box {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
}
</style>
