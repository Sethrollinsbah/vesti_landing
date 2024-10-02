<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { writable } from 'svelte/store';
	import JSZip from 'jszip';
	import { Download, Eye, Loader } from 'lucide-svelte';

	let loading = false;
	let files: File[] = [];

	const uploadStatus = writable(0);

	async function onChange(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (processing) return;
		loading = true;
		const input = event.currentTarget;
		const file = input.files?.[0] ?? null;
		console.log(file.name);

		if (file) {
			try {
				const zip = await JSZip.loadAsync(file);
				const extractedFiles: File[] = [];

				await Promise.all(
					Object.keys(zip.files).map(async (relativePath) => {
						const zipEntry = zip.files[relativePath];
						const blob = await zipEntry.async('blob');
						const extractedFile = new File([blob], zipEntry.name, {
							type: blob.type
						});
						extractedFiles.push(extractedFile);
					})
				);

				files = [...files, ...extractedFiles];
				console.log('Files:', files); // For debugging, to see the updated files array
			} catch (error) {
				console.error(`Error reading ${file.name}: ${error.message}`);
				const result = document.querySelector('#result');
				if (result) {
					result.innerHTML += `<div class="alert alert-danger">Error reading ${file.name}: ${error.message}</div>`;
				}
			}
		}
		loading = false;
	}
	export let typeOfFile = 'mod';
	export let processing = false;
	let processedFile = writable(0);

	let progress: HTMLElement;

	let filesTotal = 0;
	async function handlePutRequest() {
		processing = true; // Start processing

		filesTotal = files.length;
		const filePromises = files.map(async (file) => {
			try {
				const uploadResponse = await fetch('/api/files' + typeOfFile);
				if (uploadResponse.ok) {
					console.log('File uploaded successfully');
					uploadStatus.set(1); // Update status to indicate successful upload
				} else {
					console.error('Upload failed', uploadResponse.statusText);
					uploadStatus.set(4); // Update status to indicate failure
				}
			} catch (error) {
				console.error('Error:', error);
				uploadStatus.set(4); // Update status to indicate failure
			} finally {
				files = [...files.filter((f) => f.name !== file.name)];
				$processedFile += 1; // Increment the processed file count
				updateProgressBar(); // Update progress bar here
			}
		});

		try {
			await Promise.all(filePromises); // Wait for all file uploads to complete
		} finally {
			processing = false; // Reset processing flag after all files are processed
			$processedFile = 0;
			filesTotal = 0;
		}
	}

	// Function to update the progress bar (assuming you have it defined elsewhere)
	function updateProgressBar() {
		const progressPercentage = ($processedFile / filesTotal) * 100; // Calculate percentage
		progress.style.width = `${progressPercentage}%`; // Update width
	}

	function formatBytes(bytes, decimals = 2) {
		if (!+bytes) return '0 Bytes';
		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
	}

	function removeFile(index: number) {
		files = files.filter((_, i) => i !== index);
	}
	export let chosenFile;
	$: chosenFile = files;
</script>

