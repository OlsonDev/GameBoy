import { writable } from 'svelte/store';

export const isOpen = writable(false);
export const isGlowing = writable(false);
export const scene = writable([]);