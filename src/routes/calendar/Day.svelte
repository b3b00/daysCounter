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
		let banks = $bankHolidays
		let y = parseInt(year);
		console.log(`looking for naking days @${y} in `, banks, banks[y], !banks, !banks[y]);
		if (!banks || !banks[y]) {
			console.log(`call banks for ${year} from ${format(theDate,'yyyy-MM-dd')}`,banks)
			let holidays = await getBankHolidays(year);			
			banks[y] = holidays;
			console.log
			$bankHolidays = banks;
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
				theType = "";
			}
			else {

				let i = $leaves.findIndex(x => x.date == key);
				if (i >= 0) {
					let leave = $leaves[i];
					color = getColor(leave.type);
					theType = leave.type;
				}	
				else {
					color = "#fff";
					theType = "";
				}
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

	const getColor = (type: string ) => {
		let index = leaveTypes.indexOf(type);
		let col = typecolors[index];
		return col;
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
				theType = $typeSetter;
				color = getColor($typeSetter);
				setLeave(leaveDay,theType);
			}
		}
		else {
			theType = "";
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