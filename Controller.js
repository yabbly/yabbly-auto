/**
 * Yabbly Controller
 *
 * @author Sam Skjonsberg <sam@yabbly.com>
 */
define(function(require) {

    var Class = require('common/Class'),
        Promise = require('common/lib/Promise'),
        Http = require('common/Http'),
        ModuleController = require('common/platform/ModuleController'),
        MockData = require('$MODULE_PATH/MockData');

    return Class.create(
        ModuleController,
        {
            init : function() {
                // Empty, for now!
            },
            beforeStart : function() {
                var self = this;
                this.getQuestions().done(function(questions) {
                    self.getView().setQuestions(questions);
                });
            },
            getQuestions : function() {
                var questionsReceived = new Promise();
                Http.ajax({
                    url     : 'http://localhost:5000/rest/v1.0/question?&l=5',
                    // ZOMG the headers!
                    headers : {
                        'x-yabbly-api-key'      : 'ZOMGZ API KEY',
                        'x-yabbly-session-id'   : 'LOLLERSKATEZ A SESSION KEY'
                    },
                    complete : function(questions) {
                        // Oh noes, headers aren't sending!?
                        questionsReceived.resolve(MockData.questions);
                    }
                });
                return questionsReceived;
            }
        }
    );
});