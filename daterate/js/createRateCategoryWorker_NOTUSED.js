
console.log("IN WORKER - read worker!");

self.addEventListener('message', messageHandler, false);

importScripts('util/handlebars.js');

onmessage = messageHandler;
function messageHandler(e){
    var data = e.data;
    console.log("IN WORKER -message in worker - "+data.type);

    if(data === "start"){ //Start, ask the questions!
        var question = {"type":"question","question":"templateName?"};
        postMessage(question);
    }
    else if(data.type === "answer"){
        console.log("IN WORKER - answer in worker - "+data.question);
        if(data.question === "templateName?"){
            console.log("IN WORKER - set up - templateName " + data.answer);
            rateCategoryBuilder.templateName = data.answer;
            rateCategoryBuilder.renderFunction(data.answer);
        }
    }
    else if(data.type === "build"){
        console.log("IN WORKER - build in worker - " + data.catData);
        var renderedCategory = rateCategoryBuilder.buildCategory(data.catData);
        var message = {"category":renderedCategory,"type":"category"};
        postMessage(message);
    }
}

function rateCategoryBuilder(){

    function buildCategory(category){
        var rendered_html = this.render(category);
        console.log("IN WORKER - rendered HTML:"+rendered_html);
        var renderedCategory = $(rendered_html);
        //renderedCategory.css('display',"none");
        renderedCategory.find(".starbody").each(function(i) {
            var MainStarContainer = $(this).children(".MainStarContainer")[0];
//            console.log("1. $(MainStarContainer).children().length: "+$(MainStarContainer).children().length);
            var myStarManager = new StarManager();
            if($(this).children(".MainStarDescription").length > 0){
                var MainStarDescription = $(this).children(".MainStarDescription")[0];
                function starBeforeClicked(starIndex) {
                    $(MainStarDescription).children().filter(function() { return $(this).css("display") == "block" }).css("display","none");
                    var selectionIndex = 0;
                    if(starIndex >= 2 && starIndex <= 3){
                        selectionIndex = 1;
                    }
                    else if(starIndex >= 4){
                        selectionIndex = 2;
                    }
                    var selectedDescription= $($(MainStarDescription).children(".starDescription")[selectionIndex]);
                    selectedDescription.css("display","block");
                }
                myStarManager.addStar($(MainStarContainer), 5, starBeforeClicked);
            }
            else{
                myStarManager.addStar($(MainStarContainer), 5);
            }
            console.log("2. $(MainStarContainer).children().length: "+$(MainStarContainer).children().length);
        });
        return renderedCategory;
    }


    Handlebars.registerHelper("starBlock", function (obj, option) {
        //var currentMainContainerId = guid();
        //var currentMainDescriptionId = guid();

        var MainStarContainer = $("<div class='MainStarContainer'></div>");
        var MainStarDescription = $('<div clas="MainStarDescription"></div>');

//        var htmlTemplate = option.fn({mainStarContainerId: currentMainContainerId, mainStarDescriptionId: currentMainDescriptionId});

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
        return new Handlebars.SafeString($('<div></div>').append(MainStarContainer).append(MainStarDescription).html());
    });


    function renderFunction(tmpl_name){
        if (!render.tmpl_cache) {
            render.tmpl_cache = {};
        }

        if (!render.tmpl_cache[tmpl_name]) {
            var tmpl_dir = '../static/templates';
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
            console.log("IN WORKER - load template - "+tmpl_url);
/*            var xhReq = new XMLHttpRequest();
            xhReq.open("GET", tmpl_url, false);
            xhReq.send();
            tmpl_string = xhReq.responseText;*/

            render.tmpl_cache[tmpl_name] = Handlebars.compile(tmpl_string);
            console.log("IN WORKER - "+tmpl_name+" has attached the compiled "+tmpl_url+"template");
        }
        return render.tmpl_cache[tmpl_name];
    }
    // And this is the definition of the custom function ->
    function render(tmpl_data) {
        var renderFunct = this.renderFunction(this.tempateName);
        return renderFunct(tmpl_data);
    }

    this.render = render;
    this.renderFunction = renderFunction;
    this.buildCategory = buildCategory;
    this.tempateName = "dateTemplate2";
}

var rateCategoryBuilder = new rateCategoryBuilder();
