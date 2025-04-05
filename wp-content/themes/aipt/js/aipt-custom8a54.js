/*
 File name:          Custom JS
*/

(function ($) {
    'use strict';
    // jQuery preloader
    jQuery(window).on("load", function(){
        jQuery( '.aipt_preloader_holder' ).fadeOut( 1000, function() {
            jQuery( this ).fadeOut();
        });
        //tabs shortcode 
	    if(jQuery('.tabs-shortcode').length) {
	    	var height = jQuery('.tabs-shortcode .gc.active .nacc').height();
	    	jQuery('.tabs-shortcode .grid-div').height(height);
	    	jQuery('.tabs-shortcode .gc').on('click', function(){
	    		var height = jQuery('.tabs-shortcode .gc.active .nacc').height();
	    		jQuery('.tabs-shortcode .grid-div').height(height);
	    	})
	    }
    });

    new WOW().init();

    jQuery('[data-toggle="tooltip"]').tooltip();

    // virtual tour
    if (jQuery('.popup-vimeo-youtube').length) {
        jQuery(".popup-vimeo-youtube").magnificPopup({
            type:"iframe",
            disableOn: 700,
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }


    if(window.matchMedia('(min-width: 992px)').matches) {
        jQuery(".stickit_sidebar, .main_stickit").stick_in_parent({
            offset_top: 120
        });
        jQuery('.stickit_sidebar')
        .on('sticky_kit:bottom', function(e) {
            jQuery(this).parent().css('position', 'static');
        })
    }

    //accordeon footer
    jQuery(document).ready(function(){
        if(jQuery(window).width() <= 991) {
            jQuery(".footer-row-1 .widget").each(function(){
                var heading = jQuery(this).find('h3.widget-title');
                jQuery(heading).click(function(){
                    jQuery(heading).toggleClass("active");
                    var siblings = jQuery(this).nextAll();
                    jQuery(siblings).slideToggle();
                })
            });
        }
    })

    // FIXED SEARCH FORM
    jQuery('.mt-search-icon').on( "click", function(e) {
        e.preventDefault();
        jQuery('.fixed-search-overlay').toggleClass('visible');
    });

    jQuery('.fixed-search-overlay .icon-close').on( "click", function() {
        jQuery('.fixed-search-overlay').removeClass('visible');
    });
    jQuery(document).keyup(function(e) {
         if (e.keyCode == 27) { // escape key maps to keycode `27`
            jQuery('.fixed-search-overlay').removeClass('visible');
            jQuery('.fixed-sidebar-menu').removeClass('open');
            jQuery('.fixed-sidebar-menu-overlay').removeClass('visible');
        }
    });

    jQuery('#mt-nav-burger').on( "click", function() {
        // jQuery(this).toggleClass('open');
        jQuery('.fixed-sidebar-menu').toggleClass('open');
        jQuery(this).parent().find('#navbar').toggleClass('hidden');
        jQuery('.fixed-sidebar-menu-overlay').addClass('visible');
    });

    /* Click on Overlay - Hide Overline / Slide Back the Sidebar header */
    jQuery('.fixed-sidebar-menu-overlay').on( "click", function() {
        jQuery('.fixed-sidebar-menu').removeClass('open');
        jQuery(this).removeClass('visible');
    });    
    /* Click on Overlay - Hide Overline / Slide Back the Sidebar header */
    jQuery('.fixed-sidebar-menu .icon-close').on( "click", function() {
        jQuery('.fixed-sidebar-menu').removeClass('open');
        jQuery('.fixed-sidebar-menu-overlay').removeClass('visible');
    });

    // 9th MENU Toggle - Hamburger
    var toggles = document.querySelectorAll(".c-hamburger");
    for (var i = toggles.length - 1; i >= 0; i--) {
      var toggle = toggles[i];
      toggleHandler(toggle);
    };

    function toggleHandler(toggle) {
      toggle.addEventListener( "click", function(e) {
        e.preventDefault();
        (this.classList.contains("is-btn-active") === true) ? this.classList.remove("is-btn-active") : this.classList.add("is-btn-active");
      });
    }

    jQuery( ".see_map_button" ).on( "click", function() {
        jQuery( "#map_wrapper_overlay" ).fadeOut('slow');
    });


    jQuery( ".fixed-sidebar-menu .menu-button" ).on( "click", function() {
        jQuery(this).parent().parent().parent().parent().toggleClass('open');
        jQuery(this).toggleClass('open');
    });


    jQuery("#contact01_form").validate({
        //Ajax validation rules
        validClass:'validated',
        rules: {
            user_first_name: {
                required: true,
                minlength: 2
            },
            user_last_name: {
                required: true,
                minlength: 2
            },
            user_message: {
                required: true,
                minlength: 10
            },
            user_subject: {
                required: true,
                minlength: 5
            },
            user_email: {
                required: true,
                email: true
            }
        },
        //Ajax validation messages
        messages: {
            user_first_name: {
                required: "Please your first name",
                minlength: "Your first name must consist of at least 2 characters"
            },
            user_last_name: {
                required: "Please your last name",
                minlength: "Your last name must consist of at least 2 characters"
            },
            user_message: {
                required: "Please enter a message",
                minlength: "Your message must consist of at least 10 characters"
            },
            user_subject: {
                required: "Please provide a subject",
                minlength: "Your subject must be at least 5 characters long"
            },
            user_email: {
                required: "Please enter a valid email address"
            } 
        },

    });
    //End: Validate and Submit contact form via Ajax


    //Begin: Sticky Head
    if (jQuery('body').hasClass('is_nav_sticky')) {
    jQuery("#modeltheme-main-head").sticky({
        topSpacing:0
    });
    }

    if ( jQuery( ".woocommerce_categories" ).length ) {
            
            jQuery(".category a").click(function () {
                var attr = jQuery(this).attr("class");

                jQuery(".products_by_category").removeClass("active");
                jQuery(attr).addClass("active");

                jQuery('.category').removeClass("active");
                jQuery(this).parent('.category').addClass("active");

            });  

            jQuery('.products_category .products_by_category:first').addClass("active");
            jQuery('.categories_shortcode .category:first').addClass("active");

        } 
        
    // Shop button
    jQuery('.shop_cart').on("hover",function() {
        /* Stuff to do when the mouse enters the element */
        jQuery('.header_mini_cart').addClass('visible_cart');
    }, function() {
        /* Stuff to do when the mouse leaves the element */
        jQuery('.header_mini_cart').removeClass('visible_cart');
    });

    jQuery('.header_mini_cart').on("hover",function() {
        /* Stuff to do when the mouse enters the element */
        jQuery(this).addClass('visible_cart');
    }, function() {
        /* Stuff to do when the mouse leaves the element */
        jQuery(this).removeClass('visible_cart');
    });

    jQuery(".single-product h1.product_title.entry-title").remove();
    
    jQuery('#contact01_form input[name="user_first_name"]').on('change keyup paste', function() {
        if(jQuery(this).hasClass("validated")){
            jQuery(".cf-progress").addClass("user_first_name-validated");
        }else if(!jQuery(this).hasClass("validated")){
            jQuery(".cf-progress").removeClass("user_first_name-validated");
        }
    });
    jQuery('#contact01_form input[name="user_last_name"]').on('change keyup paste', function() {
        if(jQuery(this).hasClass("validated")){
            jQuery(".cf-progress").addClass("user_last_name-validated");
        }else if(!jQuery(this).hasClass("validated")){
            jQuery(".cf-progress").removeClass("user_last_name-validated");
        }
    });
    jQuery('#contact01_form input[name="user_email"]').on('change keyup paste', function() {
        if(jQuery(this).hasClass("validated")){
            jQuery(".cf-progress").addClass("email-validated");
        }else if(!jQuery(this).hasClass("validated")){
            jQuery(".cf-progress").removeClass("email-validated");
        }
    });
    jQuery('#contact01_form input[name="user_subject"]').on('change keyup paste', function() {
        if(jQuery(this).hasClass("validated")){
            jQuery(".cf-progress").addClass("subject-validated");
        }else if(!jQuery(this).hasClass("validated")){
            jQuery(".cf-progress").removeClass("subject-validated");
        }
    });
    jQuery('#contact01_form input[name="user_message"]').on('change keyup paste', function() {
        if(jQuery(this).hasClass("validated")){
            jQuery(".cf-progress").addClass("message-validated");
        }else if(!jQuery(this).hasClass("validated")){
            jQuery(".cf-progress").removeClass("message-validated");
        }
    });


    /**
     * Skin Link Focus Fix
    **/
    var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
        is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
        is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

    if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
        window.addEventListener( 'hashchange', function() {
            var element = document.getElementById( location.hash.substring( 1 ) );

            if ( element ) {
                if ( ! /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) {
                    element.tabIndex = -1;
                }

                element.focus();
            }
        }, false );
    }


    // SIDEBAR EFFECTS
    var SidebarMenuEffects = (function() {

        function hasParentClass( e, classname ) {
            if(e === document) return false;
            if( classie.has( e, classname ) ) {
                return true;
            }
            return e.parentNode && hasParentClass( e.parentNode, classname );
        }

        function mobilecheck() {
            var check = false;
            (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        }

        function init() {

            var container = document.getElementById( 'st-container' ),
                buttons = Array.prototype.slice.call( document.querySelectorAll( '#st-trigger-effects > button' ) ),
                // event type (if mobile use touch events)
                eventtype = mobilecheck() ? 'touchstart' : 'click',
                resetMenu = function() {
                    classie.remove( container, 'st-menu-open' );
                },
                bodyClickFn = function(evt) {
                    if( !hasParentClass( evt.target, 'st-menu' ) ) {
                        resetMenu();
                        document.removeEventListener( eventtype, bodyClickFn );
                    }
                };

            buttons.forEach( function( el, i ) {
                var effect = el.getAttribute( 'data-effect' );

                el.addEventListener( eventtype, function( ev ) {
                    ev.stopPropagation();
                    ev.preventDefault();
                    container.className = 'st-container'; // clear
                    classie.add( container, effect );
                    setTimeout( function() {
                        classie.add( container, 'st-menu-open' );
                    }, 25 );
                    document.addEventListener( eventtype, bodyClickFn );
                });
            } );

        }

        init();

    })();

    /*Begin: Testimonials slider*/
    jQuery(".quotes-slider").owlCarousel({
        navigation      : false, // Show next and prev buttons
        pagination      : false,
        autoPlay        : true,
        rewindNav       : true,
        slideSpeed      : 700,
        paginationSpeed : 700,
        singleItem      : true
    });

    jQuery(".quotes-container").owlCarousel({
        navigation      : false, // Show next and prev buttons
        pagination      : false,
        autoPlay        : false,
        slideSpeed      : 700,
        paginationSpeed : 700,
        singleItem      : true
    });
    /*Begin: Clients slider*/
    jQuery(".categories_shortcode").owlCarousel({
        navigation      : false, // Show next and prev buttons
        pagination      : false,
        autoPlay        : false,
        slideSpeed      : 700,
        paginationSpeed : 700,
        navigationText  : ["<i class='fa fa-arrow-left'></i>","<i class='fa fa-arrow-right'></i>"],
        itemsCustom : [
            [0,     1],
            [450,   2],
            [600,   2],
            [700,   5],
            [1000,  5],
            [1200,  5],
            [1400,  5],
            [1600,  5]
        ]
    });
    /*Begin: Products by category*/
    jQuery(".clients-container").owlCarousel({
        navigation      : false, // Show next and prev buttons
        pagination      : false,
        autoPlay        : true,
        slideSpeed      : 700,
        paginationSpeed : 700,
        itemsCustom : [
            [0,     2],
            [450,   2],
            [600,   2],
            [700,   3],
            [1000,  5],
            [1200,  5],
            [1400,  5],
            [1600,  5]
        ]
    });
    /*Begin: Testimonials slider*/
    jQuery(".post_thumbnails_slider").owlCarousel({
        navigation      : false, // Show next and prev buttons
        pagination      : false,
        autoPlay        : false,
        slideSpeed      : 700,
        paginationSpeed : 700,
        singleItem      : true
    });
    var owl = jQuery(".post_thumbnails_slider");
    jQuery( ".next" ).on( "click", function() {
        owl.trigger('owl.next');
    })
    jQuery( ".prev" ).on( "click", function() {
        owl.trigger('owl.prev');
    })
    /*End: Testimonials slider*/

    /*Begin: Testimonials slider*/
    jQuery(".testimonials_slider").owlCarousel({
        navigation      : true, // Show next and prev buttons
        pagination      : true,
        autoPlay        : false,
        slideSpeed      : 700,
        paginationSpeed : 700,
        singleItem      : true
    });
    /*End: Testimonials slider*/
    /* Animate */
    jQuery('.animateIn').animateIn();
    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    offset_opacity = 1200,
    //duration of the top scrolling animation (in ms)
    scroll_top_duration = 700,
    //grab the "back to top" link
    $back_to_top = jQuery('.back-to-top');

    //hide or show the "back to top" link
    jQuery(window).scroll(function(){
        ( jQuery(this).scrollTop() > offset ) ? $back_to_top.addClass('modeltheme-is-visible') : $back_to_top.removeClass('modeltheme-is-visible modeltheme-fade-out');
        if( jQuery(this).scrollTop() > offset_opacity ) { 
            $back_to_top.addClass('modeltheme-fade-out');
        }
    });

    // SITE NAVIGATION
    ( function() {
        var container, button, menu;

        container = document.getElementById( 'site-navigation' );
        if ( ! container ) {
            return;
        }

        button = container.getElementsByTagName( 'button' )[0];
        if ( 'undefined' === typeof button ) {
            return;
        }

        menu = container.getElementsByTagName( 'ul' )[0];

        // Hide menu toggle button if menu is empty and return early.
        if ( 'undefined' === typeof menu ) {
            button.style.display = 'none';
            return;
        }

        menu.setAttribute( 'aria-expanded', 'false' );

        if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
            menu.className += ' nav-menu';
        }

        button.onclick = function() {
            if ( -1 !== container.className.indexOf( 'toggled' ) ) {
                container.className = container.className.replace( ' toggled', '' );
                button.setAttribute( 'aria-expanded', 'false' );
                menu.setAttribute( 'aria-expanded', 'false' );
            } else {
                container.className += ' toggled';
                button.setAttribute( 'aria-expanded', 'true' );
                menu.setAttribute( 'aria-expanded', 'true' );
            }
        };
    } )();

    //smooth scroll to top
    $back_to_top.on('click', function(event){
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0 ,
            }, scroll_top_duration
        );
    });

    //revolution slider buttons delete effect
    jQuery('.rev_slider_wrapper .rev_slider .modeltheme_button').removeClass('animateIn').removeClass('animated');

    // contact form effect
    if (!String.prototype.trim) {
      (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
          return this.replace(rtrim, '');
        };
      })();
    }

    [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
      // in case the input is already filled..
      if( inputEl.value.trim() !== '' ) {
        classie.add( inputEl.parentNode, 'input--filled' );
      }

      // events:
      inputEl.addEventListener( 'focus', onInputFocus );
      inputEl.addEventListener( 'blur', onInputBlur );
    } );

    function onInputFocus( ev ) {
      classie.add( ev.target.parentNode, 'input--filled' );
    }

    function onInputBlur( ev ) {
      if( ev.target.value.trim() === '' ) {
        classie.remove( ev.target.parentNode, 'input--filled' );
      }
    }

    //moving slider
    var scrollSpeed = 60;        // Speed in milliseconds
    var step = 1;               // How many pixels to move per step
    var current = 0;            // The current pixel row
    var imageWidth = 3473;      // Background image width
    var headerWidth = 1170;     // How wide the header is.

    //The pixel row where to start a new loop
    var restartPosition = -(imageWidth - headerWidth);

    function scrollBg(){
        //Go to next pixel row.
        current += step;
        
        //If at the end of the image, then go to the top.
        if (current == restartPosition){
            current = 0;
        }
        
        //Set the CSS of the header.
        jQuery('.slider-moving').css("background-position",current+"px 0");
    }

    setInterval(scrollBg, scrollSpeed);

    //Calls the scrolling function repeatedly
    //Begin: Skills
    jQuery('.statistics').appear(function() {
        jQuery('.percentage').each(function(){
            var dataperc = jQuery(this).attr('data-perc');
            jQuery(this).find('.skill-count').delay(6000).countTo({
                from: 0,
                to: dataperc,
                speed: 5000,
                refreshInterval: 100
            });
        });
    }); 
    //End: Skills 
   
} (jQuery) );



