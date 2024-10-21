<script lang="ts">

	import { add, format } from "date-fns";
	import { onMount  } from 'svelte';
	import { leaves, typeSetter, bankHolidays, UnsetLeave as unsetLeave, SetLeave as setLeave } from '../store.js';
	import { leaveTypes, typecolors } from './types.js';
	import { getBankHolidays } from "./bankHolidays.js";	


	let { date: theDate, type: theType } = $props<{date:Date, type:string }>();


	let day = $state("L");

	let number = $state(0);

	let color = $state("#fff")

	let days = ["L", "M", "M", "J", "V", "S", "D"];

	let isBankHoliday = $state(false);

	let getBH = async () => {
		let year = theDate.getFullYear();
		if (!$bankHolidays || !$bankHolidays[year+'']) {
			let holidays = await getBankHolidays(year);
			let v:{[year:number]:string[]} = $bankHolidays || {};
			v[year] = holidays;
			bankHolidays.set(v);
		}
		return $bankHolidays[year];
	}


	let display = () => {		
		let i = theDate.getDay();
		number = theDate.getDate();
		i = i - 1;
		if (i < 0) {
			i = 6;
		}

		let year = theDate.getFullYear();
		isBankHoliday = false;
		
		getBH().then(hs => {
			const key = format(theDate,'yyyy-MM-dd');
			if (hs) {
				isBankHoliday = hs.includes(key);
			}
			day = days[i];
			if (i == 5 || i == 6 || isBankHoliday) {
				color = "#cad0c4"; 
			}
			else {
				// TODO 
				color = "#fff";
			}
		});
	}

	onMount(() => {		
		display();
	} );

	$effect(() => {
		let d = theDate;
		let t = theType;
		display();
	})

	const rPad = (str:string, len:number, padding:string):string => {
		let c = len - str.length;
		for (let i = 0; i < c; i++) {
			str = str + padding;
		}
		return str;
	}

	const toggleType = () => {
		const leaveDay = format(theDate,'yyyy-MM-dd');
		if (day != 'S' && day != 'D' && !isBankHoliday) {
			if (theType == $typeSetter) {
				color = "#fff";
				theType= "";
				unsetLeave(leaveDay);
			}
			else {
				let index = leaveTypes.indexOf($typeSetter);
				theType = $typeSetter;
				color = typecolors[index];
				setLeave(leaveDay,theType);
			}
		}
	}

	const unset = () => {
		const leaveDay = format(theDate,'yyyy-MM-dd');
		if (day != 'S' && day != 'D' && !isBankHoliday) {
			theType = "";
			color = "#fff";
			unsetLeave(leaveDay);
		}
	}

	


</script>





<tr>
	<td style="background-color:#cad0c4"  on:click={toggleType} on:contextmenu|preventDefault={unset}>{day}</td>
	<td style="background-color:#878db0" on:click={toggleType} on:contextmenu|preventDefault={unset}>{number}</td>
	<td style="background-color:{color}" on:click={toggleType} on:contextmenu|preventDefault={unset}>{@html rPad(theType,5,'&nbsp;')}</td>
</tr>