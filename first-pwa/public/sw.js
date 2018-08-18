let version = 1;

let arquivos = [
  '/',
  '/index.html',
  '/src/css/app.css',
  '/src/js/app.js'
]

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('webapp-' + version)
      .then(function (cache) {
        cache.addAll(arquivos)
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (res) {
        return res;
      })
  );
});

self.addEventListener("activate", function () {
  caches.open("webapp-" + version).then(cache => {
    cache.addAll(arquivos)
      .then(function () {
        caches.delete("webapp-" + (version - 1))
      })
  })
})