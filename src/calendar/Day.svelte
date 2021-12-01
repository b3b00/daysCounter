<script lang="ts">

	import { add } from "date-fns";
	import { onMount } from 'svelte';

	export let date;

	export let type;

	let day = "L";

	let days = ["L", "M", "M", "J", "V", "S", "D"];

	onMount(async () => {
		// TODO : get day from date
		let i = date.getDay();
		i = i - 1;
		if (i < 0) {
			i = 6;
		}
		

		day = days[i];

	});


</script>




<div style="display:flex;flex-direction: row;">


	<div style="display:flex;flex-direction: column;">		
		<span>{day}</span>
	</div>

	<div style="display:flex;flex-direction: column;">
		<span>TODO</span>
	</div>
</div>