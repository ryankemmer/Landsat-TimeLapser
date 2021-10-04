//Removing Preloader
setTimeout(function(){
    var preloader = document.getElementById('preloader')
    if(preloader){preloader.classList.add('preloader-hide');}
},150);

document.addEventListener('DOMContentLoaded', () => {
    'use strict'
    
    //Global Variables
    let isPWA = true;  // Enables or disables the service worker and PWA
    let isAJAX = true; // AJAX transitions. Requires local server or server
    var pwaName = "Nile"; //Local Storage Names for PWA
    var pwaRemind = 1; //Days to re-remind to add to home
    var pwaNoCache = true; //Requires server and HTTPS/SSL. Will clear cache with each visit
    
    //Setting Service Worker Locations scope = folder | location = service worker js location
    var pwaScope = "/";
    var pwaLocation = "/_service-worker.js";
    
    //Place all your custom Javascript functions and plugin calls below this line
    function init_template(){
        //Caching Global Variables
        var i, e, el; //https://www.w3schools.com/js/js_performance.asp
                        
        //Attaching Menu Hider
        var menuHider = document.getElementsByClassName('menu-hider');
        if(!menuHider.length){document.body.innerHTML += '<div class="menu-hider"></div>';}

        //Demo function for programtic creation of Menu
        //menu('menu-settings', 'show', 250);                
        
        //Activating Menus
        document.querySelectorAll('.menu').forEach(el=>{el.style.display='block'})
        
        //Validator
        var inputField = document.querySelectorAll('input');
        if(inputField.length){      
            var mailValidator = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
            var phoneValidator = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
            var nameValidator = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
            var passwordValidator = /[A-Za-z]{2}[A-Za-z]*[ ]?[A-Za-z]*/;
            var numberValidator = /^(0|[1-9]\d*)$/;
            var linkValidator = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
            var textValidator = /[A-Za-z]{2}[A-Za-z]*[ ]?[A-Za-z]*/;

            function valid(el){
                el.parentElement.querySelectorAll('.valid')[0].classList.remove('disabled'); 
                el.parentElement.querySelectorAll('.invalid')[0].classList.add('disabled');
            }
            function invalid(el){
                el.parentElement.querySelectorAll('.valid')[0].classList.add('disabled');
                el.parentElement.querySelectorAll('.invalid')[0].classList.remove('disabled');
            }
            function unfilled(el){
                el.parentElement.querySelectorAll('em')[0].classList.remove('disabled');
                el.parentElement.querySelectorAll('.valid')[0].classList.add('disabled');
                el.parentElement.querySelectorAll('.invalid')[0].classList.add('disabled');
            }
            
            var regularField = document.querySelectorAll('.input-style input:not([type="date"])')
            regularField.forEach(el => el.addEventListener('keyup', e => {
                if(!el.value == ""){
                    el.parentElement.classList.add('input-style-active');
                    el.parentElement.querySelector('em').classList.add('disabled');
                } else {
                    el.parentElement.querySelectorAll('.valid')[0].classList.add('disabled');
                    el.parentElement.querySelectorAll('.invalid')[0].classList.add('disabled');
                    el.parentElement.classList.remove('input-style-active');
                    el.parentElement.querySelector('em').classList.remove('disabled');
                }
            }));   
            
            var regularTextarea = document.querySelectorAll('.input-style textarea')
            regularTextarea.forEach(el => el.addEventListener('keyup', e => {
                if(!el.value == ""){
                    el.parentElement.classList.add('input-style-active');
                    el.parentElement.querySelector('em').classList.add('disabled');
                } else {
                    el.parentElement.classList.remove('input-style-active');
                    el.parentElement.querySelector('em').classList.remove('disabled');
                }
            }));
            
            var selectField = document.querySelectorAll('.input-style select')
            selectField.forEach(el => el.addEventListener('change', e => {
                if(el.value !== "default"){
                    el.parentElement.classList.add('input-style-active');
                    el.parentElement.querySelectorAll('.valid')[0].classList.remove('disabled');
                    el.parentElement.querySelectorAll('.invalid, em, span')[0].classList.add('disabled');
                }  
                if(el.value == "default"){
                    el.parentElement.querySelectorAll('span, .valid, em')[0].classList.add('disabled');
                    el.parentElement.querySelectorAll('.invalid')[0].classList.remove('disabled');
                    el.parentElement.classList.add('input-style-active');
                }
            }));
            
            var dateField = document.querySelectorAll('.input-style input[type="date"]')
            dateField.forEach(el => el.addEventListener('change', e => {
                el.parentElement.classList.add('input-style-active');
                el.parentElement.querySelectorAll('.valid')[0].classList.remove('disabled');
                el.parentElement.querySelectorAll('.invalid')[0].classList.add('disabled');
            }));
            
            var validateField = document.querySelectorAll('.validate-field input, .validator-field textarea');
            if(validateField.length){
                validateField.forEach(el => el.addEventListener('keyup', e => {
                    var getAttribute = el.getAttribute('type');
                    switch(getAttribute){
                        case 'name': nameValidator.test(el.value) ? valid(el) : invalid(el); break;
                        case 'number': numberValidator.test(el.value) ? valid(el) : invalid(el); break;
                        case 'email': mailValidator.test(el.value) ? valid(el) : invalid(el); break;
                        case 'text': textValidator.test(el.value) ? valid(el) : invalid(el); break;
                        case 'url': linkValidator.test(el.value) ? valid(el) : invalid(el); break;
                        case 'tel': phoneValidator.test(el.value) ? valid(el) : invalid(el); break;
                        case 'password': passwordValidator.test(el.value) ? valid(el) : invalid(el); break;
                    }
                    if(el.value === ""){unfilled(el);}
                }));
            }
        }
         
    
        
        //Image Sliders
        var splide = document.getElementsByClassName('splide');
        if(splide.length){            
            var singleSlider = document.querySelectorAll('.single-slider');
            if(singleSlider.length){
                singleSlider.forEach(function(e){
                    var single = new Splide( '#'+e.id, {
                        type:'loop',
                        autoplay:true,
                        interval:4000,
                        perPage: 1,
                    }).mount();
                    var sliderNext = document.querySelectorAll('.slider-next');
                    var sliderPrev = document.querySelectorAll('.slider-prev'); 
                    sliderNext.forEach(el => el.addEventListener('click', el => {single.go('>');}));
                    sliderPrev.forEach(el => el.addEventListener('click', el => {single.go('<');}));
                });
            }
            
            var doubleSlider = document.querySelectorAll('.double-slider');
            if(doubleSlider.length){
                doubleSlider.forEach(function(e){
                     var double = new Splide( '#'+e.id, {
                        type:'loop',
                        autoplay:true,
                        interval:4000,
                        arrows:false,
                        perPage: 2,
                    }).mount();
                });
            }
            
            var trippleSlider = document.querySelectorAll('.tripple-slider');
            if(trippleSlider.length){
                trippleSlider.forEach(function(e){
                     var tripple = new Splide( '#'+e.id, {
                        type:'loop',
                        autoplay:true,
                        padding: {
                            left   :'0px',
                            right: '80px',
                        },
                        interval:4000,
                        arrows:false,
                        perPage: 2,
                        perMove: 1,
                    }).mount();
                });
            }
        }

        //Don't jump on Empty Links
        const emptyHref = document.querySelectorAll('a[href="#"]')
        emptyHref.forEach(el => el.addEventListener('click', e => {
            e.preventDefault();
            return false;
        }));
        
        //Map Page
        var fullMap = document.querySelectorAll('.map-full');
        if(fullMap.length){
            var mapActivator = document.querySelectorAll('.show-map');
            var mapDisabler = document.querySelectorAll('.hide-map');
            mapActivator[0].addEventListener('click',function(e){
               document.getElementsByClassName('card-overlay')[0].classList.add('disabled'); 
               document.getElementsByClassName('card-center')[0].classList.add('disabled'); 
               document.getElementsByClassName('hide-map')[0].classList.remove('disabled'); 
            })
            mapDisabler[0].addEventListener('click',function(e){
               document.getElementsByClassName('card-overlay')[0].classList.remove('disabled'); 
               document.getElementsByClassName('card-center')[0].classList.remove('disabled'); 
               document.getElementsByClassName('hide-map')[0].classList.add('disabled'); 
            })
        }


        
        //To Do List
        var toDoList = document.querySelectorAll('.todo-list a');
        toDoList.forEach(el => el.addEventListener('click', e => {
            el.classList.toggle('opacity-50');
            el.querySelector('i:last-child').classList.toggle('far')
            el.querySelector('i:last-child').classList.toggle('fa')
            el.querySelector('i:last-child').classList.toggle('fa-check-square')
            el.querySelector('i:last-child').classList.toggle('fa-square')
            el.querySelector('i:last-child').classList.toggle('color-green-dark')
        }));
        
        //Setting Sidebar Widths
        var menus = document.querySelectorAll('.menu');
        if(menus.length){
            var menuSidebar = document.querySelectorAll('.menu-box-left, .menu-box-right');
            menuSidebar.forEach(function(e){
                if(e.getAttribute('data-menu-width') === "cover"){
                    e.style.width = '100%'
                } else {
                    e.style.width = (e.getAttribute('data-menu-width')) +'px'
                }
            })
            var menuSheets = document.querySelectorAll('.menu-box-bottom, .menu-box-top, .menu-box-modal');
            menuSheets.forEach(function(e){
                if(e.getAttribute('data-menu-width') === "cover"){
                    e.style.width = '100%'
                    e.style.height = '100%'
                } else {
                    e.style.width = (e.getAttribute('data-menu-width')) +'px'
                    e.style.height = (e.getAttribute('data-menu-height')) +'px'
                }
            })

            //Opening Menus
            var menuOpen = document.querySelectorAll('[data-menu]');
            var wrappers = document.querySelectorAll('.header, #footer-bar, .page-content');

            menuOpen.forEach(el => el.addEventListener('click',e =>{
                //Close Existing Opened Menus 
                const activeMenu = document.querySelectorAll('.menu-active');
                for(let i=0; i < activeMenu.length; i++){activeMenu[i].classList.remove('menu-active');}
                //Open Clicked Menu
                var menuData = el.getAttribute('data-menu');
                document.getElementById(menuData).classList.add('menu-active');
                document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');    
                //Check and Apply Effects
                var menu = document.getElementById(menuData);
                var menuEffect = menu.getAttribute('data-menu-effect');
                var menuLeft = menu.classList.contains('menu-box-left');
                var menuRight = menu.classList.contains('menu-box-right');
                var menuTop = menu.classList.contains('menu-box-top');
                var menuBottom = menu.classList.contains('menu-box-bottom');
                var menuWidth = menu.offsetWidth;
                var menuHeight = menu.offsetHeight;

                if(menuEffect === "menu-push"){
                    var menuWidth = document.getElementById(menuData).getAttribute('data-menu-width');
                    if(menuLeft){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX("+menuWidth+"px)"}}
                    if(menuRight){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX(-"+menuWidth+"px)"}}
                    if(menuBottom){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY(-"+menuHeight+"px)"}}
                    if(menuTop){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY("+menuHeight+"px)"}}
                }
                if(menuEffect === "menu-parallax"){
                    var menuWidth = document.getElementById(menuData).getAttribute('data-menu-width');
                    if(menuLeft){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX("+menuWidth/10+"px)"}}
                    if(menuRight){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX(-"+menuWidth/10+"px)"}}
                    if(menuBottom){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY(-"+menuHeight/5+"px)"}}
                    if(menuTop){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY("+menuHeight/5+"px)"}}
                }
            }));

            //Closing Menus
            const menuClose = document.querySelectorAll('.close-menu, .menu-hider');
            menuClose.forEach(el => el.addEventListener('click',e =>{
                const activeMenu = document.querySelectorAll('.menu-active');
                for(let i=0; i < activeMenu.length; i++){activeMenu[i].classList.remove('menu-active');}
                for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX(-"+0+"px)"}
            }));
        }


        //Back Button
        const backButton = document.querySelectorAll('[data-back-button]');
        if(backButton.length){
            backButton.forEach(el => el.addEventListener('click',e =>{
                e.stopPropagation;
                e.preventDefault;
                window.history.go(-1);
            }));
        }
        

        //Back to Top
        const backToTop = document.querySelectorAll('.back-to-top-icon, .back-to-top-badge, .back-to-top');
            if(backToTop.length){
            backToTop.forEach(el => el.addEventListener('click',e =>{
                window.scrollTo({ top: 0, behavior: `smooth` })
            }));
        }
        
        //Card Extender
        const cards = document.getElementsByClassName('card');
        function card_extender(){
            var headerHeight, footerHeight, headerOnPage;
            var headerOnPage = document.querySelectorAll('.header:not(.header-transparent)')[0];
            var footerOnPage = document.querySelectorAll('#footer-bar')[0];
            
            headerOnPage ? headerHeight = document.querySelectorAll('.header')[0].offsetHeight : headerHeight = 0
            footerOnPage ? footerHeight = document.querySelectorAll('#footer-bar')[0].offsetHeight : footerHeight = 0
            
            for (let i = 0; i < cards.length; i++) {
                if(cards[i].getAttribute('data-card-height') === "cover"){
                    if (window.matchMedia('(display-mode: fullscreen)').matches) {var windowHeight = window.outerHeight;}
                    if (!window.matchMedia('(display-mode: fullscreen)').matches) {var windowHeight = window.innerHeight;}
                    var coverHeight = windowHeight - headerHeight - footerHeight + 'px';
                }
                if(cards[i].hasAttribute('data-card-height')){
                    var getHeight = cards[i].getAttribute('data-card-height');
                    cards[i].style.height= getHeight +'px';
                    if(getHeight === "cover"){
                        var totalHeight = getHeight
                        cards[i].style.height =  coverHeight
                    }
                }
            }
        }
        
        if(cards.length){
            card_extender();
            window.addEventListener("resize", card_extender);
        }  
        
        //Page Highlights
        var highlightData = document.querySelectorAll('[data-change-highlight]');
        highlightData.forEach(el => el.addEventListener('click', e =>{
            var highlight = el.getAttribute('data-change-highlight');
            var pageHighlight = document.querySelectorAll('.page-highlight');
            if(pageHighlight.length){pageHighlight.forEach(function(e){e.remove();});}
            var loadHighlight = document.createElement("link");
            loadHighlight.rel = "stylesheet";
            loadHighlight.className = "page-highlight";
            loadHighlight.type = "text/css";
            loadHighlight.href = 'styles/highlights/highlight_' + highlight +'.css';
            document.getElementsByTagName("head")[0].appendChild(loadHighlight);
            document.body.setAttribute('data-highlight', 'highlight-'+highlight)
            localStorage.setItem(pwaName+'-Highlight', highlight)
        }))
        var rememberHighlight = localStorage.getItem(pwaName+'-Highlight');
        if(rememberHighlight){
            document.body.setAttribute('data-highlight', rememberHighlight);
            var loadHighlight = document.createElement("link");
            loadHighlight.rel = "stylesheet";
            loadHighlight.className = "page-highlight";
            loadHighlight.type = "text/css";
            loadHighlight.href = 'styles/highlights/highlight_' + rememberHighlight +'.css';
            if(!document.querySelectorAll('.page-highlight').length){
                document.getElementsByTagName("head")[0].appendChild(loadHighlight);
                document.body.setAttribute('data-highlight', 'highlight-'+rememberHighlight)
            }
        }

        //Background Gradient Color
        var gradientData = document.querySelectorAll('[data-change-background]');
        gradientData.forEach(el => el.addEventListener('click',e =>{
            var gradient = el.getAttribute('data-change-background');
            document.body.setAttribute('data-gradient', 'body-'+gradient+'');
            localStorage.setItem(pwaName+'-Gradient', gradient)
        }));

        //Set Background and Highlight
        var pageBackground = localStorage.getItem(pwaName+'-Gradient');
        if(pageBackground){document.body.setAttribute('data-gradient', 'body-'+pageBackground+'');}


        //Dark Mode
        const toggleDark = document.querySelectorAll('[data-toggle-theme]');
        function activateDarkMode(){
            document.body.classList.add('theme-dark');
            document.body.classList.remove('theme-light', 'detect-theme');
            for(let i = 0; i < toggleDark.length; i++){toggleDark[i].checked="checked"};
            localStorage.setItem(pwaName+'-Theme', 'dark-mode');
        }
        function activateLightMode(){
            document.body.classList.add('theme-light');
            document.body.classList.remove('theme-dark','detect-theme');
            for(let i = 0; i < toggleDark.length; i++){toggleDark[i].checked=false};
            localStorage.setItem(pwaName+'-Theme', 'light-mode');
        }
        function removeTransitions(){var falseTransitions = document.querySelectorAll('.btn, .header, #footer-bar, .menu-box, .menu-active'); for(let i = 0; i < falseTransitions.length; i++) {falseTransitions[i].style.transition = "all 0s ease";}}
        function addTransitions(){var trueTransitions = document.querySelectorAll('.btn, .header, #footer-bar, .menu-box, .menu-active'); for(let i = 0; i < trueTransitions.length; i++) {trueTransitions[i].style.transition = "";}}

        function setColorScheme() {
            const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
            const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches
            const isNoPreference = window.matchMedia("(prefers-color-scheme: no-preference)").matches
            window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && activateDarkMode())
            window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && activateLightMode())
            if(isDarkMode) activateDarkMode();
            if(isLightMode) activateLightMode();
        }

        //Activating Dark Mode
        const darkModeSwitch = document.querySelectorAll('[data-toggle-theme]')
        darkModeSwitch.forEach(el => el.addEventListener('click',e =>{
            if(document.body.className == "theme-light"){ removeTransitions(); activateDarkMode();} 
            else if(document.body.className == "theme-dark"){ removeTransitions(); activateLightMode();}
            setTimeout(function(){addTransitions();},350);
        }));

        //Set Color Based on Remembered Preference. 
        if(localStorage.getItem(pwaName+'-Theme') == "dark-mode"){for(let i = 0; i < toggleDark.length; i++){toggleDark[i].checked="checked"};document.body.className = 'theme-dark';}
        if(localStorage.getItem(pwaName+'-Theme') == "light-mode"){document.body.className = 'theme-light';} if(document.body.className == "detect-theme"){setColorScheme();}

        //Detect Dark/Light Mode
        const darkModeDetect = document.querySelectorAll('.detect-dark-mode');
        darkModeDetect.forEach(el => el.addEventListener('click',e =>{    
            document.body.classList.remove('theme-light', 'theme-dark');
            document.body.classList.add('detect-theme')
            setTimeout(function(){setColorScheme();},50)
        }))


        //Accordion Rotate
        const accordionBtn = document.querySelectorAll('.accordion-btn');
        if(accordionBtn.length){
            accordionBtn.forEach(el => el.addEventListener('click', event => {
                el.querySelector('i:last-child').classList.toggle('fa-rotate-180');
            }));
        }

        //File Upload
        const inputArray = document.getElementsByClassName('upload-file');
        if(inputArray.length){
            inputArray[0].addEventListener('change',prepareUpload,false);
                function prepareUpload(event){
                  if (this.files && this.files[0]) {
                  var img = document.getElementById('image-data');
                  img.src = URL.createObjectURL(this.files[0]); 
              }
                const files = event.target.files;
                const fileName = files[0].name;
                document.getElementsByClassName('file-data')[0].classList.add('disabled');
                document.getElementsByClassName('upload-file-data')[0].classList.remove('disabled');
                document.getElementsByClassName('upload-file-name')[0].innerHTML = files[0].name;
                document.getElementsByClassName('upload-file-modified')[0].innerHTML = files[0].lastModifiedDate;
                document.getElementsByClassName('upload-file-size')[0].innerHTML = files[0].size/1000+'kb';
                document.getElementsByClassName('upload-file-type')[0].innerHTML = files[0].type;
            }

        }
        var locationBut = document.querySelectorAll('.get-location');
        if(locationBut.length){
            var locationSupport = document.getElementsByClassName('location-support')[0]
            if (typeof(locationSupport) != 'undefined' && locationSupport != null){
                //Geo Location    
                if ("geolocation" in navigator){
                    locationSupport.innerHTML = 'Your browser and device <strong class="color-green2-dark">support</strong> Geolocation.';
                }else{
                    locationSupport.innerHTML = 'Your browser and device <strong class="color-red2-dark">support</strong> Geolocation.';
                }
            }
            function geoLocate() {
                const locationCoordinates = document.querySelector('.location-coordinates');
                function success(position) {
                    const latitude  = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    locationCoordinates.innerHTML = '<strong>Longitude:</strong> ' + longitude + '<br><strong>Latitude:</strong> '+ latitude;
                    var mapL1 = 'https://maps.google.com/maps?q=';
                    var mapL2 = latitude+',';
                    var mapL3 = longitude;
                    var mapL4 = '&z=18&t=h&output=embed'
                    var mapL5 = '&z=18&t=h'
                    var mapLinkEmbed = mapL1 + mapL2 + mapL3 + mapL4;
                    var mapLinkAddress = mapL1 + mapL2 + mapL3 + mapL5;
                    document.getElementsByClassName('location-map')[0].setAttribute('src',mapLinkEmbed);
                    document.getElementsByClassName('location-button')[0].setAttribute('href',mapLinkAddress);
                    document.getElementsByClassName('location-button')[0].classList.remove('disabled');
                }
                function error() {locationCoordinates.textContent = 'Unable to retrieve your location';}
                if (!navigator.geolocation) {locationCoordinates.textContent = 'Geolocation is not supported by your browser';}
                else {locationCoordinates.textContent = 'Locating';navigator.geolocation.getCurrentPosition(success, error);}
            }
            var getLocation = document.getElementsByClassName('get-location')[0]
            if (typeof(getLocation) != 'undefined' && getLocation != null){
                getLocation.addEventListener('click',function(){this.classList.add('disabled'); geoLocate();})
            }
        }

        //Card Effects
        const cardScale = document.querySelectorAll('.card-scale');
        if(cardScale.length){
            cardScale.forEach(el => el.addEventListener('mouseenter', event => {el.querySelectorAll('img')[0].classList.add('card-scale-image');}));  
            cardScale.forEach(el => el.addEventListener('mouseleave', event => {el.querySelectorAll('img')[0].classList.remove('card-scale-image');}));
        }

        const cardHide = document.querySelectorAll('.card-hide');
        if(cardHide.length){
            cardHide.forEach(el => el.addEventListener('mouseenter', event => {el.querySelectorAll('.card-center, .card-bottom, .card-top, .card-overlay')[0].classList.add('card-hide-image');}));  
            cardHide.forEach(el => el.addEventListener('mouseleave', event => {el.querySelectorAll('.card-center, .card-bottom, .card-top, .card-overlay')[0].classList.remove('card-hide-image');}));
        }

        const cardRotate = document.querySelectorAll('.card-rotate');
        if(cardRotate.length){
            cardRotate.forEach(el => el.addEventListener('mouseenter', event => {el.querySelectorAll('img')[0].classList.add('card-rotate-image');}));  
            cardRotate.forEach(el => el.addEventListener('mouseleave', event => {el.querySelectorAll('img')[0].classList.remove('card-rotate-image');}));
        }

        const cardGray = document.querySelectorAll('.card-grayscale');
        if (cardGray.length){
            cardGray.forEach(el => el.addEventListener('mouseenter', event => {el.querySelectorAll('img')[0].classList.add('card-grayscale-image');}));  
            cardGray.forEach(el => el.addEventListener('mouseleave', event => {el.querySelectorAll('img')[0].classList.remove('card-grayscale-image');}));
        }

        const cardBlur = document.querySelectorAll('.card-blur');
        if(cardBlur.length){
            cardBlur.forEach(el => el.addEventListener('mouseenter', event => {el.querySelectorAll('img')[0].classList.add('card-blur-image');}));  
            cardBlur.forEach(el => el.addEventListener('mouseleave', event => {el.querySelectorAll('img')[0].classList.remove('card-blur-image');}));
        }

        //Adding Local Storage for Visited Links
        var checkVisited = document.querySelectorAll('.check-visited');
            if(checkVisited.length){
            function check_visited_links(){
                var visited_links = JSON.parse(localStorage.getItem(pwaName+'_Visited_Links')) || [];
                var links = document.querySelectorAll('.check-visited a');
                for (let i = 0; i < links.length; i++) {
                    var that = links[i];
                    that.addEventListener('click',function(e){
                        var clicked_url = this.href;
                        if (visited_links.indexOf(clicked_url)==-1) {
                            visited_links.push(clicked_url);
                            localStorage.setItem(pwaName+'_Visited_Links', JSON.stringify(visited_links));
                        }
                    })
                    if (visited_links.indexOf(that.href)!== -1) { 
                        that.className += ' visited-link';
                    }
                }
            }
            check_visited_links();
        }


        //Scroll Ads
        var scrollItems = document.querySelectorAll('.scroll-ad, .header-auto-show')
        if(scrollItems.length){
            var scrollAd = document.querySelectorAll('.scroll-ad');
            var scrollHeader = document.querySelectorAll('.header-auto-show');
            window.addEventListener('scroll', function() {
                if (document.querySelectorAll('.scroll-ad, .header-auto-show').length) {
                    function showScrollAd(){scrollAd[0].classList.add('scroll-ad-visible');}
                    function hideScrollAd(){scrollAd[0].classList.remove('scroll-ad-visible');}
                    function showHeader(){scrollHeader[0].classList.add('header-active');}
                    function hideHeader(){scrollHeader[0].classList.remove('header-active');}
                    var window_height = window.outerWidth;
                    var total_scroll_height = document.documentElement.scrollTop
                    let inside_header = total_scroll_height <= 150;
                    var passed_header = total_scroll_height >= 150;
                    let inside_footer = (window_height - total_scroll_height + 1000) <= 150
                    if(scrollAd.length){
                        inside_header ? hideScrollAd() : null
                        passed_header ? showScrollAd() : null
                        inside_footer ? hideScrollAd() : null
                    }
                    if(scrollHeader.length){
                        inside_header ? hideHeader() : null
                        passed_header ? showHeader() : null
                    }
                }
            });
        }

        //Stepper
        var stepperAdd = document.querySelectorAll('.stepper-add');
        var stepperSub = document.querySelectorAll('.stepper-sub');
        if(stepperAdd.length){
            stepperAdd.forEach(el => el.addEventListener('click', event => {
                var currentValue = el.parentElement.querySelector('input').value 
                el.parentElement.querySelector('input').value = +currentValue + 1
            }))

            stepperSub.forEach(el => el.addEventListener('click', event => {
                var currentValue = el.parentElement.querySelector('input').value 
                el.parentElement.querySelector('input').value = +currentValue - 1
            }))
        }

        //Link List Toggle
        var linkListToggle = document.querySelectorAll('[data-trigger-switch]:not([data-toggle-theme])');
        if(linkListToggle.length){
            linkListToggle.forEach(el => el.addEventListener('click', event => {
                var switchData = el.getAttribute('data-trigger-switch');
                var getCheck = document.getElementById(switchData);
                getCheck.checked ? getCheck.checked = false : getCheck.checked = true;
            }))
        }
        
        //Classic Toggle
        var classicToggle = document.querySelectorAll('.classic-toggle');
        if(classicToggle.length){
            classicToggle.forEach(el => el.addEventListener('click', event=>{
                el.querySelector('i:last-child').classList.toggle('fa-rotate-180');
                el.querySelector('i:last-child').style.transition = "all 250ms ease"
            }))
        }

        //Toasts
        var toastTrigger = document.querySelectorAll('[data-toast]');
        if(toastTrigger.length){
            toastTrigger.forEach(el => el.addEventListener('click', event => {
                var toastData = el.getAttribute('data-toast')
                var notificationToast = document.getElementById(toastData);
                var notificationToast = new bootstrap.Toast(notificationToast);
                notificationToast.show();
            }));
        }
        

        //Tooltips
        /*Deprecated feature for Mobiles. Requires popper.min.js v2 to work
        var tooltips = document.querySelectorAll('[data-bs-tooltip]');
        if(tooltips.length){
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
              return new bootstrap.Tooltip(tooltipTriggerEl)
            })
        }
        */


        //Dropdown
        var dropdownElementList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'))
        if(dropdownElementList.length){
            var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
            return new bootstrap.Dropdown(dropdownToggleEl);
            })
        }


        var workingHours = document.querySelectorAll('.show-business-opened, .show-business-closed, .working-hours');
        if(workingHours.length){
            //Working Hours
            var d = new Date();
            var n = d.getDay();
            var now = d.getHours() + "." + d.getMinutes();
            var weekdays = [
                ["Sunday"],
                ["Monday", 9.00, 17.00],
                ["Tuesday", 9.00, 17.00],
                ["Wednesday", 9.00, 17.00],
                ["Thursday", 9.00, 17.00],
                ["Friday", 9.00, 17.00],
                ["Saturday", 9.00, 13.00] // we are closed, sorry!
            ];
            var day = weekdays[n];
            var openClass = document.querySelectorAll('.show-business-opened');
            var closeClass = document.querySelectorAll('.show-business-closed');

            if (now > day[1] && now < day[2] || now > day[3] && now < day[4]) {
                openClass.forEach(function(e){e.classList.remove('disabled');})
                closeClass.forEach(function(e){e.classList.add('disabled');})
            }
             else {
                openClass.forEach(function(e){e.classList.add('disabled');})
                closeClass.forEach(function(e){e.classList.remove('disabled');})
            }

            var workingHours = document.querySelectorAll('.working-hours[data-day]');
            workingHours.forEach(function(entry) {
                var matchDay = entry.getAttribute('data-day');
                if (matchDay === day[0]){
                    var matchData = '[data-day="'+day[0]+'"]'
                    if (now > day[1] && now < day[2] || now > day[3] && now < day[4]) {
                        document.querySelectorAll(matchData)[0].classList.add('bg-green-dark');
                        document.querySelectorAll(matchData +' p').forEach(function(whiteText){whiteText.classList.add('color-white')});
                    }
                     else {
                        document.querySelectorAll(matchData)[0].classList.add('bg-red-dark');
                        document.querySelectorAll(matchData +' p').forEach(function(whiteText){whiteText.classList.add('color-white')});
                    }
                }
            });
        }



        //Vibrate API
        var vibrateButton = document.querySelectorAll('[data-vibrate]');
        if(vibrateButton.length){
            var startVibrating = document.getElementsByClassName('start-vibrating')[0];
            var stopVibrating = document.getElementsByClassName('stop-vibrating')[0];

            startVibrating.addEventListener('click',function(){
                var vibrateTime = document.getElementsByClassName('vibrate-demo')[0].value;
                window.navigator.vibrate(vibrateTime);
            })
            stopVibrating.addEventListener('click',function(){
                window.navigator.vibrate(0);
            })
            vibrateButton.forEach(el => el.addEventListener('click',e =>{
                var vibrateTime = el.getAttribute('data-vibrate');
                window.navigator.vibrate(vibrateTime);
            }));
        }

        //Time Ads
        var timedAd = document.querySelectorAll('[data-timed-ad]');
        if(timedAd.length){
            timedAd.forEach(el => el.addEventListener('click',e =>{
                var timedAdTime = el.getAttribute('data-timed-ad');
                var timedAdData = el.getAttribute('data-menu');
                var timedAdTimer = timedAdTime;
                var timerAdFunction = setInterval(function(){
                  if(timedAdTimer <= 1){
                        clearInterval(timerAdFunction);
                        document.getElementById(timedAdData).querySelectorAll('.fa-times')[0].classList.remove('disabled');
                        document.getElementById(timedAdData).querySelectorAll('.close-menu')[0].classList.remove('no-click');
                        document.getElementById(timedAdData).querySelectorAll('span')[0].style.display ="none";
                  } else {
                      //console.log(timedAdTimer);
                  }
                  document.getElementById(timedAdData).querySelectorAll('span')[0].innerHTML = timedAdTimer -= 1;
                }, 1000);   
            }));
        }

        //Auto Show Ads
        var autoAd = document.querySelectorAll('[data-auto-show-ad]');
        if(autoAd.length){
            var autoAdTime = autoAd[0].getAttribute('data-auto-show-ad');
            var timerAdFunction = setInterval(function(){
                if(autoAdTime <= 1)
                {
                    clearInterval(timerAdFunction);
                    var autoAdId = autoAd[0].getAttribute('data-menu');
                    document.getElementById(autoAdId).classList.add('menu-active');
                    var autoAdCloseTime = autoAd[0].getAttribute('data-timed-ad');
                    var downloadTimer = setInterval(function () {
                        if (autoAdCloseTime <= 0) {
                            clearInterval(downloadTimer);
                            document.getElementById(autoAdId).querySelectorAll('.fa-times')[0].classList.remove('disabled');
                            document.getElementById(autoAdId).querySelectorAll('.close-menu')[0].classList.remove('no-click');
                            document.getElementById(autoAdId).querySelectorAll('span')[0].style.display ="none";
                        }
                        document.getElementById(autoAdId).querySelectorAll('span')[0].innerHTML = autoAdCloseTime -= 1;
                    }, 1000);          
                }
                autoAdTime -= 1;
            }, 1000);   
        }

        //Reading Time

        var readingTextDiv = document.querySelectorAll('.reading-progress-text');
        if(readingTextDiv.length){
            var readingWords = readingTextDiv[0].innerHTML.split(' ').length;
            var readingMinutes = Math.floor(readingWords / 250);
            var readingSeconds = readingWords % 60
            document.getElementsByClassName('reading-progress-words')[0].innerHTML = readingWords
            document.getElementsByClassName('reading-progress-time')[0].innerHTML = readingMinutes + ':' + readingSeconds
        }

        //Text Resizer
        var textSizeChanger = document.querySelectorAll('.text-size-changer');
        if(textSizeChanger.length){
            var textSizeIncrease = document.querySelectorAll('.text-size-increase');
            var textSizeDecrease = document.querySelectorAll('.text-size-decrease');
            var textSizeDefault = document.querySelectorAll('.text-size-default');
            textSizeIncrease[0].addEventListener('click',function(){
                textSizeChanger[0].querySelectorAll('*').forEach(function(element) {
                    const getFontSize = window.getComputedStyle(element).fontSize.split("px",2)[0]
                    element.style.fontSize = (+getFontSize +1) +'px';
                });
            })
            textSizeDecrease[0].addEventListener('click',function(){
                textSizeChanger[0].querySelectorAll('*').forEach(function(element) {
                    const getFontSize = window.getComputedStyle(element).fontSize.split("px",2)[0]
                    element.style.fontSize = (+getFontSize -1) +'px';
                });
            })
            textSizeDefault[0].addEventListener('click',function(){
                textSizeChanger[0].querySelectorAll('*').forEach(function(element) {
                    const getFontSize = window.getComputedStyle(element).fontSize.split("px",2)[0]
                    element.style.fontSize = "";
                });
            })
        }

        //QR Generator
        var qr_image = document.querySelectorAll('.qr-image');
        if(qr_image.length){
            var qr_this = window.location.href;
            var qr_auto = document.getElementsByClassName('generate-qr-auto')[0];
            var qr_api_address = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=';
            if(qr_auto){qr_auto.setAttribute('src', qr_api_address+qr_this)        }
            var qr_btn = document.getElementsByClassName('generate-qr-button')[0];
            if(qr_btn){
                qr_btn.addEventListener('click',function(){
                    var get_qr_url = document.getElementsByClassName('qr-url')[0].value;
                    var qr_api_address = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=';
                    var qr_img = '<img class="mx-auto polaroid-effect shadow-l mt-4 delete-qr" width="200" src="'+qr_api_address+get_qr_url+'" alt="img"><p class="font-11 text-center mb-0">'+get_qr_url+'</p>'
                    document.getElementsByClassName('generate-qr-result')[0].innerHTML = qr_img
                    qr_btn.innerHTML = "Generate New Button"
                })
            }
        }

        if (window.location.protocol === "file:"){
            var linksLocal = document.querySelectorAll('a');
            linksLocal.forEach(el => el.addEventListener('mouseover', event => {
               // console.log("You are seeing these errors because your file is on your local computer. For real life simulations please use a Live Server or a Local Server such as AMPPS or WAMPP or simulate a  Live Preview using a Code Editor like http://brackets.io (it's 100% free) - PWA functions and AJAX Page Transitions will only work in these scenarios.");
            }));
        }         
        
        //Search Page
        var searchField = document.querySelectorAll('[data-search]');
        if(searchField.length){
            var searchResults = document.querySelectorAll('.search-results')
            var searchNoResults = document.querySelectorAll('.search-no-results');
            var searchTotal = document.querySelectorAll(".search-results div")[0].childElementCount;
            var searchTrending = document.querySelectorAll('.search-trending');
            function searchFunction(){
                var searchVal = searchField[0].value;
                if (searchVal != '') {
                    searchResults[0].classList.remove('disabled-search-list');
                    var searchFilterItem = document.querySelectorAll('[data-filter-item]');
                    for (let i = 0; i < searchFilterItem.length; i++) {
                        var searchData = searchFilterItem[i].getAttribute('data-filter-name');
                        if(searchData.includes(searchVal)){
                            searchFilterItem[i].classList.remove('disabled');
                            if(searchTrending.length){searchTrending[0].classList.add('disabled');}
                        } else {
                            searchFilterItem[i].classList.add('disabled');
                            if(searchTrending.length){searchTrending[0].classList.remove('disabled');}
                        }
                        var disabledResults = document.querySelectorAll(".search-results div")[0].getElementsByClassName("disabled").length;
                        if(disabledResults === searchTotal){
                            searchNoResults[0].classList.remove('disabled');
                            if(searchTrending.length){searchTrending[0].classList.add('disabled');}
                        } else {
                            searchNoResults[0].classList.add('disabled');
                            if(searchTrending.length){searchTrending[0].classList.add('disabled');}
                        }
                    }
                }
                if (searchVal === '') {
                    searchResults[0].classList.add('disabled-search-list');
                    searchNoResults[0].classList.add('disabled');
                    if(searchTrending.length){searchTrending[0].classList.remove('disabled');}
                }
            };      
            
            searchField[0].addEventListener('keyup', function() {searchFunction();})
            searchField[0].addEventListener('click', function() {searchFunction();})

            var searchClick = document.querySelectorAll('.search-trending a');
            searchClick.forEach(el => el.addEventListener('click', event => {
                var trendingResult = el.querySelectorAll('span')[0].textContent.toLowerCase();
                searchField[0].value  = trendingResult; 
                searchField[0].click();
            }));
            
        }

        //Sharing        
        var shareCheck = document.querySelectorAll('.shareToFacebook, .shareToTwitter, .shareToLinkedIn');
        if(shareCheck.length){
            var share_link = window.location.href;
            var share_title = document.title;
            document.querySelectorAll('.shareToFacebook').forEach( x=> x.setAttribute("href", "https://www.facebook.com/sharer/sharer.php?u="+share_link));
            document.querySelectorAll('.shareToTwitter').forEach( x=> x.setAttribute("href", "http://twitter.com/share?text="+share_link));
            document.querySelectorAll('.shareToPinterest').forEach( x=> x.setAttribute("href", "https://pinterest.com/pin/create/button/?url=" + share_link));
            document.querySelectorAll('.shareToWhatsApp').forEach( x=> x.setAttribute("href", "whatsapp://send?text=" + share_link));
            document.querySelectorAll('.shareToMail').forEach( x=> x.setAttribute("href", "mailto:?body=" + share_link));
            document.querySelectorAll('.shareToLinkedIn').forEach( x=> x.setAttribute("href", "https://www.linkedin.com/shareArticle?mini=true&url="+share_link+"&title="+share_title+"&summary=&source="));
        }
        
        //Contact Form
        var contactForm = document.querySelectorAll('.contact-form');
        if(contactForm.length){
            var form = document.getElementById('contactForm');
            form.onsubmit = function (e) {
                // Stop the regular form submission
                e.preventDefault();

                //Validate Fields
                var nameField = document.getElementById('contactNameField');
                var mailField = document.getElementById('contactEmailField');
                var textField = document.getElementById('contactMessageTextarea');
                var validateMail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if(nameField.value === ''){
                    form.setAttribute('data-form','invalid');
                    nameField.classList.add('border-red-dark');
                    document.getElementById('validator-name').classList.remove('disabled');
                } else {
                    form.setAttribute('data-form','valid');
                    document.getElementById('validator-name').classList.add('disabled');
                    nameField.classList.remove('border-red-dark');
                }
                if(mailField.value === ''){
                    form.setAttribute('data-form','invalid');
                    mailField.classList.add('border-red-dark');
                    document.getElementById('validator-mail1').classList.remove('disabled');
                } else {
                    document.getElementById('validator-mail1').classList.add('disabled');
                    if(!validateMail.test(mailField.value)){
                        form.setAttribute('data-form','invalid');
                        mailField.classList.add('border-red-dark');
                        document.getElementById('validator-mail2').classList.remove('disabled');
                    } else{
                        form.setAttribute('data-form','valid');
                        document.getElementById('validator-mail2').classList.add('disabled');
                        mailField.classList.remove('border-red-dark');
                    }     
                }
                if(textField.value === ''){
                    form.setAttribute('data-form','invalid');
                    textField.classList.add('border-red-dark');
                    document.getElementById('validator-text').classList.remove('disabled');
                } else{
                    form.setAttribute('data-form','valid');
                    document.getElementById('validator-text').classList.add('disabled');
                    textField.classList.remove('border-red-dark')
                }

                if(form.getAttribute('data-form') === 'valid'){
                    document.querySelectorAll('.form-sent')[0].classList.remove('disabled');
                    document.querySelectorAll('.contact-form')[0].classList.add('disabled');
                    // Collect the form data while iterating over the inputs
                    var data = {};
                    for (let i = 0, ii = form.length; i < ii; ++i) {
                        let input = form[i];
                        if (input.name) {
                            data[input.name] = input.value;
                        }
                    }
                    // Construct an HTTP request
                    var xhr = new XMLHttpRequest();
                    xhr.open(form.method, form.action, true);
                    xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
                    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                    // Send the collected data as JSON
                    xhr.send(JSON.stringify(data));
                    // Callback function
                    xhr.onloadend = function (response) {if (response.target.status === 200) {console.log('Form Submitted')}};
                }
            };
        }

        //Collapse Flip Icon
        var collapseBtn = document.querySelectorAll('[data-bs-toggle="collapse"]:not(.no-effect)');
        if(collapseBtn.length){
            collapseBtn.forEach(el => el.addEventListener('click',e =>{
                if(el.querySelectorAll('i').length){
                    el.querySelector('i').classList.toggle('fa-rotate-180')
                };
            }));
        }

        //Tabs
        var tabTrigger = document.querySelectorAll('.tab-controls a');
            if(tabTrigger.length){
            tabTrigger.forEach(function(e){
                if(e.hasAttribute('data-active')){
                    var highlightColor = e.parentNode.getAttribute('data-highlight');
                    e.classList.add(highlightColor);
                    e.classList.add('no-click');
                }
            });
            tabTrigger.forEach(el => el.addEventListener('click',e =>{
                var highlightColor = el.parentNode.getAttribute('data-highlight');
                var tabParentGroup = el.parentNode.querySelectorAll('a');
                tabParentGroup.forEach(function(e){
                    e.classList.remove(highlightColor);
                    e.classList.remove('no-click');
                });
                el.classList.add(highlightColor);
                el.classList.add('no-click');
            }));
        }


        //Extending Menu Functions
        function menu(menuName, menuFunction, menuTimeout){
            setTimeout(function(){
                if(menuFunction === "show"){
                    return document.getElementById(menuName).classList.add('menu-active'),
                    document.querySelectorAll('.menu-hider')[0].classList.add('menu-active')
                } else {
                    return document.getElementById(menuName).classList.remove('menu-active'),
                    document.querySelectorAll('.menu-hider')[0].classList.remove('menu-active')
                }
            },menuTimeout)
        }
        
        var autoActivate = document.querySelectorAll('[data-auto-activate]');
        if(autoActivate.length){
            setTimeout(function(){
                autoActivate[0].classList.add('menu-active');
                menuHider[0].classList.add('menu-active');
            },0);
        }
        
        //Copyright Year
        var copyrightYear = document.getElementById('copyright-year');
        if(copyrightYear){
            var dteNow = new Date(); 
            const intYear = dteNow.getFullYear();
            copyrightYear.textContent = intYear;
        }

        //Check Age
        var checkAge = document.querySelectorAll('.check-age');
        if(checkAge.length){
            checkAge[0].addEventListener('click',function(){
                var dateBirthday = document.querySelectorAll("#date-birth-day")[0].value;
                var dateBirthMonth = document.querySelectorAll("#date-birth-month")[0].value;
                var dateBirthYear = document.querySelectorAll("#date-birth-year")[0].value;
                var age = 18;
                var mydate = new Date();
                mydate.setFullYear(dateBirthYear, dateBirthMonth-1, dateBirthday);

                var currdate = new Date();
                var setDate = new Date();
                setDate.setFullYear(mydate.getFullYear() + age, dateBirthMonth-1, dateBirthday);

                var menuAge = document.querySelectorAll('#menu-age');
                var menuAgeFail = document.querySelectorAll('#menu-age-fail');
                var menuAgeOkay = document.querySelectorAll('#menu-age-okay');

                console.log(currdate);
                console.log(setDate);
                console.log(dateBirthMonth);
                if ((currdate - setDate) > 0){
                    console.log("above 18");
                    menuAge[0].classList.remove('menu-active')
                    menuAgeOkay[0].classList.add('menu-active');
                }else{
                    menuAge[0].classList.remove('menu-active')
                    menuAgeFail[0].classList.add('menu-active');
                }
                return true;
            });
        }


        //Creating Offline Alert Messages
        var addOfflineClasses = document.querySelectorAll('.offline-message');
        if(!addOfflineClasses.length){
            const offlineAlert = document.createElement('p');
            const onlineAlert = document.createElement('p');
            offlineAlert.className = 'offline-message bg-red-dark color-white';
            offlineAlert.textContent = 'No internet connection detected';
            onlineAlert.className = 'online-message bg-green-dark color-white';
            onlineAlert.textContent = 'You are back online';
            document.getElementsByTagName('body')[0].appendChild(offlineAlert);
            document.getElementsByTagName('body')[0].appendChild(onlineAlert);
        }        
        
        //Online / Offline Settings
        //Activating and Deactivating Links Based on Online / Offline State
        function offlinePage(){
            var anchorsDisabled = document.querySelectorAll('a');
            anchorsDisabled.forEach(function(e){
                var hrefs = e.getAttribute('href');
                if(hrefs.match(/.html/)){e.classList.add('show-offline'); e.setAttribute('data-link',hrefs); e.setAttribute('href','#');}
            });
            var showOffline = document.querySelectorAll('.show-offline');
            showOffline.forEach(el => el.addEventListener('click', event => {
                document.getElementsByClassName('offline-message')[0].classList.add('offline-message-active');
                setTimeout(function(){document.getElementsByClassName('offline-message')[0].classList.remove('offline-message-active');},1500)
            }));
        }
        function onlinePage(){
            var anchorsEnabled = document.querySelectorAll('[data-link]');
            anchorsEnabled.forEach(function (e) {
                var hrefs = e.getAttribute('data-link');
                if (hrefs.match(/.html/)) {e.setAttribute('href', hrefs); e.removeAttribute('data-link', '');}
            });
        }

        //Defining Offline/Online Variables
        var offlineMessage = document.getElementsByClassName('offline-message')[0];
        var onlineMessage = document.getElementsByClassName('online-message')[0];


        //Online / Offine Status
        function isOnline(){
            onlinePage(); onlineMessage.classList.add('online-message-active');
            setTimeout(function(){onlineMessage.classList.remove('online-message-active'); },2000)
            console.info( 'Connection: Online'); 
        }

        function isOffline(){
            offlinePage(); offlineMessage.classList.add('offline-message-active');
            setTimeout(function(){offlineMessage.classList.remove('offline-message-active'); },2000)
            console.info( 'Connection: Offline'); 
        }

        var simulateOffline = document.querySelectorAll('.simulate-offline');
        var simulateOnline = document.querySelectorAll('.simulate-online');
        if(simulateOffline.length){
            simulateOffline[0].addEventListener('click',function(){isOffline()});
            simulateOnline[0].addEventListener('click',function(){isOnline()});
        }

        //Check if Online / Offline
        function updateOnlineStatus(event) {var condition = navigator.onLine ? "online" : "offline"; isOnline(); }
        function updateOfflineStatus(event) {isOffline();}
        window.addEventListener('online',  updateOnlineStatus);
        window.addEventListener('offline', updateOfflineStatus);

        //iOS Badge
        const iOSBadge = document.querySelectorAll('.simulate-iphone-badge');
        iOSBadge.forEach(el => el.addEventListener('click',e =>{
            document.getElementsByClassName('add-to-home')[0].classList.add('add-to-home-visible', 'add-to-home-ios');
            document.getElementsByClassName('add-to-home')[0].classList.remove('add-to-home-android');
        }));

        //Android Badge
        const AndroidBadge = document.querySelectorAll('.simulate-android-badge');
        AndroidBadge.forEach(el => el.addEventListener('click',e =>{
            document.getElementsByClassName('add-to-home')[0].classList.add('add-to-home-visible', 'add-to-home-android');
            document.getElementsByClassName('add-to-home')[0].classList.remove('add-to-home-ios');
        }));

        //Remove Add to Home Badge
        const addToHomeBadgeClose = document.querySelectorAll('.add-to-home');
        addToHomeBadgeClose.forEach(el => el.addEventListener('click',e =>{
            document.getElementsByClassName('add-to-home')[0].classList.remove('add-to-home-visible');
        }));

        //Detecting Mobile OS 
        let isMobile = {
            Android: function() {return navigator.userAgent.match(/Android/i);},
            iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
            any: function() {return (isMobile.Android() || isMobile.iOS());}
        };

        const androidDev = document.getElementsByClassName('show-android');
        const iOSDev = document.getElementsByClassName('show-ios');
        const noDev = document.getElementsByClassName('show-no-device');

        if(!isMobile.any()){
            for (let i = 0; i < iOSDev.length; i++) {iOSDev[i].classList.add('disabled');}
            for (let i = 0; i < androidDev.length; i++) {androidDev[i].classList.add('disabled');}
        }
        if(isMobile.iOS()){
            for (let i = 0; i < noDev.length; i++) {noDev[i].classList.add('disabled');}
            for (let i = 0; i < androidDev.length; i++) {androidDev[i].classList.add('disabled');}
        }
        if(isMobile.Android()){
            for (let i = 0; i < iOSDev.length; i++) {iOSDev[i].classList.add('disabled');}
            for (let i = 0; i < noDev.length; i++) {noDev[i].classList.add('disabled');}
        }

                
        //PWA Settings
        if(isPWA === true){ 
            var checkPWA = document.getElementsByTagName('html')[0];
            if(!checkPWA.classList.contains('isPWA')){
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register(pwaLocation, {scope: pwaScope});
                  });
                }    

                //Setting Timeout Before Prompt Shows Again if Dismissed
                var hours = pwaRemind * 24; // Reset when storage is more than 24hours
                var now = Date.now();
                var setupTime = localStorage.getItem(pwaName+'-PWA-Timeout-Value');
                if (setupTime == null) {
                    localStorage.setItem(pwaName+'-PWA-Timeout-Value', now);
                } else if (now - setupTime > hours*60*60*1000) {
                    localStorage.removeItem(pwaName+'-PWA-Prompt')
                    localStorage.setItem(pwaName+'-PWA-Timeout-Value', now);
                }


                const pwaClose = document.querySelectorAll('.pwa-dismiss');
                pwaClose.forEach(el => el.addEventListener('click',e =>{
                    const pwaWindows = document.querySelectorAll('#menu-install-pwa-android, #menu-install-pwa-ios');
                    for(let i=0; i < pwaWindows.length; i++){pwaWindows[i].classList.remove('menu-active');}
                    localStorage.setItem(pwaName+'-PWA-Timeout-Value', now);
                    localStorage.setItem(pwaName+'-PWA-Prompt', 'install-rejected');
                    console.log('PWA Install Rejected. Will Show Again in '+ (pwaRemind)+' Days')
                }));

                //Trigger Install Prompt for Android
                const pwaWindows = document.querySelectorAll('#menu-install-pwa-android, #menu-install-pwa-ios');
                if(pwaWindows.length){
                    if (isMobile.Android()) {        
                        if (localStorage.getItem(pwaName+'-PWA-Prompt') != "install-rejected") {
                            function showInstallPrompt() {
                                setTimeout(function(){
                                    if (!window.matchMedia('(display-mode: fullscreen)').matches) {
                                        console.log('Triggering PWA Window for Android')
                                        document.getElementById('menu-install-pwa-android').classList.add('menu-active');
                                        document.querySelectorAll('.menu-hider')[0].classList.add('menu-active');
                                    }
                                },3500);
                            }
                            var deferredPrompt;
                            window.addEventListener('beforeinstallprompt', (e) => {
                                e.preventDefault();
                                deferredPrompt = e;
                                showInstallPrompt();
                            });
                        } 
                        const pwaInstall = document.querySelectorAll('.pwa-install');
                        pwaInstall.forEach(el => el.addEventListener('click', e => {
                            deferredPrompt.prompt();
                            deferredPrompt.userChoice
                                .then((choiceResult) => {
                                    if (choiceResult.outcome === 'accepted') {
                                        console.log('Added');
                                    } else {
                                        localStorage.setItem(pwaName+'-PWA-Timeout-Value', now);
                                        localStorage.setItem(pwaName+'-PWA-Prompt', 'install-rejected');
                                        setTimeout(function(){
                                            if (!window.matchMedia('(display-mode: fullscreen)').matches) {
                                                document.getElementById('menu-install-pwa-android').classList.remove('menu-active');
                                                document.querySelectorAll('.menu-hider')[0].classList.remove('menu-active');
                                            }
                                        },50);
                                    }
                                    deferredPrompt = null;
                                });
                        }));
                        window.addEventListener('appinstalled', (evt) => {
                            document.getElementById('menu-install-pwa-android').classList.remove('menu-active');
                            document.querySelectorAll('.menu-hider')[0].classList.remove('menu-active');
                        });
                    }  
                    //Trigger Install Guide iOS
                    if (isMobile.iOS()) {
                        if (localStorage.getItem(pwaName+'-PWA-Prompt') != "install-rejected") {
                            setTimeout(function(){
                                if (!window.matchMedia('(display-mode: fullscreen)').matches) {
                                    console.log('Triggering PWA Window for iOS');
                                    document.getElementById('menu-install-pwa-ios').classList.add('menu-active');
                                    document.querySelectorAll('.menu-hider')[0].classList.add('menu-active');
                                }
                            },3500);
                        }
                    }    
                }
            }
            checkPWA.setAttribute('class','isPWA');            
        }
        
        //End of isPWA
        if(pwaNoCache === true){
            caches.delete('workbox-runtime').then(function() {});
            sessionStorage.clear()
            caches.keys().then(cacheNames => {
              cacheNames.forEach(cacheName => {
                caches.delete(cacheName);
              });
            });
        }     
        
        //Lazy Loading
        var lazyLoad = new LazyLoad();
        
        // Check Documentation folder for detailed explanations on
        // Externally loading Javascript files for better performance.
        
        var plugIdent, plugClass, plugMain, plugCall; 
        var plugLoc = "plugins/"
        
        let plugins = [
          {
            id: 'uniqueID', // to detect if loaded and unload if needed
            plug: 'pluginName/plugin.js', // the main plugin javascript file
            call: 'pluginName/pluginName-call.js', // the plugin call functions
            style: 'pluginName/pluginName-style.css', // the plugin stylesheet
            trigger: '.pluginTriggerClass' // the trigger that will activate the loading and initializing of the plugin
          },
          {
            id: 'chart',
            plug: 'charts/charts.js',
            call: 'charts/charts-call-charts.js',
            trigger: '.chart'
          },
          {
            id: 'chart',
            plug: 'charts/charts.js',
            call: 'charts/charts-call-wallet.js',
            trigger: '.wallet-chart'
          },
          {
            id: 'graph',
            plug: 'charts/charts.js',
            call: 'charts/charts-call-graphs.js',
            trigger: '.graph'
          },
          {
            id: 'count',
            plug: 'countdown/countdown.js',
            trigger: '.countdown'
          },
          {
            id: 'gallery',
            plug: 'glightbox/glightbox.js',
            call: 'glightbox/glightbox-call.js',
            style: 'glightbox/glightbox.css',
            trigger: '[data-gallery]'
          },
          {
            id: 'gallery-views',
            plug: 'galleryViews/gallery-views.js',
            trigger: '.gallery-view-controls'
          },
          {
            id: 'filter',
            plug: 'filterizr/filterizr.js',
            call: 'filterizr/filterizr-call.js',
            style: 'filterizr/filterizr.css',
            trigger: '.gallery-filter'
          }
        ];
        

        for (let i = 0; i < plugins.length; i++) {        
            //Remove Previous Calls
            if(document.querySelectorAll('.'+plugins[i].id+'-c').length){document.querySelectorAll('.'+plugins[i].id+'-c')[0].remove();                }   

            //Load Plugins
            var plugTrigger = document.querySelectorAll(plugins[i].trigger)
            if(plugTrigger.length){
                var loadScript = document.getElementsByTagName('script')[1],
                    loadScriptJS = document.createElement('script');
                loadScriptJS.type = 'text/javascript'
                loadScriptJS.className = plugins[i].id+'-p'
                loadScriptJS.src = plugLoc + plugins[i].plug
                loadScriptJS.addEventListener('load',function(){
                    //Once plugin is loaded, load the call.
                    if(plugins[i].call !== undefined){
                        var callFn = document.getElementsByTagName('script')[2],
                            callJS = document.createElement('script');
                        callJS.type = 'text/javascript'
                        callJS.className = plugins[i].id+'-c'
                        callJS.src =  plugLoc + plugins[i].call
                        callFn.parentNode.insertBefore(callJS, callFn);
                    }
                });
                //If plugin doesn't exist, load it
                if(!document.querySelectorAll('.'+plugins[i].id+'-p').length){
                    loadScript.parentNode.insertBefore(loadScriptJS, loadScript);
                } else {
                    //If plugin doesn't exist, only load the call function
                    setTimeout(function(){
                    var loadScript = document.getElementsByTagName('script')[1],
                        loadScriptJS = document.createElement('script');
                    loadScriptJS.type = 'text/javascript'
                    loadScriptJS.className = plugins[i].id+'-c'
                    loadScriptJS.src = plugLoc + plugins[i].call;
                    loadScript.parentNode.insertBefore(loadScriptJS, loadScript);                    
                    },50);
                }
                //If Style doesn't exist in array, don't do anything
                if(plugins[i].style !== undefined){
                    //if style already exists, don't re-add to page.
                    if(!document.querySelectorAll('.'+plugins[i].id+'-s').length){
                        var loadCSS = document.createElement("link");
                        loadCSS.className = plugins[i].id+'-s';
                        loadCSS.rel = "stylesheet";
                        loadCSS.type = "text/css";
                        loadCSS.href = plugLoc + plugins[i].style;
                        document.getElementsByTagName("head")[0].appendChild(loadCSS);
                    }
                }
            }           
        }        
    }
    
    //Fix Scroll for AJAX pages.
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
        
    //End of Init Template
    if(isAJAX === true){
        if(window.location.protocol !== "file:"){
            const options = {
                containers: ["#page"],
                cache:false,
                animateHistoryBrowsing: false,
                plugins: [
                    new SwupPreloadPlugin()
                ],
                linkSelector:'a:not(.external-link):not(.default-link):not([href^="https"]):not([href^="http"]):not([data-gallery])'
            };
            const swup = new Swup(options);    
            document.addEventListener('swup:pageView',(e) => { init_template(); })
        }
    }

    init_template();
});



			function toCelsius(e) {
				var temp =(e * 9/5) + 32;
			
													
													return temp
													}

			function toFahrenheit(e) {
					var temp = (e - 273.15) * (9/5)+32;
								return temp
			}

		//	function toKelvin(e){
		//		document.converter.celsius.value = e - 273.15;
		//		document.converter.fahrenheit.value=((e - 273.15)*9/5)+32;
		//	}
