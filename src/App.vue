<script setup>
import NavBar from "./components/NavBar.vue";
import Content from "./components/Content.vue";

import { ref, onMounted } from "vue";

const mediaQueryList = window.matchMedia("(min-width: 768px)");
const isMobile = ref(!mediaQueryList.matches);
const handleChange = () => {
  isMobile.value = !mediaQueryList.matches;
};

const setListener = () => {
  mediaQueryList.addEventListener("change", handleChange);
};

onMounted(() => {
  setListener();
});
</script>

<template>
  <NavBar />
  <Content :isMobile="isMobile" />
</template>

<style scoped></style>
