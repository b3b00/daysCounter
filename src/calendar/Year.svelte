<script lang="ts">


	import { leaveTypes, typecolors } from './types.js';
	import { onMount} from 'svelte';
	import Month from "./Month.svelte";
	import { typeSetter, bankHolidays } from '../store.js';
	import {getBankHolidays} from './bankHolidays.js';
	import {link} from 'svelte-spa-router'


	export let year = 2022;

	export let params = {};

	let prevYear;
        let prevYearLink;
        let nextYear;
        let nextYearLink;

	onMount(async () => {
		// let y = new Date().getFullYear();
		// year =  new Date().getFullYear();
		let holies = await getBankHolidays(year);	
		prevYear = year - 1;
		nextYear = year + 1;
		prevYearLink = `#/calendar/${prevYear}`;	
		nextYearLink = `#/calendar/${nextYear}`;
	});

	$:{
		console.log('Year.svelte reactived with params:', params);
		year = params.year;
		console.log(`year.reactive ${year}`);		
		prevYear = year - 1;
		nextYear = prevYear + 2;
		prevYearLink = `#/calendar/${prevYear}`;	
		nextYearLink = `#/calendar/${nextYear}`;
	}


	let monthes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

</script>

<style>
	typeStyle {
		padding-right: 15px;
		margin-right: 15px;
	}
</style>

<div>

	<h1 style="text-align: center;"><a style="margin-right:25px;cursor: pointer;" href={prevYearLink}>{prevYear} &lt;</a>{year}<a style="margin-left:25px;cursor: pointer;" href={nextYearLink}>&gt; {nextYear}</a></h1>

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

		<tr>
			{#each monthes as month}
			<td valign="top">				
				<Month Month={month} Year={year}/>
			</td>
			{/each}

		</tr>


	</table>

</div>