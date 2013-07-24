/**
 * Yabbly View Controller
 *
 * @author Sam Skjonsberg <sam@yabbly.com>
 */
define(function(require) {

    var Class           = require('common/Class'),
        DOMHelper       = require('common/DOMHelper'),
        Model           = require('common/Model'),
        MCDEvent        = require('common/MCDEvent'),
        ArrayList       = require('common/ArrayList'),
        Pane            = require('common/ui/Pane'),
        ListView        = require('common/ui/ListView'),
        ListItemView    = require('common/ui/ListItemView'),
        ModuleView      = require('common/platform/ModuleView');

    var MenuItemView = Class.create(
        ListItemView,
        {
            _generateElement : function($super) {
                var li = document.createElement('li'),
                    icon = document.createElement('span');
                // If the model hs a response count, we're displaying a question.
                if(this.model.get('responseCount')) {
                    icon.textContent = this.model.get('responseCount');
                    icon.className = 'response-count';
                }
                // Otherwise we're displaying the "Ask Question" item and should display
                // the appropriate icon
                else {
                    icon.textContent = 'q';
                    icon.className = 'icon';
                }
                li.appendChild(document.createTextNode(this.model.get('text')));
                li.appendChild(icon);
                return li;
            }
        }
    );

    var QuestionDetailItemView = Class.create(
        ListItemView,
        {
            _generateElement : function($super) {
                var li = document.createElement('li'),
                    img = document.createElement('img');
                img.src = this.model.get('src');
                li.appendChild(img);
                li.appendChild(document.createTextNode(this.model.get('text')));
                return li;
            }
        }
    );

    const BASE_MENU_ITEMS = [
        new Model({ text: 'Ask a Question' })
    ];

    return Class.create(
        ModuleView,
        {
            /**
             * Setup the interface components that we'll need
             */
            init : function() {
                var self = this,
                    viewContainer = document.getElementById('view-container');


                this.menuItems  = new ArrayList(BASE_MENU_ITEMS);

                // Our list of menu items / questions
                this.menu       = new ListView({
                    id                  : 'list-questions',
                    arrayList           : this.menuItems,
                    listItemViewType    : MenuItemView,
                    itemClick           : function(listItem, menuItem) {
                        // If we're clicking a question, go to the question detail view
                        if(typeof menuItem.get('responseCount') !== 'undefined') {

                            // Remove any existing question details
                            self.questionDetails.clear();

                            // Add the question
                            self.questionDetails.push(
                                new Model({
                                    text : 'Q: ' + menuItem.get('body'),
                                    src : menuItem.get('user').imageUrl
                                })
                            );

                            // Add each of the question responses
                            menuItem.get('responses').forEach(function(response) {
                                self.questionDetails.push(
                                    new Model({
                                        text : '@' + response.user.name + ': ' + response.body,
                                        src : response.user.imageUrl
                                    })
                                );
                            });

                            requestAnimationFrame(function() {
                                // De-focus the menu
                                self.menu.blur();

                                // Once the transition is complete, focus the question list
                                DOMHelper.addSingleTransitionEndEventListener(
                                    viewContainer,
                                    function() {
                                        self.getBreadcrumb().set('subtitle', 'Question Details');
                                        self.menu.setFocusable(false);
                                        self.listQuestionDetails.setFocusable(true).focus();
                                    },
                                    '-webkit-transform'
                                );

                                // This triggers the transition that activates the question detail view
                                viewContainer.className += ' once-left';
                            });
                        }
                    }
                }).render(document.getElementById('question-view'));
                
                this.questionDetails = new ArrayList([]);

                // Our list of question details
                this.listQuestionDetails = new ListView({
                        focusable           : false,
                        arrayList           : this.questionDetails,
                        listItemViewType    : QuestionDetailItemView
                    })
                    .render(document.getElementById('question-detail-view'))
                    .addMCDEventListener(
                        MCDEvent.EventType.Joystick.LEFT,
                        function(e) {
                            // On joystick left, exist the question detail view and return to the home screen /
                            // main menu / question list
                            self.listQuestionDetails.blur()

                            // Once the transition is complete, focus the home menu
                            DOMHelper.addSingleTransitionEndEventListener(
                                viewContainer,
                                function() {
                                    self.getBreadcrumb().set('subtitle', '');
                                    self.listQuestionDetails.setFocusable(false);
                                    self.menu.setFocusable(true).requestFocus();
                                },
                                '-webkit-transform'
                            );

                            // Trigger the transition
                            viewContainer.className = viewContainer.className.replace('once-left', '');
                            e.preventDefault();
                        }
                    );
            },
            setQuestions : function(questions) {
                var self = this;

                // Upon receiving questions, push them into the main menu / question list
                questions.forEach(function(question) {
                    self.menuItems.push(
                        new Model({
                            text : question.title,
                            body : question.body,
                            responses : question.responses,
                            questionId : question.id,
                            user : question.user,
                            responseCount : question.responseCount
                        })
                    );
                });
            }
        }
    );
});