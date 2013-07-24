/**
 * Yabbly View Controller
 *
 * @author Sam Skjonsberg <sam@yabbly.com>
 */
define(function(require) {

    var Class = require('common/Class'),
        Model = require('common/Model'),
        ArrayList = require('common/ArrayList'),
        ListView = require('common/ui/ListView'),
        ListItemView = require('common/ui/ListItemView'),
        ModuleView = require('common/platform/ModuleView');

    var MenuItem = Class.create(
        Model,
        {
            // Nothing special here (yet!)
        }
    );

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
                li.textContent = this.model.get('text');
                li.appendChild(icon);
                return li;
            }
        }
    );

    const BASE_MENU_ITEMS = [
        new MenuItem({ text: 'Ask a Question' })
    ];

    return Class.create(
        ModuleView,
        {
            init : function() {
                this.menuItems  = new ArrayList(BASE_MENU_ITEMS);
                this.menu       = new ListView({
                    id : 'list-menu',
                    arrayList : this.menuItems,
                    listItemViewType : MenuItemView
                }).render(document.body);
            },
            setQuestions : function(questions) {
                var self = this;
                questions.forEach(function(question) {
                    self.menuItems.push(
                        new MenuItem({
                            text : question.title,
                            id : question.id,
                            responseCount : question.responseCount
                        })
                    );
                });
            }
        }
    );
});