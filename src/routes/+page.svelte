<script lang="ts">
	import Caro from '$lib/Caro.svelte';
	import { Label } from '$lib/components/ui/label';
	import DialogForm from '$lib/DialogForm.svelte';
	import Phone from '$lib/Phone.svelte';
	import { Input } from '$lib/components/ui/input';

	import { Button } from '$lib/components/ui/button';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Countdown from '$lib/Countdown.svelte';
	import { flyAndScale } from '$lib/utils';
	import { goto } from '$app/navigation';
	let email = '';

	function validateEmail(email: string) {
		const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		return regex.test(email);
	}
	export let feature: string = 'Compatiblility';
	export let short_desc: string = 'We support your favourites!';
	export let desc: string =
		"Visualize yourself in any apparel you'd like and then check out the dashboard for saved tryons";
	export let link: string = '';
	export let img: string = '/productshot.png';
	export let benefit: Benefit[] = [
		{
			Title: 'Invoicing',
			Description:
				'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.'
		},
		{
			Title: 'Invoicing',
			Description:
				'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.'
		}
	];
	type Benefit = {
		Title: string;
		Description: string;
	};

	let el0, el1, el2, el2_1, el3, scrollY;
	$: console.log(el0, el1, el2, el2_1, el3, scrollY);
</script>

<svelte:window bind:scrollY />
<section
	bind:offsetHeight={el0}
	class="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-clip bg-slate-800"
	id="header"
