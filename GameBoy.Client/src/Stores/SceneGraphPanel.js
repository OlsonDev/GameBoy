import { writable } from 'svelte/store';

export const isOpen = writable(true);
export const scene = writable([]);