<script>

	import { calculateDays } from './time.js'

	export let startDate;

	export let endDate;

	export let days = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]

	export let opening = [true, true, true, true, true, true, false];

	export let opened = [true, true, true, true, true, false, false];

	let openedSum = 0;

	let openingSum = 0;

	const Calculate = () => {
		if (startDate && endDate) {
			const d = calculateDays(new Date(startDate), new Date(endDate), days, opened, opening);
			console.log(d);
			openedSum = d.opened;
			openingSum = d.opening;
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
			<tr>
				<td></td>
				{#each days as day,index}
				<td align="center">{day}</td>
				{/each}
			</tr>
			<tr>
				<td>Jours ouvrés</td>
				{#each days as day,index}
				<td align="center">
					<input type="checkbox" bind:checked={opened[index]} on:change={Calculate} />
				</td>
				{/each}
			</tr>
			<tr>
				<td>Jours ouvrables</td>
				{#each days as day,index}
				<td align="center">
					<input type="checkbox" bind:checked={opening[index]} on:change={Calculate} />
				</td>
				{/each}
			</tr>

		</table>

	</div>
</div>



<button on:click={Calculate}>Calculer</button>




<div>
	<h1>Résultats</h1>
	<div style="display:flex; flex-direction: row;">
		<div style="display: flex;flex-direction: column;">
			<p>Ouverts</p>
			<p>{openedSum}</p>
		</div>
		<div style="display: flex;flex-direction: column;">
			<p>Ouvrables</p>
			<p>{openingSum}</p>
		</div>
	</div>
</div>