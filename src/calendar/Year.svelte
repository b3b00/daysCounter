<script lang="ts">


	import { leaveTypes, typecolors } from './types.js';
	import { onMount } from 'svelte';
	import Month from "./Month.svelte";
	import { typeSetter, bankHolidays } from '../store.js';
	import {getBankHolidays} from './bankHolidays.js';


	export let year = 2022;

	let monthes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];




	onMount(async () => {		
		let holies = await getBankHolidays(year);		
	});





</script>

<style>
	typeStyle {
		padding-right: 15px;
		margin-right: 15px;
	}
</style>

<div>


	<div align="center">
		{#each leaveTypes as currentType, i}
		{#if i != 0}
		<label style="background-color:{typecolors[i]};margin:25px" class="typeStyle">
			{currentType.label}
			<input type=radio bind:group={$typeSetter} name="scoops" value={currentType.type} />
		</label>
		{/if}
		{/each}
	</div>

	<table width="75%">

		<tr>
			{#each monthes as month}
			<td valign="top">
				<Month Month={month} Year={year}/>
			</td>
			{/each}

		</tr>


	</table>

</div>