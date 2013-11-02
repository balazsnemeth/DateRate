$(function() {
	
/*        $("#createDateRateButton").animate({
    		width:"100%",
  		} , 2000, "swing" , function() {
     	  console.log( "Animation complete.");
    	});*/

	function init(){
		$('.startAnimation').each(function(index){
						console.log(index);
					setTimeout($.proxy(function() {
						console.log('s'+index);
						$( this ).addClass('transformWidth');
					},this), index*300);
				});

				var iOS7UserAgentStr = /(iPad|iPhone);.*CPU.*OS 7_\d/i;
					if (navigator.userAgent.match(iOS7UserAgentStr)) {
					$('body').addClass('ios7-detected');
				}
				commonData.gender = $('#genderSelect').val();
				language = window.navigator.userLanguage || window.navigator.language;
				language = language.split("-");
				language_root = (language[0]);
				LocalizationManager.currentLan = language_root;
//				showAlert(language_root,'Root language');
		    	pageInit($('[data-role="page"]'));
	}

	function initialize(){
		//download localization
		LocalizationManager.init(init);
	}


	function updatePageStyle(page){
		if (page.attr('data-theme') === "d") {
			return;
		};
	  if(commonData.gender === 'male'){
        page.trigger('refresh','b');
        //$('#page4').children().attr('data-theme','b').trigger('refresh');
      }
      else{
        page.trigger('refresh','a');
        //$('#page4').children().attr('data-theme','c').trigger('refresh');
      }
	}
	
	$("#createDateRateButton").click(function( event ) {
		var name = $('#nameTextField').val();
		if (name === '' || name == null || typeof name === "undefined") {
			//$('#nameTextField').addClass('nonValidTextFiled');
			$('#nameTextField').parent().addClass('nonValidTextFiled');
			var label = $("label[for='nameTextField']");
			label.addClass('nonValidLabel');
			return;
		}else{
			$('#nameTextField').parent().removeClass('nonValidTextFiled');
			var label = $("label[for='nameTextField']");
			label.removeClass('nonValidLabel');
		}
		commonData.name = name;

		commonData.gender = $('#genderSelect').val();
		
		$.mobile.changePage("page4.html", { transition: "slide", changeHash: true });
    });
 
	$('#genderSelect').change(function(){
		console.log('selected gender: '+$('#genderSelect').val());
		commonData.gender = $('#genderSelect').val();
		updatePageStyle($('[data-role="page"]'));
	});

	function pageInit(page){
		page.bind('refresh', function(e, newTheme) {
			/* Default to the "a" theme. */
			var oldTheme = $(this).attr('data-theme') || 'a';
			newTheme = newTheme || 'a';
			element_theme_refresh( $(this), oldTheme, newTheme );
			$(this).find('*').each(function() {
				element_theme_refresh( $(this), oldTheme, newTheme );
			});
		});
		updatePageStyle(page);
		LocalizationManager.localizeBlock(page);
	}
	$(document).bind( "pagebeforechange", function( e, data ) {
		if (typeof data.toPage[0].id !== "undefined" && data.toPage[0].id != null) {
			pageInit(data.toPage);
		};
	});

	initialize();

/*
	$("#RatingStatus").click( function()
           {
				showConfirmation('Please, enter the shared evaluation code:','Evaluation Code','Show rating','Cancel',function(button){
				    console.log('You selected button ' + button);
				    //$.mobile.changePage("page6.html");
				});
           }
      );
	*/

			

});