/* eslint-disable */
/**

Copyright(c) 2014 Brightcove, Inc.

BCC CORE PLUGIN / LIBRARY

Holds common functions for all BCC plugins/applications.
This plugin also serves as the centralized library through
which all other plugins are instantiated when using the Brightcove Player.

@author Todd Yard
@version 1.1.2

v1.0.0: 12/03/2014
    initial commit of functionality

v1.0.1: 3/03/2015
    allow for events to added in main config
    modify log() to log out object for single parameter

v1.0.2: 3/10/2015
    load jquery option

v1.0.3: 4/01/2015
    ensure bindings is not shared between EventDispatchers

v1.0.5: 6/16/2015
    adds constants to Model instances

v1.0.6: 6/17/2015
    allows unbind of all by passing no values to unbind

v1.0.7: 6/18/2015
    added getCSSNumber()

v1.0.8: 6/22/2015
    allow for jQuery no conflict

v1.0.9: 9/24/2015
    added forceHours to formatTime

v1.1.0: 12/17/2015
    added on, off, one to EventDispatcher
    added watch to Model

v1.1.1: 12/30/2015
    removed button code
    added initialized() method

v1.1.2: 2/22/2016
    throw exception for undefined module

*/
(function(window, document) {

    "use strict";

        /**
         * Constructor function called when DOM is ready. Contains all functionality
         */
    var constructor = function(options) {
            /**
             * Initializing the library that contains all core functionality for
             * smart TV apps and desktop video players.
             */
        var library = (function() {

                    /**
                     * Class used as Observer to allow for listeners and triggering events.
                     * All methods are added to the prototype after these variable declarations.
                     */
                var EventDispatcher = function() {},

                    /**
                     * Priority order that libraries should be initialized.
                     */
                    priority = {
                        APPLICATION_INITIALIZATION : 1500,
                        COMPONENT_INITIALIZATION : 1000
                    },

                    /**
                     * Object to hold all common events used in application.
                     * This can be updated by classes in each app.
                     */
                    events = {
                        INITIALIZED: "initialized", /* application has been created, usually dispatched in Main class */
                        SELECT: "select", /* UI element has been selected */
                        CHANGE: "change" /* UI element or state has changed */
                    },

                    /**
                     * Helper method to add events to events object so classes
                     * don't have to add directly to events. This would allow
                     * future logging or validation.
                     */
                    addEvents = function(newEvents) {
                        for (var i in newEvents) {
                            events[i] = newEvents[i];
                        };
                    },

                    /**
                     * Function to extend an object with other function and
                     * properties of other objects, allowing for simple inheritance.
                     */
                    extend = function(obj /*, arg1, arg2, ... */) {
                        var arg,
                            i,
                            k,
                            totalArgs = arguments.length;

                        for (i = 1; i < totalArgs; i++) {
                            arg = arguments[i];
                            for (k in arg) {
                                if (arg.hasOwnProperty(k)) {
                                    obj[k] = arg[k];
                                }
                            }
                        }
                        return obj;
                    },

                    /**
                     * Returns the value of a query arg on the web page path.
                     */
                    getQueryArg = function(name, querystring) {
                        var regex,
                            results;

                        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                        regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                        results = regex.exec((querystring || location.search));
                        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
                    },

                    /**
                     * Logs to the console when application is in debug mode.
                     */
                    log = function(message /*, message2, message3, ... */) {
                        var i,
                            messages = Array.prototype.slice.call(arguments);

                        if (bcc.settings.debug && window.console) {
                            if (arguments.length == 1) {
                                console.log(message);
                            } else {
                                console.log(messages.join(" | "));
                            }
                        }
                    },

                    /**
                     * Formats the time in seconds as a timecode string in the form
                     * hh:mm:ss or mm:ss, depending on if the time is over an hour.
                     */
                    formatTime = function(time, forceHours) {
                        var padDigit,
                            hours = 0,
                            minutes,
                            seconds;

                        padDigit = function(digit) {
                            return (digit >= 10) ? digit : "0" + digit;
                        };
                        minutes = Math.floor(time / 60);
                        seconds = padDigit(Math.floor(time % 60));

                        while (minutes >= 60) {
                            hours++;
                            minutes -= 60;
                        }
                        if (hours || forceHours) {
                            return hours + ":" + padDigit(minutes) + ":" + seconds;
                        }
                        return padDigit(minutes) + ":" + seconds;
                    },

                    /**
                     * Finds a particular element in the HTML by the query selector.
                     */
                    find = function(selector) {
                        return document.querySelector(selector);
                    },

                    /**
                     * Returns value from CSS as a number (in case it is a string with "px").
                     */
                    getCSSNumber = function(element, property) {
                        // IE9+
                        // @todo: IE8
                        var value = window.getComputedStyle(element).getPropertyValue(property),
                            num = parseInt(value, 10);

                        if (isNaN(num)) {
                            if (value && value.indexOf("px") > -1) {
                                num = parseInt(value.substr(value, value.length-2), 10);
                            } else {
                                num = 0;
                            }
                        }
                        return num;
                    },

                    /**
                     * Binds to the INITIALIZED event. Helper function.
                     */
                    initialized = function(handler, priority) {
                        this.bind(events.INITIALIZED, handler, priority);
                    },

                    /**
                     * Creates an event dispatching model of set properties
                     * with explicit getters and setters.
                     *
                     * @example
                     *      var model = new bcc.Model({
                     *          state:0, view:null
                     *      });
                     *      model.bind(bcc.events.CHANGE, function(event) {
                     *          if (event.property == "state") {
                     *              console.log( model.getState() );
                     *              console.log( event.value );
                     *          }
                     *      }
                     *      model.setState(1);
                     */
                    Model = function(p) {
                        var properties = {};
                        for (var i in p) {
                            properties[i] = p[i];
                            var initCapName = i.charAt(0).toUpperCase() + i.substr(1);
                            this["set" + initCapName] = (function(property) {
                                return function(value) {
                                    properties[property] = value;
                                    this.trigger(events.CHANGE, {property:property, value:value});
                                };
                            })(i);
                            this["get" + initCapName] = (function(property) {
                                return function() {
                                    return properties[property];
                                };
                            })(i);
                            this[i.toUpperCase()] = i;
                        }
                    },

                    // in the debug mode, log() calls will print out text to the consol
                    debug = options.debug = (options.debug || getQueryArg("debug") === "true");

                /**
                 * Binds a function handler to an event by the event name.
                 * A higher priority will mean the handler is called before others
                 * with lower or no priority.
                 */
                EventDispatcher.prototype.bind = EventDispatcher.prototype.on = function(type, handler, priority) {
                    var types = type.split(" ");
                    priority = priority || 0;
                    if (!this.bindings) this.bindings = {};
                    for (var i in types) {
                        type = types[i];
                        if (!this.bindings[type]) this.bindings[type] = [];
                        this.bindings[type].push({handler: handler, priority: priority});
                        this.bindings[type].sort(function(a, b) {
                            if (a.priority == b.priority) return 0;
                            return (a.priority > b.priority) ? 1 : -1;
                        });
                    }
                };
                /**
                 * Removes a particular handler from an event that was added with bind().
                 */
                EventDispatcher.prototype.unbind = EventDispatcher.prototype.off = function(type, handler) {
                    var i,
                        totalListeners,
                        listeners,
                        types;

                    if (!this.bindings || type == null) { this.bindings = {}; }
                    if (type == null) return;
                    types = type.split(" ");
                    for (var i in types) {
                        type = types[i];
                        listeners = this.bindings[type];
                        if (listeners == null) continue;
                        if (handler == null) {
                            delete this.bindings[type];
                        } else {
                            totalListeners = listeners.length;
                            for (i = totalListeners-1; i > -1; i--) {
                                if (listeners[i].handler == handler) {
                                    listeners.splice(i, 1);
                                }
                            }
                        }
                    }
                };
                /**
                 * Adds a handler for a single firing of an event, then removes it.
                 */
                EventDispatcher.prototype.one = function(type, handler, priority) {
                    var singleHandler = (function(event) {
                        handler(event);
                        this.off(type, singleHandler);
                    }).bind(this);
                    this.on(type, singleHandler, priority);
                };
                /**
                 * Causes the object to dispatch an event of the specified type.
                 * The data parameter is added to the data property of the event
                 * that is dispatched.
                 */
                EventDispatcher.prototype.trigger = function(type, data) {
                    if (!this.bindings) { this.bindings = {}; }
                    var i,
                        totalListeners,
                        handler,
                        listeners = this.bindings[type],
                        event = {type:type, data:data};

                    if (listeners == null) return;
                    totalListeners = listeners.length;
                    for (i = totalListeners-1; i > -1; i--) {
                        handler = listeners[i].handler;
                        if (handler.apply(handler, [event]) === false) break;
                    }
                };

                Model.prototype = new EventDispatcher();
                /**
                 * Registers a handler for a change event specific to a property.
                 */
                Model.prototype.watch = function(property, handler, priority) {
                    this.bind(events.CHANGE, function(event) {
                        if (event.data.property == property) {
                            handler({type:events.CHANGE, data:event.data.value});
                        }
                    }, priority);
                };

                // all the public methods of this library
                return {
                    EventDispatcher: EventDispatcher,
                    Model: Model,
                    priority: priority,
                    events: events,
                    addEvents: addEvents,
                    debug: debug,
                    log: log,
                    extend: extend,
                    getQueryArg: getQueryArg,
                    settings: extend({}, options),
                    find: find,
                    formatTime: formatTime,
                    getCSSNumber: getCSSNumber,
                    initialized: initialized
                };

            })(),

        // bcc as an object is made an EventDispatcher and assigned
        // all the methods of the library
        bcc = library.extend(new library.EventDispatcher(), library);
        bcc.addEvents(options.events);

        // in debug mode, all bcc libraries (there can be multiple, depending
        // on if there are multiple applications/players) are assigned an id
        // and placed within an array that is accessible in the console
        if (bcc.debug) {
            if (!window.bcc) {
                window.bcc = [];
            }
            bcc.id = window.bcc.length;
            window.bcc.push(bcc);
        }

        // if this for a Brightcove Player, bcc is assigned any modules
        // that were defined in the HTML/JS so that it can initialize them
        if (window.videojs) {
            var player = this,
                initModules = function() {
                    var modules = bcc.settings.modules || {};
                    for (var i in modules) {
                        try {
                            bcc[i] = player[i](modules[i]);
                        } catch (e) {
                            throw new Error("Problem with module: " + i);
                        }
                    }
                };

            this.bcc = bcc;

            // load jQuery if needed
            if (bcc.settings.jQuery && window.$ == undefined && bcc.settings.$ == undefined) {
                var script = document.createElement('script');
                script.onload = initModules;
                script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/" + bcc.settings.jQuery + "/jquery.min.js");
                document.head.appendChild(script);
            } else {
                bcc.settings.$ = bcc.settings.$ || window.$;
                initModules();
            }
        }
        // otherwise bcc is added a global object
        else {
            window.bcc = bcc;
        }

        return bcc;
    };

    // if this is for a Brightcove Player, add bcc as a VideoJS plugin
    if (window.videojs) {
        videojs.registerPlugin("bcc", constructor);
    }
    // else call the constructor directly
    else {
        constructor({});
    }

})(window, document);

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
    var NAME = "CustomPlugin",

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

    //log(NAME + " loaded.");
    // config = {
    //   jQuery: "1.7.2",
    //   accountId: "79558313",
    //   playBarLogo: "https://tracking.logobar.tv/uploads/25/1471371229.gif",
    //   playBarLogoHeight: 2,
    //   playBarLogoWidth: 6,
    //   brandLogo: "https://tracking.logobar.tv/uploads/25/1471371229.gif",
    //   brandLogoHeight: 5,
    //   brandLogoWidth: 16,
    //   logoAnime: "fly-down",
    //   logoPos: "upper-left",
    //   playerId: "LDOMfJufZ",
    //   scrubber: "https://tracking.logobar.tv/uploads/25/1471370800.png",
    //   timeColor: "#7ed321",
    //   videoId: "2784419339001"
    // };

    var logoPositions = {
      UPPER_LEFT: "upper-left",
      UPPER_RIGHT: "upper-right",
      LOWER_LEFT: "lower-left",
      LOWER_RIGHT: "lower-right",
      CENTER: "center"
    }

    var logoAnimations = {
      FLY_LEFT: "fly-left",
      FLY_RIGHT: "fly-right",
      FLY_UP: "fly-up",
      FLY_DOWN: "fly-down",
      FADE_OUT: "fade-out",
      SHRINK: "shrink"
    }

    var brandLogoEl_,
        sideLogoEl_,
        scrubberLogoEl_,
        progressBarEl_ = document.getElementsByClassName("vjs-play-progress")[0],
        controlBarEl_ = player.controlBar.el_;

    var onFirstTimePlay = function() {
      var tooltipRight = $(".vjs-time-tooltip").css("right");
      var tooltipTop = $(".vjs-time-tooltip").css("top");
      var scrubberHeight = $(scrubberLogoEl_).height();
      var scrubberWidth = $(scrubberLogoEl_).width();
      var progressBarHeight = $(progressBarEl_).height();
      
      $(scrubberLogoEl_).css({
        top: -scrubberHeight/2 + progressBarHeight/2,
        right: tooltipRight === "auto" ? (-scrubberWidth/2) : tooltipRight
      });
      
      performLogoAnimation();
    };

    var onTimeUpdate = function() {
      
    };

    var setCSS = function(element_, cssKVPairs) {
      for (var csskey in cssKVPairs) {
        element_.style[csskey] = cssKVPairs[csskey];
      }
    };

    bcc = player.bcc(config);

    var performLogoAnimation = function() {
      switch (config.logoAnime) {
        case logoAnimations.FLY_LEFT:
          $(brandLogoEl_).animate({
            left: "-20%"
          }, 3000);
          break;
        case logoAnimations.FLY_RIGHT:
          $(brandLogoEl_).animate({
            left: "120%"
          }, 3000);
          break;
        case logoAnimations.FLY_UP:
          $(brandLogoEl_).animate({
            top: "-20%"
          }, 3000);
          break;
        case logoAnimations.FLY_DOWN:
          $(brandLogoEl_).animate({
            top: "120%"
          }, 3000);
          break;
        case logoAnimations.FADE_OUT:
          $(brandLogoEl_).fadeOut(3000);
          break;
        case logoAnimations.SHRINK:
          $(brandLogoEl_).animate({
            height: "0rem",
            width: "0rem"
          }, 3000);
          break;
        default:
          $(brandLogoEl_).animate({
            top: "110%"
          }, 3000);
          break;
      }
    };

    var addLeftLogoToControlBar = function() {
       sideLogoEl_ = document.createElement("div");
       sideLogoEl_.id = "side-logo";
       sideLogoEl_.className = "vjs-control";
       setCSS(sideLogoEl_,
       {
         background: "url(" + config.playBarLogo + ")",
         backgroundRepeat: "no-repeat",
         backgroundSize: "contain",
         height: config.playBarLogoHeight + "rem",
         width: config.playBarLogoWidth + "rem"
       });

       controlBarEl_.insertBefore(sideLogoEl_, controlBarEl_.childNodes[0]);
    };

    var createBrandLogo = function() {
      brandLogoEl_ = document.createElement("div");
      brandLogoEl_.className = "brand-logo";
      var baseCSS = {
        background: "url(" + config.brandLogo + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        height: config.brandLogoHeight + "rem",
        width: config.brandLogoWidth + "rem"
      };
      var additionalCSS;
      switch (config.logoPos) {
        case logoPositions.UPPER_LEFT:
          additionalCSS = {
            position: "relative",
            left: "0rem",
            top: "0rem"
          };
          break;
        case logoPositions.UPPER_RIGHT:
          additionalCSS = {
            position: "relative",
            left: "0rem",
            top: "0rem",
            float: "right"
          };
          break;
        case logoPositions.LOWER_LEFT:
          additionalCSS = {
            position: "absolute",
            bottom: 0
          };
          break;
        case logoPositions.LOWER_RIGHT:
          additionalCSS = {
            position: "absolute",
            bottom: 0,
            right: 0
          };
          break;
        case logoPositions.CENTER:
          additionalCSS = {
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
          };
          break;
        default:
          additionalCSS = {
            position: "relative",
            left: "0rem",
            top: "0rem"
          };
          break;
      }
      setCSS(brandLogoEl_, Object.assign(baseCSS, additionalCSS));

      player.el_.appendChild(brandLogoEl_);
    };

    var createScrubberLogo = function() {
      scrubberLogoEl_ = document.createElement("div");
      scrubberLogoEl_.id = "scrubber-logo";

      setCSS(scrubberLogoEl_,
      {
        position: "absolute",
        background: "url(" + config.scrubber + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        float: "right",
        height: "2rem",
        width: "2rem"
      });

      player.controlBar.progressControl.seekBar.bar.el_.appendChild(scrubberLogoEl_);

    };

    createBrandLogo();

    createScrubberLogo();

    addLeftLogoToControlBar();

    setCSS(document.getElementsByClassName("vjs-play-progress")[0],
    { backgroundColor: config.timeColor }); // Set progress color.

    player.one("play", onFirstTimePlay);

    player.on("timeupdate", onTimeUpdate);



    // return all public methods here
    return {
    };

/* ============================================================================================ */
/* END BCC PLUGIN CODE                                                                          */
/* ============================================================================================ */

        };

    // if this is for a Brightcove Player, add bcc as a VideoJS plugin
    if (window.videojs) {
        videojs.registerPlugin(NAME, constructor);
    }
    // else call the constructor directly
    else {
        bcc[NAME] = constructor({});
    }

}(window, document));
