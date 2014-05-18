define(
    ['starManager','handlebars'],
    function (starManager,handlebars) {
    function RatingManager() {

        function init(templateName, placeToAppend, callbackFn) {
//      $.mobile.loading('show');
            this.placeToAppend = placeToAppend;
            this.templateName = templateName;
            this.downloadRatingData(callbackFn);
        }

        function hideCategoryAtIndex(index) {
            var category = this.placeToAppend.find(".categories")[0];
            $(category).fadeOut(FADE_TIME, "swing").css("display", "none");
        }

        function renderCategory(index, data) {
            var category = data.categories[index];
            var rendered_html = this.render(this.templateName, category);
            var renderedCategory = $(rendered_html);
            //renderedCategory.css('display',"none");
            renderedCategory.find(".starbody").each(function (i) {
                var MainStarContainer = $(this).children(".MainStarContainer")[0];
                console.log("1. $(MainStarContainer).children().length: " + $(MainStarContainer).children().length);
                var myStarManager = starManager.create();
                if ($(this).children(".MainStarDescription").length > 0) {
                    var MainStarDescription = $(this).children(".MainStarDescription")[0];

                    function starBeforeClicked(starIndex) {
                        $(MainStarDescription).children().filter(function () {
                            return $(this).css("display") == "block"
                        }).css("display", "none");
                        var selectionIndex = 0;
                        if (starIndex >= 2 && starIndex <= 3) {
                            selectionIndex = 1;
                        }
                        else if (starIndex >= 4) {
                            selectionIndex = 2;
                        }
                        var selectedDescription = $($(MainStarDescription).children(".starDescription")[selectionIndex]);
                        selectedDescription.css("display", "block");
                    }

                    myStarManager.addStar($(MainStarContainer), 5, starBeforeClicked);
                }
                else {
                    myStarManager.addStar($(MainStarContainer), 5);
                }
                console.log("2. $(MainStarContainer).children().length: " + $(MainStarContainer).children().length);
            });
            this.placeToAppend.append(renderedCategory).show('slow');
        }

        function insertRatingTamplate(data, callbackFn) {
            console.log(">>> insertRatingTamplate");
            this.placeToAppend.empty();
            var html = '<h1><span class="international" propkey="' + data.title + '">' + data.title + '</span></h1>';
            this.placeToAppend.append(html).show('slow');
            for (var i = 0; i < data.categories.length; i++) {
                (function(i,context, lastCategoryIndex){
                    setTimeout($.proxy(function() {
                        context.renderCategory(i,data);
                        if(i === lastCategoryIndex){
                            callbackFn();
                        }
                    },context), 0);
                })(i,this,data.categories.length-1);
            }
            console.log("<<< insertRatingTamplate");
        }

        handlebars.registerHelper("starBlock", function (obj, option) {

            var MainStarContainer = $("<div class='MainStarContainer'></div>");
            var MainStarDescription = $('<div clas="MainStarDescription"></div>');

            if (typeof obj.descriptions !== 'undefined') {
                var values = [];
                for (var i = 0; i < obj.descriptions.length; i++) {
                    values.push(obj.descriptions[i].description);
                }
                function starBeforeClicked(starIndex) {
                    MainStarDescription.innerHTML = values[starIndex];
                }

                starManager.addStar(MainStarContainer, 5, starBeforeClicked);
            } else {
                starManager.addStar(MainStarContainer, 5);
            }
            return new handlebars.SafeString($('<div></div>').append(MainStarContainer).append(MainStarDescription).html());
        });

        // And this is the definition of the custom function ->
        function render(tmpl_name, tmpl_data) {
            if (!render.tmpl_cache) {
                render.tmpl_cache = {};
            }

            if (!render.tmpl_cache[tmpl_name]) {
                var tmpl_dir = 'static/templates';
                var tmpl_url = tmpl_dir + '/' + tmpl_name + '.html';

                var tmpl_string;
                $.ajax({
                    url: tmpl_url,
                    method: 'GET',
                    async: false,
                    success: function (data) {
                        tmpl_string = data;
                    }
                });

                render.tmpl_cache[tmpl_name] = handlebars.compile(tmpl_string);
            }

            return render.tmpl_cache[tmpl_name](tmpl_data);
        }


        function downloadRatingData(callbackFn) {
            var url = serverBaseURL + "joinRate.php";
            jQuery.ajax(url, {
                "type": "GET",
                "dataType": "json",
                "contentType": "application/json",
                "beforeSend": function () {
                    $.mobile.loading('show');
                    console.log(" show beforeSend");
                }, //Show spinner
                "complete": function () {
                    $.mobile.loading('hide');
                    console.log("hide compleate");
                }, //Hide spinner

                "success": $.proxy(function (json) {
                    //console.log(JSON.stringify(json));
                    commonData.userId = json.userID;
                    this.insertRatingTamplate(json.ratingSchema.evaluation, function () {
                        console.log("localize");
                        callbackFn(json.ratingSchema.localization);
                    });

                    $.mobile.loading('hide');
                    console.log("<<< hide done");

                }, this),
                error: $.proxy(function (XMLHttpRequest, textStatus, errorThrown) {
                    //                  ajaxError(XMLHttpRequest, textStatus, errorThrown);
                    $.mobile.loading('hide');
                    console.log("<<< hide - error");
                    callbackFn();
                }, this)
            });

        }

        this.placeToAppend = null;
        this.templateName = null;
        this.init = init;
        this.insertRatingTamplate = insertRatingTamplate;
        this.renderCategory = renderCategory;
        this.downloadRatingData = downloadRatingData;
        this.render = render;
        this.lastRenderedCategoryIndex = 0;
//    this.init();
    }

    var ratingManager = new RatingManager();
    return ratingManager;
});