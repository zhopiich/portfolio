<template>
  <TheModal
    :isShowCloseBtn="false"
    :isOutsideClickedToClose="
      modalState === 'confirm' || modalState === 'error'
    "
    @close="setModalState.close"
  >
    <div class="bg-white rounded-lg overflow-hidden">
      <div class="menuFrame grid" :class="modalState">
        <Transition name="lift">
          <div
            v-if="modalState === 'confirm' || modalState === 'error'"
            class="confirmSign flex justify-center overflow-hidden relative"
          >
            <div
              class="absolute bottom-0 mx-8 mt-8 mb-8 flex flex-col min-h-fit"
            >
              <span class="h-[15px] text-xl leading-[25px] text-center">{{
                modalState === "confirm" ? "Send message" : "Error"
              }}</span>
              <span
                class="pt-4 text-sm leading-[18px] text-center text-neutral-500"
                >{{
                  modalState === "confirm"
                    ? "Ready to send your message?"
                    : "Something wrong"
                }}</span
              >
            </div>
          </div>
        </Transition>

        <div
          class="variable overflow-hidden flex relative *:absolute *:size-full"
          :class="{
            option: modalState === 'confirm' || modalState === 'error',
          }"
        >
          <Transition name="slide">
            <div
              v-if="modalState !== 'sent'"
              class="flex justify-center items-center"
              @click="
                (modalState === 'confirm' || modalState === 'error') &&
                  emits('send')
              "
            >
              <span class="font-bold text-blue-800">{{
                modalState === "confirm"
                  ? "Send"
                  : modalState === "error"
                  ? "Try again"
                  : "Sending..."
              }}</span>
            </div>

            <div v-else class="flex flex-col *:w-full">
              <div class="grow overflow-y-auto">
                <div class="border-b sticky top-0">
                  <div class="py-4 text-center bg-white/75 backdrop-blur">
                    <span class="text-slate-700 text-lg"
                      >Your message has been sent.</span
                    >
                  </div>
                </div>
                <!--  -->
                <MessageReview :content="messageContent" />
              </div>
            </div>
          </Transition>
        </div>

        <div
          class="constant option border-t flex justify-center overflow-hidden relative *:absolute"
          @click="modalState === 'sent' ? finish() : setModalState.close()"
        >
          <div v-if="modalState === 'sent'" class="h-full flex items-center">
            <span class="text-sm">OK</span>
          </div>

          <div v-else class="h-full flex items-center">
            <span class="text-sm">Cancel</span>
          </div>
        </div>
      </div>
    </div>
  </TheModal>
</template>

<script setup>
import TheModal from "./TheModal.vue";
import MessageReview from "./MessageReview.vue";

// const props = defineProps(["type"]);
const emits = defineEmits(["send", "close", "cancel"]);

import { useContactStore } from "../../stores/contact.js";
const contactStore = useContactStore();

import { storeToRefs } from "pinia";
import { ref, reactive } from "vue";

const { toBeSent, modalState } = storeToRefs(contactStore);
const { setModalState, reset } = contactStore;

const messageContent = {
  ...toBeSent.value,
  name: toBeSent.value.name.trim(),
  email: toBeSent.value.email.trim(),
};

const finish = () => {
  reset();
  setModalState.close();
};
</script>

<style lang="scss" scoped>
.menuFrame {
  width: min(400px, calc(100dvw - 8px));
  min-width: 260px;
  height: 209px;

  grid-template-columns: 1fr;
  grid-template-rows: 113px 48px 48px;
  // grid-template-rows: auto auto min-content;

  transition-property: grid-template-rows, height;
  transition-duration: 500ms;

  & > * {
    height: 100%;
    grid-column: 1 / span 1;

    &.confirmContent,
    &.errorSign {
      grid-row: 1 / span 1;
    }

    &.variable {
      grid-row: 2 / span 1;
    }

    &.constant {
      grid-row: 3 / span 1;
    }
  }

  & > .option {
    cursor: pointer;
    transition: background-color 150ms;

    &:hover {
      background-color: rgb(245 245 245);
    }

    &:active {
      background-color: rgb(229 229 229);
    }

    span {
      user-select: none;
    }
  }

  &.confirm,
  &.error {
    // h-12 border-t
    & > .variable {
      // height: 48px;
      border-top-width: 1px;
    }
  }

  &.sending {
    grid-template-rows: 0px 209px 0px;
    // grid-template-rows: 0px auto min-content;

    & > .variable {
      // transition: height 500ms;
      // height: 161px;
      border-top-width: 0px;
    }
  }
  &.sent {
    height: 300px;
    grid-template-rows: 0px 252px 48px;

    & > .variable {
      // transition: height 500ms;
      // height: 161px;
      border-top-width: 0px;
    }
  }
}

// .confirmContent-enter-active,
.lift-leave-active {
  transition: 500ms;
}

.slide-enter-active,
.slide-leave-active {
  transition: 500ms;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: 200ms ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(-100%);
}

.overflow-y-auto::-webkit-scrollbar {
  display: none;
}

.overflow-y-auto {
  scrollbar-width: none; /* Firefox */
}
</style>
