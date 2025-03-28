import { useFetchApi } from "./fetchApi";

export function useCsrfCookie() {
  const { fetchApi } = useFetchApi();

  const getCsrfCookie = async () => {
    await fetchApi({ url: "/sanctum/csrf-cookie", urlType: "base" }).catch(
      (e) => {
        console.log(e);
      }
    );
  };

  return { getCsrfCookie };
}
