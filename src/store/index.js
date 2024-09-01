
import { create } from 'zustand'
import { createSettingSlice } from './slice/setting'
import { createAuthSlice } from './slice/auth'
import { createCurrencySlice } from './slice/currency'


  const useStore = create((...data) => ({
  ...createSettingSlice(...data),
  ...createAuthSlice(...data),
  ...createCurrencySlice(...data),
}));


export {useStore};
