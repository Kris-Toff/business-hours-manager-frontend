import { ref } from "vue";
import { useFetchApi } from "./fetchApi";
import { useErrorHandler } from "./errorHandler";

export function useHome() {
  const { fetchApi } = useFetchApi();
  const { errorHandler } = useErrorHandler();
  const data = ref(null);
  const loading = ref(false);

  const home = async () => {
    loading.value = true;
    await fetchApi({ url: "/home", method: "get" })
      .then((response) => {
        data.value = response;
      })
      .catch((e) => {
        errorHandler(e);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  home();

  return { data, loading };
}
