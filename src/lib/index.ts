import { writable } from 'svelte/store';

// place files you want to import through the `$lib` alias in this folder.
export const scrollY = writable<Number>();
export let selectedImage = writable<{ id: string; e: boolean; link: string }>({
  id: '',
  e: false,
  link: ''
});
export let isNightMode = writable<boolean>(false);
export let modal = writable<string>('');
export let ws = writable<string>('');
export let open = writable<Number>(0);
export let obj = writable([
  {
    result: [{ link: '/47d1b09f3943483d86a1a8b7c94bae7b.png' }],
    items: [
      ['1', 'model', '/vladdy.jpg'],
      ['2', 'garment', '/cowboy.png']
    ]
  },
  {
    result: [{ link: '/c02d850efff541d6ba32d595cad587a8.png' }],
    items: [
      ['1', 'model', '/sommerRayFrom2016.png'],
      ['2', 'garment', '/bikini.jpeg']
    ]
  },
  {
    result: [{ link: '/19672f20f63346269345c44f6911b5c3.png' }],
    items: [
      ['1', 'model', '/kamala.jpeg'],
      ['2', 'garment', '/soreal.jpg']
    ]
  }
]);
