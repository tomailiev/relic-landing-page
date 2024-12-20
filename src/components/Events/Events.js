import { Container, Typography, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { downloadDocsV2, getLink } from "../../utils/firebase/firestore-funcs";
import EventSkeleton from "./EventSkeleton";
import { useParams } from "react-router-dom";
import TextContext from "../../context/TextContext";
import { useTheme } from "@emotion/react";
import Event from "./Event";


const Events = () => {

    const { text } = useContext(TextContext);
    const [seasonAnnouncementPic, setSeasonAnnouncementPic] = useState(null);
    const [pastEvents, setPastEvents] = useState([]);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [hasUpdated, setHasUpdated] = useState(false);
    let { year } = useParams();
    const theme = useTheme();
    const smMatch = useMediaQuery(theme.breakpoints.down('md'));
    year = Number(year.substring(0, 4));
    const seasonStart = `${year}-08-01`;
    const seasonEnd = `${year + 1}-08-01`;

    useEffect(() => {
        downloadDocsV2('events', [
            { value: ['dateDone', '>', new Date(seasonStart)], type: 'condition' },
            { type: 'sorting', value: ['dateDone', 'asc'] }
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
                console.log(past);

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
    }, [seasonStart, year, seasonEnd]);

    return (
        <>
            <Container maxWidth="lg" sx={{ my: 5, textAlign: 'center' }}>
                <Typography variant="h3" my={8}>
                    {`${year}-${(year + 1) % 2000}`} Concert Season
                </Typography>
                {currentEvents.length
                    ? currentEvents.map((event, i) => (
                        <Event event={event} key={`c${i}`} />
                    ))
                    : <></>
                }
                {pastEvents.length
                    ? pastEvents.map((event, i) => (
                        <Event event={event} past={true} key={`c${i}`} />
                    ))
                    : <></>
                }


                {!currentEvents.length && !pastEvents.length
                    ? hasUpdated
                        ? <Container disableGutters sx={{ px: 1, py: 2, my: 2, }}>
                            {/* <Typography variant="h4" my={5}>{text.seasonAnnouncementText}</Typography> */}
                            {seasonAnnouncementPic
                                ? <img src={seasonAnnouncementPic} alt={text.seasonAnnouncementText} height={'auto'} width={smMatch ? '95%' : '65%'} />
                                : <Typography variant="h4" my={5}>{text.seasonAnnouncementText}</Typography>
                            }
                        </Container>
                        : <EventSkeleton />
                    : <></>
                }
            </Container>
        </>
    );
};

export default Events;