$(function() {
	
/*        $("#createDateRateButton").animate({
    		width:"100%",
  		} , 2000, "swing" , function() {
     	  console.log( "Animation complete.");
    	});*/

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