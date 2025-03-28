import router from "@/router";
import { useSnackbarStore } from "@/store/snackbar";

export function useErrorHandler() {
  const snackbarStore = useSnackbarStore();

  function errorHandler(response) {
    switch (response.status) {
      case 401: // Unauthorized
        snackbarStore.setMessage(response.data.message);
        snackbarStore.toggleSnackbar(true);
        snackbarStore.setType("error");

        router.push({ name: "login" });
        break;

      default:
        snackbarStore.setMessage("Something went wrong");
        snackbarStore.toggleSnackbar(true);
        snackbarStore.setType("error");
        break;
    }
  }

  return { errorHandler };
}
