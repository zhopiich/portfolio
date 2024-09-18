<template>
  <div
    class="arrows z-10 absolute bottom-8 md:bottom-10 flex gap-2.5 justify-center md:justify-end"
  >
    <button
      v-for="button in [
        { icon: MingcuteLeftFill, handleClick: 'prev' },
        { icon: MingcuteRightFill, handleClick: 'next' },
      ]"
      @click="$emit(button.handleClick)"
      class="w-12 md:w-16 aspect-square border flex items-center justify-center"
      :disabled="isSliding"
    >
      <component
        :is="button.icon"
        class="text-lg md:text-2xl text-neutral-400 transition-colors"
        :class="{ '!text-slate-300/40': isSliding }"
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

<style lang="scss" scoped>
.arrows {
  width: calc(100% - calc(var(--width-slider) * var(--ratio)));

  @media screen and (max-width: 767px) {
    width: 100%;
  }

  button {
    background-color: transparent;
    border: 1px solid #6c6c6c31;

    transition-duration: 0.15s;

    @media screen and (min-width: 767px) {
      box-shadow: 0 10px 48px #5b5b5b2c;
    }

    &:hover {
      background-color: rgba(225, 225, 225, 0.2);

      & > * {
        color: rgba(15, 15, 15, 0.75);
      }
    }
    &:active {
      background-color: rgba(206, 206, 206, 0.4);

      & > * {
        color: rgba(15, 15, 15, 1);
      }
    }
  }
}
</style>
