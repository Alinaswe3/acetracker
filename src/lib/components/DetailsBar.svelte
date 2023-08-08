<script lang="ts">
	import { fetchIpInfo } from '$lib/utils/dataFetch';
	import { onMount } from 'svelte';
	import { addressData } from '../store/store';
	import { Circle } from 'svelte-loading-spinners';

	const GET_USER_IP_API_URL = 'https://api.ipify.org?format=json';
	const SECONDS_IN_HOUR = 3600;

	const hourFormatter = (hour: string) => {
		if (hour.startsWith('-')) {
			hour = hour.replace('-', '');
			if (hour.length === 3) return `-${hour}:00`;
			else return `-0${hour}:00`;
		} else {
			if (hour.length === 2) return `+${hour}:00`;
			else return `+0${hour}:00`;
		}
	};

	let isLoading = true;
	let isError = false;
	let isSuccess = false;

	let ip: string = '---',
		country: string = '---',
		region: string = '---',
		timezone: string = '---',
		postalCode: string = '---',
		isp: string = '---';

	const fetchUserIpInfo = async () => {
		const res = await fetch(GET_USER_IP_API_URL);
		const { ip } = await res.json();
		const userIpData = await fetchIpInfo(ip);
		if (userIpData.status === '200') addressData.set(userIpData.data);
		else throw new Error('Internal server error');
	};

	onMount(async () => {
		try {
			await fetchUserIpInfo();
			isSuccess = true;
		} catch (err) {
			isError = true;
		} finally {
			isLoading = false;
		}
	});

	$: {
		if ($addressData) {
			ip = $addressData?.query;
			country = $addressData?.countryCode;
			region = $addressData?.regionName;
			timezone = hourFormatter($addressData?.offset / SECONDS_IN_HOUR + '');
			postalCode = $addressData?.zip;
			isp = $addressData?.isp;
		}
	}
</script>

<div class="w-full px-[2.4rem]">
	<div
		class="w-full leading-[3rem] lg:w-fit gap-[2rem] lg:gap-x-[4rem] lg:justify-start justify-center text-center md:text-start max-w-full details mx-auto bg-white shadow-lg -translate-y-1/2 p-[2.8rem] rounded-[15px]"
	>
		{#if isLoading}
			<div class="w-full h-full flex items-center justify-center col-span-4">
				<Circle size="30" color="#000" unit="px" duration="1s" />
			</div>
		{:else if isSuccess}
			<div>
				<h2 class="text-[1.2rem] font-bold text-light-gray uppercase tracking-wider">ip address</h2>
				<p class="font-medium text-[2.6rem]">{ip}</p>
			</div>
			<div>
				<h2 class="text-[1.2rem] font-bold text-light-gray uppercase tracking-wider">location</h2>
				<p class="font-medium text-[2.6rem]">{region}, {country} {postalCode}</p>
			</div>
			<div>
				<h2 class="text-[1.2rem] font-bold text-light-gray uppercase tracking-wider">timezone</h2>
				<p class="font-medium text-[2.6rem]">UTC {timezone}</p>
			</div>
			<div>
				<h2 class="text-[1.2rem] font-bold text-light-gray uppercase tracking-wider">isp</h2>
				<p class="font-medium text-[2.6rem]">{isp}</p>
			</div>
		{:else}
			<div class="w-full h-full flex items-center justify-center col-span-4">
				<div class="flex flex-col gap-6 items-center text-center text-4xl w-full">
					<p>Sorry! Something went wrong</p>
					<p>Please reload page to fix the error</p>
					<button
						on:click={() => {
							location.reload();
						}}
						class="border-2 border-black bg-black text-white text-3xl px-6 py-3 rounded-md uppercase shadow-sm transition-colors duration-300 hover:bg-white hover:text-black"
						>reload</button
					>
				</div>
			</div>
		{/if}
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
