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