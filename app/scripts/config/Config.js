/** Application config */

'use strict';

define( function(require) {
    return {
        locale: {
            available: {
                en_EN: {
                    title   : 'En',
                    messages : require('locale/en_EN')
                },
                de_DE: {
                    title   : 'De',
                    messages : require('locale/de_DE')
                }
            },
            default: 'en_EN'
        },
        features: {
            columnCount:2
        },
        register: {
            password: {
                minlength: 5,
                maxlength: 10
            }
        }
    }
})