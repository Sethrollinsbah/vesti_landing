<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import TextBox from '$lib/components/TextBox.svelte';
	import ProductImages from '$lib/components/ProductImages.svelte';
	import ImageDialog from '$lib/components/ImageDialog.svelte';
	import Explore from '$lib/components/Explore.svelte';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	onMount(async () => {
		const filees = await fetch('/api/files');
	});
	import { obj } from '$lib';
</script>

<TextBox></TextBox>

<Explore>
	{#each $obj as o}
		<div class="relative">
			<ImageDialog img={o.items[0][2]}>
				<ProductImages result={o.result} items={o.items}></ProductImages>
			</ImageDialog>
			<div class="absolute left-2 top-1">
				{#if o.result[0].tags}
					{#each o.result[0].tags as t}
						<Badge
							class="dakr:bg-zinc-700 my-2 mr-1 rounded-full bg-zinc-300 text-zinc-700 dark:bg-zinc-400"
							>#{t}</Badge
						>
					{/each}
				{/if}
			</div>
		</div>
	{/each}
	<!-- <Button variant="ghost">Close</Button> -->
</Explore>
