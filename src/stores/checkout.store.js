import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Remembers the last delivery address so repeat checkouts are one tap faster.
export const useCheckoutStore = create(
  persist(
    (set) => ({
      lastAddress: '',
      setLastAddress: (lastAddress) => set({ lastAddress }),
    }),
    {
      name: 'compraya-checkout',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
