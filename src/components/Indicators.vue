<template>
  <div class="flex w-full justify-center pointer-events-none">
    <template v-for="n in length" :key="n">
      <div
        class="rounded-full mr-2 last:mr-0 transition-[width] duration-500"
        :style="`background-color: ${color};height: ${height}px;width: ${
          n === activeItem ? activeWidth : width
        }px`"
      ></div>
    </template>
  </div>
</template>

<script setup>
defineProps(["color", "length", "activeItem"]);

const height = 13;
const width = height;
const activeWidth = height * 3;
</script>

<style lang="scss" scoped></style>
