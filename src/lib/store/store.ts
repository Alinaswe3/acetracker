import { writable } from 'svelte/store';

export let isLoading = writable(false);
export let isError = writable(false);
export let isSuccess = writable(false);
