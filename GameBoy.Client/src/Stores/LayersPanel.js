import { writable } from 'svelte/store';

export const isOpen = writable(true);
export const layers = writable([{name: 'Background', objects: [] }]);