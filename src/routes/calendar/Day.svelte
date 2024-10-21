<script lang="ts">

	import { add, format } from "date-fns";
	import { onMount  } from 'svelte';
	import { leaves, typeSetter, bankHolidays } from '../store.js';
	import { leaveTypes, typecolors } from './types.js';


	let { date: theDate, type: theType } = $props<{date:Date, type:string }>();


	let day = $state("L");

	let number = $state(0);

	let color = $state("#fff")

	let days = ["L", "M", "M", "J", "V", "S", "D"];

	let isBankHoliday = $state(false);


	let display = () => {		
		let i = theDate.getDay();
		number = theDate.getDate();
		i = i - 1;
		if (i < 0) {
			i = 6;
		}

		let year = theDate.getFullYear();
		isBankHoliday = false;
		if ($bankHolidays) {
			const key = format(theDate,'yyyy-MM-dd');
			console.log(`testing ${key} against holidays`,$bankHolidays);
			isBankHoliday = $bankHolidays.includes(key);
		}
		day = days[i];
		console.log(`${theDate} [${i}] => day:>${day}< color:>${color}< number:>${number}<`);
		if (i == 5 || i == 6 || isBankHoliday) {
			color = "#cad0c4"; 
		}
	}

	onMount(() => {		
		if (theDate.getDay() == 0) {
			console.log('DAY ONE '+theDate.getMonth());
			if (bankHolidays) {
				console.log('holidays DAY.ONMOUNT() are ',$bankHolidays);
			}
		}
		display();
	} );

	// $effect(() => {
	// 	let d = theDate;
	// 	let t = theType;
	// 	console.log(`DAY : something has changed ${theDate}, ${theType}`,getHolidays ? getHolidays() : []);
		
	// 	//display();
	// })

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

	


</script>





<tr>
	<td style="background-color:#cad0c4"  on:click={toggleType} on:contextmenu|preventDefault={unset}>{day}</td>
	<td style="background-color:#878db0" on:click={toggleType} on:contextmenu|preventDefault={unset}>{number}</td>
	<td style="background-color:{color}" on:click={toggleType} on:contextmenu|preventDefault={unset}>{@html rPad(theType,5,'&nbsp;')}</td>
</tr>