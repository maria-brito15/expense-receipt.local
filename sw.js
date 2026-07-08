const CACHE_NAME = "recibo-cache-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./pwa/manifest.json",
  "./pwa/icon-192.png",
  "./pwa/icon-512.png",
  "./pwa/icon-512-maskable.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() =>
        caches
          .match(event.request, { ignoreSearch: true })
          .then((cached) => cached || caches.match("./index.html")),
      ),
  );
});
