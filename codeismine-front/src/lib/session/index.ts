import { writable } from 'svelte/store';

export const sessionTimeoutTimer = writable<number | null>(null);
