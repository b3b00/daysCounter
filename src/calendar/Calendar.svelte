<script lang="ts">


	import { leaveTypes, typecolors } from './types.js';
	import { onMount, tick } from 'svelte';
	import Year from "./Year.svelte";

	import { typeSetter, bankHolidays } from '../store.js';
	import {getBankHolidays} from './bankHolidays.js';


	export let year = 2022;

	let monthes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];




	onMount(async () => {
		let y = new Date().getFullYear();
		year =  new Date().getFullYear();
		let holies = await getBankHolidays(Year);
		tick();
	});


	const setYear = (delta) => {
		return () => {

			year = year + delta;			
			tick();
		}
	}

    let component;

</script>

<style>
	typeStyle {
		padding-right: 15px;
		margin-right: 15px;
	}
</style>

<div>

	<h1 style="text-align: center;"><span style="margin-right:25px" on:click={setYear(-1)}>&lt;</span>{Year}<span style="margin-left:25px" on:click={setYear(1)}>&gt;</span></h1>

	<div align="center">
		<Year bind:year={year} bind:this={component}/>
	</div>

	

</div>