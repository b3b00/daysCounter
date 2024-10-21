import { writable } from 'svelte/store';
import type { Writable } from "svelte/store"
import type { Leave } from './calendar/types';

export const netStatus = writable(true);

export const typeSetter = writable("");

export const bankHolidays:Writable<{[year:string]:string[]}>  = writable({});


const createWritableStore = <T>(key:string, startValue:T) => {
  const { subscribe, set, update } = writable(startValue);

    return {
    subscribe,
    update,
    set,
    useLocalStorage: () => {
      console.log(`reading ${key}`);
      const json = localStorage.getItem(key);
      if (json) {
        if (json !== 'undefined') {
          var parsed = JSON.parse(json);
          set(parsed);
        }
      }

      subscribe(current => {
        console.log(`saving ${key} : ${current}`);
        localStorage.setItem(key, JSON.stringify(current));
      });
    }
  };
}
  
export const leaves = createWritableStore<Leave[]>('leaves',[]);


export function SetLeave(date:string, type:string ) {
  return leaves.update(days => {
    let t = days.map(d => {
      if (d.date == date) {
        return null;
      }
      return d;
    }).filter(d => d != null);
    t.push({date,type});
    return t;
  })
}

export function UnsetLeave(date: string) {
  return leaves.update(days => {
    let t = days.map(d => {
      if (d.date == date) {
        return null;
      }
      return d;
    }).filter(d => d != null);
    return t;
  })
}



  