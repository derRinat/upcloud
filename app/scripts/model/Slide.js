/** Slide model */

define(['backbone'], function(Backbone) {

    'use strict';

    var FeatureModel = Backbone.Model.extend({
        defaults: {
            source: '',
            active: false
        }
    });

    return FeatureModel;
})