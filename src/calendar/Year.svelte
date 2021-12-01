<script lang="ts">

	
	import Month from "./Month.svelte";	
	

	export let Year = 2021;

	let monthes = [0,1,2,3,4,5,6,7,8,9,10,11];

	

	let monthTitle = "";

	


</script>

<div>

<h1 style="text-align: center;">{Year}</h1>

<table width="75%">
<tr>
{#each monthes as month}
	<td valign="top">
		<Month Month={month} Year={Year} />
	</td>
{/each}

</tr>

</table>

</div>
