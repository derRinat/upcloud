/** Features collection */

define(['backbone', 'model/Feature'], function(Backbone, Feature) {

    'use strict';

    var FeatureCollection = Backbone.Collection.extend({
        model: Feature
    });

    return FeatureCollection;
})