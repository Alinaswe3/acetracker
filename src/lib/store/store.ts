import { writable } from 'svelte/store';

export let isLoading = writable(false);
export let isError = writable(false);
export let isSuccess = writable(false);

export const addressData = writable<{
	ip: string;
	location: {
		country: string;
		region: string;
		timezone: string;
	};
	domains: Array<string>;
	as: {
		asn: number;
		name: string;
		route: string;
		domain: string;
		type: string;
	};
	isp: string;
}>();
