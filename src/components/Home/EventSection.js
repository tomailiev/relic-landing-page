import {
    Box,
    Typography,
    Paper,
    Button,
    Skeleton,
    Grid,
    // useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getLink } from '../../utils/firebase/firestore-funcs';
import { Link } from 'react-router-dom';
// import { useTheme } from '@emotion/react';
// import diagonalBanner from '../../assets/banners/ribbon_past.png';
import { bgs } from '../../data/images';


const EventSection = ({ event, past }) => {
    const [src, setSrc] = useState(null);
    const [imgLoaded, setImgLoaded] = useState(false);

    useEffect(() => {
        getLink(event?.imageUrl)
            .then(val => setSrc(val))
            .catch(console.error);
    }, [event?.imageUrl]);

    const sortedPerformances = [...event.performances].sort(
        (a, b) => Number(a.id) - Number(b.id)
    );

    const startDate = new Date(sortedPerformances[0].date);
    const endDate = new Date(sortedPerformances[sortedPerformances.length - 1].date);

    const formattedDateRange = startDate.toDateString() === endDate.toDateString()
        ? `${startDate.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })}`
        : `${startDate.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })} - ${endDate.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })}`;

    const uniqueLocations = [
        ...new Set(sortedPerformances.map((p) => p.location)),
    ];

    const locationsString = uniqueLocations.join(' • ');

    return (
        <Paper elevation={0} sx={{
            py: { xs: 1, md: 7 },
            borderRadius: 0,
            px: { xs: 3, md: 8 },
            background: `center / cover url(${bgs.videoBg})`,
            position: 'relative',
            overflow: 'hidden',
            height: '100%',
            width: '100%',
            textAlign: 'center'

        }}>
            <Typography my={{xs: 3, md: 1}} variant="h3" mb={3} fontWeight={600} color={'secondary.main'} letterSpacing={3.5}>Relic Presents</Typography>
            <Grid container spacing={2} justifyContent="center" my={4}>
                <Grid item xs={12} md={5} display={'flex'} justifyContent={{xs: 'center', md: 'end'}}>
                    <Box
                        sx={{
                            width: { xs: '90%', md: 350 },
                            height: { xs: 'auto', md: 350 },
                            aspectRatio: '1 / 1',
                            flexShrink: 0,
                            // borderRadius: 2,
                            border: '1px solid #e7d4a0',
                            overflow: 'hidden',
                            mr: { md: 3 },
                            mb: { xs: 2, md: 0 },
                            backgroundColor: '#eee',
                            position: 'relative',
                        }}
                    >
                        {!imgLoaded && (
                            <Skeleton
                                variant="rectangular"
                                animation="wave"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                }}
                            />
                        )}
                        {src && (
                            <img
                                src={src}
                                alt={event.title}
                                onLoad={() => setImgLoaded(true)}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: imgLoaded ? 'block' : 'none',
                                    filter: past ? 'grayscale(80%)' : 'none'
                                }}
                            />
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} textAlign={'left'} color={'secondary.main'}>

                    {/* Text content */}
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'start',
                            px: { xs: 0, md: 10 },
                            color: 'secondary.main'
                        }}
                    >
                        <Box>
                            <Typography variant="h6" fontWeight={600} mt={{ xs: 3, md: 0 }} mb={{ xs: 3, md: 2 }} mx={{xs: 4, md: 1}} fontSize={'1.4em'}>
                                {event.title}
                            </Typography>


                            <Typography variant="body1" fontSize={{ xs: '1.4em', md: '1.2em' }} mx={{xs: 4, md: 1}} >
                                {formattedDateRange}
                            </Typography>
                            <Typography variant="body1" fontSize={{ xs: '1.4em', md: '1.2em' }} mx={{xs: 4, md: 1}} mt={2} >
                                {locationsString}
                            </Typography>
                            {/* <Typography variant="body1" fontSize={{ xs: '1em', sm: '1.2em' }} mx={2} mb={3} sx={{ fontStyle: 'italic', color: 'secondary.main' }} >
                                    {event.intro}
                                </Typography> */}

                        </Box>

                        <Box mt={4}>
                            <Link
                                to={`/event/${event.id}`}
                                color="inherit"
                                style={{
                                    transition: '0.3s',
                                    '&:hover': { opacity: 0.95 },
                                    textDecoration: 'none'
                                }}
                            >
                                <Button variant="outlined" sx={{
                                    mx: {xs: 4, md: 1},
                                    // my: 2,
                                    color: 'secondary.main',
                                    borderColor: 'secondary.main',
                                    '&:hover': {
                                        backgroundColor: 'secondary.main',
                                        color: 'secondary.contrastText',
                                        borderColor: 'secondary.main',
                                    },
                                    mb: { xs: 3 },
                                }}>
                                    More info & Tickets
                                </Button>
                            </Link >
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default EventSection;
