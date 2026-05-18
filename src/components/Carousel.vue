<template>
  <div class="w-[calc(100%_+_32px)] md:w-full flex flex-col -mx-4 md:mx-0">
    <div
      class="w-full overflow-hidden relative aspect-video shadow-md bg-black"
      ref="imageViewport"
    >
      <div class="imagesList size-full flex">
        <div
          v-for="(image, index) in props.images"
          class="size-full shrink-0"
          :key="image?.id || image"
        >
          <img
            :src="image?.url || image"
            alt=""
            class="size-full object-contain drag-none"
          />
        </div>
      </div>
    </div>

    <div v-if="props.images.length > 1" class="mt-2 w-full h-full">
      <div class="flex bottom-2 w-full justify-center pointer-events-none">
        <template v-for="n in props.images.length" :key="n">
          <div
            class="w-1.5 aspect-square rounded-full mr-1 last:mr-0 bg-white transition-opacity duration-500"
            :class="n - 1 === movement ? 'opacity-100' : 'opacity-40'"
          ></div>
        </template>
      </div>
    </div>

    <div
      v-if="props.images.length > 1"
      class="mt-4 w-full flex justify-center gap-2.5"
    >
      <template v-for="button in arrowButtons">
        <div
          @click="button.handleClick"
          class="h-8 aspect-square rounded-full bg-slate-600 hover:bg-slate-500 active:bg-slate-500/40 transition-colors cursor-pointer drop-shadow-md flex justify-center items-center"
        >
          <component :is="button.icon" class="text-slate-300" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import MingcuteLeftFill from "~icons/mingcute/left-fill";
import MingcuteRightFill from "~icons/mingcute/right-fill";

import { ref, computed } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const imageViewport = ref(null);

const lengthimages = computed(() => props.images.length);

const movement = ref(0);

const next = () => {
  movement.value =
    movement.value === lengthimages.value - 1 ? 0 : movement.value + 1;
};
const prev = () => {
  movement.value =
    movement.value === 0 ? lengthimages.value - 1 : movement.value - 1;
};

const arrowButtons = computed(() => [
  {
    icon: MingcuteLeftFill,
    handleClick: prev,
  },
  {
    icon: MingcuteRightFill,
    handleClick: next,
  },
]);
</script>

<style scoped>
.imagesList {
  transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  transform: translateX(v-bind((-movement * 100) + "%"));
}

img.drag-none {
  -webkit-user-drag: none;
}
</style>
