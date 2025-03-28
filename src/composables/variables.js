export function useVariables() {
  let baseUrl;
  let apiUrl;

  switch (window.location.hostname) {
    case "live": // for production
      baseUrl = "http://localhost:8000";
      apiUrl = "http://localhost:8000/api";
      break;

    default: // localhost
      baseUrl = "http://localhost:8000";
      apiUrl = "http://localhost:8000/api";
      break;
  }

  return { baseUrl, apiUrl };
}
