<script lang="ts">

	import { add } from "date-fns";
	import { onMount } from 'svelte';

	export let date;

	export let type;

	let day = "L";

	let number = 0;

	let days = ["L", "M", "M", "J", "V", "S", "D"];

	onMount(() => {
		
		let i = date.getDay();
		number = date.getDate();
		i = i - 1;
		if (i < 0) {
			i = 6;
		}
		

		day = days[i];
		console.log("DAY",date,day);

	});


</script>





<tr>
	<td>{day}</td>
	<td>{number}</td>
	<td>{type}</td>
</tr>

