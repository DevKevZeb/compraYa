import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Delivery location picked on the map ({ address, label, reference, latitude,
// longitude }). It is kept on the device so repeat checkouts are one tap faster.
export const useCheckoutStore = create(
  persist(
    (set) => ({
      deliveryLocation: null,
      setDeliveryLocation: (deliveryLocation) => set({ deliveryLocation }),
    }),
    {
      name: 'compraya-checkout',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      // Version 0 stored a free-text address without coordinates; start fresh.
      migrate: () => ({ deliveryLocation: null }),
    }
  )
);

// "Avenida Heroínas 500, Centro · Apt 3B"
export const buildDeliveryAddress = (label, reference) =>
  [label?.trim(), reference?.trim()].filter(Boolean).join(' · ');
