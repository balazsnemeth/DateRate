function StarManager() {

    STAR_STATUS_SELECTED = "star";
    STAR_STATUS_NOT_SELECTED = "place";
    STAR_SELECTED_IMAGE = 'img/star.png'
    STAR_BIG_SELECTED_IMAGE = 'img/starBig.png'
    STAR_NOT_SELECTED_IMAGE = 'img/star_place.png'

    FADE_TIME = 200

    function init() {
        this.stars = new Array();
        this.countOfStars = 0;
    }

    function deselectStar(star) {
        star.data("starStatus", STAR_STATUS_NOT_SELECTED);
//		star.attr('src', STAR_NOT_SELECTED_IMAGE);
        var starImg = star.find('.starSelectedImage');
        starImg.fadeOut(FADE_TIME, "swing");
    }

    function selectStar(star) {
        star.data("starStatus", STAR_STATUS_SELECTED);
        //el kell tüntetni fölülle az selectedet!!
        var starImg = star.find('.starSelectedImage');
        starImg.fadeIn(FADE_TIME, "swing");

//		star.fadeOut("fast").attr("src", STAR_SELECTED_IMAGE).fadeIn("fast");

        /*	star.fadeTo(10,0.1, function() {
         star.attr('src', STAR_SELECTED_IMAGE);
         }).fadeTo(300,1);*/
    }

    function deSelectAll() {
        for (var i = this.stars.length - 1; i >= 0; i--) {
            var star = this.stars[i];
            this.deselectStar(star);
        }
        ;
        console.log("deSelectAll");
    }

    function starClicked(clickEvent) {
        console.log("starClicked - start");
        var star = $(clickEvent.target).parent();
        star.stop().animate({transform:'scale(2)'}, 3000);
        var starIndex = star.data("starIndex");
        var starStatus = star.data("starStatus");
        //console.log("starIndex: "+starIndex);
        if (this.beforeStarClick != null) {
            this.beforeStarClick(starIndex);
        }
        ;
        if (starIndex === 0) {
            var secondStar = this.stars[1];
            var secondStarStatus = secondStar.data("starStatus");
            if (starStatus === STAR_STATUS_SELECTED && secondStarStatus === STAR_STATUS_NOT_SELECTED) {
                this.deselectStar(star);
                return;
            }
            ;
        }
        ;

        for (var i = this.countOfStars - 1; i > starIndex; i--) {
            var cstar = this.stars[i];
            this.deselectStar(cstar);
        };

//		this.deSelectAll();
        for (var i = starIndex; i >= 0; i--) {
            var cstar = this.stars[i];
            this.selectStar(cstar);
        }
        ;
        if (this.afterStarClick != null) {
            this.afterStarClick(starIndex);
        }
        ;
        console.log("starClicked - end");
    }

    function touchstart(clickEvent){
        var star = $(clickEvent.target).parent();
        var starStatus = star.data("starStatus");
        var starImg = star.find('.starSelectedImage');
        if (starStatus != STAR_STATUS_SELECTED){
            starImg.css('opacity', "1.0");
            starImg.css('display', "block");
        }
        starImg.attr("src", STAR_BIG_SELECTED_IMAGE);
        starImg.attr("width", '61');
        starImg.attr("height", '64');
        starImg.removeClass("starSelectedImage").addClass("starHighlight");
        console.log("touchstart - end");
    }

    function touchend(clickEvent){
        console.log("touchEnd - start");
        var star = $(clickEvent.target).parent();
        var starImg = star.find('.starHighlight');
        starImg.attr("width", '42');
        starImg.attr("height", '44');
        starImg.attr("src", STAR_SELECTED_IMAGE);
        starImg.removeClass("starHighlight").addClass("starSelectedImage");
        console.log("touchEnd - end");
    }


    function addStar(container, countOfStars, beforeStarClick, afterStarClick) {
        for (var i = 0; i < countOfStars; i++) {
            var starContainer = $("<div class = 'starContainer' data-star-index='" + i + "' data-star-status='" + STAR_STATUS_NOT_SELECTED + "' >  </div>");
            var placeholderImg = $("<img src='" + STAR_NOT_SELECTED_IMAGE + "' class='starPlaceholderImage' alt='Placeholder' height='44' width='42' >");
            var starImage = $("<img src='" + STAR_SELECTED_IMAGE + "' class='starSelectedImage' alt='Star' height='44' width='42' >");
            starContainer.append(placeholderImg).append(starImage);
            starContainer.css('display', "none");
            starContainer.addClass("starButton");
            starContainer.appendTo(container).show('slow');
            starContainer.click($.proxy(this.starClicked, this));
            starContainer.bind('touchstart', $.proxy(this.touchstart,this));
            starContainer.bind('touchend', $.proxy(this.touchend,this));

            this.stars.push(starContainer);
        }
        var clearItem = $('<div style="clear: both"></div> <!-- This goes after the last floated element - no floating elements are allowed on either side of this. -->');
        clearItem.appendTo(container);
        this.countOfStars = countOfStars;
        if (typeof beforeStarClick !== "undefined") {
            this.beforeStarClick = beforeStarClick;
            if (typeof afterStarClick !== "undefined") {
                this.afterStarClick = afterStarClick;
            }
        }

    }


    this.beforeStarClick = null;
    this.afterStarClick = null;
    this.stars = null;
    this.starClicked = starClicked;
    this.addStar = addStar;
    this.deSelectAll = deSelectAll;
    this.deselectStar = deselectStar;
    this.selectStar = selectStar;
    this.touchstart = touchstart;
    this.touchend = touchend;
    this.init = init;
    this.countOfStars = 0;
    this.init();
}

var starManager = new StarManager();
