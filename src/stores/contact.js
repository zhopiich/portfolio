import { defineStore } from "pinia";
import { ref, reactive } from "vue";

import { db } from "../firebase/firebase.js";
import { collection, addDoc, doc, serverTimestamp } from "firebase/firestore";

export const useContactStore = defineStore("contact", () => {
  const toBeSent = reactive({ name: "", email: "", message: "" });

  const edit = ((val) => {
    const obj = {};

    ["name", "email", "message"].forEach((type) => {
      obj[type] = (val) => {
        toBeSent[type] = val;
      };
    });

    return obj;
  })();

  const reset = () => {
    Object.keys(toBeSent).forEach((key) => {
      edit[key]("");
    });
  };

  const addMessage = async () => {
    const colRef = collection(db, "mailbox");

    try {
      const docRef = await addDoc(colRef, {
        ...toBeSent,
        name: toBeSent.name.trim(),
        email: toBeSent.email.trim(),
        at: serverTimestamp(),
      });

      return docRef;
    } catch (err) {
      console.log("addMessage:", err);
    } finally {
      // A cooldown upon getting the response
      // isOptionDisable.value = true;
    }
  };

  const modalState = ref("close");

  const setModalState = (() => {
    const obj = {};

    ["close", "confirm", "sending", "sent", "error"].forEach((type) => {
      obj[type] = () => {
        modalState.value = type;
      };
    });

    return obj;
  })();

  return {
    toBeSent,
    edit,
    reset,
    addMessage,
    modalState,
    setModalState,
  };
});
