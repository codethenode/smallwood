(function ($) {
   Drupal.behaviors.smallwood = {
      attach:function() {
        
        /*
        function isRetina() {
          var query = '(-webkit-min-device-pixel-ratio: 1.5),\
          (min--moz-device-pixel-ratio: 1.5),\
          (-o-min-device-pixel-ratio: 3/2),\
          (min-device-pixel-ratio: 1.5),\
          (min-resolution: 144dpi),\
          (min-resolution: 1.5dppx)';

          if (window.devicePixelRatio > 1 || (window.matchMedia && window.matchMedia(query).matches)) {
          return true;
          }
          return false;
        } */

        /**
        * Replace slideshow style attr string for backgrounds.
        **/
        $('.cycle-slideshow .slide').each(function(){
          /* Mobile */
          if ($(window).width() <= 480 ) {
            /* Check for retina devices. */
            if (window.devicePixelRatio > 1) {
              $(this).attr('style',$(this).attr('style').replace('public:/','sites/default/files/styles/slide_768/public'));
            }
            else {
              $(this).attr('style',$(this).attr('style').replace('public:/','sites/default/files/styles/slide_480/public'));
            }
          }
          /* Tablet */
          if ((($(window).width() <= 768) && ($(window).width() > 480))) {
            /* Check for retina devices. */
            if (window.devicePixelRatio > 1) {
              $(this).attr('style',$(this).attr('style').replace('public:/','sites/default/files'));
            }
            else {
              $(this).attr('style',$(this).attr('style').replace('public:/','sites/default/files/styles/slide_768/public'));
            }
          }
          /* Desktop */
          if ($(window).width() > 768) {
            $(this).attr('style',$(this).attr('style').replace('public:/','sites/default/files'));
          }
        });


        /**
        * Toggle the visibility of the staff bios.
        */
        $('.team').click(function() {
          w = $(this).width(),
          h = $(this).height(),
          bio = $('.bio',this),
          bro = $(this).siblings(),
          cont = $('.masonry');
          $(this).removeClass('faded');
                    
        // Remove all appended bios from sibling masonry elements.
        bro.addClass('faded').next('.bio.masonry-item').remove();

        // Clone the staff bio and insert after clicked staff with masonry class.
        if ($('.bio.masonry-item').length === 0) {
          bio.clone().toggleClass('masonry-item').css({'left':w+10, 'width':w, 'height':h}).insertAfter(this).find('.guts').wrap("<div class='shell'></div>");
        }
        // Remove bio on second click if already inserted.
        else {
          $('.bio.masonry-item').remove();
          bro.removeClass('faded');
        }
        // Reinit the masonry function to re-order the items.
        cont.masonry('reload');
      });


      /**
      * Stcky footer nav front page.
      */
      if($('.front').length){
        $(window).load(function() {
          function stickyMenu(){
            main = $('.main-container'),
            nav = $('nav.sticky'),
            navOffset = nav.offset().top,
            navHt = nav.height();
            navHeight = $(window).height() - navHt;
          }
          $(window).resize(function(){
            stickyMenu();
          });
          $(window).scroll(function() {
            stickyMenu();
            // If front page.
            if ($(window).scrollTop() > navHeight) {
              nav.addClass('fixed');
            }
            else {
              nav.removeClass('fixed');
            }
          });
        });
      }

    }
  }
})(jQuery);
