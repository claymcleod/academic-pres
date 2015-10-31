/** Variables **/

progress_start_slide = 0;

/** Callbacks **/

hash_changed = function () {
    render_current_slide()
}

key_down = function (evt) {
    current_slide = parseInt(window.location.hash.replace('#',''));
    console.log(evt.which)
    if (evt.which === 37 || evt.which === 38) {
        if (current_slide > 0) {
            window.location.hash = current_slide - 1;
        }
    } else if (evt.which === 39 || evt.which === 40) {
        if (current_slide < ($('.slide').length - 1)) {
            window.location.hash = current_slide + 1;
        }
    }
}

/** Slides functions **/

display_slides = function () {
    $('.slides').show();
}

render_current_slide = function() {
    var current_slide = parseInt(window.location.hash.replace('#',''));
    
    $('.slide').each(function (index, val) {
        if (index === current_slide) {
            $(this).show()

            if ($(this).hasClass('title-slide')) {
                $('.slides-progress').width('100%');
            } else if ($(this).hasClass('resting-slide')) {
                $('.slides-progress').width('0%');
            } else if (index >= progress_start_slide) {
                current = (index - progress_start_slide + 1) / ($('.slide').length - progress_start_slide) * 100;
                console.log(current+'%');
                $('.slides-progress').animate({width: current+'%'}, 500)
            }
        } else {
            $(this).hide();
        }
    }); 
}

onload = function() {
    
    /** Callbacks **/

    $(window).on('hashchange', hash_changed)
    $(window).on('keydown', key_down)

    /** Default settings **/

    if (window.location.hash == "") {
        window.location.hash = '0'
    }
    
    /** Index slides **/

    foundStartSlide = false;

    $('.slide').each(function (index, val) {
        $(this).data('slide-index', index)    
        
        if (!foundStartSlide) {
            if ($(this).hasClass('resting-slide') || $(this).hasClass('title-slide')) {
                progress_start_slide += 1;
            } else {
                foundStartSlide = true;
            }
        }
    });

    render_current_slide();
    display_slides();
}


