/**

Copyright(c) 2015 Brightcove, Inc.

{NAME} PLUGIN

{DESCRIPTION}

@author {AUTHOR}
@version 1.0.0

v1.0.0: {DATE}
    {RELEASE NOTES}

*/
(function(window, document) {

    "use strict";

    // replace name of plugin, then proceed to constructor function
    var NAME = "PLUGIN_NAME",

        /**
         * Constructor function for plugin. Place all code within.
         */
        constructor = function(config) {

            // reference to videojs wrapper
            var player = this,

                // direct reference to bcc core
                bcc = player ? player.bcc || {log:function(){}, debug:false} : window.bcc,
            
                // local reference to log function
                log = bcc.log,
                
                // flag for debug mode
                debug = bcc.debug;
        
/* ============================================================================================ */
/* ALL CODE SHOULD BE PLACED WITHIN FOLLOWING FUNCTION                                          */
/* ============================================================================================ */
    
    log(NAME + " loaded.");

    // return all public methods here
    return {
    };

/* ============================================================================================ */
/* END BCC PLUGIN CODE                                                                          */
/* ============================================================================================ */

        };

    // if this is for a Brightcove Player, add bcc as a VideoJS plugin
    if (window.videojs) {
        videojs.plugin(NAME, constructor);
    }
    // else call the constructor directly
    else {
        bcc[NAME] = constructor({});
    }

}(window, document));