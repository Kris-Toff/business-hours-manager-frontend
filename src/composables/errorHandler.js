import router from "@/router";
import { useSnackbarStore } from "@/store/snackbar";

export function useErrorHandler() {
  const snackbarStore = useSnackbarStore();

  function errorHandler(response) {
    snackbarStore.toggleSnackbar(true);
    snackbarStore.setType("error");

    switch (response.status) {
      case 401: // Unauthorized
        snackbarStore.setMessage(response.data.message);

        router.push({ name: "login" });
        break;

      case 422: // Unprocessable Content
      case 419: // CSRF token miss match
        snackbarStore.setMessage(response.data.message);
        break;

      default:
        snackbarStore.setMessage("Something went wrong");
        break;
    }
  }

  return { errorHandler };
}
