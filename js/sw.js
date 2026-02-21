// Service Worker for UNIGATE PWA
const CACHE_NAME = 'unigate-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/unigat.css',
  '/LOGO.png',
  '/fontawesome-free-6.7.2-web/css/all.min.css',
  '/js/home.js',
  '/js/mobile-menu.js',
  '/js/advisor.js'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
