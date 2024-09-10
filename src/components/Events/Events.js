import { Container, Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { downloadDocs, getLink } from "../../utils/firebase/firestore-funcs";
import EventCard from "./EventCard";
import EventInfo from "./EventInfo";
import EventSkeleton from "./EventSkeleton";
import { useParams } from "react-router-dom";
import TextContext from "../../context/TextContext";
import { useTheme } from "@emotion/react";


const Events = () => {

    const { text } = useContext(TextContext);
    const [seasonAnnouncementPic, setSeasonAnnouncementPic] = useState(null);
    const [events, setEvents] = useState([]);
    const [hasUpdated, setHasUpdated] = useState(false);
    let { year } = useParams();
    const theme = useTheme();
    const smMatch = useMediaQuery(theme.breakpoints.down('md'));

    year = Number(year.substring(0, 4));
    const seasonStart = `${year}-08-01`;
    const seasonEnd = `${year + 1}-08-01`;

    useEffect(() => {
        downloadDocs('events', ['dateDone', '>', new Date(seasonStart)], ['dateDone', 'desc'])
            .then(docs => {
                setEvents(docs.filter(i => i.dateDone.toDate() < new Date(seasonEnd)));
                return docs.length ? Promise.resolve(false) : getLink(`images/season_announcement_${year}.jpg`)
            })
            .then(result => {
                if (result) {
                    setSeasonAnnouncementPic(result)
                }
                setHasUpdated(true);
            })
            .catch(e => {
                setHasUpdated(true);
                console.error(e);
            })
    }, [seasonStart, year, seasonEnd]);

    return (
        <>
            <Container maxWidth="lg" sx={{ my: 5, textAlign: 'center' }}>
                <Typography variant="h3" my={8}>
                    {`${year}-${(year + 1) % 2000}`} Concert Season
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
                        ? <Container disableGutters sx={{ px: 1, py: 2, my: 2,}}>
                            {/* <Typography variant="h4" my={5}>{text.seasonAnnouncementText}</Typography> */}
                            {seasonAnnouncementPic
                                ? <img src={seasonAnnouncementPic} alt={text.seasonAnnouncementText} height={'auto'} width={smMatch ? '95%' : '65%'} />
                                : <Typography variant="h4" my={5}>{text.seasonAnnouncementText}</Typography>
                        }
                        </Container>
                        : <EventSkeleton />
                }
            </Container>
        </>
    );
};

export default Events;