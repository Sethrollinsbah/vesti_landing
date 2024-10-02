<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { Button } from './components/ui/button';
	import { Fullscreen } from 'lucide-svelte';
	let blur1 = false;
	let steps = [
		{
			title: 'Non-intrusive',
			desc: 'Browse as you normally would',
			full: 'On known clothing sites, we ask your your browsers permission to allow us to view the clothing you may be interested in.',
			img: 'newima.png'
		},
		{
			title: 'Try-on',
			desc: 'See how that dress looks on you',
			full: "Ready to see how a dress might look on you? Press the Try on button that popup next to the arment you're interested in.",
			img: 'Tryon.svg'
		}
		// {
		// 	title: 'Discovery',
		// 	desc: 'Get clothing recommendations',
		// 	full: '',
		// 	img: 'Tryon.svg'
		// }
		// {
		// 	title: 'Modeling',
		// 	desc: 'Pick through the array of clothing to try on',
		// 	full: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui amet repudiandae maxime vel doloribus explicabo asperiores, earum praesentium quod error est'
		// },
		// {
		// 	title: '',
		// 	desc: '',
		// 	full: ''
		// }
	];
</script>

<Carousel.Root
	opts={{
		align: 'start'
	}}
	class="mx-auto flex w-full flex-col"
>
	<div>
		<Carousel.Content class="gap-x-6 px-[10%] lg:px-32 xl:px-40">
			{#each steps as r, i (i)}
				<Carousel.Item
					class="xl:basis-3/8 basis-3/4 overflow-clip rounded-xl p-0 sm:basis-2/3 lg:basis-1/3"
				>
					<div>
						<Card.Root>
							<Card.Content
								class="group relative flex aspect-[8/13] h-full w-full flex-col items-start justify-start rounded-xl bg-primary p-0"
							>
								<hi class="absolute left-4 top-4 z-10 text-background"
									>{r.title}<br /><span class="text-2xl font-medium">{r.desc}</span></hi
								>
								<Button
									on:click={() => {
										blur1 = !blur1;
									}}
									class="absolute bottom-2 right-2 z-10 translate-y-16 scale-0 opacity-0 transition-all duration-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
									size="icon"
									variant="outline"
								>
									<Tooltip.Root>
										<Tooltip.Trigger>
											<Fullscreen class="size-4 text-muted-foreground" />
										</Tooltip.Trigger>
										<Tooltip.Content>
											<p>View generation</p>
										</Tooltip.Content>
									</Tooltip.Root></Button
								>
								<div
									class:backdrop-blur-lg={blur1}
									class:bg-primary={blur1}
									class:bg-opacity-60={blur1}
									class:animate-in={blur1}
									class:opacity-0={!blur1}
									class:backdrop-blur-none={!blur1}
									class="absolute left-0 top-0 z-[5] h-full w-full transition-all duration-300 ease-out"
								>
									<p
										class:translate-y-12={!blur1}
										class:translate-y-0={blur1}
										class:scale-95={!blur1}
										class:scale-100={blur1}
										class:opacity-0={!blur1}
										class:opacity-100={blur1}
										class="absolute bottom-5 left-5 w-[80%] text-background transition-all delay-200 duration-500 ease-out"
									>
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui amet repudiandae
										maxime vel doloribus explicabo asperiores, earum praesentium quod error est
									</p>
								</div>
								<div class="absolute left-0 top-0 h-full w-full object-cover">
									<img src={r.img} class="h-full object-cover" />
								</div>
							</Card.Content>
						</Card.Root>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
	</div>
	<div class="relative ml-auto mt-4 -translate-x-20">
		<Carousel.Previous class="relative translate-x-0 translate-y-0" />
		<Carousel.Next class="relative translate-x-0 translate-y-0" />
	</div>
</Carousel.Root>

<style>
</style>
