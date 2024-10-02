<script lang="ts">
	import { modal } from '$lib';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Separator } from './ui/select';
	import Textarea from './ui/textarea/textarea.svelte';
	function handleChange(e) {
		$modal = $modal === 'feedback' ? '' : 'feedback';
	}
	import * as Select from '$lib/components/ui/select';
	let topics = ['VTON Generation'];
</script>

<Dialog.Root
	open={$modal === 'feedback'}
	onOutsideClick={() => {
		$modal = '';
	}}
	onOpenChange={handleChange}
>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Feedback</Dialog.Title>
			<div class="grid w-full gap-2">
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="name" class="text-right">Name</Label>
						<Input id="name" value="Pedro Duarte" class="col-span-3" />
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="username" class="text-right">Topic</Label>

						<Select.Root>
							<Select.Trigger class="w-[180px]">
								<Select.Value placeholder="Theme" />
							</Select.Trigger>
							<Select.Content>
								{#each topics as t, i}
									<Select.Item value={i.toString()}>{t}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
				</div>
				<Separator></Separator>
				<Label for="msg" class="mt-2 text-left">Message</Label>

				<Textarea disabled={true} id="msg" class="h-32" placeholder="Type your message here." />
				<p class="text-sm font-light text-muted-foreground">
					You can other users and organizations.
				</p>
				<Button class="mt-4">Send message</Button>
			</div>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
