Date Rate
============

The Date Rate is a little rating tool, at first it is specialized to rate a date. 
This is a PhoneGap project optimized for mobile. This project is still in progress, so the code and the functionalities are not finalized. I just doing it for fun in my free time and learning JS.

## Client side

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

## Server side

The server is written in php. Currently it is so simple, that we decided not to use a third party MVC implementation (e.g Zend).

### Architecture

Our architecture based on REST API concept, as a result each .php file is specialized to a given operation using the following abstract schema:

1. Perform the input parameters (POST params or JSON). Optional, only in case of POST és PUT requests.
2. Execute some business logic depending on the inputs (e.g: join db table elements).
3. Create JSON response

### DB architecture

*Define later*

### Communcation protocol

*Define later*
