import $ from 'dom7';
import Framework7, { getDevice } from 'framework7/bundle';

// Import F7 Styles
import 'framework7/css/bundle';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';

// Import Routes
import routes from './routes.js';
// Import Store
import store from './store.js';

// Import main app component
import App from '../app.f7';

var device = getDevice();
var app = new Framework7({
  name: 'FindersKeepers', // App name
  theme: 'auto', // Automatic theme detection


  el: '#app', // App root element
  component: App, // App main component
  id: 'io.framework7.finderskeepers', // App bundle ID
  // App store
  store: store,
  // App routes
  routes: routes,

  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova,
    scrollIntoViewCentered: device.cordova,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      var startUrl = '/signup/';
      var isLoggedIn = false;
      //var isLoggedIn = store.state.user.isLoggedIn;
      if (isLoggedIn) startUrl = '/';

      //init view
      var mainView = app.views.create('.view-main', {url: startUrl});
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
      
    },
  },
});

// // Assuming you have a form in your HTML with id="signup-form"
// const loginForm = document.getElementById('login-form');

// loginForm.addEventListener('submit', (event) => {
//   event.preventDefault(); // prevent the form from submitting in the default way

//   const formData = new FormData(loginForm);

//   fetch('/login', {
//     method: 'POST',
//     body: formData
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data); // handle the response from the server
//     // You could show a success message, redirect to a new page, etc.
//   })
//   .catch(error => {
//     console.error(error); // handle any errors
//     // You could show an error message to the user, for example.
//   });
// });









 