<script lang="ts">
	import * as DropdownMenu from './ui/dropdown-menu';
	import { open } from '$lib';
	import { blur } from 'svelte/transition';
	import * as Card from './ui/card/index.js';
	import { Label } from './ui/label/index.js';
	import * as Select from './ui/select/index.js';
	import AddAllFiles from './AddAllFiles.svelte';
	import { modal, isNightMode } from '$lib';
	import { Ellipsis } from 'lucide-svelte';
	let selected: string = ''; // Default selected value
	let selected2: string = ''; // Default selected value
</script>

<div
	class:h-[34rem]={$open === 2}
	class:sm:h-[30rem]={$open === 2}
	class:sm:h-48={$open !== 2}
	class:h-72={$open !== 2}
	class="relative w-full max-w-lg overflow-clip p-4 transition-all duration-500 ease-out"
>
	<Card.Root class="w-full max-w-none">
		<Card.Header class="flex flex-row justify-between">
			<Card.Title>Virtual Try-on {$open}</Card.Title>
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
		</Card.Header>
		<Card.Content>
			<div class="grid sm:grid-cols-[120px_2px_1fr] sm:gap-x-6">
				<div class="grid w-full gap-3">
					<Label for="category">Model</Label>
					<Select.Root
						onSelectedChange={(v) => {
							v && (selected = v.value);
							$open = 1;
						}}
					>
						<Select.Trigger value={selected} id="category" aria-label="Select version">
							<Select.Value placeholder="Select category" />
						</Select.Trigger>
						<Select.Content class="w-full">
							<Select.Item value="version1" label="Version 1">
								<p>
									<b class="text-sm">Version 1</b><br />
									<span class="text-xs text-muted-foreground"
										>{new Date().toLocaleDateString()}</span
									>
								</p>
							</Select.Item>
							<Select.Item disabled={true} value="version2" label="Version 2">
								<p>
									<b class="text-sm">Version 2</b><br />
									<span class="text-xs text-muted-foreground">...</span>
								</p>
							</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
				<div></div>
				<div class="mt-4 grid w-full gap-3 sm:mt-0">
					<Label for="garment">Garment type</Label>
					<Select.Root
						onSelectedChange={(v) => {
							v && (selected2 = v.value);
							$open = 2;
						}}
						open={$open === 1}
						disabled={!selected}
					>
						<Select.Trigger id="garment" aria-label="Select garment">
							<Select.Value placeholder="Select garment" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="t-shirts" label="T-Shirts">T-Shirts</Select.Item>
							<Select.Item value="hoodies" label="Hoodies">Hoodies</Select.Item>
							<Select.Item value="sweatshirts" label="Sweatshirts">Sweatshirts</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
			</div>
			{#if $open === 2}
				<AddAllFiles></AddAllFiles>
			{/if}
		</Card.Content>
	</Card.Root>
</div>

<style>
	@keyframes slide-right {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(60%); /* Adjust this value for distance */
		}
	}

	.animate-slide {
		animation: slide-right 2s linear infinite; /* Adjust duration and timing function */
	}
</style>
