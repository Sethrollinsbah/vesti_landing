<script>
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
	import { isNightMode, modal, scrollY } from '$lib';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Ellipsis } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Feedback from '$lib/components/Feedback.svelte';

	onMount(async () => {
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
	});
</script>

<svelte:head>
	{#if !$isNightMode}
		<meta name="theme-color" content="#FFFFFF" />
	{:else}
		<meta name="theme-color" content="#000000" />
	{/if}
</svelte:head>

<div class="fixed left-10 top-10 z-50 text-lg text-white">VestiLogo</div>
<div class="fixed right-10 top-10 z-50">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger class="flex items-center gap-1">
			<Ellipsis class="size-4 " />
			<span class="sr-only">Toggle menu</span>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			<!-- <DropdownMenu.Item>Documentation</DropdownMenu.Item> -->
			<DropdownMenu.Item
				on:click={() => {
					$isNightMode = !$isNightMode;
				}}>Dark</DropdownMenu.Item
			>
			<DropdownMenu.Item
				on:click={() => {
					$modal = 'feedback';
				}}>Feedback</DropdownMenu.Item
			>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
<main
	class="flex h-full w-screen flex-col items-start justify-center overflow-x-hidden bg-background"
>
	<slot></slot>
	<Feedback></Feedback>
	<Toaster></Toaster>
</main>
