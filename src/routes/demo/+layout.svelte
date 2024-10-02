<script>
	import { handleWsMessage } from '$lib/utils.ts';
	import { ws } from '$lib';
	import ImageDialogItem from '$lib/components/ImageDialogItem.svelte';
	import { selectedImage, isNightMode } from '$lib';
	import { onDestroy, onMount } from 'svelte';
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

<div class="relative flex flex-col items-center justify-center">
	<div class="bgLight absolute left-0 top-0 h-screen w-full" />
	<main class="flex flex-col items-center justify-start pb-8">
		<slot></slot>
		<ImageDialogItem></ImageDialogItem>
	</main>
</div>
