<template>
  <div class="footer z-10 absolute bottom-0 h-8 text-center">
    <span class="text-zinc-500 text-sm">Made by zhopiich © {{ year }}</span>
  </div>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style lang="scss" scoped>
.footer {
  width: calc(100% - calc(var(--width-slider) * var(--ratio)));

  @media screen and (max-width: 767px) {
    width: 100%;
  }
}
</style>
