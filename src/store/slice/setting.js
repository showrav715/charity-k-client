const createSettingSlice = (set) => ({
  settings: null,
  isCampaignListView: false,
  isMobileMenuOpen: false,
  splitTitle: {
    stringWithoutLastWord: null,
    lastWord: null,
  },
  defaultLanguage: "en",
  storeSetting: (newSettings) =>
    set((state) => {
      const words = newSettings?.hero_title.split(" ");
      const lastWord = words.pop();
      const stringWithoutLastWord = words.join(" ");
      return {
        ...state,
        settings: newSettings,
        splitTitle: {
          stringWithoutLastWord,
          lastWord,
        },
      };
    }),



  setCampaignStatus: (data) =>
    set((state) => ({ ...state, isCampaignListView: data })),
  setMobileMenuOpen: (data) =>
    set((state) => ({ ...state, isMobileMenuOpen: data })),

  storeLanguage: (language, type = "not_api", defaultLanguage = "en") => {
    if (type == "api") {
      localStorage.setItem("language", JSON.stringify(language));
    } else {
      // check if language is already stored in local storage
      const lang = localStorage.getItem("language");
      if (!lang) {
        localStorage.setItem("language", JSON.stringify(language));
      }
    }

    set((state) => {
      return {
        ...state,
        defaultLanguage: defaultLanguage,
      };
    });
  },
});

export { createSettingSlice };
