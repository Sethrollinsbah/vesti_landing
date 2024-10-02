<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	export let className = 'ring-4 ring-offset-4 ring-blue';
	let power = true;
	let clume = 0.5;
</script>

<figure
	class={twMerge('HomepageHeroGraphic__phone PhoneGraphic relative', className)}
	style=""
	aria-hidden="true"
>
	<div
		class="absolute left-1/2 top-[10px] z-10 h-[18px] w-[148px] -translate-x-1/2 rounded-b-[1rem] bg-[#f6f9fc]"
	></div>
	<button
		class="duration:75 absolute -left-[3px] top-[124px] h-[46px] w-[3px] rounded-s-lg bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 transition-all active:w-0 active:translate-x-[3px]"
	></button>
	<button
		class="duration:75 absolute -left-[3px] top-[178px] h-[46px] w-[3px] rounded-s-lg bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 transition-all active:w-0 active:translate-x-[3px]"
	></button>
	<button
		on:mousedown={() => (power = !power)}
		on:touchstart={() => (power = !power)}
		class="duration:75 absolute -right-[3px] top-[142px] h-[64px] w-[3px] rounded-e-lg bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 transition-all active:w-0 active:-translate-x-[3px]"
	></button>
	<div class="ApplePaySheet__sheet z-[1]" data-js-target="ApplePaySheet.sheet">
		<div
			class="absolute right-[10px] top-[10px] flex h-[calc(100%-20px)] w-[calc(100%-20px)] flex-col items-center justify-center overflow-clip rounded-3xl bg-gray-400"
		>
			<div
				class:opacity-0={power === false}
				class="absolute right-0 top-0 flex h-full w-full flex-col items-center justify-center overflow-clip rounded-3xl bg-gray-100 transition-all duration-300"
			>
				<video
					class="h-full object-cover"
					src="https://landing.stylar.com/Website-ZaraAlo-June4.mp4"
					autoplay
					loop
					muted
				></video>
			</div>
		</div>
	</div>
</figure>

<style>
	.HomepageHeroGraphic__phone.PhoneGraphic {
		--phoneWidth: 270px;
		--phoneHeight: 536px;
		position: relative;
	}

	.PhoneGraphic {
		--phoneBorderRadius: 36px;
		--phoneScreenBorderRadius: 29px;
		--phoneWidth: 264px;
		--phoneHeight: 533px;
		--phoneGraphicShadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25),
			0 30px 60px -30px rgba(0, 0, 0, 0.3), inset 0 -2px 6px 0 rgba(10, 37, 64, 0.35);
		width: var(--phoneWidth);
		height: var(--phoneHeight);
		padding: 8px;
		border-radius: var(--phoneBorderRadius);
		background: #f6f9fc;
		box-shadow: var(--phoneGraphicShadow);
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
		font-size: 16px;
	}

	.HomepageHeroGraphic__phone.SpaceGrayPhoneGraphic {
		--phoneWidth: 270px;
		--phoneHeight: 536px;
		position: relative;
	}

	.SpaceGrayPhoneGraphic {
		--phoneBorderRadius: 36px;
		--phoneScreenBorderRadius: 29px;
		--phoneWidth: 264px;
		--phoneHeight: 533px;
		--phoneGraphicShadow: 0 50px 100px -20px rgba(0, 0, 0, 0.75),
			0 30px 60px -30px rgba(0, 0, 0, 0.8), inset 0 -2px 6px 0 rgba(0, 0, 0, 0.85);
		width: var(--phoneWidth);
		height: var(--phoneHeight);
		padding: 8px;
		border-radius: var(--phoneBorderRadius);
		background: rgba(30, 38, 44, 1);
		box-shadow: var(--phoneGraphicShadow);
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
		font-size: 16px;
	}
</style>
