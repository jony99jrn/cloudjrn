/* Code Vault service worker: makes the app open instantly and work offline.
   Your entries are NOT stored here; they live in IndexedDB (see index.html). */
const CACHE = 'codevault-v2';
const ASSETS = [
  './',
  'index.html',
  'config.js',
  'manifest.webmanifest',
  'vendor/highlight.min.js',
  'vendor/hljs-theme.css',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Show the cached copy immediately, refresh it from the network in the background.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // never touch Supabase calls
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const hit = (await cache.match(req, { ignoreSearch: true })) ||
        (req.mode === 'navigate' ? await cache.match('index.html') : undefined);
      const net = fetch(req).then((res) => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
