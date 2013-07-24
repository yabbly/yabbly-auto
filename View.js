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
                var helpfulSpan, helpfulCount, thumbsUp, icon, username,
                    text    = document.createElement('span'),
                    li      = document.createElement('li');

                if(typeof this.model.get('username') !== 'undefined') {
                    username = document.createElement('span');
                    username.className = 'username';
                    username.textContent = this.model.get('username') + ':';
                    text.appendChild(username);
                }

                text.appendChild(document.createTextNode(this.model.get('text')));
                text.className = 'text';
                li.appendChild(text);
                if(typeof this.model.get('helpfulCount') !== 'undefined') {

                    helpfulSpan = document.createElement('span');
                    helpfulSpan.className = 'helpful-count';

                    helpfulCount = document.createElement('span');
                    helpfulCount.className = 'helpful-count-value';
                    helpfulCount.textContent = this.model.get('helpfulCount');

                    helpfulSpan.appendChild(helpfulCount);

                    thumbsUp = document.createElement('span');
                    thumbsUp.className = 'icon-font';
                    thumbsUp.textContent = 't';
                    helpfulSpan.appendChild(thumbsUp);

                    li.appendChild(helpfulSpan);
                } else {
                    icon = document.createElement('span');
                    icon.textContent = 'q';
                    icon.className = 'icon';
                    li.appendChild(icon);
                }
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
                    itemClick           : function(list, menuItem) {
                        // If we're clicking a question, go to the question detail view
                        if(typeof menuItem.get('responseCount') !== 'undefined') {

                            // Remove any existing question details
                            self.questionDetails.clear();

                            // Add the question
                            self.questionDetails.push(
                                new Model({
                                    text : menuItem.get('body')
                                })
                            );

                            // Add each of the question responses
                            menuItem.get('responses').forEach(function(response) {
                                self.questionDetails.push(
                                    new Model({
                                        text : response.body,
                                        username : '@' + response.user.name,
                                        helpfulCount : response.helpfulCount
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
                                        self.getBreadcrumb().set('subtitle', menuItem.get('text'));
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
                        itemClick           : function(list, detail) {
                            var isHelpful,
                                helpfulCount,
                                listItem = list.getSelectedElement();
                            if(typeof detail.get('helpfulCount') !== 'undefined') {
                                isHelpful = listItem.className.indexOf('is-helpful') !== -1;
                                helpfulCount = listItem.querySelector('.helpful-count-value');
                                if(isHelpful) {
                                    listItem.className = listItem.className.replace('is-helpful', '');
                                    helpfulCount.textContent = parseInt(helpfulCount.textContent, 10) - 1;
                                } else {
                                    listItem.className += ' is-helpful';
                                    helpfulCount.textContent = parseInt(helpfulCount.textContent, 10) + 1;
                                }
                            }
                        },
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