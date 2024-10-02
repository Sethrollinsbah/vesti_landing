<script>
	import { handleWsMessage } from '$lib/utils.ts';
	import { Toaster } from 'svelte-sonner';
	import { ws } from '$lib';
	import ImageDialogItem from '$lib/components/ImageDialogItem.svelte';
	import { selectedImage, isNightMode } from '$lib';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Feedback from '$lib/components/Feedback.svelte';
	export let data;
	onMount(async () => {
		$ws = new WebSocket('https://old-credit-85c5.sethryanrollins.workers.dev');
		$selectedImage = { id: '', e: false, link: '' };

		$ws.onopen = () => {
			console.log('Connected to WebSocket server');
			const initialMessage = JSON.stringify({ type: 'Ping', uid: 'user_123' });
			$ws.send(initialMessage);
		};

		$ws.onmessage = async (event) => {
			const wsMes = JSON.stringify(event.data);
			await handleWsMessage(wsMes);
			console.log(wsMes);
		};

		$ws.onclose = () => {
			console.log('Disconnected from WebSocket server');
		};

		$ws.onerror = (error) => {
			console.error('WebSocket error:', error);
		};
		if (browser) {
			const isNightmodeInLocalStorage = data.theme | '';
			$isNightMode = isNightmodeInLocalStorage === 'light';
			// Subscribe to night mode change
			if (isNightmodeInLocalStorage === null || isNightmodeInLocalStorage === undefined) {
				const prefersDarkMode =
					window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
				if (prefersDarkMode) {
					isNightMode.set(true);
					await fetch('/api/account/theme?theme=custom-theme');
				} else {
					isNightMode.set(false);
					await fetch('/api/account/theme?theme=light');
				}
			}
			isNightMode.subscribe(async (value) => {
				if (value === true) {
					document.body.classList.add('dark');
					// localStorage.setItem('currentTheme', 'current-theme');
				} else if (value === false) {
					document.body.classList.remove('dark');
					// localStorage.setItem('currentTheme', 'light');
				}
			});
		}
		onDestroy(() => {
			if ($ws) {
				console.log('Disconnecting from WebSocket server');
				const initialMessage = JSON.stringify({ type: 'abort', userId });
				$ws.send(initialMessage);
				$ws.close();
			}
		});
	});
</script>

<svelte:head>
	{#if !$isNightMode}
		<meta name="theme-color" content="#FFFFFF" />
	{:else}
		<meta name="theme-color" content="#000000" />
	{/if}
</svelte:head>
<div class="relative flex flex-col items-center justify-center">
	<div class="bgLight absolute left-0 top-0 h-screen w-full" />
	<main class="flex flex-col items-center justify-start pb-8">
		<slot></slot>
		<ImageDialogItem></ImageDialogItem>
		<Feedback></Feedback>
		<Toaster></Toaster>
	</main>
</div>
