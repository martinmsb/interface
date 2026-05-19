import { StateCreator } from 'zustand';

import { RootStore } from './root';

export type PrivacyPreference = 'tor' | 'clearnet';

const PRIVACY_STORAGE_KEY = 'govPrivacyPreference';

function readStoredPreference(): PrivacyPreference {
  if (typeof window === 'undefined') return 'tor';
  const stored = localStorage.getItem(PRIVACY_STORAGE_KEY);
  return stored === 'tor' || stored === 'clearnet' ? stored : 'tor';
}

export interface PrivacySlice {
  privacyPreference: PrivacyPreference;
  setPrivacyPreference: (pref: PrivacyPreference) => void;
  hydratePrivacyPreference: () => void;
}

export const createPrivacySlice: StateCreator<
  RootStore,
  [['zustand/subscribeWithSelector', never], ['zustand/devtools', never]],
  [],
  PrivacySlice
> = (set) => ({
  privacyPreference: readStoredPreference(),
  setPrivacyPreference: (pref) => {
    if (typeof window !== 'undefined') localStorage.setItem(PRIVACY_STORAGE_KEY, pref);
    set({ privacyPreference: pref });
  },
  hydratePrivacyPreference: () => {
    // preference is already read synchronously at store creation; this is a no-op kept for API compatibility
  },
});
