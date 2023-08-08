import { writable } from 'svelte/store';

export const addressData = writable<{
	status: string;
	query: string;
	countryCode: string;
	lat: number;
	lon: number;
	offset: number;
	isp: string;
	regionName: string;
	zip: string;
}>();
