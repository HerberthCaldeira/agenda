import Axios, { AxiosError } from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log("axios interceptors", error);
    if (
      error instanceof AxiosError &&
      (error?.response.status === 419 || error?.response.status === 401)
    ) {
      window.console.log("Request canceled ::", error.message);

      window.history.pushState({}, "", "/login");
      // communicate to Routes that URL has changed
      const navEvent = new PopStateEvent("popstate");
      window.dispatchEvent(navEvent);
    }

    return Promise.reject(error);
  },
);

export default axios;
