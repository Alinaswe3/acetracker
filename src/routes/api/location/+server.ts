import { json } from '@sveltejs/kit';

const DOMAIN_REGEX = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/g;
const IP_ADDRESS_REGEX =
	/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;

export async function POST({ request }) {
	try {
		const { address } = await request.json();

		if (!address) return json({ status: '400', data: 'Bad Request' });

		if (address.match(IP_ADDRESS_REGEX) || address.match(DOMAIN_REGEX)) {
			const res = await fetch(
				`http://ip-api.com/json/${address}?fields=query,status,countryCode,regionName,zip,lat,lon,offset,isp`
			);
			const data = await res.json();
			if (data.status === 'success') return json({ status: '200', data });
			else return json({ status: '400', data: data.message });
		} else {
			return json({ status: '400', data: 'Bad Request' });
		}
	} catch (err) {
		return json({ status: '500', data: 'Internal Server Error' });
	}
}
