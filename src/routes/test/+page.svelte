<script>
    import {onMount} from 'svelte';
export const ssr = false;
export const prerender = false;
export const csr = true;

onMount(() => {
    console.log('mounting test');
})
</script>
<p>hello test route</p>
<p><a href="/">home</a></p>
