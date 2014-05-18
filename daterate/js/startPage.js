/**
 * Created by nbalazs on 18/05/14.
 */

define(
    ['ko'],
    function (ko) {
    function StartPage(){
        var model;

        function StartPageViewModel(){
            commonData.name = ko.observable();
            this.genderOptions = ko.observableArray([
                    {
                        "name":'Male',
                        "value":"male"
                    },
                    {
                        "name":'Female',
                        "value":"female"
                    }]
            );
//            this.selectedGender = ko.observable();
            commonData.gender = ko.observable();
        }

        model = new StartPageViewModel();
        ko.applyBindings(model);

        function animate(){
            var itemAnimationStartTimeDifferent = 100;
            $('.startAnimation').each(function (index) {
                console.log(index);
                setTimeout($.proxy(function () {
                    console.log('s' + index);
                    $(this).addClass('transformWidth');
                }, this), index * itemAnimationStartTimeDifferent);
            });
        }

        function attachEvents(){
            $('#createDateRateButton').keypress(function(e){
                if(e.keyCode==13)
                    this.click();
            });
            $("#createDateRateButton").click(function (event) {
                if (commonData.name() === '' || !commonData.name() || typeof commonData.name() === "undefined") {
                    $('#nameTextField').parent().addClass('nonValidTextFiled');
                    var label = $("label[for='nameTextField']");
                    label.addClass('nonValidLabel');
                } else {
                    $('#nameTextField').parent().removeClass('nonValidTextFiled');
                    var label = $("label[for='nameTextField']");
                    label.removeClass('nonValidLabel');
                    $.mobile.changePage("page4.html", { transition: "slide", changeHash: true });
                }
            });

/*            $('#genderSelect').change(function () {
                require(['app'], function (app) {
                    app.updatePageStyle($('[data-role="page"]'));
                });
            });*/
        }

        this.attachEvent = attachEvents;
        this.animate = animate;

    }

    if(typeof daterate_startPage === 'undefined'){
        var startPage = new StartPage();
        daterate_startPage = startPage;
    }
    return daterate_startPage;
});