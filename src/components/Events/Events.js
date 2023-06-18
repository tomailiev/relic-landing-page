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
        downloadDocs('events', ['dateDone', '>', new Date(seasonStart)], ['dateDone', 'desc'])
            .then(docs => {
                setEvents(docs);
            })
            .catch(console.error)
    }, [seasonStart]);

    return (
        <>
            <Container maxWidth="lg" sx={{ my: 5, textAlign: 'center' }}>
                <Typography variant="h3" my={8}>
                    {seasonSwitch ? `${year}-${(year + 1) % 2000}`:`${year - 1}-${year % 2000}`} Concert Season
                </Typography>
                {events.length
                    ? events.map(event => (
                        <Paper key={event.id} elevation={3} sx={{ py: 5, px: 2, mb: 4 }}>
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
    );
};

export default Events;