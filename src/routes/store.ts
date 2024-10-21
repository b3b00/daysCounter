import { writable } from 'svelte/store';
import type { Writable } from "svelte/store"
import type { Leave } from './calendar/types';

export const netStatus = writable(true);

export const typeSetter = writable("");

export const bankHolidays:Writable<string[]>  = writable([]);

const createWritableStore = <T>(key:string, startValue:T) => {
    const { subscribe, set, update } = writable(startValue);
    
      return {
      subscribe,
      update,
      set,
      useLocalStorage: () => {
        const json = localStorage.getItem(key);
        if (json) {
          set(JSON.parse(json));
        }
        
        subscribe(current => {
          localStorage.setItem(key, JSON.stringify(current));
        });
      }
    };
  }
  
  export const leaves:Writable<Leave[]> = createWritableStore<Leave[]>('leaves',[]);

  