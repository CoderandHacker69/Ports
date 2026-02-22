const CACHE_NAME = 'slice-master-v1';
const ASSETS = [
  './offline.html',
  './styles.css',
  './playcanvas-stable.min.js',
  './settings.js',
  './modules.js',
  './start.js',
  './loading.js',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/jquery@3.6.3/dist/jquery.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./offline.html');
        }
      });
    })
  );
});
