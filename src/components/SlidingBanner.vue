<template>
  <div class="size-full overflow-hidden flex justify-center items-center">
    <div class="flex relative" ref="root">
      <div
        class="flex justify-center items-center transition-to *:whitespace-pre"
        :class="{
          'opacity-0 pointer-events-none select-none': !isShowNormalText,
          // !isShowNormalText || true,
        }"
        ref="normalText"
      >
        <span class="text-6xl font-medium" :style="{ color: textColor }">{{
          name
        }}</span>
      </div>

      <div
        v-show="!isShowNormalText"
        class="animatedText absolute top-0 flex justify-center items-center pointer-events-none select-none"
        ref="animatedText"
      >
        <div
          v-for="(char, index) in textContent"
          class="overflow-hidden flex -my-2"
        >
          <div
            class="flex py-2"
            :class="[
              triggerList[index] ? 'transition-to' : 'transition-from',
              { last: index + 1 === textContent.length },
            ]"
            @transitionend="toggleText(index + 1 === textContent.length)"
          >
            <span
              class="whitespace-pre text-6xl font-medium"
              :style="{ color: textColor }"
              >{{ char }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps([
  "activeItem",
  "isSliding",
  "isActive",
  "name",
  "textColor",
]);

import { ref, reactive, computed, onMounted, watch } from "vue";

const normalText = ref(null);
const animatedText = ref(null);
const root = ref(null);

const textContent = ref("");
const textClassList = ref([]);

const initialList = (text) => text.split("").map(() => !!props.isActive);
const triggerList = ref([]);

// const setTextClassList = (list) => {
//   root.value.querySelector(".animatedText").classList.add(...list);
// };

const isShowNormalText = ref(!!props.isActive);
const toggleText = (isLast) => {
  if (!props.isActive) return;
  if (!isLast) return;
  isShowNormalText.value = true;
};

const pushDomino = (list, bool = true) => {
  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

  const push = async (list, time) => {
    for (const [i, val] of list.entries()) {
      if (
        (bool && list[i] !== bool) ||
        (!bool && list[list.length - (i + 1)] !== bool)
      ) {
        if (bool) {
          list[i] = bool;
        } else {
          list[list.length - (i + 1)] = bool;
        }

        if (i + 1 === list.length) return;
        await delay(time);
      }
    }
  };

  push(list, 100);
};

watch(
  () => props.isActive,
  (newVal) => {
    if (newVal) {
      pushDomino(triggerList.value);
    } else {
      isShowNormalText.value = false;

      setTimeout(() => {
        pushDomino(triggerList.value, false);
      }, 0);
    }
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  const textNode = normalText.value.querySelector("span");
  textContent.value = textNode.innerText;
  // textClassList.value = [...textNode.classList];
  triggerList.value = initialList(textContent.value);
  // root.value.querySelector(".animatedText").classList.add("start");
  // setTextClassList(textClassList.value);

  // setTimeout(() => {
  //   pushDomino(triggerList.value);
  // }, 0);

  // console.log(normalText.value.querySelector("span").innerText);
});
</script>

<style lang="scss" scoped>
.animatedText > * > * {
  transition-property: transform;
  // transition-timing-function: cubic-bezier(var(--io6));
  transition-duration: 350ms;

  &.last {
    // transition-timing-function: cubic-bezier(var(--toofar));
    transition-duration: 0.6s;
  }
}

.transition-from {
  // transform: translate(-100%, 0px);
  transform: translate(0px, 100%) rotate(60deg);
}

.transition-to {
  transform: translate(0px, 0px);
}

span {
  font-family: Moderustic;
}
</style>
