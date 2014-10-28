;
(function(window, undefined, bespoke) {
    "use strict";


    bespoke.plugins.state = function(deck) {
        deck.on('activate', function(e) {
            var state = e.slide.getAttribute('data-bespoke-state');
            if (state !== undefined) {
                deck.parent.className = state;
            }
        });
    };

    (function(bespoke) {

        bespoke.plugins.hash = function(deck) {
            var activeIndex,

                parseHash = function() {
                    var hash = window.location.hash.slice(1),
                        slideNumberOrName = parseInt(hash, 10);

                    if (hash) {
                        if (slideNumberOrName) {
                            activateSlide(slideNumberOrName - 1);
                        } else {
                            deck.slides.forEach(function(slide, i) {
                                slide.getAttribute('data-bespoke-hash') === hash && activateSlide(i);
                            });
                        }
                    }
                },

                activateSlide = function(index) {
                    if (index !== activeIndex) {
                        deck.slide(index);
                    }
                };

            setTimeout(function() {
                parseHash();

                deck.on('activate', function(e) {
                    var slideName = e.slide.getAttribute('data-bespoke-hash');
                    window.location.hash = slideName || e.index + 1;
                    activeIndex = e.index;
                });

                window.addEventListener('hashchange', parseHash);
            }, 0);
        };

    }(bespoke));

    (function() {
        'use strict';

        bespoke.horizontal.from('article', {
            state: true,
            hash: true
        });

        var i, image, j, matches, rules, sheet;

        if (document.styleSheets) {
            for (i = 0; i < document.styleSheets.length; ++i) {
                sheet = document.styleSheets[i];
                if (sheet.rules) {
                    for (j = 0; j < sheet.rules.length; ++j) {
                        rules = sheet.rules[j];
                        if (rules.style && rules.style.backgroundImage) {
                            matches = rules.style.backgroundImage.match(/url\((.*)\)/);
                            if (matches) {
                                image = new Image();
                                image.src = matches[1];
                            }
                        }
                    }
                }
            }
        }

    })();


})(window, undefined, bespoke);
