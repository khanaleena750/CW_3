// Define a name for the cache
const CACHE_NAME = 'my-cache-v1';

// Define the URLs of files to be stored in the cache
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/lesson.js',
  '/js/server.js',
  '/images/slider-img.png',
  '/images/s1.png',
  '/images/s2.png',
  '/images/s5.png',
  '/images/s6.png',
  '/images/s7.png',
  '/images/s8.png',
  '/images/s9.png',
  '/images/s10.png',
  '/images/s11.png',
  '/images/s12.png'
];

// Function to cache external files dynamically
async function cacheExternalFiles() {
  // URLs of external files to be cached dynamically
  const urls = [
    'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js', // Example: Vue library
    // Add more external file URLs here if needed
  ];

  // Open the cache
  const cache = await caches.open(CACHE_NAME);

  // Fetch and cache each external file
  await Promise.all(urls.map(async url => {
    const response = await fetch(url);
    if (response.ok) {
      await cache.put(url, response.clone());
    }
  }));
}

// Listen for service worker installation event
self.addEventListener('install', event => {
  // Cache local files during installation
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  // Cache external files during installation
  event.waitUntil(cacheExternalFiles());
});

// Listen for fetch requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if available
        if (response) {
          return response;
        }

        // Clone the request to avoid consuming it
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response to store a copy in the cache
          const responseToCache = response.clone();

          // Open the cache and store the response
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Listen for service worker activation event (event listener)
self.addEventListener('activate', event => {
  // Define the cache whitelist
  const cacheWhitelist = ['my-cache-v1'];

  // Delete old caches not in the whitelist
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
