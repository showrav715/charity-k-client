import Cookies from "js-cookie";
const userCookie = Cookies.get("user");


const createAuthSlice = (set) => ({
  user: userCookie ? JSON.parse(userCookie) : null,
  token: Cookies.get("token") || null,

  setToken: (newToken) =>
    set((state) => {
      Cookies.set("token", newToken, { secure: true });
      return {
        ...state,
        token: newToken,
      };
    }),

  setUser: (newUser) => {
    set((state) => {
      Cookies.set("user", JSON.stringify(newUser), { secure: true });
      return {
        ...state,
        user: JSON.stringify(newUser),
      };
    });
  },

  logout: () => {
    Cookies.remove("token");
    Cookies.remove("user");
    set((state) => {
      return {
        ...state,
        user: null,
        token: null,
      };
    });
  },
});

export { createAuthSlice };

