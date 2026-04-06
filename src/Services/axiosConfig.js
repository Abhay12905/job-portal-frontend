import axios from "axios";

export const api = axios.create({
  baseURL: "https://job-portal-backend-et0n.onrender.com/api/",
  withCredentials: true,
});

// REQUEST
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {

    console.log("❌ Interceptor Error:", error.response?.status);

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;

      try {

        console.log("🔁 Calling refresh API");

        const res = await axios.post(
          "http://localhost:3000/api/user/refreshToken",
          {},
          { withCredentials: true }
        );

        const newAccessToken =
          res.headers.authorization?.split(" ")[1];

        console.log("✅ New Token:", newAccessToken);

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers["Authorization"] =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (refreshError) {

        console.log("🚨 Refresh FAILED");

        localStorage.removeItem("accessToken");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);