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
    actionCenterTitle: 'Join the Relic family!',
    actionCenterDonate: 'Help us bring music to communities across the country!',
    actionCenterSubscribe: 'Receive updates about our journey!',
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
    // siteHeading: 'RELIC',
    siteSubtitle: 'The period chamber orchestra dedicated to bringing early music to all 50 states',
    aboutBio: 'Relic is a conductorless period chamber orchestra that aims to connect with audiences through intimate, innovative and dramatic representations of early music, and to present these performances to communities in all 50 states. Members of Relic perform on original eighteenth century instruments, or their replicas, and are fluent in the improvisational and ornamental languages of the Baroque and Classical era.',
    aboutStory: 'Once upon a time, six musicians encountered each other frequently at various concerts, rehearsals, and social gatherings across the United States. Through the sharing of ideas and aspirations, they recognized a mutual spark: an impulse to contribute to the accessibility and expansion of early music in small and large communities around the country. Backstage chats, onstage synergy and shared commutes led to the foundation of strong friendships and deep musical bonds. In a heartbeat, Relic was born.',
    aboutMission: 'Relic’s mission is to present captivating live performances to communities across the country, especially those with little access to live early music. Relic strives to make early music accessible to people from all backgrounds through free concerts, open rehearsals, and educational events for students with no prior knowledge of early music.',
    aboutValues: 'We believe in working in a democratic, tolerant, and accepting environment, and we deeply value our supporters, audiences, volunteers, and fellow musicians. We are committed to bringing people from all backgrounds into our community.',
    mapText: "Relic is dedicated to bringing live music to communities across the United States (and the world)! In our first season we performed live concerts, outreach events, and children's concerts in {statesNum} states and Washington DC. Follow our journey here and use the interactive map to see when we visited each place!",
    supportSectionDonateTitle: 'CIRCLE OF SUPPORTERS',
    supportDonateNowTitle: 'Donate Now',
    supportDonateNowText: 'In order to sustain our mission and the ability to bring early music to communities across the continent, Relic relies on the generous support of our donors. All contributions are tax-deductible through our fiscal sponsorship status with GEMS (Gotham Early Music Scene, Inc) and donations of any size are greatly appreciated! Consider joining our Circle of Supporters and make a tax-deductible contribution today:',
    supportDonateNowNote: "Note: Upon clicking the above link, you will be redirected to our fiscal sponsor's donation platform. From there you will have the option of selecting your donation amount as well as the option of making a one-time or automatically renewable donation to Relic. All donations are tax-deductible.",
    supportDonateCheckTitle: 'Donate via check',
    supportDonateCheckText: 'Make checks payable to “GEMS”, specify "RELIC" in the memo, and mail to:',
    supportGemsAddress: 'Gotham Early Music Scene\\n340 Riverside Dr., 1A\\nNew York, NY 10025',
    supportMatchingTitle: 'Matching gifts',
    supportMatchingText: 'Double your gift by inquiring if your company will match your contribution to Relic. For help and more information about this, please contact Aniela Eddy at relicensemble@gmail.com.',
    supportOtherTitle: 'OTHER FORMS OF GIVING',
    supportOtherText: 'For corporate sponsorship, foundation and government funding, planned giving and legacy gifts, please contact Aniela Eddy at relicensemble@gmail.com for more information.',
    supportSectionJoinTitle: 'JOIN THE RELIC FAMILY NOW',
    supportJoinTitle: "Don't Miss A Beat",
    supportVolunteersTitle: 'Volunteers',
};

export default texts;