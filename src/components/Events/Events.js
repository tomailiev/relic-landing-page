import { Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { downloadDocsV2, getLink } from "../../utils/firebase/firestore-funcs";
// import EventSkeleton from "./EventSkeleton";
import { useParams } from "react-router-dom";
import TextContext from "../../context/TextContext";
import { useTheme } from "@emotion/react";
// import Event from "./Event";
import EventCardNew from "./EventCardNew";
import EventCardSkeleton from "./EventCardSkeleton";
import { currentSeason } from "../../data/currentSeason";


const Events = () => {

    const { text } = useContext(TextContext);
    const [seasonAnnouncementPic, setSeasonAnnouncementPic] = useState(null);
    const [pastEvents, setPastEvents] = useState([]);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [hasUpdated, setHasUpdated] = useState(false);
    const { season } = useParams();
    const theme = useTheme();
    const smMatch = useMediaQuery(theme.breakpoints.down('md'));
    const year = season === 'past' ? Number(currentSeason.substring(0, 4)) : Number(season.substring(0, 4));
    const seasonStart = `${year}-08-01`;
    const seasonEnd = `${year + 1}-07-31`;

    useEffect(() => {
        const condition = season === 'past'
            ? { value: ['dateDone', '<', new Date(seasonStart)], type: 'condition' }
            : { value: ['dateDone', '>', new Date(seasonStart)], type: 'condition' };

        downloadDocsV2('events', [
            condition,
            { type: 'sorting', value: ['dateDone', season === 'past' ? 'desc' : 'asc'] }
        ])
            .then(docs => {
                const current = [];
                const past = [];
                const date = new Date();
                docs.forEach(item => {
                    item.dateDone.toDate() >= date
                        ? current.push(item)
                        : past.push(item);
                })

                setCurrentEvents(current.filter(i => i.dateDone.toDate() < new Date(seasonEnd)));
                setPastEvents(past.filter(i => i.dateDone.toDate() < new Date(seasonEnd)));
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
    }, [seasonStart, year, seasonEnd, season]);

    return (
        <>
            <Container maxWidth="lg" sx={{ my: 5, textAlign: 'center' }}>
                <Typography variant="h3" my={8} fontWeight={'600'}>
                    {season === 'past' ? 'Past Events' : `${year}-${(year + 1) % 2000} Concert Season`}
                </Typography>
                <Container sx={{ pb: 6 }}>
                    <Grid container spacing={4} direction="column">
                        {currentEvents.length
                            ? currentEvents.map((event, i) => (
                                <Grid item key={event.id}>
                                    <EventCardNew event={event} />
                                </Grid>
                            ))
                            : <></>
                        }
                        {pastEvents.length
                            ? pastEvents.map((event, i) => (
                                <Grid item key={event.id}>
                                    <EventCardNew event={event} past={true} key={`p${i}`} />
                                </Grid>
                            ))
                            : <></>
                        }
                    </Grid>
                </Container>

                {!currentEvents.length && !pastEvents.length
                    ? hasUpdated
                        ? <Container disableGutters sx={{ px: 1, py: 2, my: 2, }}>
                            {/* <Typography variant="h4" my={5}>{text.seasonAnnouncementText}</Typography> */}
                            {seasonAnnouncementPic
                                ? <img src={seasonAnnouncementPic} alt={text.seasonAnnouncementText} height={'auto'} width={smMatch ? '95%' : '65%'} />
                                : <Typography variant="h4" my={5}>{text.seasonAnnouncementText}</Typography>
                            }
                        </Container>
                        : Array.from({ length: 3 }).map((_, i) => <EventCardSkeleton key={i} />)
                    : <></>
                }
            </Container>
        </>
    );
};

export default Events;