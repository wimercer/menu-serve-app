﻿// Copyright 2016 Google Inc.
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
        spinner: document.querySelector('.loader')
    };

    var about = document.getElementById('about');

    /*****************************************************************************
     *
     * Event listeners for UI elements
     *
     ****************************************************************************/
    window.onclick = function (event) {
        if (event.target === about) {
            about.style.display = "none";
        }
    } 

    document.getElementById('butGoToHomePage').addEventListener('click', function () {
        // Go Home
        window.location.href = '/'
    });

    document.getElementById('butGoToMenuPage').addEventListener('click', function () {
        // Go to menu
        window.location.href = '/menu.html'
    });

    document.getElementById('butAbout').addEventListener('click', function () {
        about.style.display = "block";
    });

    document.getElementsByClassName("close")[0].addEventListener('click', function () {
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
            app.isLoading = false;
        }

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
    
    /*****************************************************************************
     *
     * Methods for dealing with the model
     *
     ****************************************************************************/

    // something
    
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