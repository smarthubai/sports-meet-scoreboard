(function( $ ) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	jQuery(document).ready(function () {
	    // Buttons
	    jQuery( ".mt-addons_button_holder .mt-addons_button" ).mouseover(function() {
	        // bg
	        var hover_color_bg = jQuery( this ).attr('data-bg-hover');
	        // color
	        var hover_color_text = jQuery( this ).attr('data-text-color-hover');
	        //border
	        var border_color_hover = jQuery( this ).attr('data-border-hover');

	        jQuery( this ).css("background",hover_color_bg);
	        jQuery( this ).css("color",hover_color_text);
	        jQuery( this ).css("border",border_color_hover);
	    }).mouseout(function() {

	        var color_text = jQuery( this ).attr('data-text-color');
	        var color_bg = jQuery( this ).attr('data-bg');
	        var border_color = jQuery( this ).attr('data-border');
	        
	        jQuery( this ).css("background",color_bg);
	        jQuery( this ).css("color",color_text);
	        jQuery( this ).css("border",border_color);
	    });
    });

})( jQuery );


// Row Overlay mover outside column WPBakery
(function ($) {
    
    $(document).ready(function () {
        MTAddonsRowOverlay.init();
    });
    
    var MTAddonsRowOverlay = {
        init: function () {
            var $rowOverlays = $('.modeltheme_addons_for_wpbakery-row-overlay');
            
            if ($rowOverlays.length) {
                $rowOverlays.each(function (i) {
                    var thisItem = $(this),
                        thisItemParent_InRow = $(this).parent().parent().parent().parent(),
                        thisItemParent_InCol = $(this).parent().parent(),
                        thisItem_data_in_col = $(this).attr('data-inner-column');
                    
                    if (thisItem_data_in_col == 'yes') {
                        // in col
                        thisItem.prependTo(thisItemParent_InCol);
                    }else{
                        // in row
                        thisItem.prependTo(thisItemParent_InRow);
                    }
                });
            }
        }
    };
    
})(jQuery);


jQuery(document).ready(function () {
    //Begin: Skills
    jQuery('.statistics').on('appear', function(){
    // jQuery('.statistics').appear(function() {
        jQuery('.percentage').each(function(){
            var dataperc = jQuery(this).attr('data-perc');
            jQuery(this).find('.mt-addons-skill-counter-value').delay(6000).countTo({
                from: 0,
                to: dataperc,
                speed: 5000,
                refreshInterval: 100
            });
        });
    });  
    //End: Skills 
});
jQuery(document).ready(function () {

    if ( jQuery( ".woocommerce_categories" ).length ) {
        
        jQuery(".category a").click(function () {
            var attr = jQuery(this).attr("class");

            jQuery(".products_by_category").removeClass("active");
            jQuery(attr).addClass("active");

            jQuery('.category').removeClass("active");
            jQuery(this).parent('.category').addClass("active");

        });  

        jQuery('.mt-addons-products-list-category .products_by_category:first').addClass("active");
        jQuery('.mt_addons_categories_shortcode .category:first').addClass("active");

    }
});;
