//QTY BOX SHOP
(function ($, elementor) {
    
    $(document).ready(function () {
        MTSwipperCarousel.init();
    });
    
    var MTSwipperCarousel = {
        init: function () {
            var sliders = $('.mt-addons-swipper');
            var page_builder;
            
            if (sliders.length) {
                sliders.each(function (i) {

                    // Getting swiper attrs
                    var thisItem = $(this),
                        thisItem_id = thisItem.attr('id'),
                        thisItem_id_attr = thisItem.attr('data-swiper-id'),
                        autoplay = thisItem.attr('data-swiper-autoplay'),
                        delay = thisItem.attr('data-swiper-delay'),
                        slides_per_view = thisItem.attr('data-swiper-desktop-items'),
                        slides_per_view_mobile = thisItem.attr('data-swiper-mobile-items'),
                        slides_per_view_tablet = thisItem.attr('data-swiper-tablet-items'),
                        space_between = thisItem.attr('data-swiper-space-between-items'),
                        allow_touch_move = thisItem.attr('data-swiper-allow-touch-move'),
                        effect = thisItem.attr('data-swiper-effect'),
                        grab_cursor = thisItem.attr('data-swiper-grab-cursor'),
                        infinite_loop = thisItem.attr('data-swiper-infinite-loop'),
                        centered_slides = thisItem.attr('data-swiper-centered-slides'),
                        grid_rows = thisItem.attr('data-swiper-grid-rows'),
                        navigation = thisItem.attr('data-swiper-navigation'),
                        pagination = thisItem.attr('data-swiper-pagination');

                        
                    if(page_builder == 'elementor' && autoplay == "yes") { 
                      autoplay = true;
                    }else {
                      if(autoplay == "true") { 
                      autoplay = true;
                      }
                    }
                    // if (autoplay == 'true') {
                    //     autoplay = true;
                    // }else{
                    //     autoplay = false;
                    // }
                    if (delay != '') {
                        delay = parseInt(delay);
                    }
                    if (slides_per_view_mobile == '') {
                        slides_per_view_mobile = '1';
                    }
               
                    if (slides_per_view_tablet == '') {
                        slides_per_view_tablet = '1';
                    }
                    if (space_between == '') {
                        space_between = 30;
                    }else{
                        space_between = parseInt(space_between);
                    }
                    if(page_builder == 'elementor' && allow_touch_move == "yes") { 
                      allow_touch_move = true;
                    }else {
                      if(allow_touch_move == "true") { 
                      allow_touch_move = true;
                      }
                    }
                    // if (allow_touch_move == 'yes') {
                    //     allow_touch_move = true;
                    // }else{
                    //     allow_touch_move = false;
                    // }
                    if(page_builder == 'elementor' && grab_cursor == "yes") { 
                      grab_cursor = true;
                    }else {
                      if(grab_cursor == "true") { 
                      grab_cursor = true;
                      }
                    }
                    // if (grab_cursor == 'true') {
                    //     grab_cursor = true;
                    // }else{
                    //     grab_cursor = false;
                    // }
                    if(page_builder == 'elementor' && infinite_loop == "yes") { 
                      infinite_loop = true;
                    }else {
                      if(infinite_loop == "true") { 
                      infinite_loop = true;
                      }
                    }
                    // if (infinite_loop == 'true') {
                    //     infinite_loop = true;
                    // }else{
                    //     infinite_loop = false;
                    // }
                    if (navigation == 'true') {
                      navigation = true;
                    }else{
                      navigation = false;
                    }
                    if(page_builder == 'elementor' && navigation == "yes") { 
                      navigation = true;
                    }else {
                      if(navigation == "true") { 
                      navigation = true;
                      }
                    }

                    // if (pagination == 'true') {
                    //   pagination = true;
                    // }else{
                    //   pagination = false;
                    // }
                    if(page_builder == 'elementor' && pagination == "yes") { 
                      pagination = true;
                    }else {
                      if(pagination == "true") { 
                      pagination = true;
                      }
                    }
                    if (grid_rows == '') {
                        grid_rows = 2;
                    }else{
                        grid_rows = parseInt(grid_rows);
                    }
                    // alert(rows);

                    var identifier = "#"+thisItem_id;
                    var settings = {
                        autoplay        : autoplay,
                        delay           : delay,
                        slidesPerView   : slides_per_view,
                        // slidesPerColumn: grid_rows,


                        effect: effect,
                        grabCursor: grab_cursor,
                        centeredSlides: centered_slides,
                        // grid: {
                        //   rows: 2,
                        // },
                        creativeEffect: {
                          prev: {
                            shadow: true,
                            translate: [0, 0, -400],
                          },
                          next: {
                            translate: ["100%", 0, 0],
                          },
                        },
                        coverflowEffect: {
                          rotate: 50,
                          stretch: 0,
                          depth: 100,
                          modifier: 1,
                          slideShadows: true,
                        },
                        cubeEffect: {
                          shadow: true,
                          slideShadows: true,
                          shadowOffset: 20,
                          shadowScale: 0.94,
                        },
                        direction : 'horizontal',
                        loop: infinite_loop,
                        pagination: {
                          el: "#"+thisItem_id+" .swiper-pagination",
                          clickable: true,
                          dynamicBullets: true,
                        },
                        allowTouchMove: allow_touch_move,
                        navigation: {
                          nextEl: "#"+thisItem_id+" .swiper-button-next",
                          prevEl: "#"+thisItem_id+" .swiper-button-prev",
                        },
                        spaceBetween: space_between,
                        breakpoints: {
                            // when window width is >= 320px
                            320: {
                              slidesPerView: slides_per_view_mobile,
                            },
                            640: {
                              slidesPerView: slides_per_view_tablet,
                            },
                            // when window width is >= 480px
                            768: {
                              slidesPerView: slides_per_view_tablet,
                            },
                            // when window width is >= 640px
                            1024: {
                              slidesPerView: slides_per_view,
                            }
                        }
                    }

                    // if ('undefined' === typeof Swiper) {
                      const swiper = new Swiper(identifier, settings);
                    // } else {
                      // alert('33');
                      // var swiper = new Swiper($slider, $SliderOptions);
                    // }

                });
            }
        }
    };
    
})(jQuery);;
