/** Slides collection */

define(['backbone', 'model/Slide'], function(Backbone, Slide) {

    'use strict';

    var SlidesCollection = Backbone.Collection.extend({
        model: Slide
    });

    return SlidesCollection;
})