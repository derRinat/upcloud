/** Config our require.js first */

require.config({

    paths: {
        jquery    : 'vendor/jquery/dist/jquery.min',
        bootstrap : 'vendor/bootstrap/dist/js/bootstrap.min',
        underscore: 'vendor/underscore-amd/underscore-min',
        backbone  : 'vendor/backbone-amd/backbone-min',
        text      : 'vendor/requirejs-text/text',
        validator : 'vendor/validator-js/validator.min',

        config    : 'config/Config',

        model     : 'model/',
        collection: 'collection/',
        view      : 'view/',
        templates : 'template/'
    },

    shim : {
        bootstrap : {deps :['jquery'] }
    }
})

/** Bootstrap our app */

require(['app', 'config'], function(App) {

    // TODO: routes?

    'use strict';
    new App();
})