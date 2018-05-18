// Copyright 2016 Google Inc.
// https://github.com/googlecodelabs/your-first-pwapp/blob/master/final/service-worker.js
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

var dataCacheName = 'menu-serve-data-v1';
var cacheName = 'menu-serve-PWA-v1';

var filesToCache = [

    // pages
    '/',
    '/index.html',

    // scripts
    '/scripts/app.js',
    '/scripts/jquery-3.3.1.min.js',
    '/scripts/slick.min.js',

    // styles
    '/styles/app.css',
    '/styles/slick.css',
    '/styles/slick-theme.css', 

    // images
    '/images/home/welcome.jpg',
    '/images/home/1.jpg',
    '/images/home/2.jpg',
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
    console.log('[ServiceWorker] Install');
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

// Activate 
self.addEventListener('activate', function (event) {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});


self.addEventListener('fetch', function (event) {
    console.log('fetch');
});

self.addEventListener('push', function (event) {
    console.log('push');
});