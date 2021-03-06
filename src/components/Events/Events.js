import { Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import eventsBanner from '../../assets/banners/banner_events.webp';
import { downloadDocs } from "../../utils/firebase/firestore-funcs";
// import eventsBanner from '../../assets/banners/recital-hall_banner.webp';
import EventCard from "./EventCard";
import EventInfo from "./EventInfo";

const Events = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        downloadDocs('events')
            .then(docs => {
                setEvents(docs);
            })
            .catch(console.error)
    }, []);

    return (
        <>
            <Container disableGutters maxWidth={false} sx={{ px: 0 }}>
                <img src={eventsBanner} width="100%" height={'auto'} alt="banner" />
            </Container>
            <Container maxWidth="lg" sx={{ my: 5, textAlign: 'center' }}>
                <Typography variant="h2" mb={3}>
                    Upcoming Events
                </Typography>
                {events.map(event => (
                    <Paper key={event.id} elevation={3} sx={{ p: 5 }}>
                        <Grid container spacing={6}>
                            <Grid item sm={12} md={5}>
                                <EventCard imageUrl={event.imageUrl} />
                            </Grid>
                            <Grid item sm={12} md={7} textAlign={'left'}>
                                <EventInfo event={event} />
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </Container>
        </>
        // <Box height={'500px'} display="flex" flexDirection="column" alignItems={"center"} justifyContent="center" textAlign={'center'} mx={2}>
        //     <Typography variant="h4">Inaugural week in Kalamazoo MI September 7-10, 2022</Typography>
        //     <Typography variant="h5">For more information <Button onClick={() => setDialog('subscription')}>Subscribe here</Button></Typography>
        // </Box>
    );
};

export default Events;