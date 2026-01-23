import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    Skeleton,
    Menu,
    ButtonGroup,
    MenuItem,
} from '@mui/material';

// import banner from '../../assets/imgs/WO_02232023-b.png';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { downloadOneDoc, getLink } from '../../utils/firebase/firestore-funcs';
import DialogContext from '../../context/DialogContext';
import ProgramDialog from './ProgramDialog';
import MapDialog from './MapDialog';
import { sortByNewTitle } from '../../data/musicianSorter';
import { Add, ArrowLeft, OpenInNew } from '@mui/icons-material';
import { currentSeason } from '../../data/currentSeason';
import CheckoutDialog from './CheckoutDialog';

const EventPage = () => {

    const { eventId } = useParams(); // Assuming routing by ID
    const { setDialog } = useContext(DialogContext);
    const [event, setEvent] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [eventBanner, setEventBanner] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

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
    }, [event?.banner])

    useEffect(() => {
        downloadOneDoc('events', eventId)
            .then(doc => {
                setEvent(doc)
            });
    }, [eventId]);


    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleCalendarOption = (option) => {
        handleMenuClose();
        if (!event) return;

        if (option === 'google') {
            // Example Google Calendar URL (adjust fields as needed)
            const googleUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
                event.title
            )}&details=${encodeURIComponent(event.description || '')}`;
            window.open(googleUrl, '_blank');
        } else if (option === 'ical') {
            // Example iCal download (you would generate .ics file normally)
            const icsContent = `
                             BEGIN:VCALENDAR
                             VERSION:2.0
                             BEGIN:VEVENT
                             SUMMARY:${event.title}
                             DESCRIPTION:${event.description || ''}
                             END:VEVENT
                             END:VCALENDAR
                                   `;
            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${event.title}.ics`;
            link.click();
        }
    };


    return (
        <Box mb={5}>
            {/* Banner */}
            {eventBanner ? <Box
                sx={{
                    width: '100%',
                    height: { xs: 300, sm: 400, md: 500 },
                    backgroundImage: `url(${eventBanner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mb: 3,
                }}
            />
                : <Skeleton variant={'rectangular'} width={'100%'} sx={{ height: { xs: 300, sm: 400, md: 500 } }} />}


            {/* Title */}
            <Container sx={{ my: 6, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {event?.title ? <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 600,
                        mb: 1,
                    }}
                >
                    {event.title}
                </Typography>
                    : <Skeleton variant='text' height={'80px'} width={'350px'} />}
                {event?.subtitle && <Typography variant='h6' fontWeight={600} >{event.subtitle}</Typography>}
            </Container>

            {/* Content */}
            <Container>
                <Grid container spacing={6}>
                    {/* Overview */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Typography variant="h5" gutterBottom fontWeight={'bold'}>
                            Overview
                        </Typography>
                        {event?.description
                            ? <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', pt: 1 }}>
                                {event.description}
                            </Typography>
                            : <Skeleton variant='text' height={'125px'} />}
                        <Typography variant="h5" gutterBottom mt={4} fontWeight={'bold'}>
                            Music
                        </Typography>
                        {event?.music
                            ? <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', pt: 1, }}>
                                Featuring music by {event.music}
                            </Typography>
                            : <Skeleton variant='text' height={'35px'} />}

                        {pdfFile && (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3 }}
                                onClick={() => setDialog({ title: event.title, component: <ProgramDialog file={pdfFile} />, type: 'program' })}
                            >
                                View program book
                            </Button>
                        )}
                        <Typography variant="h5" gutterBottom mt={4} fontWeight={'bold'}>
                            Artists
                        </Typography>
                        {event?.musicians
                            ? event.musicians.sort(sortByNewTitle).map(({ name, newTitle, id }) => <Typography variant='body1' key={id}>{name}, {newTitle}</Typography>)
                            : <Skeleton variant="text" height={'250px'} width={'60%'} />
                        }
                    </Grid>

                    {/* Performances */}
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Typography variant="h5" fontWeight={'bold'} >
                            Performances
                        </Typography>
                        <List disablePadding>
                            {event?.performances
                                ? event.performances.map((perf) => (
                                    <ListItem disableGutters key={perf.id} alignItems="flex-start" sx={{ mb: 2 }}>
                                        <ListItemText
                                            primary={
                                                <>
                                                    <Typography variant="body1" fontWeight={'600'}>
                                                        {perf.day}, {perf.date} at {perf.time}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {perf.venue}, {perf.location}
                                                    </Typography>
                                                </>
                                            }
                                            secondary={
                                                <>
                                                    {perf.presenter && <Typography color={'primary'} fontSize={'1.1em'} variant={'subtitle2'} >Presented by {perf.presenter}</Typography>}
                                                    {perf.caption && <Typography color={'primary'} variant={'subtitle2'} >{perf.caption}</Typography>}
                                                    <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                                        {perf.url && perf.url.startsWith('https://www.eventbrite.com/')
                                                            ? <Button variant='contained' disabled={new Date() > event.dateDone.toDate() || !perf.url} onClick={() => setDialog({ type: 'tickets', component: <CheckoutDialog eventId={perf.url.includes('?') ? perf.url.substring(perf.url.lastIndexOf('tickets-') + 8, perf.url.indexOf('?')) : perf.url.substring(perf.url.lastIndexOf('tickets-') + 8)} />, title: `${event.title} - ${perf.location}` })}>Tickets</Button>
                                                            : <Button startIcon={<OpenInNew />} href={perf.url} target='_blank' rel='noopener' variant='contained' disabled={new Date() > event.dateDone.toDate() || !perf.url}>
                                                                Tickets
                                                            </Button>
                                                        }

                                                        {perf.geocode && <Button
                                                            variant="outlined"
                                                            size={'small'}
                                                            onClick={() => {
                                                                setDialog({ type: 'map', component: <MapDialog location={perf.geocode} query={`${perf.venue}, ${perf.location}`} />, title: perf.venue })
                                                            }}
                                                        >View Map</Button>}
                                                        <ButtonGroup variant="outlined" size="small">
                                                            <Button
                                                                startIcon={<Add />}
                                                                onClick={handleMenuOpen}
                                                            >
                                                                Calendar
                                                            </Button>

                                                        </ButtonGroup>
                                                        <Menu
                                                            disableScrollLock
                                                            anchorEl={anchorEl}
                                                            open={open}
                                                            onClose={handleMenuClose}
                                                            PaperProps={{
                                                                sx: {
                                                                    backgroundColor: '#ffffff', // force white background
                                                                    '& .MuiMenuItem-root': {
                                                                        color: 'primary.main',
                                                                        '&:hover': {
                                                                            bgcolor: 'primary.light',
                                                                            color: '#fff',
                                                                        },
                                                                    },
                                                                },
                                                            }}
                                                        >
                                                            <MenuItem onClick={() => handleCalendarOption('google')}>
                                                                Google
                                                            </MenuItem>
                                                            <MenuItem onClick={() => handleCalendarOption('ical')}>
                                                                iCal
                                                            </MenuItem>
                                                        </Menu>
                                                    </Box>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                ))
                                : [1, 2, 3].map(item => {
                                    return <ListItem disableGutters key={item} alignItems="flex-start" sx={{ mb: 2 }}>
                                        <Skeleton variant='text' height={'132px'} width={'100%'} />
                                    </ListItem>
                                })
                            }
                        </List>
                    </Grid>
                </Grid>
                <Box textAlign={'center'} mt={2}>
                    {event?.additionalInfo && <Typography variant='subtitle1' fontFamily={'Cochin'} fontStyle={'normal'} my={6} >
                        {event.additionalInfo}
                    </Typography>}
                    <Link to={`/events/${currentSeason}`}>
                        <Button variant='text' startIcon={<ArrowLeft />}>All events</Button>
                    </Link>
                </Box>
            </Container>
        </Box>
    );
};

export default EventPage;
