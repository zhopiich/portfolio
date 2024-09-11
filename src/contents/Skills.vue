<template>
  <div class="flex justify-center">
    <div class="*:w-[133px] grid grid-cols-2 sm:grid-cols-3">
      <div v-for="skill in skills" class="aspect-square flex justify-center">
        <div class="flex flex-col">
          <div class="flex justify-center">
            <div
              class="h-20 aspect-square flex justify-center items-center rounded-xl bg-white shadow-x hover:scale-110 transition"
            >
              <component :is="skill.icon" class="text-[42px]"></component>
            </div>
          </div>

          <div class="size-full flex items-center">
            <div class="w-full text-center">
              <span class="text-[#554761] text-lg">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="aspect-square flex flex-col items-center">
        <div
          class="w-24 aspect-square grid grid-rows-2 grid-cols-2 gap-1.5 common-skills"
        >
          <div
            v-for="skill in common"
            class="w-full aspect-square flex justify-center items-center rounded-md bg-white shadow-x-sm transition-[transform,_scale] duration-[160ms]"
            :class="skill.class"
          >
            <component :is="skill.icon" class="text-[22px]"></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DeviconVuejs from "~icons/devicon/vuejs";
import LogosPinia from "~icons/logos/pinia";
import DeviconTailwindcss from "~icons/devicon/tailwindcss";
import DeviconVitejs from "~icons/devicon/vitejs";
import DeviconFirebase from "~icons/devicon/firebase";
import DeviconGit from "~icons/devicon/git";
import DeviconNodejs from "~icons/devicon/nodejs";
import DeviconExpressWordmark from "~icons/devicon/express-wordmark";
import DeviconHtml5 from "~icons/devicon/html5";
import DeviconCss3 from "~icons/devicon/css3";
import DeviconJavascript from "~icons/devicon/javascript";

import { ref, watch, onMounted, computed } from "vue";

const skills = [
  ["Vue", DeviconVuejs],
  ["Pinia", LogosPinia],
  ["Tailwind CSS", DeviconTailwindcss],
  ["Vite", DeviconVitejs],
  ["Firebase", DeviconFirebase],
  ["git", DeviconGit],
  ["Node.js", DeviconNodejs],
  ["Express.js", DeviconExpressWordmark],
].map((i) => ({ name: i[0], icon: i[1] }));

const common = [
  ["first", DeviconHtml5],
  ["second", DeviconCss3],
  ["third", DeviconJavascript],
].map((i) => ({ class: i[0], icon: i[1] }));
</script>

<style lang="scss" scoped>
.shadow-x {
  box-shadow: rgba(207, 200, 171, 0.4) 0px 2px 12px;
}

.shadow-x-sm {
  box-shadow: rgba(175, 166, 125, 0.5) 0px 1px 6px;
}

.common-skills > .first:hover {
  transform: translate(12.5%, 12.5%) scale(1.25);
}

body:has(.common-skills > .first:hover) .common-skills > .second {
  transform: translateX(25%);
}

body:has(.common-skills > .first:hover) .common-skills > .third {
  transform: translateY(25%);
}

.common-skills > .second:hover {
  transform: translate(-12.5%, 12.5%) scale(1.25);
}

body:has(.common-skills > .second:hover) .common-skills > .first {
  transform: translateX(-25%);
}

body:has(.common-skills > .second:hover) .common-skills > .third {
  transform: translate(-25%, 25%);
}

.common-skills > .third:hover {
  transform: translate(12.5%, -12.5%) scale(1.25);
}

body:has(.common-skills > .third:hover) .common-skills > .first {
  transform: translateY(-25%);
}

body:has(.common-skills > .third:hover) .common-skills > .second {
  transform: translate(25%, -25%);
}
</style>
