
function RatingManager(templateName,placeToAppend){

    function init(callbackFn){
//      $.mobile.loading('show');
      this.downloadRatingData(callbackFn);
    }


    function insertRatingTamplate(data){
      console.log(">>> insertRatingTamplate");

      var html = '<h1><span class="international" propkey="'+data.title+'">'+data.title+'</span></h1>';
      this.placeToAppend.append(html).show('slow');

      for (var i = 0; i < data.categories.length; i++) {
          var category = data.categories[i];
        var rendered_html = this.render(this.templateName, category);
    //      var theTemplate = Handlebars.compile (rendered_html); 
        this.placeToAppend.append(rendered_html).show('slow');  
      }        
      console.log("<<< insertRatingTamplate");
    }

    // And this is the definition of the custom function -> 
    function render(tmpl_name, tmpl_data) {
        if ( !render.tmpl_cache ) { 
            render.tmpl_cache = {};
        }

        if ( ! render.tmpl_cache[tmpl_name] ) {
            var tmpl_dir = 'static/templates';
            var tmpl_url = tmpl_dir + '/' + tmpl_name + '.html';

            var tmpl_string;
            $.ajax({
                url: tmpl_url,
                method: 'GET',
                async: false,
                success: function(data) {
                    tmpl_string = data;
                }
            });

            render.tmpl_cache[tmpl_name] = Handlebars.compile(tmpl_string);
        }

        return render.tmpl_cache[tmpl_name](tmpl_data);
    }


    function downloadRatingData(callbackFn){
         var url = serverBaseURL+"joinRate.php";
         jQuery.ajax(url, {
                        "type": "GET",
                        "dataType": "json",
                        "contentType": "application/json",
                        "beforeSend": function() {       
                            $.mobile.loading('show'); 
                            console.log(" show beforeSend");}, //Show spinner
                        "complete": function() { 
                            $.mobile.loading('hide'); 
                            console.log("hide compleate");
                            }, //Hide spinner
            
                        "success": $.proxy(function(json) {
                              console.log(JSON.stringify(json));
                              commonData.userId = json.userID;
                              LocalizationManager.addLocalizeItems(json.ratingSchema.localization);
                              this.insertRatingTamplate(json.ratingSchema.evaluation);
                              $.mobile.loading('hide');
                                console.log("<<< hide done");
                              callbackFn();
                        },this),
                        error:  $.proxy(function (XMLHttpRequest, textStatus, errorThrown) {
        //                  ajaxError(XMLHttpRequest, textStatus, errorThrown);
                          $.mobile.loading('hide');
                                console.log("<<< hide - error");
                          callbackFn();
                        },this)  
                    });

        }

//    this.downloadLocalizationData = downloadLocalizationData;
    this.placeToAppend = placeToAppend;
    this.templateName = templateName;
    this.init = init;
    this.insertRatingTamplate=insertRatingTamplate;
    this.downloadRatingData = downloadRatingData;
    this.render = render;
//    this.init();
}

