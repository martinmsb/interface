import { StateCreator } from 'zustand';

import { RootStore } from './root';

export type PrivacyPreference = 'tor' | 'clearnet';

export interface PrivacySlice {
  privacyPreference: PrivacyPreference;
  setPrivacyPreference: (pref: PrivacyPreference) => void;
}

export const createPrivacySlice: StateCreator<
  RootStore,
  [['zustand/subscribeWithSelector', never], ['zustand/devtools', never]],
  [],
  PrivacySlice
> = (set) => ({
  privacyPreference: 'tor',
  setPrivacyPreference: (pref) => set({ privacyPreference: pref }),
});
