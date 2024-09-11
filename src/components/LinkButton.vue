<template>
  <div
    class="button border relative size-fit rounded-full overflow-hidden shadow-button"
  >
    <a :href="url" rel="noopener noreferrer nofollow" target="_blank"
      ><div class="h-10 px-4 flex items-center gap-1.5">
        <div class="flex justify-center items-center">
          <component :is="icon" class="text-xl" />
        </div>

        <span class="text-lg select-none">{{ name }}</span>
      </div></a
    >

    <div
      class="hoverCover size-full absolute top-0 pointer-events-none transition-opacity"
    ></div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {},
  name: {},
  url: {},
  color: { default: "black" },
  isColorFull: { default: false },
  textColor: { default: "black" },
});

import { ref, computed } from "vue";

const backgroundColor = computed(() =>
  props.isColorFull ? props.color : "transparent"
);

const hoveredColor = computed(() =>
  props.isColorFull ? "#F3EFDD" : props.color
);
</script>

<style scoped>
.hoverCover {
  /* background-color: white; */
  background-color: v-bind(hoveredColor);
  opacity: 0;
}

.button {
  border-color: v-bind(color);
  color: v-bind(textColor);
  background-color: v-bind(backgroundColor);

  &:hover .hoverCover {
    opacity: 0.2;
  }
}

.shadow-button {
  box-shadow: rgba(89, 79, 118, 0.25) 0px 1px 10px;
}
</style>
