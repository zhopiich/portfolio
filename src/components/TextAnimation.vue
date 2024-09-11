<template>
  <div class="flex relative" ref="root">
    <div
      class="flex justify-center items-center transition-to *:whitespace-pre"
      :class="{
        'opacity-0 pointer-events-none select-none': !isShowNormalText,
      }"
      ref="normalText"
    >
      <slot></slot>
    </div>

    <div
      v-if="!isShowNormalText"
      class="animatedText absolute top-0 flex justify-center items-center pointer-events-none select-none"
      ref="animatedText"
    >
      <div v-for="(char, index) in textContent" class="overflow-hidden flex">
        <div
          class="flex"
          :class="[
            triggerList[index] ? 'transition-to' : 'transition-from',
            { last: index + 1 === textContent.length },
            // {
            //   animation: !isShowNormalText,
            // },
            // {animation: isShowNormalText || activeItem === 1 || true,},
            // { animation: activeItem === 1 && !isSliding },
          ]"
          @transitionend="toggleText(index + 1 === textContent.length)"
        >
          <span class="whitespace-pre">{{ char }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps([
  "activeItem",
  "isSliding",
  "interval",
  "duration",
  "from",
  "to",
]);

import { ref, reactive, computed, onMounted, watch } from "vue";

const normalText = ref(null);
const animatedText = ref(null);
const root = ref(null);

const textContent = ref("");
const textClassList = ref([]);

const initialList = (text) => text.split("").map((c) => false);
const triggerList = ref([]);

const setTextClassList = (list) => {
  root.value.querySelector(".animatedText").classList.add(...list);
};

const isShowNormalText = ref(false);
const toggleText = (isLast) => {
  if (props.activeItem !== 1) return;
  if (!isLast) return;
  isShowNormalText.value = true;
};

const pushDomino = (list) => {
  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

  const push = async (list, time) => {
    for (const [i, val] of list.entries()) {
      list[i] = true;

      if (i + 1 === list.length) return;

      // if (i + 1 < list.length) {
      await delay(time);
      // }
    }
  };

  push(list, props.interval);
};

const resetList = (list) => {
  list.forEach((element, index) => {
    list[index] = false;
  });
};

watch(
  () => props.isSliding,
  (newVal) => {
    if (newVal) return;
    // if (props.activeItem !== 1) return;

    if (props.activeItem !== 1) {
      // isShowNormalText.value = true;
      if (root.value.querySelector(".animatedText")) {
        root.value.querySelector(".animatedText").classList.remove("start");
      }

      resetList(triggerList.value);
      isShowNormalText.value = false;
    } else {
      root.value.querySelector(".animatedText").classList.add("start");
      setTextClassList(textClassList.value);

      pushDomino(triggerList.value);
    }
  },
  {
    // immediate: true,
  }
);

onMounted(() => {
  const textNode = normalText.value.querySelector("span");
  textContent.value = textNode.innerText;
  textClassList.value = [...textNode.classList];
  triggerList.value = initialList(textContent.value);
  root.value.querySelector(".animatedText").classList.add("start");
  setTextClassList(textClassList.value);

  setTimeout(() => {
    pushDomino(triggerList.value);
  }, 0);

  // console.log(normalText.value.querySelector("span").innerText);
});
</script>

<style lang="scss" scoped>
.animatedText.start > * > * {
  transition-property: transform;
  // transition-timing-function: cubic-bezier(var(--io6));
  transition-duration: v-bind("props.duration");

  &.last {
    // transition-timing-function: cubic-bezier(var(--toofar));
    transition-duration: 0.9s;
  }
}

.transition-from {
  transform: translate(v-bind("props.from"));
}

.transition-to {
  transform: translate(v-bind("props.to"));
}
</style>
