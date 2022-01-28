<script lang="ts">

	import { add } from "date-fns";
	import { onMount } from 'svelte';
	import { leaves } from '../store.js';
	

	export let date;

	export let type;

	let day = "L";

	let number = 0;

	let color = "#fff"

	let days = ["L", "M", "M", "J", "V", "S", "D"];

	let availableTypes = ["", "CP", "CPA", "CP-1", "RTT", "RTT-1", "FRAC"];

	let typecolors = ["#fff", "#2ccbc0", "#2ccbc0", "#2ccbc0", "#e0e612", "#e0e612", "#a50123"];

	let selectedIds = [];


	onMount(() => {

		let i = date.getDay();
		number = date.getDate();
		i = i - 1;
		if (i < 0) {
			i = 6;
		}


		day = days[i];
		console.log("DAY", date, day);

	});

	const rPad = (str, len, padding) => {
		let c = len - str.length;
		for (let i = 0; i < c; i++) {
			str = str + padding;
		}
		return str;
	}

	const toggleType = () => {
		let index = availableTypes.indexOf(type);
		index++;
		if (index >= availableTypes.length) {
			index = 0;
		}
		type = availableTypes[index];
		color = typecolors[index];
	}

	const update = (date, type) => {
		let newLeaves = $leaves;
		let alreadyHere = newLeaves.some(x => x.Date() == date);
		if (type === '' && alreadyHere) {
			newLeaves = newLeaves.filter(x => x.Date() != date);
		} else {
			if (alreadyHere) {
				newLeaves = newLeaves.map(x => {
					if (x.Date() == date) {
						x.Type(type);
					}
					return x;
				});
			} else {
				newLeaves.push({
					Date: () => date,
					Type: () => type
				});
			}
		}		
		$leaves = newLeaves;
	}


</script>





<tr>
	
	<td bgcolor="#cad0c4" on:click={toggleType}>{day}</td>
	<td bgcolor="#878db0" on:click={toggleType}>{number}</td>
	<td bgcolor="{color}" on:click={toggleType}>{@html rPad(type,5,'&nbsp;')}</td>
	<!-- {* rPad(type,5,'&nbsp;') *} -->
</tr>