<template>
  <label
    class="w-full border rounded-md overflow-hidden flex shadow-label"
    :class="{
      focus: isFocus,
      error: isError,
    }"
    @mousedown.self="labelClicked"
  >
    <div class="w-full relative bg-white">
      <div class="size-full absolute flex pointer-events-none">
        <div
          class="px-2 transition-placeholder"
          :class="{
            shrink: isFocus || isOccupied,
            focus: isFocus,
            error: isError,
          }"
        >
          <span>{{ placeholder }}</span>
        </div>

        <div
          v-if="isLengthShown && isFocus"
          class="px-2 pt-2 grow flex justify-end self-start"
        >
          <span class="text-sm" style="color: rgb(113, 118, 123)"
            >{{ currentLength }} / {{ maxLength }}</span
          >
        </div>
      </div>
      <div class="mt-2 pt-2 pb-1 px-1">
        <div class="leading-6 flex">
          <slot></slot>
        </div>
      </div>
    </div>
  </label>
</template>

<script setup>
const props = defineProps([
  "placeholder",
  "isFocus",
  "isOccupied",
  "isError",
  "isLengthShown",
  "currentLength",
  "maxLength",
]);

import { computed } from "vue";

const labelClicked = (e) => {
  if (!props.isFocus) return;

  e.preventDefault();
};
</script>

<style lang="scss" scoped>
.shadow-label {
  box-shadow: rgba(187, 200, 209, 0.15) 0px 1px 10px;
}

* {
  --focus-color: rgb(29, 155, 240);
  --error-color: rgb(244, 33, 46);
}

.transition-placeholder {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0s,
    color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0s,
    font-size 150ms cubic-bezier(0.4, 0, 0.2, 1) 0s,
    padding-top 150ms cubic-bezier(0.4, 0, 0.2, 1) 0s;

  text-overflow: unset;
  padding-top: 10px;
  color: rgb(83, 100, 113);
}

.transition-placeholder.shrink {
  font-size: small;
  padding-top: 2px;
}

.transition-placeholder.focus {
  color: var(--focus-color);
}

.transition-placeholder.error {
  color: var(--error-color);
}

label.focus {
  border-color: var(--focus-color);
  box-shadow: var(--focus-color) 0 0 0 1px;
}

label.error {
  border-color: var(--error-color);
  box-shadow: none;
}
</style>
