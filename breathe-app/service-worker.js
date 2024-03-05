// service-worker.js
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open("breathe").then(function (cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/src/Components/Timer.css",
        "/scripts/app.js",
        // Add other resources you want cached
      ]);
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
