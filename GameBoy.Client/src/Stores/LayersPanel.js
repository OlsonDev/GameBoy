import { writable } from 'svelte/store';

export const isOpen = writable(false);
export const isGlowing = writable(false);
export const layers = writable([
  { name: 'Foreground', objects: [] },
  { name: 'Background', objects: [] },
]);
