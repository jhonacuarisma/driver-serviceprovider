// store.ts
import { create } from 'zustand';
import { createUserSlice, UserSlice } from './user';

// Combine all slices into one store
export const useStore = create<UserSlice>()((...a) => ({
  ...createUserSlice(...a),
}));
