<template>
  <div
    class="pointer-events-none inset-0 transition duration-300 absolute aaa"
  ></div>
</template>

<script setup>
const props = defineProps(["color"]);

import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";

const coordinate = reactive({ x: 0, y: 0 });

const getCoordinate = (event) => {
  const e = event || window.event;
  coordinate.x = e.clientX;
  coordinate.y = e.clientY;
};

const position = computed(() => ({
  x: coordinate.x + "px",
  y: coordinate.y + "px",
}));

onMounted(() => {
  document.addEventListener("mousemove", getCoordinate);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousemove", getCoordinate);
});
</script>

<style lang="scss" scoped>
.aaa {
  background: radial-gradient(
    600px at v-bind("position.x") v-bind("position.y"),
    v-bind("props.color"),
    transparent 80%
  );

  .ccc {
    color: rgba(246, 255, 255, 0.45);
  }
}
</style>
