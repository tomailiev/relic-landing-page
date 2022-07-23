import { Container, Grid, Paper, Typography } from "@mui/material";
import eventsBanner from '../../assets/banners/banner_events.webp';
// import eventsBanner from '../../assets/banners/recital-hall_banner.webp';
import EventCard from "./EventCard";
import EventInfo from "./EventInfo";

const Events = () => {

    return (
        <>
            <Container disableGutters maxWidth={false} sx={{ px: 0 }}>
                <img src={eventsBanner} width="100%" height={'auto'} alt="banner" />
            </Container>
            <Container maxWidth="lg" sx={{ my: 5, textAlign: 'center' }}>
                <Typography variant="h2" mb={3}>
                    Upcoming Events
                </Typography>
                <Paper elevation={3} sx={{p:5}}>
                    <Grid container spacing={6}>
                        <Grid item sm={12} md={5}>
                            <EventCard />
                        </Grid>
                        <Grid item sm={12} md={7} textAlign={'left'}>
                            <EventInfo />
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
        // <Box height={'500px'} display="flex" flexDirection="column" alignItems={"center"} justifyContent="center" textAlign={'center'} mx={2}>
        //     <Typography variant="h4">Inaugural week in Kalamazoo MI September 7-10, 2022</Typography>
        //     <Typography variant="h5">For more information <Button onClick={() => setDialog('subscription')}>Subscribe here</Button></Typography>
        // </Box>
    );
};

export default Events;