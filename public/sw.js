var CACHE_NAME = 'days-counter-20';

var urlsToCache  = [
  './',
  "./index.html",
  "./global.css",  
  "./build/bundle.js",
  "./image/icon512.png",
  "./image/icon256.png",
  "./image/icon128.png",
  "./image/icon64.png",
  "./image/icon32.png",
]

self.addEventListener('install', function(event) {
    console.log('install service worker, initial cache',CACHE_NAME,urlsToCache);
    event.waitUntil(
      caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
    );
    event.waitUntil(
      caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
          if(CACHE_NAME.indexOf(key) === -1) {
            console.log("delete cache "+key);
            return caches.delete(key);
          }
        }));
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
      .then(function(response) {
        return response || fetchAndCache(event.request);
      })
    );
  });
  
  self.addEventListener('activate', (e) => {
    console.log('activate worker for cache '+CACHE_NAME);
    e.waitUntil(
      caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
          if(CACHE_NAME.indexOf(key) === -1) {
            console.log("delete cache "+key);
            return caches.delete(key);
          }
        }));
      })
    );
  });
  
  
  function fetchAndCache(url) {
    return fetch(url)
    .then(function(response) {
      // Check if we received a valid response
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return caches.open(CACHE_NAME)
      .then(function(cache) {
        cache.put(url, response.clone());
        return response;
      });
    })
    .catch(function(error) {
      console.log('Request failed:', error);
      // You could return a custom offline 404 page here
    });
  }