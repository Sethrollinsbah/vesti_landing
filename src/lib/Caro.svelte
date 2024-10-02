<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
</script>

<Carousel.Root
	opts={{
		align: 'start'
	}}
	class="mx-auto flex w-full flex-col"
>
	<div>
		<Carousel.Content class="gap-x-6 px-[10%] lg:px-32 xl:px-40">
			{#each Array(5) as _, i (i)}
				<Carousel.Item
					class="xl:basis-3/8 basis-3/4 overflow-clip rounded-xl p-0 sm:basis-2/3 lg:basis-1/3"
				>
					<div>
						<Card.Root>
							<Card.Content
								class="relative flex aspect-[8/13] h-full w-full flex-col items-start justify-start rounded-xl bg-primary p-0"
							>
								<!-- <!-- <span class="text-3xl font-semibold">{i + 1}</span> -->
								<!-- <video -->
								<!-- 	muted -->
								<!-- 	controls -->
								<!-- 	class="h-full rounded-xl object-cover grayscale transition-all duration-500 hover:grayscale-0" -->
								<!-- 	src="https://landing.stylar.com/MixNMatch%20v2.0%20compressed.mp4" -->

								<hi class="absolute left-4 top-4 text-background"
									>Title<br /><span class="text-2xl font-medium">Description</span></hi
								>
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
