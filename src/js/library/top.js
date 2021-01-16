 $(function() {
     $(window).on('scroll', function() {
         if ($(window).scrollTop() > 100) {
             $("#back-to-top").fadeIn(1500);
         } else {
             $("#back-to-top").fadeOut(1500);
         }
     });

     $('#back-to-top').on('click', function() {
         if ($('html').scrollTop()) {
             $('html').animate({ scrollTop: 0 }, 100);
             return false;
         };
         $('body').animate({ scrollTop: 0 }, 100);
         return false;
     })

 })