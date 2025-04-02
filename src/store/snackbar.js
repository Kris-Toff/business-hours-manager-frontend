import { ref } from "vue";
import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("snackbar", () => {
  const message = ref(null);
  const snackbar = ref(false);
  const snackbarType = ref(null);

  function setMessage(msg) {
    message.value = msg;
  }

  function toggleSnackbar(status) {
    snackbar.value = status;
  }

  function setType(type) {
    snackbarType.value = type;
  }

  function showSnackbar({ status = true, msg, type }) {
    snackbar.value = status;
    message.value = msg;
    snackbarType.value = type;
  }

  return {
    message,
    snackbar,
    snackbarType,
    showSnackbar,
    setMessage,
    toggleSnackbar,
    setType,
  };
});
