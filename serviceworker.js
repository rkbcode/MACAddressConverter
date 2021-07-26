const cachePages = ['./index.html','./script.js','./public/style.css']

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open('sw-cache').then(function(cache) {
            return cache.addAll(cachePages);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request)
        })
    )
})