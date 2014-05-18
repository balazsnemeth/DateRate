    require.config({
        baseUrl: "js",
        paths: {
            jquery: 'util/jquery-1.9.1.min',
            jquerymobile: 'util/jquery.mobile.min',
            ko: "util/knockout-3.1.0",
            fastclick: 'util/fastclick',
            handlebars: 'util/handlebars'
        },
        shim: {
            ko: {
                exports: "ko"
            }
        }
    });
    require(['app'], function (app) {
        console.log('a');
        jQuery(document).bind("mobileinit", function () {
            console.log("configuring jqm...");
            jQuery.support.cors = true;
            jQuery.mobile.allowCrossDomainPages = true;

            jQuery.mobile.phonegapNavigationEnabled = true;
            jQuery.mobile.defaultDialogTransition = "pop";
            jQuery.mobile.defaultPageTransition = "none";

            jQuery.mobile.loader.prototype.options.text = "loading";
            jQuery.mobile.loader.prototype.options.textVisible = true;
            jQuery.mobile.loader.prototype.options.theme = "a";
            console.log('b');

            require(['fastclick'], function (fastclick) {
                console.log("fastclick added");
                fastclick.attach(document.body);
            });
            console.log('c');

        });


         $(document).bind("deviceReady", function () {
             console.log("deviceReady");
             navigator.globalization.getLocaleName(
                function (locale) {
                    alert('locale: ' + locale.value + '\n');
                    LocalizationManager.currentLan = locale.value;
                },
                function () {
                     alert('Error getting locale\n');
                 }
             );
             require(['fastclick'], function (fastclick) {
                console.log("fastclick added");
                fastclick.attach(document.body);
            });
         });
        console.log('d');
        app.start();
    });




