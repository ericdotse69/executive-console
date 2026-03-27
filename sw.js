const CACHE_NAME = 'zone69-cache-v3';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Install the Service Worker and cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercept network requests and serve from cache if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached file if found, otherwise fetch from network
        return response || fetch(event.request);
      })
  );
});