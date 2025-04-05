// Script for Accordion only
(function( $ ) {
	'use strict';

	jQuery(document).ready(function() {
  		jQuery('.mt-addons-accordion-holder:first-child .mt-addons-accordion-header').addClass('active');
  		jQuery('.mt-addons-accordion-holder:first-child').addClass('active');
	});

	jQuery(".mt-addons-accordion-header").click(function(){
	    jQuery(".mt-addons-accordion-header").each(function(){
	      jQuery(this).parent().removeClass("active");
	      jQuery(this).removeClass("active");
	    });
	    jQuery(this).parent().addClass("active");
	    jQuery(this).addClass("active");
	});

})( jQuery );;
