
    function showAlert(message, title) {
	    if (navigator.notification) {
	        navigator.notification.alert(message, null, title, 'OK');
	    } else {
	        alert(title ? (title + ": " + message) : message);
	    }
	}
	
	function showConfirmation(message, title, okButtonLabel, cancelButtonLabel, callbackFn) {
	    if (navigator.notification) {
	    	var buttonLabels = okButtonLabel +','+cancelButtonLabel;
	        navigator.notification.confirm(message, callbackFn, title, buttonLabels);
	    } else {
	    	var r=confirm(title ? (title + ": " + message) : message);
			if (r==true){
				callbackFn(okButtonLabel);
			}
			else{
				callbackFn(cancelButtonLabel);
			}
	    }
	}
