/*
 File name:          Custom JS
*/

// MAP PINS SHORTCODE
jQuery(document).ready(function(jQuery){
  //open interest point description
  jQuery('.bitwallet-single-point').children('a').on('click', function(){
    var selectedPoint = jQuery(this).parent('li');
    if( selectedPoint.hasClass('is-open') ) {
      selectedPoint.removeClass('is-open').addClass('visited');
    } else {
      selectedPoint.addClass('is-open').siblings('.bitwallet-single-point').removeClass('is-open');
    }
  });
  //close interest point description
  jQuery('.bitwallet-close-info').on('click', function(event){
    event.preventDefault();
    jQuery(this).parents('.bitwallet-single-point').eq(0).removeClass('is-open').addClass('visited');
  });
});

 jQuery( ".cd-pricing-switcher .monthly-label" ).on( "click", function() {
      jQuery( ".cd-pricing-switcher .yearly-label" ).removeClass('active');
      jQuery(this).addClass('active');
      jQuery('.package_price_per_year-parent').hide();
      jQuery('.package_price_per_month-parent').show();
    });
    jQuery( ".cd-pricing-switcher .yearly-label" ).on( "click", function() {
      jQuery( ".cd-pricing-switcher .monthly-label" ).removeClass('active');
      jQuery(this).addClass('active');
      jQuery('.package_price_per_month-parent').hide();
      jQuery('.package_price_per_year-parent').show();
    });
jQuery("[class$='mt_circle']").percircle();
  if ( jQuery( "#grid" ).length ) {
    (function() {
      function init() {
        var speed = 300,
          easing = mina.backout;
        [].slice.call ( document.querySelectorAll( '#grid a' ) ).forEach( function( el ) {
          var s = Snap( el.querySelector( 'svg' ) ), path = s.select( 'path' ),
            pathConfig = {
              from : path.attr( 'd' ),
              to : el.getAttribute( 'data-path-hover' )
            };
          el.addEventListener( 'mouseenter', function() {
            path.animate( { 'path' : pathConfig.to }, speed, easing );
          } );
          el.addEventListener( 'mouseleave', function() {
            path.animate( { 'path' : pathConfig.from }, speed, easing );
          } );
        } );
      }
      init();
    })();
  }

