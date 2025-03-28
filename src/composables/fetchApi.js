import axios from "axios";
import { useVariables } from "./variables";

export function useFetchApi() {
  const { baseUrl, apiUrl } = useVariables();

  const fetchApi = ({ url, method = "get", params, urlType = "api" }) => {
    const instance = axios.create({
      baseURL: urlType == "api" ? apiUrl : baseUrl,
      headers: { Accept: "application/json" },
      withCredentials: true,
      withXSRFToken: true,
    });

    switch (method) {
      case "post":
        return new Promise((resolve, reject) => {
          instance
            .post(url, params)
            .then((response) => {
              resolve(response.data);
            })
            .catch((e) => {
              reject(e.response);
            });
        });
      default:
        return new Promise((resolve, reject) => {
          instance
            .get(url, params)
            .then((response) => {
              resolve(response.data);
            })
            .catch((e) => {
              reject(e.response);
            });
        });
    }
  };

  return { fetchApi };
}
