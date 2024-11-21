import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_INTERNAL_API_PATH,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data) => {
  try {
    const response = await api.post("/login", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const signUp = async (data) => {
  try {
    const response = await api.post("/sign-up", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (data) => {
  try {
    const response = await api.post("/logout", data);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalReq = error.config;

    if (error.response.status === 401 && !originalReq._isRetry) {
      originalReq._isRetry = true;
      try {
        await api.get("/refresh");

        return api.request(originalReq);
      } catch (error) {
        return error;
      }
    } else {
      return error.response;
    }
  }
);
