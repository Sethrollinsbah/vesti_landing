<script>
	import '../app.css';
	import { scrollY } from '$lib';
</script>

<div class="fixed left-10 top-10 z-50 text-lg text-white">VestiLogo</div>
<main class="flex h-full w-screen flex-col items-start justify-center">
	<slot></slot>
</main>
