export const Endpoints = {
  AUTH: {
    LOGIN: `http://${import.meta.env.VITE_SERVER_URL}/api/auth/sign-in`,
    REGISTER: `http://${import.meta.env.VITE_SERVER_URL}/api/auth/sign-up`,
    REFRESH: `http://${import.meta.env.VITE_SERVER_URL}/api/auth/refresh`,
    LOGOUT: `http://${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,
    PROFILE: `http://${import.meta.env.VITE_SERVER_URL}/api/auth/profile`,
  },
};
