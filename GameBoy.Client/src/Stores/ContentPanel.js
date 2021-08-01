import { writable } from 'svelte/store'

export const isOpen = writable(false);
export const isGlowing = writable(false);
export const active = writable(null);
export const content = writable([]);