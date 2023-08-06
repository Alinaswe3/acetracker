<div class="search min-h-fit flex flex-col items-center px-[2.4rem] pt-[3.2rem] pb-[12.8rem]">
	<h1 class="font-medium text-[3.2rem] text-white mb-[3.2rem]">IP Address Tracker</h1>
	<div class="w-full grid grid-cols-[minmax(22rem,56rem)] justify-center">
		<div class="w-full h-[5.8rem] flex items-center">
			<input
				placeholder="Search for any IP address or domain"
				class="focus-ring py-[1.8rem] pl-[2.4rem] w-full h-full rounded-tl-[15px] rounded-bl-[15px] tracking-wide text-body"
			/>
			<button
				class="focus-ring text-5xl px-8 h-full rounded-tr-[15px] rounded-br-[15px] bg-black text-white"
				>></button
			>
		</div>
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
