/** Variables **/

progressStartSlide = 0;

/** Callbacks **/

hashChanged = function() {
  renderCurrentSlide();
};

keyDown = function(evt) {
  currentSlide = parseInt(window.location.hash.replace('#',''));
  console.log(evt.which);
  if (evt.which === 37 || evt.which === 38) {
    if (currentSlide > 0) {
      window.location.hash = currentSlide - 1;
    }
  } else if (evt.which === 39 || evt.which === 40) {
    if (currentSlide < ($('.slide').length - 1)) {
      window.location.hash = currentSlide + 1;
    }
  }
};

/** Slides functions **/

displaySlides = function() {
  $('.slides').show();
};

renderCurrentSlide = function() {
  var currentSlide = parseInt(window.location.hash.replace('#',''));

  $('.slide').each(function(index, val) {
    if (index === currentSlide) {
      $(this).show();

      if ($(this).hasClass('title-slide')) {
        $('.slides-progress').width('100%');
      } else if ($(this).hasClass('resting-slide') && !$(this).hasClass('final-slide')) {
        $('.slides-progress').width('0%');
      } else if (index >= progressStartSlide) {
        current = (index - progressStartSlide + 1) / ($('.slide').length - progressStartSlide) * 100;
        console.log(current + '%');
        $('.slides-progress').animate({width: current + '%'}, 500);
      }
    } else {
      $(this).hide();
    }
  });
};

onload = function() {

  /** Callbacks **/

  $(window).on('hashchange', hashChanged);
  $(window).on('keydown', keyDown);

  /** Default settings **/

  if (window.location.hash == '') {
    window.location.hash = '0';
  }

  /** Index slides **/

  foundStartSlide = false;

  $('.slide').each(function(index, val) {
    $(this).data('slide-index', index);

    if (!foundStartSlide) {
      if ($(this).hasClass('resting-slide') || $(this).hasClass('title-slide')) {
        progressStartSlide += 1;
      } else {
        foundStartSlide = true;
      }
    }
  });

  renderCurrentSlide();
  displaySlides();
};
