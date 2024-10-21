<script lang="ts">

	import { add, format } from "date-fns";
	import Day from "./Day.svelte";	
	import { onMount } from 'svelte';	
	import { fr } from 'date-fns/locale';


	let { year: theYear, month: theMonth } = $props<{year:number, month:number }>();

	let days:Date[] = $state([]);

	let startDay = $state(new Date());

	let monthTitle = $state("");


	let updateMonth = () => {
		var day = new Date(theYear, theMonth, 1);
		startDay = day;

		let month = day.getMonth();

		monthTitle = format(day, 'MMM', {locale: fr});

		while (month == theMonth) {
			days.push(day);
			day = add(day, { 'days': 1 });
			month = day.getMonth();
		}
		days = days;
	}


	onMount(() => {
		updateMonth();
	});

	// $effect(() => {
	// 	let m = theMonth;
	// 	let y = theYear;
	// 	updateMonth();
	// })


</script>

	
	<table width="100%">
		<tbody>
			<tr><td>{theMonth+1}</td><td colspan="2" style="text-align: center;font-size: large;font-weight: bold;">{monthTitle}</td></tr>
			{#each days as day,index}
				<Day date={day} type=""/>
			{/each}
		</tbody>
	</table>
