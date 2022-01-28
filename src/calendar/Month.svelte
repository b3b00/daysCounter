<script lang="ts">

	import { add, format } from "date-fns";
	import Day from "./Day.svelte";	
	import { onMount } from 'svelte';	
	import { fr } from 'date-fns/locale';

	export let Year = 2021;

	export let Month = 3;

	export let type = "";

	let days = [];

	let startDay = new Date();

	let monthTitle = "";



	onMount(() => {

		var day = new Date(Year, Month, 1);
		startDay = day;

		let month = day.getMonth();

		monthTitle = format(day, 'MMM', {locale: fr});

		while (month == Month) {
			days.push(day);
			day = add(day, { 'days': 1 });			
			month = day.getMonth();
		}
		days = days;

	});


</script>

	
	<table width="100%">
		<tr><td>{Month+1}</td><td colspan="2" style="text-align: center;font-size: large;font-weight: bold;">{monthTitle}</td></tr>
		{#each days as day,index}
		<Day date={day} type="" setter="{type}"/>
		{/each}
	</table>
