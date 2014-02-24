Date Rate
============

The Date Rate is a little rating tool, at first it is specialized to rate a date. 
This is a PhoneGap project optimized for mobile. This project is in progress now, so the code and the functionalities are not finalized. I just doing it for fun in my free time and to learn JS.

### Used technologies

* [jQuery](http://jquery.com/), [jQueryMobile](http://jquerymobile.com)
* [require.js](http://requirejs.org/)
* [fastclick.js](https://github.com/ftlabs/fastclick)
* [handlebars.js](http://handlebarsjs.com/)

### Modules
The app is built from independent JS modules (little manager objects). The modules are defined as AMD (require.js) just like the previous JS libs. The list of the more-or-less completed modules:

1. LocalizationManager - it is responsible for localize a given DOM element, download the localization data and provide services the localization to be managed.

2. RatingManager - it is respionsible for downloading the rating structure, rendering the rate screen based on a static HTML template using Handlebar.

3. StarManager - it is responsilbe for managing the stars. It is responsible for selecting, deselecting stars, animations, fastclick, etc...

4. app.js - to handle the page changes, global configurations (e.g the gender, user language).
