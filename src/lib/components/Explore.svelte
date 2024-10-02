<script>
	import { blur } from 'svelte/transition';
</script>

<section class="grid h-full w-full">
	<div
		class="mx-auto grid h-fit w-full max-w-md grid-cols-1 gap-4 px-4 sm:max-w-md md:max-w-4xl md:grid-cols-2 lg:max-w-5xl lg:grid-cols-3 xl:max-w-6xl"
	>
		<h1
			class:from-[hsl(var(--success))]={false}
			class="z-20 col-span-full mt-4 bg-gradient-to-r from-muted-foreground via-black to-black/50 bg-clip-text text-4xl font-medium text-transparent"
		>
			History
		</h1>
		<slot />
	</div>
</section>