//Begin: Mobile Navigation
(function ($) {
    
    $(document).ready(function () {
        MTMobileNavigationExpand.init();
    });
    
    $(window).resize(function(){
        MTMobileNavigationExpand.init();
    });
    
    var MTMobileNavigationExpand = {
        init: function () {
            var $nav_submenu = $(".navbar-collapse .menu-item-has-children");
            
            if ($nav_submenu.length) {
                $(function(){
                   if (jQuery(window).width() < 1100) {
                        var expand = '<span class="expand"><a class="action-expand"></a></span>';
                        jQuery('.navbar-collapse .menu-item-has-children, .navbar-collapse .mega_menu').each(function(){
                            if (!jQuery(this).find('.action-expand').length) {
                                jQuery('.navbar-collapse .menu-item-has-children, .navbar-collapse .mega_menu').append(expand);
                            }
                        });
                        jQuery('#navbar .sub-menu').hide();
                        jQuery(".menu-item-has-children .expand a").on("click",function() {
                            jQuery(this).parent().parent().find(' > ul').toggle();
                            jQuery(this).toggleClass("show-menu");
                        });
                        jQuery(".mega_menu .expand a").on("click",function() {
                            jQuery(this).parent().parent().find(' > .cf-mega-menu').toggle();
                            jQuery(this).toggleClass("show-menu");
                        });
                    }
                });
            }
        }
    };
    
})(jQuery);


(function ($) {
    if ($('div.about-video').length) {
        var rect = $('.about-video')[0].getBoundingClientRect();
        var mouse = {x: 0, y: 0, moved: false};

        $(".about-video").mousemove(function(e) {
          mouse.moved = true;
          mouse.x = e.clientX - rect.left;
          mouse.y = e.clientY - rect.top;
        });
         
        // Ticker event will be called on every frame
        TweenLite.ticker.addEventListener('tick', function(){
          if (mouse.moved){    
            parallaxIt(".tween-img", -30);
          }
          mouse.moved = false;
        });

        function parallaxIt(target, movement) {
          TweenMax.to(target, 0.5, {
            x: (mouse.x - rect.width / 2) / rect.width * movement,
            y: (mouse.y - rect.height / 2) / rect.height * movement
          });
        }

        $(window).on('resize scroll', function(){
          rect = $('.about-video')[0].getBoundingClientRect();
        })
    }
})(jQuery);