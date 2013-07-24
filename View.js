/**
 * Yabbly View Controller
 *
 * @author Sam Skjonsberg <sam@yabbly.com>
 */
define(function(require) {

    var Class = require('common/Class'),
        DOMHelper = require('common/DOMHelper'),
        Model = require('common/Model'),
        MCDEvent = require('common/MCDEvent'),
        ArrayList = require('common/ArrayList'),
        Pane = require('common/ui/Pane'),
        ListView = require('common/ui/ListView'),
        ListItemView = require('common/ui/ListItemView'),
        ModuleView = require('common/platform/ModuleView');

    var MenuItemView = Class.create(
        ListItemView,
        {
            _generateElement : function($super) {
                var li = document.createElement('li'),
                    icon = document.createElement('span');
                if(this.model.get('responseCount')) {
                    icon.textContent = this.model.get('responseCount');
                    icon.className = 'response-count';
                } else {
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
                Log.fatal(this.model.get('src'));
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
            init : function() {
                var self = this,
                    viewContainer = document.getElementById('view-container');

                this.menuItems  = new ArrayList(BASE_MENU_ITEMS);
                this.menu       = new ListView({
                    id : 'list-questions',
                    arrayList : this.menuItems,
                    listItemViewType : MenuItemView,
                    itemClick : function(listItem, menuItem) {
                        if(typeof menuItem.get('responseCount') !== 'undefined') {
                            self.questionDetails.clear();
                            self.questionDetails.push(
                                new Model({
                                    text : 'Q: ' + menuItem.get('body'),
                                    src : menuItem.get('user').imageUrl
                                })
                            );
                            menuItem.get('responses').forEach(function(response) {
                                self.questionDetails.push(
                                    new Model({
                                        text : '@' + response.user.name + ': ' + response.body,
                                        src : response.user.imageUrl
                                    })
                                );
                            });
                            requestAnimationFrame(function() {
                                self.menu.blur();
                                DOMHelper.addSingleTransitionEndEventListener(
                                    viewContainer,
                                    function() {
                                        self.getBreadcrumb().set('subtitle', 'Question Details');
                                        self.menu.setFocusable(false);
                                        self.listQuestionDetails.setFocusable(true).focus();
                                    },
                                    '-webkit-transform'
                                );
                                viewContainer.className += ' once-left';
                            });
                        }
                    }
                }).render(document.getElementById('question-view'));
                
                this.questionDetails = new ArrayList([]);
                this.listQuestionDetails = new ListView({
                        focusable : false,
                        arrayList : this.questionDetails,
                        listItemViewType : QuestionDetailItemView
                    })
                    .render(document.getElementById('question-detail-view'))
                    .addMCDEventListener(
                        MCDEvent.EventType.Joystick.LEFT,
                        function(e) {
                            self.listQuestionDetails.blur()
                            DOMHelper.addSingleTransitionEndEventListener(
                                viewContainer,
                                function() {
                                    self.getBreadcrumb().set('subtitle', '');
                                    self.listQuestionDetails.setFocusable(false);
                                    self.menu.setFocusable(true).requestFocus();
                                },
                                '-webkit-transform'
                            );
                            viewContainer.className = viewContainer.className.replace('once-left', '');
                            e.preventDefault();
                        }
                    );
            },
            setQuestions : function(questions) {
                var self = this;
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