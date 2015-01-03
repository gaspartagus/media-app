
var speed = 500;
var startPos;

var drag,
    menuRight = $('.menu_right');
    menuWidth = menuRight.width();


var swipeOptions = {
    triggerOnTouchEnd: true,
    swipeStatus: swipeStatus,
    allowPageScroll: "vertical",
    threshold: 0
};

$(function () {
    $(".drag").swipe(swipeOptions);
    $('.menu_drag').swipe(swipeOptions);
    $('.plus').swipe(swipeOptions);
});


/**
 * Catch each phase of the swipe.
 * move : we drag the div
 * cancel : we animate back to where we were
 * end : we animate to the next image
 */
function swipeStatus(event, phase, direction, distance, duration, fingerCount, fingerData) {
    //If we are moving before swipe, and we are going L or R in X mode, or U or D in Y mode then drag.

    if(phase == 'start')
    {
        startPos = parseInt(menuRight.css('translate'));
        console.log('startPos', startPos,event)
    }

    var finger = fingerData[0];
    var X = finger.end.x - finger.start.x;

    if(phase == "move")
    {
        //console.log(fingerData,X,menuWidth,direction,startPos);

        if(X > 0)
        {
            if( X + startPos > menuWidth)
            {
                menuRight
                    .css("transform", "translate(" + menuWidth + "px,0)");
            } else {
                menuRight.css("transform", "translate(" + (startPos + X) + "px,0)");
                console.log((10*(startPos + X)/menuWidth))
                menuRight.css("box-shadow", "0 0 " + (-10*(startPos + X)/menuWidth) + "px black");
            }
        } else {
            if( X < -1 * menuWidth)
            {
                menuRight.css("transform", "translate(0,0)");
            } else //track finger
            {
                menuRight.css("transform", "translate(" + (startPos + X) + "px,0)");
                console.log((10*(startPos + X)/menuWidth))
                menuRight.css("box-shadow", "0 0 " + (-10*(startPos + X)/menuWidth) + "px black");
            }
        }
    } else if (phase == "end") {
        console.log('end', fingerData)
        if(X < -10) {
            menuRight.transition({x: 0, "box-shadow": "0 0 0 black"});
        } else {
            menuRight.transition({x: menuWidth,"box-shadow": "0 0 10px black"});
        }
    }
    // if (phase == "move" && (direction == "left" || direction == "right")) {
    //     var duration = 0;

    //     if (direction == "left") {
    //         scrollImages((IMG_WIDTH * currentImg) + distance, duration);
    //     } else if (direction == "right") {
    //         scrollImages((IMG_WIDTH * currentImg) - distance, duration);
    //     }

    // } else if (phase == "cancel") {
    //     scrollImages(IMG_WIDTH * currentImg, speed);
    // } else if (phase == "end") {
    //     if (direction == "right") {
    //         previousImage();
    //     } else if (direction == "left") {
    //         nextImage();
    //     }
    // }
}

function previousImage() {
    currentImg = Math.max(currentImg - 1, 0);
    scrollImages(IMG_WIDTH * currentImg, speed);
}

function nextImage() {
    currentImg = Math.min(currentImg + 1, maxImages - 1);
    scrollImages(IMG_WIDTH * currentImg, speed);
}

/**
 * Manually update the position of the imgs on drag
 */
function scrollImages(distance, duration) {
    //imgs.css("transition-duration", (duration / 1000).toFixed(1) + "s");

    //inverse the number we set in the css
    //var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
    imgs.css("transform", "translate(" + value + "px,0)");
}