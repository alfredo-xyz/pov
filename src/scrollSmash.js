/* global setInterval */
/* global jQuery */
/* global window */

/*! scrollSmash jQuery Plugin                      */
/* Version: 1.0.0                               */
/* by Alfredo Bermúdez ( Alf | Not The Alien )  */
/* http://alfredo.xyz                           */

(function( $ ) {
$.fn.scrollSmash = function(settings) {
    $.easing['easeOutExpo'] = function(x, t, b, c, d) {
       return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
      };
    return this.each(function() {
        var auto;
        var green = {
            smash: function(container, settings) {
                var t, i;
                green.config = {
                    section: "section",
                    sectionName: "section",
                    sectionOffset: "offset",
                    easing: "easeOutExpo",
                    windowScroll: true,
                    scrollSpeed: 1100,
                    offset: 0,
                    before: '',
                    after: '',
                    afterResize: '',
                    afterRender: '',
                    treshold: 0.1, //----------------Section Teshold Important 
                    menu: true, //generate-menu
                    menuHeader: '> .wrapper > h2'
                };
                $.extend(green.config, settings);
                green.timeout = null;
                green.container = container;
                green.offsetList = [];
                green.active = 1;
                green.treshold = 0;
                
                green.setTreshold();
                green.setOffsets();
                green.checkActive();
                green.scrollListener();
                
                $(window).resize(function () {
                    window.setTimeout(function(){
                        green.setTreshold();
                        green.setOffsets();
                        green.checkActive();
                    }, 200);
                    
                });
            },
            setOffsets: function() {
                var i = 0,
                    container;
                $(green.config.section).each(function () {
                    var offset;
                    if (green.config.windowScroll === true) {
                        offset = $(this).offset().top;
                    } else {
                        container = $(green.container);
                        offset = ($(this).position().top + container.scrollTop());
                    }
                    $(this).attr('data-' + green.config.sectionOffset, offset);
                    green.offsetList[i] = offset;
                    i++;
                });
            },
            
            checkActive: function (treshold) {
                var i,
                    container = green.checkContainer(),
                    sTop = container.scrollTop(),
                    offsets = green.offsetList,
                    offsetsLength = offsets.length;
                if (typeof treshold !== 'number') {
                    treshold = 0;
                }
                if (offsetsLength > 1) {
                    for (i = 0; i < (offsetsLength - 1); i++) {
                        if ((offsets[i] + treshold) <= sTop && sTop < (offsets[i+1] + treshold)) {
                            green.active = i + 1;
                        } else if (sTop >= (offsets[i+1] + treshold)) {
                            green.active = i + 2;
                        }
                    }
                } else {
                    green.active = 1;
                }
            },
            
            checkContainer: function() {
                var container;
                if (green.config.windowScroll === true) {
                    container = $(window);
                } else {
                    container = $(green.container);
                }
                return container;
            },
            
            setTreshold: function () {
                var h;
                if (green.config.treshold > 0 && green.config.treshold < 1) {
                    h = $(green.container).outerHeight();
                    green.treshold = h * green.config.treshold;
                }
            },
            
            scrollListener: function () {
                var container = green.checkContainer();
                container.on('scrollstart', function (event) {
                    if (typeof green.config.before == 'function') {
                        green.config.before(green.active);
                    }
                });
                container.on('scrollstop', function (event) {
                    var before = green.active;
                    green.checkActive(-green.treshold);
                    if (before !== green.active && typeof green.config.after == 'function') {
                        green.config.after(green.active);
                    }
                });
            }
        };
        $.extend(this, green);
        green.smash(this, settings);
    });
};
}( jQuery ));
