import { useFetchApi } from "./fetchApi";
import { useErrorHandler } from "./errorHandler";
import { ref } from "vue";

export function useBusinessHours() {
  const { fetchApi } = useFetchApi();
  const { errorHandler } = useErrorHandler();
  const loading = ref(false);

  const getBusinessHours = async () => {
    loading.value = true;
    await fetchApi({ url: "/business-hours", method: "get" })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        errorHandler(e);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return { loading, getBusinessHours };
}
