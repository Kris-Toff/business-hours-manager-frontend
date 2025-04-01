import { useFetchApi } from "./fetchApi";
import { useErrorHandler } from "./errorHandler";
import { ref } from "vue";

export function useBusinessHours() {
  const { fetchApi } = useFetchApi();
  const { errorHandler } = useErrorHandler();
  const loading = ref(false);
  const data = ref(null);
  const errors = ref(null);

  const getBusinessHours = async () => {
    loading.value = true;
    await fetchApi({ url: "/business-hours", method: "get" })
      .then((response) => {
        data.value = response;
      })
      .catch((e) => {
        errors.value = e.response;
        errorHandler(e);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return { data, errors, loading, getBusinessHours };
}
