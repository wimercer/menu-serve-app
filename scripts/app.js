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
        slick: document.getElementById('slick'),
        about: document.getElementById('about'),

        aboutButton: document.getElementById('aboutButton'),
        closeButton: document.getElementsByClassName("closeButton")[0],
        homePageButton: document.getElementById('butGoToHomePage'),
        menuPageButton: document.getElementById('butGoToMenuPage'),
        categories: document.getElementsByClassName("menu-category-name"),
        allContents: document.getElementsByClassName("menu-category-content")

    };

    /*****************************************************************************
     *
     * Event listeners for UI elements
     *
     ****************************************************************************/
    window.onclick = function (event) {
        if (event.target === app.about) {
            app.aboutButton.style.display = "none";
        }
    }

    window.onload = function () {

        for (let i = 0; i < app.categories.length; i++) {

            app.categories[i].addEventListener('click', function (e) {
                
                // get associated "menu-category-content"
                var content = e.target.nextElementSibling;

                if (content.style.display === "block") {

                    content.style.display = "none";
                    this.classList.toggle('active-menu-category-name');

                } else {

                    // hide all menu-category-contents
                    for (let i = 0; i < app.allContents.length; i++) {
                        app.allContents[i].style.display = "none";
                    }

                    // remove active category content
                    for (let i = 0; i < app.categories.length; i++) {
                        app.categories[i].classList.remove('active-menu-category-name');
                    }

                    // set active category and content
                    this.classList.toggle('active-menu-category-name');

                    // display 'menu-category-content' associated to clicked 'menu-category-name'
                    content.style.display = "block";
                }
            });
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

    app.aboutButton.addEventListener('click', function () {
        about.style.display = "block";
    });

    app.closeButton.addEventListener('click', function () {
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

    // TODO: find a better way to group data on category name

    Vue.component('starters', {
        props: ['item'],
        template: '<div class="menu-item" v-if="item.menuCategory.displayOrder === 1">' +
                    '<div class="short-description">{{ item.shortDescription }}</div>' +
                    '<div class="image">Image</div> <div class="details">{{ item.details }}</div>' +
                    ' <div class="price">£{{ item.price.toFixed(2) }}</div></div>'
    })

    Vue.component('mains', {
        props: ['item'],
        template: '<div class="menu-item" v-if="item.menuCategory.displayOrder === 2">' +
                    '<div class="short-description">{{ item.shortDescription }}</div>' +
                    '<div class="image">Image</div> <div class="details">{{ item.details }}</div>' +
                    ' <div class="price">£{{ item.price.toFixed(2) }}</div></div>'
    })

    Vue.component('deserts', {
        props: ['item'],
        template: '<div class="menu-item" v-if="item.menuCategory.displayOrder === 3">' +
                    '<div class="short-description">{{ item.shortDescription }}</div>' +
                    '<div class="image">Image</div> <div class="details">{{ item.details }}</div>' +
                    ' <div class="price">£{{ item.price.toFixed(2) }}</div></div>'
    })

    Vue.component('sides', {
        props: ['item'],
        template: '<div class="menu-item" v-if="item.menuCategory.displayOrder === 4">' +
                    '<div class="short-description">{{ item.shortDescription }}</div>' +
                    '<div class="image">Image</div> <div class="details">{{ item.details }}</div>' +
                    ' <div class="price">£{{ item.price.toFixed(2) }}</div></div>'
    })

    Vue.component('drinks', {
        props: ['item'],
        template: '<div class="menu-item" v-if="item.menuCategory.displayOrder === 5">' +
                    '<div class="short-description">{{ item.shortDescription }}</div>' +
                    '<div class="image">Image</div> <div class="details">{{ item.details }}</div>' +
                    ' <div class="price">£{{ item.price.toFixed(2) }}</div></div>'
    })

    var menuItems = new Vue({
        el: '#menu-items',
        data: {

            menuItems: []
        },
        created() {

            this.getMenuData()
        },
        methods: {

            getMenuData() {

                // fetch will be caught by service worker
                fetch('https://dev-menu-serve-api.azurewebsites.net/api/menu')
                    .then(response => response.json())
                    .then(json => {
                        this.menuItems = json;
                    });
            }
        }
    })

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