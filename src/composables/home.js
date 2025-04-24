import { ref } from "vue";
import { useFetchApi } from "./fetchApi";
import { useErrorHandler } from "./errorHandler";

export function useHome() {
  const { fetchApi } = useFetchApi();
  const { errorHandler } = useErrorHandler();
  const data = ref(null);
  const nextOpeningData = ref(null);
  const loading = ref(false);

  const storeStatus = async () => {
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

  const nextOpening = async () => {
    loading.value = true;
    await fetchApi({ url: "/next-opening", method: "get" })
      .then((response) => {
        nextOpeningData.value = response;
      })
      .catch((e) => {
        errorHandler(e);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const getNextOpeningByDate = async (dateString) => {
    // loading.value = true;
    let nextOpeningByDateData = null;
    await fetchApi({
      url: "/next-opening-by-date",
      method: "post",
      params: { date: dateString },
    })
      .then((response) => {
        nextOpeningByDateData = response;
      })
      .catch((e) => {
        errorHandler(e);
      })
      .finally(() => {
        // loading.value = false;
      });

    return nextOpeningByDateData;
  };

  storeStatus();

  return { data, loading, nextOpeningData, nextOpening, getNextOpeningByDate };
}
