/* eslint-env worker */

var cacheName = 'weatherPWA-step-6-1'
var dataCacheName = 'weatherData-v1'
var filesToCache = [
  './',
  './index.html',
  './assets/js/bundle.js',
  './assets/css/style.css'
]

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install')
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[ServiceWorker] Caching app shell')
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate')
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key)
          return caches.delete(key)
        }
      }))
    })
  )
})

self.addEventListener('fetch', (event) => {
  console.log('[ServiceWorker] Fetch', event.request.url)
  var dataUrl = 'http://api.wp-app.org/'
  if (event.request.url.indexOf(dataUrl) === 0) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return caches.open(dataCacheName).then((cache) => {
            cache.put(event.request.url, response.clone())
            console.log('[ServiceWorker] Fetched&Cached Data')
            return response
          })
        })
    )
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request)
      })
    )
  }
})
