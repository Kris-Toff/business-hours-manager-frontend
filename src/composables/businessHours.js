import { useFetchApi } from "./fetchApi";
import { useErrorHandler } from "./errorHandler";

export function useBusinessHours() {
  const { fetchApi } = useFetchApi();
  const { errorHandler } = useErrorHandler();

  const getBusinessHours = async () => {
    await fetchApi({ url: "/business-hours", method: "get" })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        errorHandler(e);
        console.log(e);
      });
  };

  return { getBusinessHours };
}
