<script>

import {calculateDays} from './time.js'

	export let name;

	export let startDate;

	export let endDate;

export let days = ["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"]

	export let opening = [true, true, true, true, true, true, false];

	export let opened = [true, true, true, true, true, false, false];

	let openedSum = 0;

	let openingSum = 0;

	const Calculate = () => {
		console.log(startDate);
		console.log(endDate);		
		const d = calculateDays(new Date(startDate),new Date(endDate),days, opened,opening);
		openedSum = d.opened;
		openingSum = d.opening;
	}



</script>

<style>
	/* main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	} */
</style>


<div>
	<h1>Période</h1>

	<div style="display:flex;flex-direction: row;">

		
		<div style="display:flex;flex-direction: column;">
			<label for="datStart">Début</label>
			<input id="datStart" type="date" bind:value={startDate} />
		</div>

		<div style="display:flex;flex-direction: column;">
			<label for="datEnd">Fin</label>
			<input id="datEnd" type="date" bind:value={endDate} />
		</div>
	</div>

</div>

<div>
	<h1>Jours</h1>
	<div style="display:flex;flex-direction: row;">
		{#each days as day,index}
		<div style="display:flex;flex-direction: column;">
			<p>{days[index]}</p>
		
			<input type="checkbox" bind:checked={opened[index]}/>
		
			<input type="checkbox" bind:checked={opening[index]}/>
		</div>
		{/each}
	</div>
</div>

<!-- <div>
	{#each days as day,index}
	<div style="display:flex;flex-direction: column;">
		<p>{days[index]} : {opened[index]} / {opening[index]}</p>
	</div>
	{/each}

</div> -->

<button on:click={Calculate}>Calculer</button>




<div>
	<h1>Résultats</h1>
	<div style="display:flex; flex-direction: row;">
		<div style="display: flex;flex-direction: column;">
			<p>OUverts</p>
			<p>{openedSum}</p>
		</div>
		<div style="display: flex;flex-direction: column;">
			<p>Ouvrables</p>
			<p>{openingSum}</p>
		</div>
	</div>
</div>