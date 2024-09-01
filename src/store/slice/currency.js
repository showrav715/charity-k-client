import Cookies from "js-cookie";

const createCurrencySlice = (set) => ({
  defaultCurrency:
    (Cookies.get("currency") && JSON.parse(Cookies.get("currency"))) || null,

  defaultLanguage:
    (Cookies.get("default_language") &&
      JSON.parse(Cookies.get("default_language"))) ||
    null,

  setCurrency: (currency, type = null) =>
    set((state) => {
      if (type == "api" && state.defaultCurrency) return state;
      Cookies.set("currency", JSON.stringify(currency), { secure: true });
      return {
        ...state,
        defaultCurrency: currency,
      };
    }),

  setLanguage: (language, type = null) =>
    set((state) => {
      if (type == "api" && state.defaultLanguage) return state;
      Cookies.set("default_language", JSON.stringify(language), {
        secure: true,
      });
      return {
        ...state,
        defaultLanguage: language,
      };
    }),
});

export { createCurrencySlice };
