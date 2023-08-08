import { writable } from 'svelte/store';

export const addressData = writable<{
	ip: string;
	location: {
		country: string;
		region: string;
		timezone: string;
		lat: number;
		lng: number;
		postalCode: string;
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
