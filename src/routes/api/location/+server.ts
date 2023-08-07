import { API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

const USER_SEARCH_IP_API_URL = `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}`;

const DOMAIN_REGEX = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/g;
const IP_ADDRESS_REGEX =
	/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;

export async function POST({ request }) {
	const { address } = await request.json();

	if (address.match(IP_ADDRESS_REGEX)) {
		const res = await fetch(`${USER_SEARCH_IP_API_URL}&ipAddress=${address}`);
		const data = await res.json();
		return json({ status: '200', data });
	}

	if (address.match(DOMAIN_REGEX)) {
		const res = await fetch(`${USER_SEARCH_IP_API_URL}&domain=${address}`);
		const data = await res.json();
		return json({ status: '200', data });
	} else {
		return json({ status: '400', data: 'Bad Request' });
	}
}
