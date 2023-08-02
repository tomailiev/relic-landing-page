import { Container, Grid, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { downloadDocs } from "../../utils/firebase/firestore-funcs";
import EventCard from "./EventCard";
import EventInfo from "./EventInfo";
import EventSkeleton from "./EventSkeleton";
import { useParams } from "react-router-dom";
import TextContext from "../../context/TextContext";

const Events = () => {

    const { text } = useContext(TextContext);
    const [events, setEvents] = useState([]);
    const [hasUpdated, setHasUpdated] = useState(false);
    let { year } = useParams();
    year = Number(year);
    const date = new Date();
    const month = date.getMonth();
    const seasonSwitch = month >= 7;
    const seasonStart = seasonSwitch ? `${year}-08-01` : `${year - 1}-08-01`;

    useEffect(() => {
        downloadDocs('events', ['dateDone', '>', new Date(seasonStart)], ['dateDone', 'desc'])
            .then(docs => {
                setEvents(docs);
                setHasUpdated(true);
            })
            .catch(console.error)
    }, [seasonStart]);

    return (
        <>
            <Container maxWidth="lg" sx={{ my: 5, textAlign: 'center' }}>
                <Typography variant="h3" my={8}>
                    {seasonSwitch ? `${year}-${(year + 1) % 2000}` : `${year - 1}-${year % 2000}`} Concert Season
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
                    : hasUpdated
                        ? <Container disableGutters sx={{ px: 3, py: 2, my: 2 }}>
                            <Typography variant="h4" my={5}>{text.seasonAnnouncementText}</Typography>
                        </Container>
                        : <EventSkeleton />
                }
            </Container>
        </>
    );
};

export default Events;