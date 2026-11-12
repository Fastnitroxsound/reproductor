const CACHE = 'nitrox-v10';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./','./index.html','./logoaudio.jpeg']))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => { 
  if(e.request.url.includes('itunes.apple.com')) return fetch(e.request); 
  if(e.request.url.startsWith('blob:')) return fetch(e.request);
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); 
});
