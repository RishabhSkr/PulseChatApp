// 🟢 GREEN BELT: Service Worker for PulseChat PWA
// This file runs in a SEPARATE THREAD from your React app.
// It intercepts ALL network requests and can serve cached responses.

const CACHE_NAME = 'pulsechat-v1';

// Assets to cache immediately when SW installs
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/pulse.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// ─────────────────────────────────────────────
// EVENT 1: INSTALL — Runs once when SW is first registered
// ─────────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );

  // Skip waiting — activate immediately instead of waiting for old tabs to close
  self.skipWaiting();
});

// ─────────────────────────────────────────────
// EVENT 2: ACTIVATE — Runs when SW takes control
// ─────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');

  // Clean up old caches (when you update CACHE_NAME to v2, v3, etc.)
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );

  // Take control of all open tabs immediately
  self.clients.claim();
});

// ─────────────────────────────────────────────
// EVENT 3: FETCH — Intercepts every network request
// ─────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // ❌ SKIP: Don't cache Socket.io or WebSocket connections
  if (
    url.pathname.startsWith('/socket.io') ||
    request.url.includes('socket.io') ||
    request.headers.get('upgrade') === 'websocket'
  ) {
    return; // Let it pass through normally
  }

  // ❌ SKIP: Don't cache API calls (they need fresh data)
  if (url.pathname.startsWith('/api/')) {
    return; // Let API calls go to network normally
  }

  // ❌ SKIP: Don't cache chrome-extension or non-http(s) requests
  if (!request.url.startsWith('http')) {
    return;
  }

  // ✅ CACHE-FIRST: For static assets (JS, CSS, images, HTML)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Found in cache → return immediately (fast!)
        return cachedResponse;
      }

      // Not in cache → fetch from network → cache it for next time
      return fetch(request)
        .then((networkResponse) => {
          // Only cache successful GET responses
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            request.method === 'GET'
          ) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Network failed AND not in cache → show offline page
          if (request.mode === 'navigate') {
            return caches.match('/');
          }
        });
    })
  );
});
