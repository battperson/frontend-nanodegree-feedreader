/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // and that it is not empty.

        it('url defined and not empty', function() {
            allFeeds.forEach(function(element) {
                expect(element.url.length).not.toBe(0);
                expect(element.url).toBeDefined();
            });

        });


        it('name defined and not empty', function() {
            allFeeds.forEach(function(element) {
                expect(element.name.length).not.toBe(0);
            });
            allFeeds.forEach(function(element) {
                expect(element.name).toBeDefined();
            });

        });
    });

// This section will test different parts of the menu as defined after the "it" statements

    describe('The menu', function() {
        var body =$('body'),
            result = body.hasClass('menu-hidden'),
            menuIcon = $('.menu-icon-link');

        it('menu default is hidden', function() {
            expect(result).toBe(true);
        });


        it('menu toggles when clicked', function() {
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        it('loadFeed is called', function() {
            var feedContainer = $('.feed').find("entry");
            expect(feedContainer.length).not.toBe(0);
        });
    });


    describe('New Feed Selection', function() {
        var entries, entries2;
        beforeEach(function(done) {
            loadFeed(0, function() {
                entries = $('.feed').find("article");

                loadFeed(1, function() {
                    entries2 = $('.feed').find("article");
                    done();
                });

          });
        });


        it('new feed is different to old one', function() {
            expect(entries).not.toBe(entries2);
        });
    });
}());
