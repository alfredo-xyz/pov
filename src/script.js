/* global $ */
/* global window */
/* global document */
/* global Vimeo */

import ScrollReveal from '../node_modules/scrollreveal/src/scrollreveal.js';
import debounce from '../node_modules/lodash.debounce/index.js';
var DEF_DEBOUNCE = 100;
var sr = new ScrollReveal();
var modules = {
    toggleMenu: function() {
      $('.site-nav .trigger').toggleClass('show');
      $('.site-screen').toggleClass('show');
    },
    whichTransitionEvent: function() {
      /* From Modernizr */
      var t,
        el = document.createElement('fakeelement'),
        transitions = {
          transition: 'transitionend',
          OTransition: 'oTransitionEnd',
          MozTransition: 'transitionend',
          WebkitTransition: 'webkitTransitionEnd'
        };
      for (t in transitions) {
        if (el.style[t] !== undefined) {
          return transitions[t];
        }
      }
    },
    animatePie: function() {
      var loader = document.getElementById('pov-loader-circle'),
        α = 0,
        π = Math.PI;
      requestAnimationFrame(draw);
      function draw() {
        α += 30;
        α %= 360;
        var r = α * π / 180,
          x = Math.sin(r) * 50,
          y = Math.cos(r) * -50,
          mid = α > 180 ? 1 : 0,
          anim = 'M 0 0 v -50 A 50 50 1 ' + mid + ' 1 ' + x + ' ' + y + ' z';

        loader.setAttribute('d', anim);
        requestAnimationFrame(draw); // Redraw
      }
    },
    addVideo: function() {
      var vid = $('#videoBG');
      if (vid.length === 0) {
        $('#ss-container').append(
          '<video loop id="videoBG"><source src="../videos/demo-bg.webm" /><source src="../videos/demo-bg.mp4" /></video>'
        );
      }
    },
    addThumbVid: function() {
      $('[data-vid]').each(function() {
        $(this).append(
          '<video class="thumb-vid" loop><source src="../videos/' +
            $(this).data('vid') +
            '.webm" /><source src="../videos/' +
            $(this).data('vid') +
            '.mp4" /></video>'
        );
      });
    },
    changeIframeHeight: function(el) {
      var size = modules.scale(640, 360, 15, 1),
        w = size.width,
        h = size.height;
      $(el).children('iframe').attr('width', w).attr('height', h);
    },
    checkWindow: function() {
      var wWidth = $(window).width();
      if (wWidth > 600) {
        return true;
      } else {
        return false;
      }
    },
    hideEl: function(el) {
      $(el).each(function() {
        $(this).css('visibility', 'hidden');
      });
    },
    hideLoading: function() {
      demoBG.bindScroll();
      $('body').css('overflow', 'auto');
      $('div#pov-loading-container')
        .addClass('fade-out')
        .on(modules.whichTransitionEvent(), function() {
          $(this).hide();
          demoBG.video.play();
        });
      modules.startSRAbout();
      modules.startSR();
    },
    videoBGPause: function() {
      var vid = document.getElementById('videoBG');

      vid.pause();
    },
    videoBGPlay: function() {
      var vid = document.getElementById('videoBG');

      vid.play();
    },
    setVideoEvent: function(vidID, runThis) {
      var vid = '#' + vidID;

      $(vid).one('canplay', runThis);
    },
    startSR: function() {
      $('.work-list').each(function(sectionCounter) {
        var children = '#panel-' + (sectionCounter + 1) + ' .wrapper .tile';
        sr.reveal(
          children,
          {
            duration: 2000
          },
          100
        );
      });

      $('.audio-stripe').each(function(counter) {
        var delay = 0;
        switch (counter) {
          case 0:
            delay = 500;
            break;
          case 1:
            delay = 1000;
            break;
          case 2:
            delay = 1250;
            break;
          case 3:
            delay = 1500;
            break;
          case 4:
            delay = 1625;
            break;
        }
        sr.reveal(this, {
          viewFactor: 0.5,
          origin: 'bottom',
          distance: '50%',
          duration: 1000,
          delay: delay
        });
      });

      sr.reveal('.audio-content--panel', {
        duration: 1000,
        delay: 2125,
        viewFactor: 0.5
      });
    },
    startSRAbout: function() {
      sr.reveal('#service-wrapper h4', {
        duration: 1000,
        delay: 500,
        viewFactor: 0.5
      });
      sr.reveal('#about-wrapper .wrapper-bg-t', {
        distance: '100%',
        viewFactor: 0.5,
        scale: 1,
        duration: 1500
      });
      sr.reveal('a.next-section', {
        viewFactor: 0.5,
        duration: 1000,
        delay: 2500
      });
      sr.reveal('a.arrow-container', {
        viewFactor: 1,
        duration: 1000,
        delay: 500
      });
      sr.reveal('#service-wrapper > div', {
        duration: 1200,
        delay: 0,
        scale: 1,
        viewFactor: 0.8,
        distance: '50%'
      });
      sr.reveal(
        '.services li',
        {
          duration: 1500,
          viewFactor: 1,
          delay: 500
        },
        100
      );
      sr.reveal('#service-wrapper h4', {
        duration: 1000,
        delay: 2000,
        viewFactor: 1
      });
      sr.reveal('#bios-wrapper h2', {
        origin: 'top',
        scale: 1,
        distance: '100%',
        viewFactor: 0.8,
        duration: 1000
      });
      sr.reveal('.bio-wrapper:nth-of-type(even)', {
        origin: 'right',
        distance: '50%',
        viewFactor: 0.6,
        duration: 1000,
        delay: 250
      });
      sr.reveal('.bio-wrapper:nth-of-type(odd)', {
        origin: 'left',
        distance: '50%',
        viewFactor: 0.6,
        duration: 1000,
        delay: 250
      });
      sr.reveal('#awards-wrapper h2', {
        origin: 'top',
        distance: '100%',
        viewFactor: 0.6,
        duration: 1500
      });
      sr.reveal('#awards-wrapper .wrapper > ul > li:nth-of-type(odd)', {
        origin: 'left',
        distance: '50%',
        viewFactor: 0.6,
        duration: 1500,
        delay: 500
      });
      sr.reveal('#awards-wrapper .wrapper > ul > li:nth-of-type(even)', {
        origin: 'right',
        distance: '50%',
        viewFactor: 0.6,
        duration: 1200,
        delay: 1000
      });
    },
    showLoading: function() {
      $('div#pov-loading-container').show();
      modules.animatePie();
    },
    init: function() {
      var windowSize = modules.checkWindow();
      if (windowSize) {
        //Sroll Reveal Footer
        sr.reveal('footer .wrapper', {
          distance: '0',
          viewFactor: 0.5,
          scale: 1,
          duration: 1500
        });
      }
      $(function() {
        $('a[data-rel="inner"]').click(function() {
          if (
            location.pathname.replace(/^\//, '') ==
              this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
          ) {
            var target = $(this.hash);
            target = target.length
              ? target
              : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
              $('html, body').animate(
                {
                  scrollTop: target.offset().top - $('header').height()
                },
                1000
              );
              return false;
            }
          }
        });
      });
    },
    scale: function(width, height, padding, border) {
      var scrWidth = $(window).width() - 30,
        scrHeight = $(window).height() - 30,
        ifrPadding = 2 * padding,
        ifrBorder = 2 * border,
        ifrWidth = width + ifrPadding + ifrBorder,
        ifrHeight = height + ifrPadding + ifrBorder,
        h,
        w;
      if (ifrWidth < scrWidth && ifrHeight < scrHeight) {
        w = ifrWidth;
        h = ifrHeight;
      } else if (ifrWidth / scrWidth > ifrHeight / scrHeight) {
        w = scrWidth;
        h = scrWidth / ifrWidth * ifrHeight;
      } else {
        h = scrHeight;
        w = scrHeight / ifrHeight * ifrWidth;
      }
      return {
        width: w - (ifrPadding + ifrBorder),
        height: h - (ifrPadding + ifrBorder)
      };
    }
  },
  demoBG = {
    hasShowned: false,
    init: function(el) {
      var size = calcWidth(),
        options = {
          id: 170212310,
          width: size.width,
          loop: false
        };
      this.triggerRatio = 0.3;
      this.triggerRatio2 = 0.6;
      this.video = new Vimeo.Player(el, options);
      this.offset = $('.site-header').height();
      this.size = size;
      this.triggerPointPause = demoBG.offset;
      this.triggerPoint = calcTriggerPoint(demoBG.triggerRatio);
      this.triggerPoint2 = calcTriggerPoint(demoBG.triggerRatio2);
      this.bindScroll = function() {
        $(window).on('scroll.videoBG', debounce(onScroll, DEF_DEBOUNCE));
        function onScroll() {
          if ($(window).scrollTop() > demoBG.triggerPoint) {
            demoBG.video.getPaused().then(function(paused) {
              // paused = whether or not the player is paused
              if (paused === false) {
                demoBG.video.pause();
              }
            });
            $(window).off('scroll.videoBG');
          }
          if ($(window).scrollTop() > demoBG.triggerPoint2) {
            modules.videoBGPlay();
          }
        }
      };
      this.bindResize = function() {
        $(window).on('resize.videoBG', debounce(onResize, DEF_DEBOUNCE));
        function onResize() {
          demoBG.size = calcWidth();
          demoBG.triggerPointPause = calcTriggerPoint(demoBG.triggerRatioPause);
          demoBG.triggerPoint = calcTriggerPoint(demoBG.triggerRatio);
          demoBG.triggerPoint2 = calcTriggerPoint(demoBG.triggerRatio2);

          $('#demoBG iframe')
            .attr('width', demoBG.size.width)
            .attr('height', demoBG.size.height);
        }
      };

      function calcWidth() {
        var parent = $('#info-wrapper'),
          parentWidth = parent.width(),
          parentHeight = parent.height(),
          ratio1 = 1920 / 1080, // w | h
          ratio2 = 1080 / 1920, // h | w
          height = parseInt(parentWidth * ratio2),
          width = parseInt(parentHeight * ratio1),
          response = {};

        if (height <= parentHeight) {
          response.width = parentWidth;
          response.height = height;
        } else {
          response.width = width;
          response.height = parentHeight;
        }
        response.parentHeight = parentHeight;

        return response;
      }

      function calcTriggerPoint(ratio) {
        return demoBG.size.parentHeight * ratio - demoBG.offset;
      }
    }
  };

