export const Endpoints = {
  AUTH: {
    LOGIN: `http://${import.meta.env.VITE_SERVER_URL}/api/auth/sign-in`,
    REGISTER: `http://${import.meta.env.VITE_SERVER_URL}/api/auth/sign-up`,
    LOGOUT: `http://${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,
  },
  USERS: {},
};
