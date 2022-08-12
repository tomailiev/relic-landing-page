import { Grid, Skeleton, Typography, Container, Divider, List, Paper, Accordion, AccordionSummary, AccordionDetails, } from "@mui/material";
import musiciansBanner from '../../assets/banners/relic_musicians_960.webp';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PublicIcon from '@mui/icons-material/Public';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import StoryListItem from "./StoryListItem";
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Story = () => {

    const storyItems = [
        {
            text: 'Attend a concert', icon: <MusicNoteIcon />, more: [{
                type: 'route',
                route: '/events',
                itemText: 'See upcoming events',
                itemIcon: <ConfirmationNumberOutlinedIcon />
            }]
        },
        {
            text: 'Follow us on social media', icon: <PublicIcon />, more: [{
                type: 'link',
                route: 'https://www.facebook.com/RELIC-ensemble-109345125182475/',
                itemText: 'Facebook',
                itemIcon: <FacebookRoundedIcon />
            },
            {
                type: 'link',
                route: 'https://www.instagram.com/relic_ensemble/',
                itemText: 'Instagram',
                itemIcon: <InstagramIcon />
            }]
        },
        {
            text: 'Donate to our cause', icon: <LoyaltyIcon />, more: [
                {
                    type: 'link',
                    route: 'https://ci.ovationtix.com/35560/store/donations/47953',
                    itemText: 'Donate through GEMS',
                    itemIcon: <LoyaltyIcon />
                }
            ]
        }
    ];

    const qAndAs = [
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
    ]

    return (
        <>
            <Container disableGutters maxWidth={false}>
                <img src={musiciansBanner} width="100%" height={'auto'} alt="banner" />
                <Skeleton variant="rectangular" width={"100%"} height={'auto'} />
            </Container>
            <Container maxWidth="lg">
                <Typography variant="h3" textAlign={'center'} mb={3}>
                    Our Story
                </Typography>
                <Grid container spacing={3} my={2} component={Paper}>
                    <Grid item xs={12} md={8} p={3}>
                        <Typography mb={2}>
                            In a small, niched orbit of the classical music world six friends found each other: we regularly nerded out about anything historical performance, performed side by side in some of the world’s best baroque bands, and giggled the night away any chance we had. After frequently crossing paths, we recognized a growing synergy sparked by a mutual desire to expand the performance potential of early music. With excitement and delight, we founded Relic, a small chamber orchestra with the goal of producing textured, theatrical performances for an all-engaging experience. We’re inspired to usher baroque music in a fresh, spirited direction. Our aim is to create thoughtful performances at the highest level (albeit on a small budget); share the joy of our art; and educate the world about the rich, ornamental wonders of our first love, historical performance.
                        </Typography>
                        <Divider />
                        <Typography mt={2}>
                            We welcome you to our little niche and invite you to engage with us in any of these ways:
                        </Typography>
                        <List>
                            {storyItems.map(({ text, icon, more }) => <StoryListItem key={text} text={text} icon={icon} more={more} />)}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={4} p={3}>
                        <Typography variant="h4" textAlign={'center'} mb={1}>
                            Quick facts
                        </Typography>
                        {qAndAs.map(({ q, a }) => (
                            <Accordion key={q}>
                                <AccordionSummary
                                    expandIcon={<ChevronRightIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography variant="h6">{q}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography sx={{ whiteSpace: 'pre-line' }}>
                                        {a}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Story;