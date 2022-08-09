import { Grid, Skeleton, Typography, Container, Divider, List, Paper, } from "@mui/material";
import musiciansBanner from '../../assets/banners/relic_musicians_960.webp';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PublicIcon from '@mui/icons-material/Public';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import StoryListItem from "./StoryListItem";
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';


const Story = () => {

    const storyItems = [
        {
            text: 'Attend a concert', icon: <MusicNoteIcon />, more: [{
                type: 'route',
                route: '/events',
                itemText: 'See events',
                itemIcon: <ConfirmationNumberOutlinedIcon />
            }]
        },
        { text: 'Follow us on social media', icon: <PublicIcon /> },
        { text: 'Donate to our cause', icon: <LoyaltyIcon /> }
    ];

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
                <Grid container spacing={3} my={2}>
                    <Grid item xs={12} md={8} component={Paper}>
                        <Typography mb={2}>
                            Tucked in a small niche of the classical music world six friends found each other; regularly nerding out about anything historical performance, performing side by side in some of the world’s best baroque bands, and giggling the night away any chance we have.
                            Over the course of a couple years of seeing each other at gigs we decided there was an opening in our small niche of classical music for us to do something different with our art. We put our heads and efforts together and founded RELIC, a small chamber orchestra with the goal of producing textured theatrical performances for an all-engaging experience. The combination of friendship and creating art together has motivated us to lead classical music in a new direction; creating productions at the highest level (albeit a small budget); sharing our art, engaging with, and inspiring new audiences; and accessibly educating the world about our first love, historical performance.
                        </Typography>
                        <Divider />
                        <Typography mt={2}>
                            We welcome you to our little niche and invite you to engage with us in any of these ways:
                        </Typography>
                        <List>
                            {storyItems.map(({ text, icon, more }) => <StoryListItem key={text} text={text} icon={icon} more={more} />)}
                        </List>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Story;