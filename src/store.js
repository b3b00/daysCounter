import { writable } from 'svelte/store';

export const netStatus = writable(true);

export const typeSetter = writable("");


const createWritableStore = (key, startValue) => {
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
  
  export const leaves = createWritableStore('leaves',[]);

  