window.modules = modules;

$.fn.scrollMenu = function(options) {
  var elements = $(this),
    defaults = {
      targetAttr: 'href',
      topOffset: 0,
      pad: 0
    },
    objs = [],
    getData = function() {
      var target = {},
        offset = 0,
        me = $(this);

      target = $(me.attr(defaults.targetAttr));
      offset = target.offset().top;

      objs.push({
        jqElement: me,
        jqTarget: target,
        offset: offset
      });
    };
  $.extend(defaults, options);

  elements.each(getData);
  $(window).on('scroll', debounce(onScroll, DEF_DEBOUNCE)).on('resize', debounce(onResize, DEF_DEBOUNCE));

  return elements;

  function onResize() {
    elements.each(getData);
  }
  function onScroll() {
    var winOffset = $(window).scrollTop() + defaults.topOffset + defaults.pad,
      changeClass = function(obj) {
        obj.jqElement.addClass('active').siblings().removeClass('active');
      };
    objs.forEach(function(obj, index) {
      if (index < objs.length - 1) {
        if (winOffset >= obj.offset && winOffset < objs[index + 1].offset) {
          changeClass(obj);
        }
      } else {
        if (winOffset >= obj.offset) {
          changeClass(obj);
        }
      }
    });
  }
};

$(document).on('pagecontainerchange', function() {
  modules.init();

  $('.site-nav a[data-rel="inner"]').scrollMenu({
    topOffset: $('.site-header').height(),
    pad: 50
  });

  demoBG.init('demoBG__video');
  demoBG.bindResize();
});

$(document).on('mobileinit', function() {});

$(document).on('pagecreate', function() {
  $(window).scrollTop(0);
  $('body').css('overflow', 'hidden');
  $('iframe').attr('width', 0).attr('height', 'auto');

  $('.pop-up').on({
    popupbeforeposition: function() {
      // call our custom function scale() to get the width and height
      modules.changeIframeHeight(this);
      if (modules.checkWindow()) {
        modules.videoBGPause();
        $('body').css('overflow', 'hidden');
      }
    },
    popupafterclose: function() {
      $(this).children('iframe').attr('width', 0).attr('height', 0);
      if (modules.checkWindow()) {
        modules.videoBGPlay();

        $('body').css('overflow', 'auto');
      }
    }
  });
});

$(document).on('pagebeforeshow', function() {
  if (modules.checkWindow()) {
    modules.addVideo();

    modules.addThumbVid();

    //------ Bind Video thumb hover
    $('a[data-has-vid]').hover(
      function() {
        var vid = $(this).siblings('.image-bg').children('video');
        vid[0].play();
      },
      function() {
        var vid = $(this).siblings('.image-bg').children('video');
        vid[0].pause();
      }
    );
    setTimeout(function() {
      modules.hideLoading();
    }, 2000);
  }
});
