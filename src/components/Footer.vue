<template>
  <div class="footer z-10 absolute bottom-0 md:h-8 text-center">
    <span class="text-zinc-500 text-sm"
      >Made by <span class="font-semibold">zhopiich</span> • {{ year }}</span
    >
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
