// Copyright 2016 Google Inc.
// https://github.com/googlecodelabs/your-first-pwapp/blob/master/final/service-worker.js
// https://developers.google.com/web/fundamentals/primers/service-workers/
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


var appCache = 'menu-serve-PWA-v1';
var appDataCache= 'menu-serve-PWA-data-v1';

var appFilesToCache = [

    // pages
    '/',
    '/index.html',
    '/menu.html',

    // scripts
    '/scripts/app.js',
    '/scripts/jquery-3.3.1.min.js',
    '/scripts/slick.min.js',
    '/vue.min.js',

    // styles
    '/styles/app.css',
    '/styles/slick.css',
    '/styles/slick-theme.css', 

    // images
    '/images/home/1-menu-cover.jpg',
    '/images/home/2-promo.jpg',
    '/images/home/3-promo.jpg',
    '/images/icons/favicon.ico',
    '/images/icons/icons8-for-you-filled-128.png',
    '/images/icons/icons8-for-you-filled-144.png',
    '/images/icons/icons8-for-you-filled-152.png',
    '/images/icons/icons8-for-you-filled-192.png',
    '/images/icons/icons8-for-you-filled-256.png',
    '/images/icons/icons8-for-you-filled-32.png',
    '/images/icons/icons8-for-you-filled-500.png',
    '/images/icons/icons8-info.svg'
];

// Install and cache application files
self.addEventListener('install', function (event) {
    console.log('[ServiceWorker] Installing application...');
    event.waitUntil(
        caches.open(appCache)
            .then(function (cache) {
                console.log('[ServiceWorker] Opened application cache');
                return cache.addAll(appFilesToCache);
            })
    );
});

// Fetch files from cache or server
self.addEventListener('fetch', function (event) {
    console.log('[ServiceWorker] Fetching ' + event.request.url + ' ...');
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    console.log('[ServiceWorker] ...fetched from cache');
                    return response;
                }
                console.log('[ServiceWorker] ...fetched from server');
                return fetch(event.request);
            })
    );
});

// TODO work out why the cache fails
self.addEventListener('activate', function (event) {

    // Caches to handle
    var cacheWhitelist = [appCache, appDataCache];
   
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('[ServiceWorker] Removing ' + cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// TODO
// https://developers.google.com/web/fundamentals/primers/service-workers/

// Activate
self.addEventListener('activate', function (event) {
    console.log('[ServiceWorker] Activate');
});


// Push notifications
self.addEventListener('push', function (event) {
    console.log('[ServiceWorker] Push ' + event.response);
});