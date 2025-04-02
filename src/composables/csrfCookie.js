import { ref } from "vue";
import { useFetchApi } from "./fetchApi";

export function useCsrfCookie() {
  const { fetchApi } = useFetchApi();
  const data = ref(null);
  const errors = ref(null);
  const loading = ref(false);

  const getCsrfCookie = async () => {
    loading.value = true;
    await fetchApi({ url: "/sanctum/csrf-cookie", urlType: "base" })
      .then((res) => {
        data.value = res;
      })
      .catch((e) => {
        errors.value = e.response;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return { data, errors, loading, getCsrfCookie };
}
