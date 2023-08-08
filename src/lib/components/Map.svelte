<script lang="ts">
	import DetailsBar from './DetailsBar.svelte';
	import 'leaflet/dist/leaflet.css';
	import { onMount } from 'svelte';
	import { addressData } from '../store/store';

	let L: any;
	let map: any;
	let customIcon: any;

	onMount(async () => {
		L = await import('leaflet');
		map = L.map('map', {
			center: [-15.3875, 28.3228],
			zoom: 15,
			zoomControl: false
		});
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
		customIcon = L.icon({
			iconUrl: '/icon-location.svg',
			iconSize: [46, 56]
		});
	});

	$: if (map && $addressData) {
		const { lat, lon } = $addressData;
		const coords = [lat, lon];
		map.setView(coords, 15);
		L.marker(coords, { icon: customIcon }).addTo(map);
	}
</script>

<div class="relative w-full min-h-[40rem] h-full z-20 px-[2.4rem]">
	<DetailsBar />
	<div id="map" class="absolute top-0 left-0 w-full h-full -z-10" />
</div>
