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
        spinner: document.querySelector('.loader')
    };

    var about = document.getElementById('about');

    /*****************************************************************************
     *
     * Event listeners for UI elements
     *
     ****************************************************************************/
    window.onclick = function (event) {
        if (event.target == modal) {
            about.style.display = "none";
        }
    } 

    document.getElementById('butMenuPage').addEventListener('click', function () {

        alert('Go to menu page');

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
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function () { console.log('Service Worker Registered'); });
    }

    app.updateView();

})();