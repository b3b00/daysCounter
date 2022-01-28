<script lang="ts">

	import { add, format } from "date-fns";
	import { onMount } from 'svelte';
	import { leaves, typeSetter, bankHolidays } from '../store.js';
	import { leaveTypes, typecolors } from './types.js';
	import {getBankHolidays} from './bankHolidays.js';

	export let date;

	export let type;


	let day = "L";

	let number = 0;

	let color = "#fff"

	let days = ["L", "M", "M", "J", "V", "S", "D"];

	let selectedIds = [];

	let isBankHoliday = false;


	onMount(async () => {

		let i = date.getDay();
		number = date.getDate();
		i = i - 1;
		if (i < 0) {
			i = 6;
		}

		let year = date.getFullYear();
		let holies = await getBankHolidays(year);

		const key = format(date,'yyyy-MM-dd');

		isBankHoliday = holies.includes(key);

		day = days[i];
		if (i == 5 || i == 6 || isBankHoliday) {
			color = "#cad0c4"; 
		}	

	});

	const rPad = (str, len, padding) => {
		let c = len - str.length;
		for (let i = 0; i < c; i++) {
			str = str + padding;
		}
		return str;
	}

	const toggleType = () => {
		if (day != 'S' && day != 'D' && !isBankHoliday) {
			let index = leaveTypes.indexOf($typeSetter);
			type = $typeSetter;
			color = typecolors[index];
		}
	}

	const unset = () => {
		if (day != 'S' && day != 'D' && !isBankHoliday) {
			type = "";
			color = "#fff";
		}
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
	<td bgcolor="#cad0c4" on:click={toggleType} on:contextmenu|preventDefault={unset}>{day}</td>
	<td bgcolor="#878db0" on:click={toggleType} on:contextmenu|preventDefault={unset}>{number}</td>
	<td bgcolor="{color}" on:click={toggleType} on:contextmenu|preventDefault={unset}>{@html rPad(type,5,'&nbsp;')}</td>
</tr>