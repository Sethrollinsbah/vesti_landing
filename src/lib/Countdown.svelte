<script lang="ts">
	import { onMount } from 'svelte';

	let days: number;
	let hours: number;
	let minutes: number;
	let seconds: number;
	let expired = false;

	const countDownDate = new Date('Oct 15, 2024 15:37:25').getTime();

	function updateCountdown() {
		const now = new Date().getTime();
		const distance = countDownDate - now;

		if (distance < 0) {
			expired = true;
			clearInterval(interval);
			return;
		}

		days = Math.floor(distance / (1000 * 60 * 60 * 24));
		hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		seconds = Math.floor((distance % (1000 * 60)) / 1000);
	}

	let interval;

	onMount(() => {
		updateCountdown();
		interval = setInterval(updateCountdown, 1000);

		return () => {
			clearInterval(interval); // Clear interval when component is destroyed
		};
	});
</script>

<div>
	{#if expired}
		<p>EXPIRED</p>
	{:else}
		<div
			class="lg:textl-3xl flex h-20 divide-amber-500 rounded-md bg-gradient-to-t from-primary/90 to-primary text-xl text-background/50 ring-1 ring-secondary/20 md:text-2xl"
		>
			<div class="flex w-20 flex-col items-center justify-center md:w-28">
				{days || ''}d
			</div>
			<div class="flex w-20 flex-col items-center justify-center md:w-28">
				{hours || ''}h
			</div>
			<div class="flex w-20 flex-col items-center justify-center md:w-28">
				{minutes || ''}m
			</div>
			<div class="flex w-20 flex-col items-center justify-center md:w-28">
				{seconds || ''}s
			</div>
		</div>
	{/if}
</div>
