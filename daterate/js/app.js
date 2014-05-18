/* file: js/app.js */
define(
    ['localizationManager'],
    function (localizationManager) {
    function DateRateApp() {
        function init() {

            commonData.gender = $('#genderSelect').val();
            language = window.navigator.userLanguage || window.navigator.language;
            language = language.split("-");
            language_root = (language[0]);
            localizationManager.currentLan = language_root;
//				showAlert(language_root,'Root language');
            //firstPageAnimation();

            $(document).bind("pagebeforechange", function (e, data) {

                if (typeof data.toPage[0].id !== "undefined" && data.toPage[0].id != null) {
                    console.log("pagebeforechange - " + data.toPage[0].id);
                    app.pageInit(data.toPage);
                }
                ;
            });



            this.pageInit($("#page1"));
        }

        function start() {
            //download localization
            localizationManager.init($.proxy(init, this));
        }


        function updatePageStyle(page) {

            if (page.attr('data-theme') === "d") {
                return;
            }
            ;
            if (commonData.gender === 'male') {
                page.trigger('refresh', 'b');
                //$('#page4').children().attr('data-theme','b').trigger('refresh');
            }
            else {
                page.trigger('refresh', 'a');
                //$('#page4').children().attr('data-theme','c').trigger('refresh');
            }

        }

        function pageInit(page) {
            page.bind('refresh', function (e, newTheme) {
                /* Default to the "a" theme. */
                var oldTheme = $(this).attr('data-theme') || 'a';
                newTheme = newTheme || 'a';
                element_theme_refresh($(this), oldTheme, newTheme);
                $(this).find('*').each(function () {
                    element_theme_refresh($(this), oldTheme, newTheme);
                });
            });
            this.updatePageStyle(page);
            localizationManager.localizeBlock(page);
        }

        this.start = start;
        this.init = init;
        this.updatePageStyle = updatePageStyle;
        this.pageInit = pageInit;
    }
    if(typeof daterate_global_app === 'undefined'){
        var app = new DateRateApp();
        daterate_global_app = app;
    }
    return daterate_global_app;
});