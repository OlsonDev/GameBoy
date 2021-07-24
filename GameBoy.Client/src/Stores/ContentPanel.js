import { writable } from 'svelte/store'

export const isOpen = writable(true);
export const isGlowing = writable(false);
export const active = writable(null);
export const content = writable([]);