<script lang="ts">
	import { fetchIpInfo } from '$lib/utils/dataFetch';
	import { onMount } from 'svelte';
	import { isLoading, isSuccess, isError, addressData } from '../store/store';

	const GET_USER_IP_API_URL = 'https://api.ipify.org?format=json';

	let ip: string = '---',
		country: string = '---',
		region: string = '---',
		timezone: string = '---',
		asn: number = 0,
		isp: string = '---';

	const fetchUserIpInfo = async () => {
		const res = await fetch(GET_USER_IP_API_URL);
		const { ip } = await res.json();
		const userIpData = await fetchIpInfo(ip);
		if (userIpData.status === '200') addressData.set(userIpData.data);
	};

	onMount(async () => {
		fetchUserIpInfo();
	});

	$: {
		if ($addressData) {
			console.log($addressData);
			ip = $addressData.ip;
			country = $addressData.location.country;
			region = $addressData.location.region;
			timezone = $addressData.location.timezone;
			asn = $addressData.as.asn;
			isp = $addressData.isp;
		}
	}
</script>

<div class="w-full px-[2.4rem]">
	<div
		class="w-full leading-[3rem] lg:w-fit gap-[2rem] lg:gap-x-[4rem] lg:justify-start justify-center text-center md:text-start max-w-full details mx-auto bg-white shadow-lg -translate-y-1/2 p-[2.8rem] rounded-[15px]"
	>
		<div>
			<h2 class="text-[1.2rem] font-bold text-light-gray uppercase tracking-wider">ip address</h2>
			<p class="font-medium text-[2.6rem]">{ip}</p>
		</div>
		<div>
			<h2 class="text-[1.2rem] font-bold text-light-gray uppercase tracking-wider">location</h2>
			<p class="font-medium text-[2.6rem]">{region}, {country} {asn}</p>
		</div>
		<div>
			<h2 class="text-[1.2rem] font-bold text-light-gray uppercase tracking-wider">timezone</h2>
			<p class="font-medium text-[2.6rem]">UTC {timezone}</p>
		</div>
		<div>
			<h2 class="text-[1.2rem] font-bold text-light-gray uppercase tracking-wider">isp</h2>
			<p class="font-medium text-[2.6rem]">{isp}</p>
		</div>
	</div>
</div>

<style>
	.details {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min-content, 22rem));
		max-height: 22rem;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>
