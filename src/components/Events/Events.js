import { Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { downloadDocs } from "../../utils/firebase/firestore-funcs";
import EventCard from "./EventCard";
import EventInfo from "./EventInfo";
import EventSkeleton from "./EventSkeleton";

const Events = () => {

    const [events, setEvents] = useState([]);
    const date = new Date();
    const month = date.getMonth();
    const seasonSwitch = month >= 7;
    const year = date.getFullYear();
    const seasonStart = seasonSwitch ? `${year}-08-01` : `${year - 1}-08-01`;

    useEffect(() => {
        downloadDocs('events', ['dateDone', '>', new Date(seasonStart)], 'dateDone')
            .then(docs => {
                setEvents(docs);
            })
            .catch(console.error)
    }, [seasonStart]);

    return (
        <>
            {/* <Container disableGutters maxWidth={false} sx={{ px: 0 }}>
                <img src={allBanners.eventsBanner} width="100%" height={'auto'} alt="banner" />
            </Container> */}
            <Container maxWidth="lg" sx={{ my: 5, textAlign: 'center' }}>
                <Typography variant="h3" my={3}>
                    {seasonSwitch ? `${year} - ${year + 1}` : `${year - 1} - ${year}`} Season
                </Typography>
                {events.length
                    ? events.map(event => (
                        <Paper key={event.id} elevation={3} sx={{ p: 5, mb: 4 }}>
                            <Grid container spacing={6}>
                                <Grid item sm={12} md={5}>
                                    <EventCard imageUrl={event.imageUrl} url={event.eventUrl} />
                                </Grid>
                                <Grid item sm={12} md={7} textAlign={'left'}>
                                    <EventInfo event={event} />
                                </Grid>
                            </Grid>
                        </Paper>
                    ))
                    : <EventSkeleton />
                }
            </Container>
        </>
        // <Box height={'500px'} display="flex" flexDirection="column" alignItems={"center"} justifyContent="center" textAlign={'center'} mx={2}>
        //     <Typography variant="h4">Inaugural week in Kalamazoo MI September 7-10, 2022</Typography>
        //     <Typography variant="h5">For more information <Button onClick={() => setDialog('subscription')}>Subscribe here</Button></Typography>
        // </Box>
    );
};

export default Events;