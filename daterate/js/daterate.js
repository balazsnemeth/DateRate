require.config({
    baseUrl: "js",
    paths: {
        jquery: 'util/jquery-1.9.1.min',
        jquerymobile: 'util/jquery.mobile.min',
        fastclick: 'util/fastclick',
        handlebars: 'util/handlebars'
    }
});
require(['app'], function (app) {
    app.start();
});




