function StarManager() {

    STAR_STATUS_SELECTED = "star";
    STAR_STATUS_NOT_SELECTED = "place";
    STAR_SELECTED_IMAGE = 'img/star.png'
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
        var star = $(clickEvent.target).parent();
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
        }
        ;

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
    }

    function addStar(container, countOfStars, beforeStarClick, afterStarClick) {
        for (var i = 0; i < countOfStars; i++) {
            var starContainer = $("<div class = 'starContainer' data-star-index='" + i + "' data-star-status='" + STAR_STATUS_NOT_SELECTED + "' >  </div>");
            var placeholderImg = $("<img src='" + STAR_NOT_SELECTED_IMAGE + "' class='starPlaceholderImage' alt='Placeholder' height='44' width='42' id='starPlaceholder_" + i + "'>");
            var starImage = $("<img src='" + STAR_SELECTED_IMAGE + "' class='starSelectedImage' alt='Star' height='44' width='42' id='star_" + i + "'>");
            starContainer.append(placeholderImg).append(starImage);
            starContainer.css('display', "none");
            starContainer.addClass("starButton");
            starContainer.appendTo(container).show('slow');
            starContainer.click($.proxy(this.starClicked, this));
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
    this.init = init;
    this.countOfStars = 0;
    this.init();
}

var starManager = new StarManager();
