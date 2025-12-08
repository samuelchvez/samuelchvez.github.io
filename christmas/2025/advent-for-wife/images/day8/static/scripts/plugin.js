;(function($, window, undefined){

    // Plugin definition
    $.fn.PLUGIN_NAME_HERE = function(options){
        
        // Options merge
        var opts = $.extend({}, $.fn.PLUGIN_NAME_HERE.defaults, options);

        /**
         * Chainability
         */
        return this.each(function(){

            // Current object to apply
            var $element = $(this);
        })
    }
    
    // Configuration defaults
    $.fn.PLUGIN_NAME_HERE.defaults = {
    }; 
})(jQuery, window);