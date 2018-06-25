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


var appFilesCacheName = 'menu-serve-v1';
var menuDataCacheName = 'menu-data';
var menuDataURL = 'https://dev-menu-serve-api.azurewebsites.net/api/menu';

var filesToCache = [

    // pages
    '/',
    '/index.html',
    '/menu.html',
    
    // scripts
    '/scripts/app.js',
    '/scripts/jquery-3.3.1.min.js',
    '/scripts/slick.min.js',
    '/scripts/vue.min.js',

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
    '/images/icons/icons8-info.svg',
    '/images/icons/icons8-menu.svg',
    '/images/icons/icons8-home.svg'
];

// Install and cache application files
self.addEventListener('install', function (event) {

    console.log('[ServiceWorker] Installing application...');

    event.waitUntil(
    
        caches.open(appFilesCacheName)
            .then(function (cache) {
                console.log('[ServiceWorker] ...opened cache: ' + appFilesCacheName);
                return cache.addAll(filesToCache);
            }),


        caches.open(menuDataCacheName)
            .then(function (cache) {
                console.log('[ServiceWorker] ...opened cache: ' + menuDataCacheName);
              
                return cache.add(
                    new Request(menuDataURL)
                );
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
                    console.log('[ServiceWorker] ... ' + response.url + ' fetched from cache');
                    return response;
                }
                console.log('[ServiceWorker] ... ' + event.request.url + ' fetched from server');
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', function (event) {

    // Caches to keep
    //var cacheWhitelist = [appFilesCacheName];
    var cacheWhitelist = [appFilesCacheName, menuDataCacheName];

    console.log('[ServiceWorker] Activating...');

    event.waitUntil(

        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    console.log('[ServiceWorker] ...checking: ' + cacheName);
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('[ServiceWorker] ...removing ' + cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }),

        caches.open(menuDataCacheName)
            .then(function (cache) {
                console.log('[ServiceWorker] ...refreshed and opened cache: ' + menuDataCacheName);
              
                return cache.add(
                    new Request(menuDataURL)
                );
            })
    );
});

// TODO:
// https://developers.google.com/web/fundamentals/primers/service-workers/

// Push notifications
self.addEventListener('push', function (event) {
    console.log('[ServiceWorker] Push ' + event.response);
});