>
	<div class="absolute left-0 top-0 flex h-full w-full -translate-y-[25%] -rotate-12 gap-5">
		{#each Array.from({ length: 12 }) as ar}
			<div class="aspect-[9/11] h-[50%] rounded-lg bg-slate-700">
				<img src="/heima.heic" class="h-full w-full opacity-20" />
			</div>
		{/each}
	</div>
	<div
		class="absolute left-0 top-[calc(50%+2rem)] flex h-full w-full -translate-y-[25%] -rotate-12 gap-5"
	>
		{#each Array.from({ length: 12 }) as ar}
			<div class="aspect-[9/11] h-[50%] rounded-lg bg-slate-700">
				<img src="/heima.heic" class="h-full w-full opacity-20" />
			</div>
		{/each}
	</div>
	<div
		class="absolute left-0 top-[calc(100%+4rem)] flex h-full w-full -translate-y-[25%] -rotate-12 gap-5"
	>
		{#each Array.from({ length: 12 }) as ar}
			<div class="aspect-[9/11] h-[50%] rounded-lg bg-slate-700">
				<img src="/heima.heic" class="h-full w-full opacity-20" />
			</div>
		{/each}
	</div>
	<div
		class="absolute left-0 top-0 flex h-full w-full flex-col bg-gradient-to-t from-primary/50 to-primary/50 backdrop-blur-sm"
	>
		<div class="flex h-[80%] w-full flex-col items-center justify-center space-y-4">
			<p
				class="animate-in mx-auto w-fit max-w-2xl bg-gradient-to-r from-secondary to-muted/50 bg-clip-text text-center font-serif text-4xl font-medium text-transparent md:text-5xl"
			>
				The only way to try-on <br /><span class="keyword">
					&nbsp;<span class="typewriter"></span>
				</span> from your browser.
			</p>
			<p class="mx-auto max-w-lg text-center text-xl font-light text-muted-foreground">
				Sign up for our waitlist to know when we launch
			</p>
			<div class="relative mx-auto flex w-fit max-w-md pb-4">
				<DialogForm></DialogForm>

				<!-- <Input -->
				<!-- 	bind:value={email} -->
				<!-- 	type="email" -->
				<!-- 	placeholder="email" -->
				<!-- 	class="w-full border-primary text-base" -->
				<!-- /> -->
				<!-- <Button disabled={!validateEmail(email)} class="absolute right-0">Submit</Button> -->
			</div>
		</div>
		<div class="mx-auto w-full max-w-4xl rounded-md py-4">
			<div class="mx-auto h-fit w-fit py-6 text-5xl font-medium"><Countdown></Countdown></div>
			<p class="mx-auto max-w-lg text-center text-sm text-muted-foreground">
				Use Vestis to try on millions of fashion items at <span class="font-bold text-accent"
					>20,000+</span
				> of the world’s biggest fashion brands & retailers
			</p>
		</div>
	</div>
</section>
<section
	bind:offsetHeight={el1}
	class="mx-auto flex h-fit w-full max-w-5xl flex-col items-start justify-center px-8 py-8"
>
	<Separator />
	<h1
		class="mt-4 bg-gradient-to-tr from-muted-foreground to-accent bg-clip-text text-4xl text-transparent"
	>
		Benefits + Video Demo
	</h1>

	<section
		id="feature-page-for-{feature}"
		class="mt-16 grid h-fit w-full grid-cols-5 lg:grid-cols-11"
	>
		<div class="col-span-full mx-auto w-full">
			<div
				class:opacity-100={scrollY > el0 - el1 / 2}
				class:opacity-40={scrollY <= el0 - el1 / 2}
				class:translate-y-0={scrollY > el0 - el1 / 2}
				class:translate-y-12={scrollY <= el0 - el1 / 2}
				class="mx-auto aspect-video w-[90%] overflow-clip rounded-lg bg-black transition-all delay-100 duration-300 ease-out"
			>
				<video src="https://landing.stylar.com/Website-ZaraAlo-June4.mp4" autoplay muted loop
				></video>
			</div>
		</div>
	</section>
</section>
<section
	bind:offsetHeight={el2}
	class="mx-auto flex h-fit w-full max-w-5xl flex-col items-start justify-center px-8 py-8"
>
	<Separator></Separator>
	<h1
		class="mt-4 bg-gradient-to-tr from-muted-foreground to-accent bg-clip-text text-4xl text-transparent"
	>
		Compatibility list
	</h1>

	<section
		id="feature"
		class="relative mt-16 grid h-fit min-h-[40rem] w-full grid-cols-5 pb-28 md:pb-0 lg:grid-cols-11"
	>
		<div></div>
		<div class="col-span-5 mt-12 flex flex-col space-y-4 px-16">
			<div class="flex text-sm">
				<h1 class="font-bold">{feature}</h1>
				<p class="px-2">|</p>
				<h1 class="font-light">{short_desc}</h1>
			</div>
			<p class="text-base text-gray-400">{desc}</p>
			<a class="" href={link}>Learn More</a>
			<div class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
				<div></div>
				<div class="grid grid-cols-2 gap-4">
					<Button class="size-32" variant="secondary">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-chrome"
							><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line
								x1="21.17"
								x2="12"
								y1="8"
								y2="8"
							/><line x1="3.95" x2="8.54" y1="6.06" y2="14" /><line
								x1="10.88"
								x2="15.46"
								y1="21.94"
								y2="14"
							/></svg
						>
					</Button><Button class="size-32" variant="secondary">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-chrome"
							><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line
								x1="21.17"
								x2="12"
								y1="8"
								y2="8"
							/><line x1="3.95" x2="8.54" y1="6.06" y2="14" /><line
								x1="10.88"
								x2="15.46"
								y1="21.94"
								y2="14"
							/></svg
						>
					</Button>
				</div>
			</div>
		</div>
		<div
			bind:offsetHeight={el2_1}
			class="col-span-5 mx-auto mt-8 max-h-96 min-h-96 w-fit px-16 sm:min-h-[30rem] md:relative md:min-h-[40rem] lg:mt-0 lg:max-h-screen"
		>
			<div
				class:opacity-100={(el) => {
					scrollY > el1 + el2 - el2_1 / 2;
				}}
				class:opacity-40={scrollY <= el1 + el2 - el2_1 / 2}
				class:translate-y-0={scrollY > el1 + el2 - el2_1 / 2}
				class:translate-y-12={scrollY <= el1 + el2 - el2_1 / 2}
				class="transition-all delay-100 duration-500 ease-out"
			>
				<Phone></Phone>
			</div>
		</div>
	</section>
</section>

<section
	bind:offsetHeight={el3}
	class="relative flex h-[30rem] w-full flex-col items-center justify-center overflow-clip bg-primary py-24"
>
	<h1
		class="z-30 mx-auto w-fit bg-gradient-to-r from-background/70 to-background/80 bg-clip-text pb-6 font-serif text-6xl font-medium text-transparent"
	>
		Try the demo
	</h1>
	<Button
		variant="secondary"
		on:click={() => {
			goto('/demo');
		}}
		class="z-30">Demo</Button
	>
	<img src="/heima.heic" class=" absolute bottom-0 right-[10%] h-60 w-32 opacity-80" />
	<img src="/heima.heic" class=" absolute bottom-0 left-[30%] h-60 w-32 opacity-80" />
	<img src="/heima.heic" class=" absolute bottom-0 left-[10%] h-60 w-32 opacity-80" />
	<img src="/heima.heic" class=" absolute bottom-0 right-[30%] h-60 w-32 opacity-80" />

	<div class="absolute left-0 top-0 z-20 h-full w-full bg-primary/40"></div>
	<div
		class="absolute left-0 top-0 z-20 h-full w-full bg-gradient-to-t from-background/10 backdrop-blur-sm"
	></div>
</section>
<section class="mx-auto flex h-fit w-full max-w-5xl flex-col items-start justify-center px-8 py-8">
	<Separator></Separator>
	<h1
		class="mt-4 bg-gradient-to-tr from-muted-foreground to-accent bg-clip-text text-4xl text-transparent"
	>
		How we fixed online shopping
	</h1>
</section>
<Caro></Caro>
<section class="relative flex h-fit w-full flex-col items-center justify-end"></section>
<div
	class="mx-auto my-8 grid h-fit w-[90%] max-w-4xl grid-cols-1 rounded-lg bg-gradient-to-b from-primary to-primary/90 p-8 shadow-lg md:grid-cols-2"
>
	<p
		class="border-b-[1px] border-background/20 pb-4 font-serif text-2xl font-light text-background/60 md:border-b-0 md:border-r-[1px] md:pb-0 md:pr-4 md:text-3xl lg:text-4xl"
	>
		Become an early adopter. Access our community.
	</p>

	<div class="my-auto pt-4 md:pl-4 md:pt-0">
		<Label class="text-background/80">Email</Label>
		<Input>ji</Input>
		<div class="h-4"></div>
		<Button variant="secondary">Submit</Button>
	</div>
</div>
<section class="h-fit w-full bg-muted p-8">
	<p class="text-lg font-medium">Vesti Ai</p>
	<p class="text-sm text-muted-foreground">A Virtual tryon company</p>
</section>

<style>
	.animate-in {
		animation: fadeInUp 1s;
	}

	@keyframes fadeInUp {
		0% {
			transform: translateY(100px);
			opacity: 0;
		}
		70% {
			transform: translateY(0);
			opacity: 0.7;
		}
		100% {
			opacity: 1;
		}
	}

	/* Typewriter effect for Rompers, Swimsuits, and Jeans */
	@keyframes typing {
		0.0000%,
		27.3488% {
			content: '';
		}
		1.1395%,
		26.2093% {
			content: 'R';
		}
		2.2791%,
		25.0698% {
			content: 'Ro';
		}
		3.4186%,
		23.9302% {
			content: 'Rom';
		}
		4.5581%,
		22.7907% {
			content: 'Romp';
		}
		5.6977%,
		21.6512% {
			content: 'Rompe';
		}
		6.8372%,
		20.5116% {
			content: 'Romper';
		}
		7.9767%,
		19.3721% {
			content: 'Rompers';
		}

		30.7674%,
		51.2791% {
			content: '';
		}
		31.9070%,
		50.1395% {
			content: 'S';
		}
		33.0465%,
		49.0000% {
			content: 'Sw';
		}
		34.1860%,
		47.8605% {
			content: 'Swi';
		}
		35.3256%,
		46.7209% {
			content: 'Swim';
		}
		36.4651%,
		45.5814% {
			content: 'Swims';
		}
		37.6047%,
		44.4419% {
			content: 'Swimsu';
		}
		38.7442%,
		43.3023% {
			content: 'Swimsui';
		}
		39.8837%,
		42.1628% {
			content: 'Swimsuit';
		}
		41.0233%,
		41.0233% {
			content: 'Swimsuits';
		}

		54.6977%,
		75.2093% {
			content: '';
		}
		55.8372%,
		74.0698% {
			content: 'J';
		}
		56.9767%,
		72.9302% {
			content: 'Je';
		}
		58.1163%,
		71.7907% {
			content: 'Jea';
		}
		59.2558%,
		70.6512% {
			content: 'Jean';
		}
		60.3953%,
		69.5116% {
			content: 'Jeans';
		}
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}

	.typewriter {
		--caret: currentcolor;
	}

	.typewriter::before {
		content: '';
		animation: typing 13.5s infinite;
	}

	.typewriter::after {
		content: '';
		border-right: 1px solid var(--caret);
		animation: blink 0.5s linear infinite;
	}

	.typewriter.thick::after {
		border-right: 1ch solid var(--caret);
	}

	.typewriter.nocaret::after {
		border-right: 0;
	}

	@media (prefers-reduced-motion) {
		.typewriter::after {
			animation: none;
		}

		@keyframes sequencePopup {
			0%,
			100% {
				content: 'Rompers';
			}
			25% {
				content: 'Swimsuits';
			}
			50% {
				content: 'Jeans';
			}
		}

		.typewriter::before {
			content: 'Rompers';
			animation: sequencePopup 12s linear infinite;
		}
	}
</style>
