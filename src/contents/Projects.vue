<template>
  <div class="min-w-[312px] max-w-[420px] lg:max-w-[950px] flex flex-col">
    <div
      v-for="project in projects"
      class="w-full grid grid-cols-1 lg:grid-cols-11 grid-rows-[repeat(2,min-content)] lg:grid-rows-1 gap-2 lg:gap-0"
    >
      <!-- scrennshot -->
      <div
        class="col-start-1 -col-end-1 lg:col-end-8 row-start-1 row-end-2 lg:-row-end-1 lg:pr-4"
      >
        <Carousel />
      </div>

      <!-- details -->
      <div
        class="col-start-1 lg:col-start-7 -col-end-1 row-start-2 lg:row-start-1 -row-end-1"
      >
        <div
          class="lg:h-full grid grid-cols-1 lg:grid-cols-5 grid-rows-[min-content,_min-content,_auto] gap-4"
        >
          <div
            class="col-start-1 lg:col-start-2 -col-end-1 row-start-1 row-end-2"
          >
            <h1 class="text-2xl font-bold text-slate-200">
              {{ project.name }}
            </h1>

            <div class="mt-2.5 flex flex-wrap gap-x-2 gap-y-1.5">
              <div
                v-for="tech in project.techs"
                class="px-3 py-1 bg-cyan-900 rounded-full flex shadow-x"
              >
                <span class="text-sky-200">{{ tech }}</span>
              </div>
            </div>
          </div>

          <div
            class="col-start-1 -col-end-1 row-start-2 row-end-3 relative my-2"
          >
            <div
              class="lg:p-5 lg:bg-cyan-900 lg:rounded lg:shadow-md shadow-slate-900"
            >
              <span class="text-blue-200 lg:text-blue-100 text-lg">{{
                project.desc
              }}</span>
            </div>
          </div>

          <div
            class="col-start-1 lg:col-start-2 -col-end-1 -row-end-2 -row-start-1 flex justify-end items-end"
          >
            <div class="flex flex-wrap gap-3">
              <LinkButton
                :icon="PajamasPlay"
                name="Demo"
                :url="project.urls.demo"
                color="#4F5676"
                :isColorFull="true"
                textColor="#E7E7E9"
              />

              <LinkButton
                :icon="MdiGithub"
                name="Github Repo"
                :url="project.urls.repo"
                color="#4F5676"
                textColor="#E7E7E9"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PajamasPlay from "~icons/pajamas/play";
import MdiGithub from "~icons/mdi/github";

import LinkButton from "../components/LinkButton.vue";
import Carousel from "../components/Carousel.vue";

const projects = [
  {
    name: "Instaparody",
    techs: ["Vue 3", "Vue Router", "Pinia", "Tailwind CSS", "Firebase", "Vite"],
    desc: "An Instagram clone integrated with a clone of Twitter's direct messages",
    urls: {
      demo: "https://instaparody.vercel.app",
      repo: "https://github.com/zhopiich/instaparody",
    },
  },
];
</script>

<style lang="scss" scoped>
.shadow-x {
  box-shadow: rgba(60, 60, 60, 0.4) 0px 1px 10px;
}
</style>
