/** Feature model */

define(['backbone'], function(Backbone) {

    'use strict';

    var FeatureModel = Backbone.Model.extend({
        defaults: {
            text: ''
        }
    });

    return FeatureModel;
})