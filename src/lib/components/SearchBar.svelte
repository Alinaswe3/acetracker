<script lang="ts">
	import { Circle } from 'svelte-loading-spinners';
	import { isLoading, isSuccess, isError, addressData } from '../store/store';
	import { fetchIpInfo } from '$lib/utils/dataFetch';

	const DOMAIN_REGEX = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/g;
	const IP_ADDRESS_REGEX =
		/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;

	let address: string = '';

	const submitFormData = async () => {
		isLoading.set(true);
		isError.set(false);
		isSuccess.set(false);

		try {
			if (address.match(IP_ADDRESS_REGEX) || address.match(DOMAIN_REGEX)) {
				const data = await fetchIpInfo(address);
				if (data.status === '200') {
					addressData.set(data.data);
					isSuccess.set(true);
				}
			} else {
				throw new Error('Invalid address: ' + address);
			}
		} catch (e) {
			isError.set(true);
		}
		isLoading.set(false);
	};
</script>

<div class="search min-h-fit flex flex-col items-center px-[2.4rem] pt-[3.2rem] pb-[12.8rem]">
	<h1 class="font-medium text-[3.2rem] text-white mb-[3.2rem]">IP Address Tracker</h1>
	<div class="w-full grid grid-cols-[minmax(22rem,56rem)] justify-center">
		<form
			method="post"
			on:submit={(e) => {
				e.preventDefault();
				submitFormData();
			}}
			class="relative w-full h-[5.8rem] flex items-center"
		>
			<input
				bind:value={address}
				placeholder="Search for any IP address or domain"
				class="focus-ring py-[1.8rem] pl-[2.4rem] w-full h-full rounded-tl-[15px] rounded-bl-[15px] tracking-wide text-body"
			/>
			<button
				type="submit"
				class="focus-ring text-5xl px-8 h-full rounded-tr-[15px] rounded-br-[15px] bg-black text-white"
			>
				{#if $isLoading}
					<Circle size="20" color="#fff" unit="px" duration="1s" />
				{:else}
					>
				{/if}
			</button>
		</form>
	</div>
</div>

<style>
	.search {
		background-image: url('/pattern-bg-desktop.webp');
		background-repeat: no-repeat;
		background-size: cover;
	}

	@media (max-width: 24em) {
		.search {
			background-image: url('/pattern-bg-mobile.webp');
		}
	}
</style>
