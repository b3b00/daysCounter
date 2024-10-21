import {bankHolidays} from '../store.js';

export const getBankHolidays = async (year) => {
    let url = `https://calendrier.api.gouv.fr/jours-feries/metropole/${year}.json`;
		let res = await fetch(url);
		let json = await res.json();	
		let holidays = Object.keys(json);	
		// $bankHolidays = holidays;
        return holidays;
}