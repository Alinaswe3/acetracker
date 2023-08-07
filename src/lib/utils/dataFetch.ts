export const fetchIpInfo = async (address: string) => {
	const res = await fetch('/api/location', {
		method: 'POST',
		body: JSON.stringify({
			address
		})
	});
	return await res.json();
};
