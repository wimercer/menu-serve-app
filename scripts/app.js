// Copyright 2016 Google Inc.
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


(function () {

    'use strict';

    var app = {

        isLoading: true,
        spinner: document.querySelector('.loader'),
        about: document.getElementById('about'),
        close: document.getElementsByClassName("close")[0],
        slick: document.getElementById('slick'),
        homePageButton: document.getElementById('butGoToHomePage'),
        menuPageButton: document.getElementById('butGoToMenuPage')
    };

    /*****************************************************************************
     *
     * Event listeners for UI elements
     *
     ****************************************************************************/
    window.onclick = function (event) {
        if (event.target === app.about) {
            app.about.style.display = "none";
        }
    }

    if(app.homePageButton !== null) {

        app.homePageButton.addEventListener('click', function () {
            // Go Home page
            window.location.href = '/';
        });
    }

    if (app.menuPageButton !== null) {

        app.menuPageButton.addEventListener('click', function () {
            // Go Menu page
            window.location.href = '/menu.html';
        });
    }

    app.about.addEventListener('click', function () {
        about.style.display = "block";
    });

    app.close.addEventListener('click', function () {
        about.style.display = "none";
    });

    /*****************************************************************************
     *
     * Methods to update/refresh the UI
     *
     ****************************************************************************/

    app.updateView = function (data) {

        if (app.isLoading) {
            app.spinner.setAttribute('hidden', true);

            /* Process stuff here */
            
            app.isLoading = false;
        }

        if (app.slick !== null) {
            $(document).ready(function () {
                $('.slick').slick({
                    dots: true,
                    infinite: true,
                    speed: 800,
                    fade: true,
                    mobileFirst: true,
                    autoplay: true,
                    arrows: false,
                    draggable: true,
                    swipe: true,
                    touchMove: true
                });
            });
        }
    }
    
    /*****************************************************************************
     *
     * Methods for dealing with the model
     *
     ****************************************************************************/
    //caches.open('menu-data').then(function (cache) {
    //    console.log(cache.keys);
    //    return cache;
    //})


    var menuItems = new Vue({
        el: '#menu-items',
        data: {
            menuItems: []
        },
        mounted() {
            this.getMenuData()
        },
        methods: {
            getMenuData() {
                fetch('https://dev-menu-serve-api.azurewebsites.net/api/menu', {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors'
                })
                //.then((response) => response.json())
                .then((responseData) => {
                    console.warn(responseData);
                    return this.responseData;
                })
            }
        }

        
            
            //return fetch('https://dev-menu-serve-api.azurewebsites.net/api/menu', {
            //        method: 'get',
            //        headers: {
            //            'Accept': 'application/json',
            //            'Content-Type': 'application/json'
            //        },
            //        mode: 'cors'
            //    })
            //    // 
            //        .then((response) => response.json())
            //        .then((responseData) => {
            //            console.warn(responseData);
            //            return responseData;
            //        })





                //.then(function (response) {
                //    return response.json();
                //})
                //// 
                //.then(function (jsonMenuData) {
                //    console.log('[Application] Returning menu data');
                //    console.log(jsonMenuData);
                //    return jsonMenuData;
                //})
            //menuItems: [{ id: 1, description: 'blah' }, { id: 2, description: 'more blah'}]
            //}
    })

    //function getvals() {
    //    return fetch('https://dev-menu-serve-api.azurewebsites.net/api/menu',
    //        {
    //            method: "GET",
    //            headers: {
    //                'Accept': 'application/json',
    //                'Content-Type': 'application/json',
    //            },
    //        })
    //        .then((response) => response.json())
    //        .then((responseData) => {
    //            console.warn(responseData);
    //            return responseData;
    //        })
    //        .catch(error => console.warn(error));
    //}

    console.log('[Application] Passing menu data to view');
    console.log(menuItems);

    /************************************************************************
     *
     * Code required to start the app
     *
     ************************************************************************/

    // Register service worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
                // Registration was successful
                console.log('[Application] ServiceWorker registration successful with scope: ', registration.scope);
            }, function (err) {
                // registration failed :(
                console.log('[Application] ServiceWorker registration failed: ', err);
            });
        });
    }

    app.updateView();

})();