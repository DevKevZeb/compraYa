import { create } from "zustand";

export const useBadgeStore = create((set)=>({
    badge:0,
    incrementBadge:()=>set((state)=>({badge:state.badge+1})),
    decrementBadge:()=>set((state)=>({badge:state.badge-1}))
}))