<template>
  <div
    class="arrows z-10 absolute bottom-2 md:bottom-10 flex gap-2.5 justify-center md:justify-end"
  >
    <button
      v-for="button in [
        { icon: MingcuteLeftFill, handleClick: 'prev' },
        { icon: MingcuteRightFill, handleClick: 'next' },
      ]"
      @click="$emit(button.handleClick)"
      class="w-12 aspect-square border flex items-center justify-center"
      :class="{ '!border-slate-50/20': isSliding }"
      :disabled="isSliding"
    >
      <component
        :is="button.icon"
        class="text-lg text-slate-100 transition-colors"
        :class="{ 'text-slate-50/30 ': isSliding }"
      />
    </button>
  </div>
</template>

<script setup>
import MingcuteLeftFill from "~icons/mingcute/left-fill";
import MingcuteRightFill from "~icons/mingcute/right-fill";

defineProps(["isSliding"]);
defineEmits(["prev", "next"]);
</script>

<style scoped>
.arrows {
  width: calc(100% - calc(var(--width-slider) * var(--ratio)));

  @media screen and (max-width: 767px) {
    width: 100%;
  }

  button {
    background-color: transparent;
    border: 1px solid var(--border-color);
    box-shadow: 0 10px 40px #5555;
    transition-duration: 0.15s;
  }

  button:hover {
    background-color: rgba(238, 238, 238, 0.2);
  }
  button:active {
    background-color: rgba(238, 238, 238, 0.4);
  }
}
</style>
