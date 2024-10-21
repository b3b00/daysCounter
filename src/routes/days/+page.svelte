<script lang="ts">

	import { add } from "date-fns";

	let startDate : string|undefined = $state(undefined);

	let endDate : string|undefined = $state(undefined);

	let days = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]

	let opening : boolean[] = $state([true, true, true, true, true, true, false]);

	let opened : boolean[] = $state([true, true, true, true, true, false, false]);

	let openedSum : number  = $state(0);

	let openingSum : number  = $state(0);

	let calendarSum : number  = $state(0);


	export function calculateDays() : {calendar:number;opening:number;opened:number} {
		let oped = 0;
		let oping = 0;
		let cals = 0;
		if (startDate && endDate)  {
			let day = new Date(startDate)
			let end = new Date(endDate)
			while (day <= end) {

				let i = day.getDay();
				i = i - 1;
				if (i < 0) {
					i = 6;
				}
				cals++;
				oped += opened[i] ? 1 : 0;
				oping += opening[i] ? 1 : 0;

				day = add(day, { 'days': 1 });


			}
		}

		return { opened: oped, opening: oping, calendar: cals };

	}

	const Calculate = () => {
		if (startDate && endDate) {
			const d = calculateDays();
			openedSum = d.opened;
			openingSum = d.opening;
			calendarSum = d.calendar;
		};
	}



</script>


<div class="block">
	<h1 class="counterHeader">Période</h1>

	<div style="display:flex;flex-direction: row;">


		<div style="display:flex;flex-direction: column;">
			<label for="datStart">Début</label>
			<input id="datStart" type="date" bind:value={startDate} on:change={Calculate} />
		</div>

		<div style="display:flex;flex-direction: column;">
			<label for="datEnd">Fin</label>
			<input id="datEnd" type="date" bind:value={endDate} on:change={Calculate} />
		</div>
	</div>

</div>

<div class="block">
	<h1 class="counterHeader">Jours</h1>

<div style="display: flex;flex-direction: row;flex-wrap: wrap;">
	<div style="display: flex;flex-direction: column;">
		<span>&nbsp;</span>
		<span style="border-top: 1px dotted black;padding-top: 3px;">Jours ouvrés</span>
		<span style="padding-top: 3px;">Jours ouvrables</span>
	</div>
	{#each days as day,index}
	<div style="border-left: 1px dotted black;display: flex;flex-direction: column;text-align: center;align-content: center;padding-left: 5px;padding-right: 5px;">
		<span>{day}</span>
		<span style="border-top: 1px dotted black;padding-top: 3px;"><input type="checkbox" bind:checked={opened[index]} on:change={Calculate} /></span>
		<span style="padding-top: 3px;"><input type="checkbox" bind:checked={opening[index]} on:change={Calculate} /></span>
	</div>
	{/each}

</div>

	
</div>


<div class="block">
	<h1 class="counterHeader">Résultats</h1>

    <div style="display: flex;flex-direction: row;">
	    <div style="display: flex;flex-direction: column;margin-left: 15px;">
            <span style="text-align: center;">Calendaires</span>
            <span style="text-align: center;">{calendarSum}</span>
        </div>
       
        <div style="display: flex;flex-direction: column;margin-left: 15px;">
            <span style="text-align: center;">Ouvrés</span>
            <span style="text-align: center;">{openedSum}</span>
        </div>
        <div style="display: flex;flex-direction: column;margin-left: 15px;">
            <span style="text-align: center;">Ouvrables</span>
            <span style="text-align: center;">{openingSum}</span>
        </div>
    </div>
</div>