<script lang="ts">

	import { add, format } from "date-fns";
	import { onMount } from 'svelte';
	import { leaves, typeSetter, bankHolidays } from '../store.js';
	import { leaveTypes, typecolors } from './types.js';
	import {getBankHolidays} from './bankHolidays.js';


	let { date: theDate, type: theType } = $props<{date:Date, type:string }>();


	let day = $state("L");

	let number = $state(0);

	let color = $state("#fff")

	let days = ["L", "M", "M", "J", "V", "S", "D"];

	let selectedIds = $state([]);

	let isBankHoliday = $state(false);


	onMount(async () => {

		let i = theDate.getDay();
		number = theDate.getDate();
		i = i - 1;
		if (i < 0) {
			i = 6;
		}

		let year = theDate.getFullYear();
		let holies = await getBankHolidays(year);

		const key = format(theDate,'yyyy-MM-dd');

		isBankHoliday = holies.includes(key);

		day = days[i];
		if (i == 5 || i == 6 || isBankHoliday) {
			color = "#cad0c4"; 
		}	

	});

	const rPad = (str:string, len:number, padding:string):string => {
		let c = len - str.length;
		for (let i = 0; i < c; i++) {
			str = str + padding;
		}
		return str;
	}

	const toggleType = () => {
		if (day != 'S' && day != 'D' && !isBankHoliday) {
			if (theType == $typeSetter) {
				color = "#fff";
				theType= "";
			}
			else {
			let index = leaveTypes.indexOf($typeSetter);
			theType = $typeSetter;
			color = typecolors[index];
			}
		}
	}

	const unset = () => {
		if (day != 'S' && day != 'D' && !isBankHoliday) {
			theType = "";
			color = "#fff";
		}
	}

	const update = (date:Date, type:string) => {
		let newLeaves = $leaves;
		let alreadyHere = newLeaves.some(x => x.Date == date);
		if (type === '' && alreadyHere) {
			newLeaves = newLeaves.filter(x => x.Date != date);
		} else {
			if (alreadyHere) {
				newLeaves = newLeaves.map(x => {
					if (x.Date == date) {
						x.Type = type;
					}
					return x;
				});
			} else {
				newLeaves.push({
					Date: date,
					Type: type
				});
			}
		}
		$leaves = newLeaves;
	}


</script>





<tr>
	<td style="background-color:#cad0c4"  on:click={toggleType} on:contextmenu|preventDefault={unset}>{day}</td>
	<td style="background-color:#878db0" on:click={toggleType} on:contextmenu|preventDefault={unset}>{number}</td>
	<td style="background-color:{color}" on:click={toggleType} on:contextmenu|preventDefault={unset}>{@html rPad(theType,5,'&nbsp;')}</td>
</tr>