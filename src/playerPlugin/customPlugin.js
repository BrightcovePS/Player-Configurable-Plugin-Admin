/* eslint-disable */

/**

Copyright(c) 2015 Brightcove, Inc.

{CustomPlugin} PLUGIN

{Customize logo animations}
{Customize controlBar logos}
{Customize progress scrubber}

@author {Zhongqi Li}
@version 1.0.0

v1.0.0: {05/06/2019}
    {RELEASE NOTES}

*/

"use strict";

// replace name of plugin, then proceed to constructor function
var NAME = typeof predefinedConfig !== "undefined" ? predefinedConfig.pluginName : "CustomPlugin",

  /**
   * Constructor function for plugin. Place all code within.
   */
  constructor = function(config) {

    // reference to videojs wrapper
    var player = this,

      // direct reference to bcc core
      bcc = player ? player.bcc || {
        log: function() {},
        debug: false,
        settings: {}
      } : window.bcc,

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
    
    var initPlayer = function() {
      createBrandLogo();

      createScrubberLogo();

      addLeftLogoToControlBar();

      setCSS(document.getElementsByClassName("vjs-play-progress")[0], {
        backgroundColor: config.timeColor
      }); // Set progress color.

      player.one("play", onFirstTimePlay);

      player.on("timeupdate", onTimeUpdate);
    }

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
        top: -scrubberHeight / 2 + progressBarHeight / 2,
        right: tooltipRight === "auto" ? (-scrubberWidth / 2) : tooltipRight
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
      setCSS(sideLogoEl_, {
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

      setCSS(scrubberLogoEl_, {
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
    
    if (typeof predefinedConfig !== "undefined") {
      config = predefinedConfig
    }
    
    if (typeof player.bcc === "function") {
      bcc = player.bcc(config);
    }
    
    // load jQuery if needed
    if (config.jQuery && window.$ == undefined && bcc.settings.$ == undefined) {
      var script = document.createElement('script');
      script.onload = initPlayer;
      script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/" + config.jQuery + "/jquery.min.js");
      document.head.appendChild(script);
    }

    // return all public methods here
    return {};

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