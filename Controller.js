/**
 * Yabbly Controller
 *
 * @author Sam Skjonsberg <sam@yabbly.com>
 */
define(function(require) {

    var Class                   = require('common/Class'),
        Promise                 = require('common/lib/Promise'),
        Http                    = require('common/Http'),
        ModuleController        = require('common/platform/ModuleController'),
        YabblyAPICredentials    = require('$MODULE_PATH/YabblyAPICredentials'),
        MockData                = require('$MODULE_PATH/MockData');

    return Class.create(
        ModuleController,
        {
            init : function() {
                // Empty, for now!
            },
            beforeStart : function() {
                var self = this;
                // Fetch questions and push them to the view once available
                this.getQuestions().done(function(questions) {
                    self.getView().setQuestions(questions);
                });
            },
            getQuestions : function() {
                var questionsReceived = new Promise();
                // Make an Http request
                Http.ajax({
                    url     : 'http://localhost:5000/rest/v1.0/question?&l=5',
                    headers : {
                        'x-yabbly-api-key'      : YabblyAPICredentials.API_KEY,
                        'x-yabbly-session-id'   : YabblyAPICredentials.SESSION_ID
                    },
                    complete : function(questions) {
                        // Resolve the promise with our data.  Unfortunately, we're using mock-data here
                        // due to a small bug we encountered during the development process
                        questionsReceived.resolve(MockData.questions);
                    }
                });
                return questionsReceived;
            }
        }
    );
});