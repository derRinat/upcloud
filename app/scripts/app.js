/** Start application */

define(['underscore', 'backbone', 'model/App', 'view/App'], function(_, Backbone, AppModel, AppView) {

    'use strict';

    var app = function() {
        new AppView({model: AppModel});
    };

    return app;
});