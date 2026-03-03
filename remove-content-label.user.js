// ==UserScript==
// @name         Remove Content Label
// @namespace    https://verygay.fyi
// @version      2026-03-03
// @description  removes tumblr's content label cover things
// @author       @queeeeeeeeeeeeeeeeeeeeeeeeeeer
// @match        https://*.tumblr.com/*
// @icon         https://raw.githubusercontent.com/VivIsBee/remove-tumblr-content-label/refs/heads/main/icon.png
// @grant        none
// @updateURL    https://github.com/VivIsBee/remove-tumblr-content-label/raw/refs/heads/main/remove-content-label.meta.js
// @downloadURL  https://github.com/VivIsBee/remove-tumblr-content-label/raw/refs/heads/main/remove-content-label.user.js
// @supportURL   https://github.com/VivIsBee/remove-tumblr-content-label
// @homepage     https://github.com/VivIsBee/remove-tumblr-content-label
// @sandbox      DOM
// @tag          social media
// @tag          utilities
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function removeCurrentCovers() {
        for (const cover of
             Array.from(
            document.querySelectorAll("div:has(> div[data-testid=\"community-label-cover\"])").values()
        ) // gets the stuff that covers content ^^^
             .filter((v) => v.style.display != 'none') // filter out ones that have already been gotten rid of
            ) { // loops through that
            cover.style.display = 'none'; // hide the covering things
            Array.from(cover.parentNode.childNodes.values()) // get the siblings of the covers which includes the actual content
                .filter((v) => v != cover) // filter out the cover
            [0] // get the actual content
                .style.height = "auto"; // override its constant height (to fit the cover exactly) with the default automatic height
        }
    }

    let lastKnownScrollPosition = 0;
    let lastParsedScrollPosition = 0;
    let ticking = false;

    document.addEventListener("scroll", (e) => {
        lastKnownScrollPosition = window.scrollY;

        if (!ticking) {
            // Throttle the event to remove covers every 20ms at most and wait until at least
            setTimeout(() => {
                if (Math.abs(lastParsedScrollPosition-lastKnownScrollPosition) >= 75) {
                    removeCurrentCovers();
                    lastParsedScrollPosition = lastKnownScrollPosition;
                }
                ticking = false;
            }, 20);

            ticking = true;
        }
    });

    removeCurrentCovers();
})();
