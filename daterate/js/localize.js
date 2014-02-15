function LocalizationManager() {

    var Language = {};
    var currentLan = 'en';

    function init(callbackFn) {
        $.mobile.loading('show');
        $.getJSON('./js/globalization.json', $.proxy(function (data) {
            this.Language = data;
            $.mobile.loading('hide');
            callbackFn();
        }, this))
//       this.downloadLocalizationData(callbackFn);
    }

    function localizeBlock(block) {
        var spans = $(block).find('.international');
        for (var i = 0; i < spans.length; i++) {
            var span = spans[i];
            var key = span.getAttribute("propkey");
            if (key) {
                span.innerHTML = this.getLocalizedString(key);
            }
        }
    }

    function addLocalizeItems(newItems) {
        console.log('merge ' + Object.keys(newItems).length + ' new items to ' + Object.keys(this.Language).length + ' orig items');
        $.extend(this.Language, newItems);
        console.log('full localize items ' + Object.keys(this.Language).length);
    }

    function getLocalizedString(key) {


        if (key) {
            if (typeof(this.Language[key]) != 'undefined') {
                return this.Language[key][this.currentLan];
            } else {
                return "Key not found: " + key;
            }
        }
        return "";
    }

    /*
     function downloadLocalizationData(callbackFn){
     var url = serverBaseURL+"localize.php";
     jQuery.ajax(url, {
     "type": "GET",
     "dataType": "json",
     "contentType": "application/json",
     "success": $.proxy(function(json) {
     Language = json;
     console.log(JSON.stringify(Language));
     $.mobile.loading('hide');
     callbackFn();
     },this),
     error:  $.proxy(function (XMLHttpRequest, textStatus, errorThrown) {
     //                  ajaxError(XMLHttpRequest, textStatus, errorThrown);
     $.mobile.loading('hide');
     callbackFn();
     },this)
     });

     }*/

//    this.downloadLocalizationData = downloadLocalizationData;
    this.addLocalizeItems = addLocalizeItems;
    this.localizeBlock = localizeBlock;
    this.getLocalizedString = getLocalizedString;
    this.Language = Language;
    this.init = init;
    this.currentLan = currentLan;
//    this.init();
}

