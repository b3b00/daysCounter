<script>

	import { add } from "date-fns";

	export let startDate;

	export let endDate;

	export let days = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]

	export let opening = [true, true, true, true, true, true, false];

	export let opened = [true, true, true, true, true, false, false];

	let openedSum = 0;

	let openingSum = 0;

	let calendarSum = 0;


	export function calculateDays() {

		let oped = 0;
		let oping = 0;
		let cals = 0;
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

		return { opened: oped, opening: oping, calendar: cals };

	}

	const Calculate = () => {
		if (startDate && endDate) {
			const d = calculateDays();			
			openedSum = d.opened;
			openingSum = d.opening;
			calendarSum = d.calendar;
		}
	}



</script>


<div>
	<h1>Période</h1>

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

<div>
	<h1>Jours</h1>

	<div style="display:flex;flex-direction: row;">

		<table>
			<tr style="">
				<td style="border-bottom: 1px dotted black;"></td>
				{#each days as day,index}
				<td align="center" style="border-bottom: 1px dotted black;border-left: 1px dotted black;">{day}</td>
				{/each}
			</tr>
			<tr>
				<td style="text-align: center;">Jours ouvrés</td>
				{#each days as day,index}
				<td align="center" style="border-left: 1px dotted black;">
					<input type="checkbox" bind:checked={opened[index]} on:change={Calculate} />
				</td>
				{/each}
			</tr>
			<tr>
				<td style="text-align: center;">Jours ouvrables</td>
				{#each days as day,index}
				<td align="center" style="border-left: 1px dotted black;">
					<input type="checkbox" bind:checked={opening[index]} on:change={Calculate} />
				</td>
				{/each}
			</tr>

		</table>

	</div>
</div>


<div>
	<h1>Résultats</h1>

	<table>
		<tr>
			<td style="text-align: center;">Calendaires</td>
			<td style="text-align: center;">Ouvrés</td>
			<td style="text-align: center;">Ouvrables</td>
		</tr>
		<tr>
			<td style="text-align: center;">{calendarSum}</td>
			<td style="text-align: center;">{openedSum}</td>
			<td style="text-align: center;">{openingSum}</td>
		</tr>

	</table>
</div>