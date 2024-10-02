<script lang="ts">
	import { Shirt, UserRound } from 'lucide-svelte';
	import InputFile from './InputFile.svelte';
	import { Label } from './ui/label';
	import { Button } from './ui/button';

	import { open } from '$lib';
	let garmentFile = [];
	let modelFile = [];
	let filesTotal = 0;
	let processing = false;
	let progress: HTMLElement;
	async function handlePutRequest(filesA, filesB) {
		const vtonId = 'vton_' + crypto.randomUUID();

		// Total number of files to process
		filesTotal = filesA.length + filesB.length;

		// Track processed files
		let garmentProcessedFile = 0;
		let modelProcessedFile = 0;
		processing = true;

		// Create FormData to send all the files in one request
		const formData = new FormData();

		// Append each file from filesA (models) to the FormData
		filesA.forEach((file) => formData.append('model', file));

		// Append each file from filesB (garments) to the FormData
		filesB.forEach((file) => formData.append('garment', file));

		try {
			// Send the formData to your API
			const uploadResponse = await fetch(`/api/files?vtonId=` + vtonId, {
				method: 'PUT',
				body: formData // Send as FormData
			});

			if (uploadResponse.ok) {
				console.log('Files uploaded successfully');

				// Simulate processing of individual files for progress tracking
				const allFiles = [...filesA, ...filesB];

				for (const file of allFiles) {
					// Determine the type of file for progress tracking
					if (filesB.includes(file)) {
						garmentProcessedFile += 1;
					} else {
						modelProcessedFile += 1;
					}

					// Update progress bar for each file after "upload"
					updateProgressBar(garmentProcessedFile, modelProcessedFile, filesTotal);
				}
			} else {
				console.error('Upload failed', uploadResponse.statusText);
			}
		} catch (error) {
			console.error('Error uploading files:', error);
		} finally {
			// Reset state after all uploads are done
			processing = false;
			garmentProcessedFile = 0;
			modelProcessedFile = 0;
			$open = 0;
		}
	}

	function updateProgressBar(garmentProcessed, modelProcessed, totalFiles) {
		const processed = garmentProcessed + modelProcessed;
		const progressPercentage = (processed / totalFiles) * 100;
		if (progress) {
			progress.style.width = `${progressPercentage}%`;
		}
	}

	function handleUpload() {
		if (garmentFile.length > 0 && modelFile.length > 0) {
			processing = true;
			handlePutRequest(garmentFile, modelFile).then(() => {
				$open = 0;
			});
		}
	}
</script>

<!-- File Input Fields for Garment and Model -->
<div class="flex justify-between space-x-2 py-4">
	<div>
		<Label>Model</Label>
		<InputFile bind:chosenFile={modelFile} typeOfFile="model">
			<UserRound
				class="h-7 w-7 scale-100 text-zinc-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95"
			/>
		</InputFile>
	</div>
	<div>
		<Label>Garment</Label>
		<InputFile bind:chosenFile={garmentFile} typeOfFile="garment">
			<Shirt
				class="h-7 w-7 scale-100 text-zinc-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95"
			/>
		</InputFile>
	</div>
</div>

<!-- Progress Bar and Upload Button -->
{#if processing}
	<div class="relative mb-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
		<div
			bind:this={progress}
			class="absolute h-2.5 rounded-full bg-green-600 transition-all duration-200 dark:bg-green-300"
		></div>
	</div>
	<p>Don't close this page</p>
{:else}
	<Button
		class="mx-auto mt-4"
		type="submit"
		on:click={handleUpload}
		disabled={garmentFile.length === 0 || modelFile.length === 0}
	>
		Upload
	</Button>
{/if}
