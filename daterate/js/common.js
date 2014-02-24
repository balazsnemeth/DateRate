function showAlert(message, title) {
    if (navigator.notification) {
        navigator.notification.alert(message, null, title, 'OK');
    } else {
        alert(title ? (title + ": " + message) : message);
    }
}

function showConfirmation(message, title, okButtonLabel, cancelButtonLabel, callbackFn) {
    if (navigator.notification) {
        var buttonLabels = okButtonLabel + ',' + cancelButtonLabel;
        navigator.notification.confirm(message, callbackFn, title, buttonLabels);
    } else {
        var r = confirm(title ? (title + ": " + message) : message);
        if (r == true) {
            callbackFn(okButtonLabel);
        }
        else {
            callbackFn(cancelButtonLabel);
        }
    }
}

function element_theme_refresh(element, oldTheme, newTheme) {
    /* Update the page's new data theme. */
    if ($(element).attr('data-theme')) {
        $(element).attr('data-theme', newTheme);
    }

    if ($(element).attr('class')) {
        /* Theme classes end in "-[a-z]$", so match that */
        var classPattern = new RegExp('-' + oldTheme + '$');
        newTheme = '-' + newTheme;

        var classes = $(element).attr('class').split(' ');

        for (var key in classes) {
            if (classPattern.test(classes[key])) {
                classes[key] = classes[key].replace(classPattern, newTheme);
            }
        }

        $(element).attr('class', classes.join(' '));
    }
}

/**UUID generation*/
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

/**UUID generation*/
function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

console.logCopy = console.log.bind(console);

console.log = function (data) {
    var currentDate = '[' + new Date().toUTCString() + '] ';
    this.logCopy(currentDate, data);
};

var commonData = {
    gender: "",
    name: "",
    userId: ""
};

var serverBaseURL = "http://daterate.us/dr/testserver/"

