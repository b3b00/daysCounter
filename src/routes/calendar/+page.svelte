<script lang="ts">


	import { leaveTypes, typecolors } from './types.js';
	import { onMount} from 'svelte';
	import Month from "./Month.svelte";
	import { typeSetter, bankHolidays } from '../store.js';
	import {getBankHolidays} from './bankHolidays.js';


	export let year = 2022;

	

	onMount(async () => {
		let y = new Date().getFullYear();
		year =  new Date().getFullYear();
		let holies = await getBankHolidays(year);		
	});


	let monthes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

</script>

<style>
	typeStyle {
		padding-right: 15px;
		margin-right: 15px;
	}
</style>

<div>

	<h1 style="text-align: center;"><span style="margin-right:25px;cursor: pointer;" on:click={() => {year--;}}>&lt;</span>{year}<span style="margin-left:25px;cursor: pointer;" on:click={() => {year++;}}>&gt;</span></h1>

	<div align="center">
		{#each leaveTypes as currentType, i}
		<!-- {#if i != 0} -->
		<label style="background-color:{typecolors[i]};margin:25px" class="typeStyle">
			{currentType}
			<input type=radio bind:group={$typeSetter} name="scoops" value={currentType} />
		</label>
		<!-- {/if} -->
		{/each}
	</div>

	<table width="75%">
		<tbody>			
			<tr>
				{#each monthes as month}
				<td valign="top">
					<Month Month={month} Year={year}/>
				</td>
				{/each}
			</tr>
		</tbody>
	</table>

</div>