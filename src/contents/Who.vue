<template>
  <div class="flex flex-col items-stretch z-0">
    <div class="flex flex-col items-start">
      <p class="text-xl">I'm</p>

      <TextAnimation
        :activeItem="activeItem"
        :isSliding="isSliding"
        interval="35"
        duration="200ms"
        from="-100%, 0px"
        to="0px, 0px"
      >
        <span class="text-slate-700 text-5xl md:text-6xl font-semibold">{{
          firstName
        }}</span>
      </TextAnimation>

      <TextAnimation
        :activeItem="activeItem"
        :isSliding="isSliding"
        interval="60"
        duration="400ms"
        from="0px, 100%"
        to="0px, 0px"
      >
        <span class="text-5xl md:text-6xl font-semibold">{{ lastName }}</span>
      </TextAnimation>

      <p class="mt-3 text-3xl font-medium text-slate-900">Frontend Developer</p>
    </div>

    <div class="mt-1.5 flex flex-col">
      <p class="text-xl">Turning lines of code into immersive experiences.</p>
    </div>

    <div
      class="links-list mt-11 flex gap-3.5 *:transition-colors *:bg-cyan-950 hover:*:bg-cyan-800 active:*:bg-cyan-700 *:overflow-hidden"
    >
      <div class="h-12 aspect-square rounded-full">
        <a
          href="https://github.com/zhopiich"
          rel="noopener noreferrer nofollow"
          target="_blank"
          class="size-full flex justify-center items-center"
        >
          <MdiGithub class="text-yellow-50 text-3xl" />
        </a>
      </div>

      <div class="h-12 aspect-square rounded-full">
        <a
          href="mailto:zhoping9449@gmail.com"
          class="size-full flex justify-center items-center"
        >
          <SystemUiconsMail class="text-yellow-50 text-3xl" />
        </a>
      </div>

      <div class="h-12 rounded-full">
        <a
          href="https://drive.google.com/file/d/1FOGnCdGqTwkDAMYFfUYRTt-7aWHmMpcc/view"
          rel="noopener noreferrer nofollow"
          target="_blank"
          class="size-full px-4 flex justify-center items-center gap-1"
          ><span class="text-yellow-50 text-lg font-bold">Resume</span
          ><FluentOpen20Filled class="text-yellow-50 text-xl" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import MdiGithub from "~icons/mdi/github";
import SystemUiconsMail from "~icons/system-uicons/mail";
import FluentOpen20Filled from "~icons/fluent/open-20-filled";

import TextAnimation from "../components/TextAnimation.vue";

const props = defineProps(["activeItem", "isSliding"]);

const lastName = "ZHENG";
const firstName = "ZHONG PING";
</script>

<style lang="scss" scoped>
.links-list > * {
  box-shadow: rgba(161, 134, 111, 0.6) 0px 1px 10px;
}
</style>
