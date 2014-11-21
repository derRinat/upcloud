/** Application model */

define(['backbone', 'config'], function(Backbone, Config) {

    'use strict';

    var defaultLocale = Config.locale.default;

    var AppModel = Backbone.Model.extend({
        defaults: {
            'locale'    : defaultLocale,
            'messages'  : Config.locale.available[defaultLocale].messages,
            'email'     : '',
            'password1' : '',
            'password2' : '',
            'valid'     : false
        }
    });

    return new AppModel();
})