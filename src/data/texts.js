const texts = {
    storyGroupBio: 'In a small, niched orbit of the classical music world six friends found each other: we regularly nerded out about anything historical performance, performed side by side in some of the world’s best baroque bands, and giggled the night away any chance we had. After frequently crossing paths, we recognized a growing synergy sparked by a mutual desire to expand the performance potential of early music. With excitement and delight, we founded Relic, a small chamber orchestra with the goal of producing textured, theatrical performances for an all-engaging experience. We’re inspired to usher baroque music in a fresh, spirited direction. Our aim is to create thoughtful performances at the highest level; share the joy of our art; and educate the world about the rich, ornamental wonders of our first love, historical performance.',
    storyAddress: 'We welcome you to our little niche and invite you to engage with us in any of these ways:',
    storyQandAs: [
        {
            q: 'What we are',
            a: 'A conductor-less chamber orchestra focused on performing baroque and early classical music on period instruments'
        },
        {
            q: 'When we were founded',
            a: 'April 2022'
        },
        {
            q: 'How big we are',
            a: 'We have six founding members and our programs usually feature between nine and twelve musicians'
        },
        {
            q: 'What music we play',
            a: 'We perform baroque and early classical repertoire on gut strings and period instruments'
        },
        {
            q: 'What our goals are',
            a: '- To bring early music to all 50 states;\n- To share our art, engage with, and inspire audiences;\n- To accessibly educate new audiences about historical performance.'
        }
    ],
    storyActionItems: [
        {
            text: 'Attend a concert', icon: 'MusicNote', more: [{
                type: 'route',
                route: '/events',
                itemText: 'See upcoming events',
                itemIcon: 'ConfirmationNumberOutlined'
            }]
        },
        {
            text: 'Follow us on social media', icon: 'Public', more: [{
                type: 'link',
                route: 'https://www.facebook.com/RELIC-ensemble-109345125182475/',
                itemText: 'Facebook',
                itemIcon: 'FacebookRounded'
            },
            {
                type: 'link',
                route: 'https://www.instagram.com/relic_ensemble/',
                itemText: 'Instagram',
                itemIcon: 'Instagram'
            }]
        },
        {
            text: 'Donate to our cause', icon: 'Loyalty', more: [
                {
                    type: 'link',
                    route: 'https://ci.ovationtix.com/35560/store/donations/47953',
                    itemText: 'Donate through GEMS',
                    itemIcon: 'Loyalty'
                }
            ]
        }
    ],
    actionCenterTitle: 'Become our friend!',
    actionCenterDonate: 'Help us bring our music to communities across the United States!',
    actionCenterSubscribe: 'Get updates on our journey in your inbox!',
    footerGemsNote: 'Relic is a fiscal project of Gotham Early Music Scene, Inc., a 501(c)(3) non-profit organization registered in the State of New York. Your contribution is tax deductible to the full extent of the law.',
    subscribeTitle: 'Subscribe to our list!',
    contentSections: [
        {
            infoTitle: 'Upcoming events',
            infoText: 'Find out where you can see us live next!',
            cardImage: 'eventsImage',
            cardTitle: 'See events',
            cardTexts: [''],
            buttonText: '',
            route: '/events'
        },
        {
            infoTitle: 'Our Musicians',
            infoText: 'Find out who we are and what we do!',
            cardImage: 'musicianImage',
            cardTitle: 'Our musicians',
            cardTexts: ['PC: John Lacko'],
            buttonText: '',
            route: '/musicians'
        }
    ],
    siteHeading: 'RELIC',
    siteSubtitle: 'The period chamber orchestra dedicated to bringing early music to all 50 states'
};

export default texts;