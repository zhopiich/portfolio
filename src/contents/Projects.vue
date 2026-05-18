<template>
  <div class="flex justify-center">
    <div
      class="min-w-[312px] max-w-[420px] lg:max-w-[950px] flex flex-col gap-20 lg:gap-24 py-4 lg:py-8"
    >
      <ProjectShowcase
        v-for="project in projects"
        :key="project.name"
        :project="project"
      />
    </div>
  </div>
</template>

<script setup>
import ProjectShowcase from "../components/ProjectShowcase.vue";

import instaparodyHome from "../../public/home.png";
import instaparodyMobile from "../../public/mobiless.png";
import instaparodyPostDetails from "../../public/post_details.png";
import instaparodyMessages from "../../public/messages.png";
import instaparodyProfile from "../../public/profile.png";
import instaparodySignup from "../../public/signup.png";
import tanstackDemo from "../../public/tanstack-demo.png";

const projects = [
  {
    name: "Instaparody",
    techs: ["Vue 3", "Vue Router", "Pinia", "Tailwind CSS", "Firebase", "Vite"],
    desc: "An Instagram clone integrated with a clone of Twitter's direct messages",
    images: [
      instaparodyHome,
      instaparodyMobile,
      instaparodyPostDetails,
      instaparodyMessages,
      instaparodyProfile,
      instaparodySignup,
    ],
    urls: {
      demo: "https://instaparody.vercel.app",
      repo: "https://github.com/zhopiich/instaparody",
    },
  },
  {
    name: "TanStack Demo",
    techs: [
      "Vue 3",
      "TypeScript",
      "TanStack Query",
      "TanStack Table",
      "Zod",
      "OpenAPI",
      "MSW",
    ],
    desc: "A simulated content management system demonstrating the integration of TanStack Query, Zod, and OpenAPI schemas.",
    images: [tanstackDemo],
    urls: {
      demo: "https://zhopiich.github.io/tanstack-demo",
      repo: "https://github.com/zhopiich/tanstack-demo",
    },
  },
];
</script>
