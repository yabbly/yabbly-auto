define(function(require) {

    const MOCK_DATA = {
        questions : [
            {
                id : 1,
                title : "Where do the locals eat?",
                responseCount : 4,
                body : "In the mood for something mid priced.",
                user : {
                    id : 1,
                    imageUrl : "http://yabbly.local:4000/image/profile/1?s=100"
                },
                responses : [
                    {
                        body : 'Oooh, you must try Bizaro Cafe.  Ask for the best seat in the house and get the Putanesca.',
                        helpfulCount : 8,
                        user : {
                            name : 'codeviking'
                        }
                    },
                    {
                        body : 'There\'s a whole lotta Thai options.  If you can find parking, try Thai Tom.  It\'s a few minutes from you.',
                        helpfulCount : 3,
                        user : {
                            name : 'tom'
                        }
                    },
                    {
                        body : 'Stop the car!  You\'re right next to my favorite ramen place (Aloha Ramen).',
                        helpfulCount : 1,
                        user : {
                            name : 'ian'
                        }
                    },
                    {
                        body : 'It\'s a 15 minute drive but I\'d head south to Matt\'s in the Market.  Based on your Tens list, I think you\'ll like it.',
                        helpfulCount : 2,
                        user : {
                            name : 'khaled'
                        }
                    }
                ]
            },
            {
                id : 2,
                title : "Best place for a family dinner?",
                responseCount : 3,
                body : "Kids say they want italian.",
                user : {
                    id : 1,
                    imageUrl : "http://yabbly.local:4000/image/profile/1?s=100"
                },
                responses : [
                    {
                        helpfulCount : 1,
                        body : 'Ridge Pizza has big tables and is choc full of kids.  Decent spaghetti and meatballs too!',
                        user : {
                            name : 'steven',
                        }
                    },
                    {
                        helpfulCount : 2,
                        body : 'There isn\tt great Italian where you are but if they want Pizza, I\'d go to Veraci and get some to go then eat it by Green Lake.',
                        user : {
                            name : 'tom'
                        }
                    },
                    {
                        helpfulCount : 4,
                        body : 'If the kids aren\'t too small, Brad\'s Swingside is surprisingly good but it\'s a pretty cozy place so not for toddlers!',
                        user : {
                            name : 'tedb'
                        }
                    }
                ]
            },
            {
                id : 3,
                title : "Best place for killer shopping?",
                body : "Wife is looking for new shoes.",
                responseCount : 3,
                user : {
                    id : 1,
                    imageUrl : "http://yabbly.local:4000/image/profile/1?s=100"
                },
                responses : [
                    {
                        helpfulCount : 0,
                        body : 'You\'ve got two options: Pacific Place or Bellevue Square.',
                        user : {
                            name : 'codeviking',
                        }
                    },
                    {
                        helpfulCount : 2,
                        body : 'You could try U Village but you\'re not far from Nordstrom flagship store.',
                        user : {
                            name : 'iamjane',
                        }
                    },
                    {
                        helpfulCount : 0,
                        body : 'SPONSORED: Market Street shoes is offering a 10% off coupon if you come in before 5PM.',
                        user : {
                            name : 'marketshoes',
                        }
                    }
                ]
            },
            {
                id : 4,
                title : "Best place for live entertainment?",
                body : "Looking for something chillaxing.",
                responseCount : 2,
                user : {
                    id : 1,
                    imageUrl : "http://yabbly.local:4000/image/profile/1?s=100"
                },
                responses : [
                    {
                        helpfulCount : 1,
                        body : 'Triple Door is good.  Feel free to call me and I can look up what\'s showing if you\'re driving.',
                        user : {
                            name : 'tom',
                        }
                    },
                    {
                        helpfulCount : 0,
                        body : 'I\'m traveling there next week, can you update this thread wherever u decide?',
                        user : {
                            name : 'flyfrank',
                        }
                    }
                ]
            }
        ]
    };

    return MOCK_DATA;

});