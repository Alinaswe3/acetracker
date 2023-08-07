import { API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

const GET_USER_IP_API_URL = 'https://api.ipify.org?format=json';
const USER_SEARCH_IP_API_URL = `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}`;

export function GET() {
	return new Response(JSON.stringify('APi is working'));
}

export async function POST({ request }) {
	const data = await request.json();
	console.log(data);
	return json({ message: 'Test successful' });
}
