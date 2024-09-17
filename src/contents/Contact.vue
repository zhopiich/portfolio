<template>
  <div class="w-dvw md:w-[500px] lg:w-[600px] mt-2">
    <div class="w-full px-2 md:px-9 mb-4 text-slate-800 text-lg">
      <p>Get in touch</p>
      <p>
        or shoot me an email directly on
        <span
          ><a
            href="mailto:zhoping9449@gmail.com"
            class="font-bold text-[#626a93] hover:underline"
            >zhoping9449@gmail.com</a
          ></span
        >
      </p>
    </div>

    <form @submit.prevent>
      <div class="flex flex-col">
        <div class="my-2 mx-2 md:mx-9">
          <TheLabel
            placeholder="Name"
            :isFocus="isFocus.name"
            :isOccupied="toBeSent.name.trim()"
            :isError="toBeSent.name && !isValid.name"
          >
            <input
              class=""
              type="text"
              name="name"
              maxlength="100"
              @focus="isFocus.name = true"
              @blur="isFocus.name = false"
              @change="isValid.name = toBeSent.name.trim().length > 0"
              :value="toBeSent.name"
              @input="(event) => handleEdit.name(event.target.value)"
            />
          </TheLabel>
        </div>

        <div class="my-2 mx-2 md:mx-9">
          <TheLabel
            placeholder="Email"
            :isFocus="isFocus.email"
            :isOccupied="toBeSent.email.trim()"
            :isError="toBeSent.email && !isValid.email"
          >
            <input
              class=""
              type="text"
              name="email"
              @focus="isFocus.email = true"
              @blur="isFocus.email = false"
              @change="isValid.email = isEmailValid(toBeSent.email.trim())"
              :value="toBeSent.email"
              @input="(event) => handleEdit.email(event.target.value)"
            />
          </TheLabel>
        </div>

        <div class="my-2 mx-2 md:mx-9">
          <TheLabel
            placeholder="Message"
            :isFocus="isFocus.message"
            :isOccupied="toBeSent.message.trim()"
            :isError="toBeSent.message && !isValid.message"
          >
            <textarea
              class="postContentInput"
              rows="5"
              maxlength="1000"
              @focus="isFocus.message = true"
              @blur="isFocus.message = false"
              @change="isValid.message = toBeSent.message.trim().length > 0"
              :value="toBeSent.message"
              @input="(event) => handleEdit.message(event.target.value)"
              @keydown="handleKeyDown"
            ></textarea>
          </TheLabel>
        </div>

        <div class="mt-4 mx-2 md:mx-9">
          <div class="flex justify-end">
            <button
              :disabled="!isAllValid || modalState !== 'close'"
              class="disabled:cursor-not-allowed send-button transition-colors h-10 flex items-center px-6 rounded-full shadow-x"
              :class="{
                // 'bg-blue-300 pointer-events-none': !isAllValid
              }"
              @click="setModalState.confirm"
            >
              <span class="font-bold text-white select-none">Send</span>
            </button>
          </div>
        </div>
      </div>
    </form>

    <ConfirmModal
      v-if="modalState !== 'close'"
      @close="setModalState.close"
      @send="handleSend"
      @cancel=""
    />
  </div>
</template>

<script setup>
import { isEmailValid } from "../utils/validation.js";
import TheLabel from "../components/TheLabel.vue";
import ConfirmModal from "../components/Modal/ConfirmModal.vue";

import { useContactStore } from "../stores/contact.js";
const contactStore = useContactStore();

import { storeToRefs } from "pinia";
import { ref, reactive, computed } from "vue";

const { toBeSent, modalState } = storeToRefs(contactStore);
const { edit, addMessage, setModalState } = contactStore;

const isFocus = reactive({ name: false, email: false, message: false });

const isValid = reactive({
  name: "pending",
  email: "pending",
  message: "pending",
});

const isAllValid = computed(
  () =>
    Object.values(toBeSent.value).every((val) => val.trim().length > 0) &&
    Object.values(isValid).every((state) => state === true)
);

const handleEdit = ((val) => {
  const obj = {};

  ["name", "email", "message"].forEach((type) => {
    obj[type] = (val) => {
      if (!isValid[type]) {
        isValid[type] = "pending";
      }

      edit[type](val);
    };
  });

  return obj;
})();

const handleSend = async () => {
  if (!isAllValid.value) return;
  //
  setModalState.sending();

  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

  // make the sending process take at least 500ms,
  // regardless of how quickly the response is received
  Promise.all([addMessage(), delay(500)]).then((res) => {
    console.log(res);
    const docRef = res[0];

    if (!!docRef) {
      setModalState.sent();
    } else {
      setModalState.error();
    }
  });
};

//https://stackoverflow.com/a/52555739/22495195
const handleKeyDown = (event) => {
  if (["PageUp", "PageDown"].every((key) => key !== event.key)) return;

  const cursorPosition = event.key === "PageUp" ? 0 : event.target.textLength;

  event.preventDefault();
  event.target.setSelectionRange(cursorPosition, cursorPosition);
};
</script>

<style lang="scss" scoped>
input,
textarea {
  width: 100%;
  padding: 0px 4px;
  resize: none;
  appearance: none;
  text-align: left;
  outline: none;
  border: none;
  border-radius: 0px;

  font-size: 1.125rem;
}

textarea {
  resize: vertical;
  min-height: 24px;
  max-height: 300px;
  // max-height: 100%;
}

.shadow-x {
  box-shadow: rgb(190, 199, 208) 0px 1px 12px;
}

.send-button {
  background-color: #6a729b;

  &:hover {
    background-color: #9399b7;
  }

  &:active {
    background-color: #b3a5d9;
  }

  &:disabled {
    background-color: #a5add8;
  }
}
</style>
