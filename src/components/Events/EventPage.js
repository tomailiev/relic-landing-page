import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    Link,
} from '@mui/material';

import banner from '../../assets/imgs/WO_02232023-b.png';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { downloadOneDoc, getLink } from '../../utils/firebase/firestore-funcs';
import DialogContext from '../../context/DialogContext';
import ProgramDialog from './ProgramDialog';
import MapDialog from './MapDialog';

const EventPage = () => {

    const { eventId } = useParams(); // Assuming routing by ID
    const { setDialog } = useContext(DialogContext);
    const [event, setEvent] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [eventBanner, setEventBanner] = useState(null);

    useEffect(() => {
        if (event?.program) {
            getLink(event.program)
                .then(val => setPdfFile(val))
                .catch(console.error);
        }
    }, [event, event?.program]);

    useEffect(() => {
        if (event?.banner) {
            getLink(event.banner)
                .then(val => setEventBanner(val))
                .catch(console.error);
        }
    })

    useEffect(() => {
        downloadOneDoc('events', eventId)
            .then(doc => setEvent(doc));
    }, [eventId]);


    if (!event) return <Typography>Loading...</Typography>;
    return (
        <Box>
            {/* Banner */}
            <Box
                sx={{
                    width: '100%',
                    height: { xs: 300, sm: 400, md: 500 },
                    backgroundImage: `url(${eventBanner || banner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mb: 3,
                }}
            />


            {/* Title */}
            <Container sx={{ my: 5 }}>
                <Typography
                    variant="h3"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 600,
                        mb: 3,
                    }}
                >
                    {event.title}
                </Typography>
            </Container>

            {/* Content */}
            <Container>
                <Grid container spacing={6}>
                    {/* Overview */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom fontWeight={'bold'}>
                            Overview
                        </Typography>
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', pt: 1 }}>
                            {event.description}
                        </Typography>

                        {event.program && (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3 }}
                                onClick={() => setDialog({ title: event.title, component: <ProgramDialog file={pdfFile} />, type: 'program' })}
                            >
                                View program book
                            </Button>
                        )}
                    </Grid>

                    {/* Performances */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" fontWeight={'bold'} >
                            Performances
                        </Typography>
                        <List disablePadding>
                            {event.performances.map((perf) => (
                                <ListItem disableGutters key={perf.id} alignItems="flex-start" sx={{ mb: 2 }}>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1">
                                                {perf.day}, {perf.date} at {perf.time}
                                            </Typography>
                                        }
                                        secondary={
                                            <>
                                                <Typography variant="body1">
                                                    {perf.venue}, {perf.location}
                                                </Typography>
                                                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                                    <Link
                                                        href={perf.url}
                                                        target="_blank"
                                                        rel="noopener"
                                                        sx={{ display: 'inline-block', fontWeight: 'bold' }}
                                                    >
                                                        <Button variant='contained'>
                                                            Tickets
                                                        </Button>
                                                    </Link>
                                                    {perf.geocode && <Button
                                                        variant="outlined"
                                                        size={'small'}
                                                        onClick={() => {
                                                            setDialog({ type: 'map', component: <MapDialog location={perf.geocode} query={`${perf.venue}, ${perf.location}`} />, title: perf.venue })
                                                        }}
                                                    >View Map</Button>}
                                                </Box>
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default EventPage;
