<template>
  <TheModal @close="$emit('close')">
    <div class="h-fit w-fit">
      <img
        class="max-h-dvh max-w-dvw select-none undraggable"
        alt="image sent"
        :src="img"
      /></div
  ></TheModal>
</template>

<script setup>
import TheModal from "./Modal/TheModal.vue";

const props = defineProps(["img"]);
const emits = defineEmits(["close"]);
</script>

<style scoped>
.v-enter-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.undraggable {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}
</style>
