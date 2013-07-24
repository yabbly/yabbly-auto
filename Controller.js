/**
 * Yabbly Controller
 *
 * @author Sam Skjonsberg <sam@yabbly.com>
 */
define(function(require) {

    var Class = require('common/Class'),
        Promise = require('common/lib/Promise'),
        Http = require('common/Http'),
        ModuleController = require('common/platform/ModuleController');

    const MOCK_QUESTIONS = [
        {
            id : 1,
            title : "What's a good place to eat?",
            responseCount : 3
        },
        {
            id : 2,
            title : "Where am I going?",
            responseCount : 5
        },
        {
            id : 3,
            title : "What's a good hotel nearby?",
            responseCount : 13
        }
    ];

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
                        'x-yabbly-api-key'      : 'S8Cj4G9bGFV5oxDHAwYrRjYdn5E9aEjl',
                        'x-yabbly-session-id'   : 'iiglza9bk4hurbdadwqudhii7rq7pd00'
                    },
                    complete : function(questions) {
                        questionsReceived.resolve(MOCK_QUESTIONS);
                    }
                });
                return questionsReceived;
            }
        }
    );
});