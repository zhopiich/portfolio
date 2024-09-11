<template>
  <div class="p-4 w-full flex flex-col">
    <div>
      <span class="font-bold">{{ content.name }}</span>
    </div>
    <div>
      <span class="text-slate-500"><{{ content.email }}></span>
    </div>
    <div class="mt-2.5">
      <span class="whitespace-pre-wrap break-words">{{ content.message }}</span>
    </div>
  </div>
</template>

<script setup>
import { useContactStore } from "../../stores/contact.js";
const contactStore = useContactStore();

defineProps(["content"]);

import { storeToRefs } from "pinia";
import { ref, reactive } from "vue";

const { toBeSent, modalState } = storeToRefs(contactStore);
const { setModalState } = contactStore;
</script>

<style lang="scss" scoped></style>
