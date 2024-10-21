import {bankHolidays} from '../store.js';



export const getBankHolidays = async (year:number):Promise<string[]> => {
    let url = `https://calendrier.api.gouv.fr/jours-feries/metropole/${year}.json`;
		let res = await fetch(url);
		let json = await res.json();
		let holidays = Object.keys(json);
        return holidays;
}