(function ($) {
  'use strict';
  jQuery( document ).ready(function() {
    /*
    * ||||||||||||||||||||||||||||||||||||||||||||||||||||||||-> TESTIMONIALS01 SLIDER (Shortcode)
    */
    jQuery(".testimonials-container").owlCarousel({
        navigation      : false, // Show next and prev buttons
        pagination      : true,
        autoPlay        : false,
        slideSpeed      : 700,
        paginationSpeed : 700,
        itemsCustom : [
            [0,     1],
            [450,   1],
            [600,   2],
            [700,   2],
            [1000,  2],
            [1200,  2],
            [1400,  2],
            [1600,  2]
        ]
    });
    jQuery(".members-container").owlCarousel({
        navigation      : false, // Show next and prev buttons
        pagination      : false,
        autoPlay        : false,
        slideSpeed      : 700,
        paginationSpeed : 700,
        singleItem      : true,
        itemsCustom : [
            [0,     1],
            [450,   1],
            [600,   1],
            [700,   1],
            [1000,  1],
            [1200,  1],
            [1400,  1],
            [1600,  1]
        ]
    });
    jQuery(".testimonials-container-1").owlCarousel({
        navigation      : true, // Show next and prev buttons
        navigationText: [
        "<i class='fa fa-long-arrow-left' aria-hidden='true'></i>",
        "<i class='fa fa-long-arrow-right' aria-hidden='true'></i>"
        ],
        pagination      : false,
        autoPlay        : false,
        slideSpeed      : 700,
        paginationSpeed : 700,
        itemsCustom : [
            [0,     1],
            [450,   1],
            [600,   1],
            [700,   1],
            [1000,  1],
            [1200,  1],
            [1400,  1],
            [1600,  1]
        ]
    });
    jQuery(".testimonials-container-2").owlCarousel({
        loop:true,
        margin:20,
        nav:true,
        autoPlay        : false,
        slideSpeed      : 700,
        paginationSpeed : 700,
        itemsCustom : [
            [0,     1],
            [450,   1],
            [600,   2],
            [700,   2],
            [1000,  2],
            [1200,  2],
            [1400,  2],
            [1600,  2]
        ]
    });
    jQuery(".testimonials-container-3").owlCarousel({
        navigation      : false, // Show next and prev buttons
        pagination      : false,
        autoPlay        : false,
        slideSpeed      : 700,
        paginationSpeed : 700,
        itemsCustom : [
            [0,     1],
            [450,   1],
            [600,   2],
            [700,   2],
            [1000,  3],
            [1200,  3],
            [1400,  3],
            [1600,  3]
        ]
    });
    /*
    * ||||||||||||||||||||||||||||||||||||||||||||||||||||||||-> TESTIMONIALS02 SLIDER (Shortcode)
    */
    jQuery(".testimonials02-container").owlCarousel({
      navigation      : false, // Show next and prev buttons
      pagination      : true,
      autoPlay        : true,
      slideSpeed      : 700,
      paginationSpeed : 700,
      navigationText  : ["<i class='icon-arrow-left'></i>","<i class='icon-arrow-right'></i>"],
      // navigationText  : ["",""],
      singleItem      : true
    });
    /*
    * ||||||||||||||||||||||||||||||||||||||||||||||||||||||||-> TWEETS SLIDER (Shortcode)
    */
    jQuery(".mt_tweets_slider").owlCarousel({
      navigation      : false, // Show next and prev buttons
      pagination      : false,
      autoPlay        : false,
      slideSpeed      : 700,
      paginationSpeed : 700,
      singleItem      : true
    });
    /*
    * ||||||||||||||||||||||||||||||||||||||||||||||||||||||||-> MEMBERS FANCY SLIDER (Shortcode)
    */
    jQuery(".mt_members_fancy_slider").owlCarousel({
      navigation      : false, // Show next and prev buttons
      pagination      : false,
      autoPlay        : false,
      slideSpeed      : 700,
      paginationSpeed : 700,
      autoPlay : true,
      autoPlayTimeout:10000,
      autoPlayHoverPause:true,
      itemsCustom : [
          [0,     1],
          [450,   1],
          [600,   2],
          [700,   2],
          [1000,  4],
          [1200,  4],
          [1400,  4],
          [1600,  4]
      ]
    });
    /*
    * ||||||||||||||||||||||||||||||||||||||||||||||||||||||||-> CLIENTS SLIDER (Shortcode)
    */
    jQuery(".clients_container_shortcode-1").owlCarousel({
        navigation      : false, // Show next and prev buttons
        pagination      : false,
        autoPlay        : false,
        slideSpeed      : 700,
        paginationSpeed : 700,
        autoPlay : true,
        autoPlayTimeout:10000,
        autoPlayHoverPause:true,
        itemsCustom : [
            [0,     1],
            [450,   1],
            [600,   1],
            [700,   1],
            [1000,  1],
            [1200,  1],
            [1400,  1],
            [1600,  1]
        ]
    });
    jQuery(".clients_container_shortcode-2").owlCarousel({
        navigation      : false, // Show next and prev buttons
        pagination      : false,
        autoPlay        : false,
        slideSpeed      : 700,
        paginationSpeed : 700,
        autoPlay : true,
        autoPlayTimeout:10000,
        autoPlayHoverPause:true,
        itemsCustom : [
            [0,     1],
            [450,   1],
            [600,   2],
            [700,   2],
            [1000,  2],
            [1200,  2],
            [1400,  2],
            [1600,  2]
        ]
    });
    jQuery(".clients_container_shortcode-3").owlCarousel({
        navigation      : false, // Show next and prev buttons
        pagination      : false,
        autoPlay        : false,
        slideSpeed      : 700,
        paginationSpeed : 700,
        autoPlay : true,
        autoPlayTimeout:10000,
        autoPlayHoverPause:true,
        itemsCustom : [
            [0,     1],
            [450,   1],
            [600,   2],
            [700,   2],
            [1000,  3],
            [1200,  3],
            [1400,  3],
            [1600,  3]
        ]
    });
    jQuery(".clients_container_shortcode-4").owlCarousel({
        navigation      : false, // Show next and prev buttons
        pagination      : false,
        autoPlay        : false,
        slideSpeed      : 700,
        paginationSpeed : 700,
        autoPlay : true,
        autoPlayTimeout:10000,
        autoPlayHoverPause:true,
        itemsCustom : [
            [0,     1],
            [450,   1],
            [600,   2],
            [700,   3],
            [1000,  4],
            [1200,  4],
            [1400,  4],
            [1600,  4]
        ]
    });
    jQuery(".clients_container_shortcode-5").owlCarousel({
        navigation      : false, // Show next and prev buttons
        pagination      : false,
        autoPlay        : false,
        slideSpeed      : 700,
        paginationSpeed : 700,
        autoPlay : true,
        autoPlayTimeout:10000,
        autoPlayHoverPause:true,
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
    jQuery(".clients_container_shortcode-6").owlCarousel({
        navigation      : false, // Show next and prev buttons
        pagination      : false,
        autoPlay        : false,
        slideSpeed      : 700,
        paginationSpeed : 700,
        autoPlay : true,
        autoPlayTimeout:10000,
        autoPlayHoverPause:true,
        itemsCustom : [
            [0,     2],
            [450,   2],
            [600,   2],
            [700,   3],
            [1000,  4],
            [1200,  4],
            [1400,  5],
            [1600,  6]
        ]
    });
    /*
    * ||||||||||||||||||||||||||||||||||||||||||||||||||||||||-> GET DIV HEIGHT (Shortcode) 
    */
    jQuery(document).ready( function() {
        var height = jQuery(".about_image").height();
        jQuery('.about_text_holder').css('height',height);
    });
    jQuery(document).ready( function() {
        var height = jQuery(".portfolio03_thumbnail").height();
        jQuery('.color_verlay_portfolio3').css('height',height);
    });
    jQuery(document).ready( function() {
        var height = jQuery(".color_verlay_portfolio3").height();
        jQuery('.portfolio03_title_subtitle_holder').css('height',height);
    });
    /*
    * ||||||||||||||||||||||||||||||||||||||||||||||||||||||||-> SERVICES SLIDER (Shortcode)
    */
    // SET LEFT SIDE height of RIGHT SIDE
    jQuery( '.right-side' ).ready(function() {
      var right_side_height = jQuery('.right-side').height();
      jQuery( '.left-side' ).height( right_side_height )
    });
    var sync1 = jQuery("#service_big_slides");
    var sync2 = jQuery("#service_small_slides");
   
    jQuery(".service_small_slides_holder .fa-angle-right").click(function(){
      sync1.trigger('owl.next');
    })
    jQuery(".service_small_slides_holder .fa-angle-left").click(function(){
      sync1.trigger('owl.prev');
    })
    sync1.owlCarousel({
      // mouseDrag: false,
      center:true,
      loop: true,
      navigationText:  ["<",">"],
      rewindNav: true,
      singleItem : true,
      slideSpeed : 1000,
      navigation: false,
      pagination: false,
      afterAction : syncPosition,
      responsiveRefreshRate : 200,
      afterInit : function(elem){
        this.jumpTo(1);
      }
    });
   
    sync2.owlCarousel({
      // mouseDrag: false,
      center:true,
      loop: true,
      items : 3,
      itemsDesktop      : [1199,3],
      itemsDesktopSmall     : [979,3],
      itemsTablet       : [768,3],
      itemsMobile       : [479,3],
      pagination:false,
      responsiveRefreshRate : 100,
      afterInit : function(el){
        el.find(".owl-item").eq(1).addClass("synced");
      }
    });
   
    function syncPosition(el){
      var current = this.currentItem;
      jQuery("#service_small_slides")
        .find(".owl-item")
        .removeClass("synced")
        .eq(current)
        .addClass("synced")
      if(jQuery("#service_small_slides").data("owlCarousel") !== undefined){
        center(current)
      }
    }
   
    jQuery("#service_small_slides").on("click", ".owl-item", function(e){
      e.preventDefault();
      var number = jQuery(this).data("owlItem");
      sync1.trigger("owl.goTo",number);
    });
   
    function center(number){
      var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
      var num = number;
      var found = false;
      for(var i in sync2visible){
        if(num === sync2visible[i]){
          var found = true;
        }
      }
   
      if(found===false){
        if(num>sync2visible[sync2visible.length-1]){
          sync2.trigger("owl.goTo", num - sync2visible.length+2)
        }else{
          if(num - 1 === -1){
            num = 0;
          }
          sync2.trigger("owl.goTo", num);
        }
      } else if(num === sync2visible[sync2visible.length-1]){
        sync2.trigger("owl.goTo", sync2visible[1])
      } else if(num === sync2visible[0]){
        sync2.trigger("owl.goTo", num-1)
      }
      
    }
    // Tabs
    jQuery('.naccs .menu div').click(function(){
      var tab_id = jQuery(this).attr('data-tab');
      jQuery('.naccs .menu div').removeClass('active');
      jQuery('.naccs ul li').removeClass('active');
      jQuery('.naccs .gc--1-of-3').removeClass('active');
      jQuery('.naccs .gc--2-of-3').removeClass('active');
      
      jQuery(this).parent().parent().addClass('active');
      jQuery("#"+tab_id).parent().parent().addClass('active');
      jQuery(this).addClass('active');
      jQuery("#"+tab_id).addClass('active');
    })
    //whmcs dropdown
    jQuery('.whmcs-bridge .navbar-collapse .nav .dropdown').hover(function(e){
      jQuery(this).find('.dropdown-menu').stop( true, false ).slideDown(300);
      }, function(e){
      jQuery(this).find('.dropdown-menu').stop( true, false ).slideUp(300);
    });
    if(jQuery("#bridge").length != 0) {
      jQuery('body').addClass('whmcs-bridge');
    }
  });
} (jQuery) )