{#each files as f, index}
	{#if index === 0}
		<div
			class="group relative mt-2 flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-md border border-zinc-300 bg-white shadow-sm transition-all duration-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950"
		>
			<p class="w-full text-sm font-medium text-zinc-500">
				<Download></Download>
				<a href={URL.createObjectURL(f)} target="_blank" class="z-50" rel="noopener noreferrer">
					View {f.name}
				</a>
			</p>
			<button type="button" on:click={() => removeFile(index)} class="peer z-10 text-red-600">
				Remove
			</button>
			<!-- {#if browser} -->
			<!-- 	<Dialog.Trigger asChild let:builder> -->
			<!-- 		<Button -->
			<!-- 			class="absolute bottom-2 right-2 translate-y-16 scale-0 opacity-0 transition-all duration-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100" -->
			<!-- 			builders={[builder]} -->
			<!-- 			size="icon" -->
			<!-- 			variant="outline" -->
			<!-- 		> -->
			<!-- 			<Tooltip.Root> -->
			<!-- 				<Tooltip.Trigger> -->
			<!-- 					<Eye class="size-4 text-muted-foreground" /> -->
			<!-- 				</Tooltip.Trigger> -->
			<!-- 				<Tooltip.Content> -->
			<!-- 					<p>View generation</p> -->
			<!-- 				</Tooltip.Content> -->
			<!-- 			</Tooltip.Root></Button -->
			<!-- 		></Dialog.Trigger -->
			<!-- 	> -->
			<!-- {/if} -->
		</div>
	{/if}
{/each}
{#if files.length === 0}
	<form
		on:submit={async () => {
			toast.promise(handlePutRequest(), {
				success: 'Done',
				error: 'Error',
				loading: 'Loading`'
			});
		}}
		class="relative mt-2 grid h-40 w-full text-sm"
	>
		<div>
			<label
				for="image-upload"
				class="group relative flex h-full cursor-pointer flex-col items-center justify-center rounded-md border border-zinc-300 bg-white shadow-sm transition-all duration-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950"
			>
				{#if files.length === 0}
					<div class="relative z-[5] h-full w-full rounded-md">
						<div
							class="relative z-[3] flex h-full w-full flex-col items-center justify-center rounded-md bg-white px-10 opacity-100 transition-all duration-300 hover:bg-zinc-50 dark:bg-zinc-950"
						>
							{#if loading}
								<Loader class="animate-spin" />
							{:else}
								<slot />
							{/if}
							<p class="mt-2 text-center text-sm text-zinc-500">Click to upload.</p>
							<p class="mt-2 text-center text-sm text-zinc-500">Max file size: 5MB</p>
							<span class="sr-only">Photo upload</span>
						</div>
					</div>
				{:else}
					<div class="h-full w-full overflow-y-scroll">
						{#each files as f, index}
							<div class="flex h-fit w-full flex-col items-center justify-start">
								<div
									class="relative flex w-full items-center justify-between px-2 py-2 ring-1 ring-zinc-200 dark:ring-zinc-800"
								>
									<div class="w-full px-2 py-2 text-start transition-all duration-100">
										<p class="mt-2 text-base font-light text-zinc-700 dark:text-zinc-300">
											{f.name.substring(0, 20) + (f.name.length > 20 ? '...' : '')}
										</p>
										<p class="mt-2 text-sm font-medium text-zinc-500">
											<a href={URL.createObjectURL(f)} target="_blank" rel="noopener noreferrer">
												Open {f.name}
											</a>
											File size: {formatBytes(f.size)}
										</p>
									</div>
									<div
										class="absolute left-0 top-0 h-full w-full opacity-0 backdrop-blur-2xl transition-all duration-100 peer-hover:opacity-100"
									></div>
									<button
										class:hidden={processing}
										disabled={processing}
										type="button"
										on:click={() => removeFile(index)}
										class="peer z-10 text-red-600"
									>
										Remove
									</button>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</label>
			<div class="mt-1 flex rounded-md shadow-sm">
				<input
					id="image-upload"
					disabled={processing}
					name="image-upload"
					type="file"
					accept=".zip"
					class="sr-only"
					on:change={(e) => {
						toast.promise(onChange(e), {
							success: 'Success',
							loading: 'Loading...',
							error: 'Error'
						});
					}}
					on:drop={(e) => {
						toast.promise(onChange(e), {
							success: 'Success',
							loading: 'Loading...',
							error: 'Error'
						});
					}}
					on:dragover={(ev) => ev.preventDefault()}
				/>
			</div>
		</div>
		<!-- {#if processing} -->
		<!-- 	<div class="relative mb-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"> -->
		<!-- 		<div -->
		<!-- 			bind:this={progress} -->
		<!-- 			class="absolute h-2.5 rounded-full bg-green-600 transition-all duration-200 dark:bg-green-300" -->
		<!-- 		></div> -->
		<!-- 	</div> -->
		<!-- 	<p>Don't close this page</p> -->
		<!-- {:else} -->
		<!-- 	<Button class={'mx-auto mt-4'} type="submit" disabled={files.length === 0}>Upload</Button> -->
		<!-- {/if} -->
	</form>
{/if}
