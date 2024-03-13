const CACHE_NAME = "breathe-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/src/main.tsx",
  "/public/B-144-144.png",
  "/public/B-512-512.png",
];
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open("breathe").then(function (cache) {
      return cache.addAll(["/", "/index.html"]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = ["breathe-v1"];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
