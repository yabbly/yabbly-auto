define(function(require) {

    const MOCK_DATA = {
        questions : [
            {
                id : 1,
                title : "What's a good place to eat?",
                responseCount : 3,
                body : "I'm in Portland for the weekend and am looking for a good place to get food.  Any suggestions?",
                user : {
                    id : 1,
                    imageUrl : "http://yabbly.local:4000/image/profile/1?s=100"
                },
                responses : [
                    {
                        body : 'Try voodoo doughnuts!!!',
                        helpfulCount : 8,
                        user : {
                            name : 'codeviking',
                            id : 133,
                            imageUrl : "http://yabbly.local:4000/image/profile/133?s=100"
                        }
                    }
                ]
            },
            {
                id : 2,
                title : "Where am I going?",
                responseCount : 5,
                body : "I have no idea where I'm driving",
                user : {
                    id : 1,
                    imageUrl : "http://yabbly.local:4000/image/profile/1?s=100"
                },
                responses : [
                    {
                        helpfulCount : 4,
                        body : 'No where!',
                        user : {
                            id : 133,
                            name : 'codeviking',
                            imageUrl : "http://yabbly.local:4000/image/profile/133?s=100"
                        }
                    },
                    {
                        helpfulCount : 1,
                        body : 'Somewhere!',
                        user : {
                            id : 2133,
                            name : 'tom',
                            imageUrl : "http://yabbly.local:4000/image/profile/2?s=100"
                        }
                    },
                ]
            },
            {
                id : 3,
                title : "What's a good hotel nearby?",
                body : "I need a place to stay!",
                responseCount : 13,
                user : {
                    id : 1,
                    imageUrl : "http://yabbly.local:4000/image/profile/1?s=100"
                },
                responses : [
                    {
                        helpfulCount : 3,
                        body : 'The Marriot!',
                        user : {
                            id : 133,
                            name : 'codeviking',
                            imageUrl : "http://yabbly.local:4000/image/profile/133?s=100"
                        }
                    }
                ]
            }
        ]
    };

    return MOCK_DATA;

});