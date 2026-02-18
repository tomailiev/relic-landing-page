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
import { performanceDateExtractor, performanceLocationExtractor } from '../../data/performanceDataExtractor';
// import bgImg from '../../assets/imgs/the_spheres_hb.jpg';
// import bgFull from '../../assets/imgs/the_spheres_1920_1080.jpg';


const EventSection = ({ event, past }) => {
    const [src, setSrc] = useState(null);
    const [imgLoaded, setImgLoaded] = useState(false);

    useEffect(() => {
        getLink(event?.bannerHome ? event?.bannerHome : event.imageUrl)
            .then(val => {
                const img = new Image();
                img.src = val;
                img.onload = () => setSrc(val);
                setImgLoaded(true);
            })
            .catch(console.error);
    }, [event?.imageUrl, event?.bannerHome]);



    return (
        event?.bannerHome
            ? <Box
                sx={{
                    height: '928px',           // fixed height instead of 100vh
                    width: "100%",
                    backgroundColor: "#000000", // fallback color for extra-wide space
                    background: src ? `center / cover url(${src})` : '#000000',
                    // backgroundSize: "auto 100%", // height fixed, width adjusts
                    // backgroundRepeat: "no-repeat",
                    // backgroundPosition: "center center",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'end'
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'end',
                        alignItems: 'center',
                        px: { xs: 0, md: 10 },
                        color: '#ffffff'
                    }}
                >
                    {!imgLoaded && <Typography my={3} textAlign={'center'} variant='h3' color={'#ffffff'}>{event?.title}</Typography>}
                    <Box textAlign={'center'} mx={{ xs: 1, md: 0 }}>
                        {/* <Typography variant="h6" fontWeight={600} mt={{ xs: 3, md: 0 }} mb={{ xs: 3, md: 2 }} mx={{ xs: 4, md: 1 }} fontSize={'1.4em'}>
                        {event.title}
                        </Typography> */}


                        {event?.performances && <><Typography variant="body1" fontWeight={600} fontSize={{ xs: '1.5em', md: '1.8em' }}  >
                            {performanceDateExtractor(event.performances)}
                        </Typography>
                            <Typography variant="body1" fontWeight={600} fontSize={{ xs: '1.5em', md: '1.8em' }}  >
                                {performanceLocationExtractor(event.performances)}
                            </Typography></>}
                        {/* <Typography variant="body1" fontSize={{ xs: '1em', sm: '1.2em' }} mx={2} mb={3} sx={{ fontStyle: 'italic', color: 'secondary.main' }} >
                                    {event.intro}
                                </Typography> */}

                    </Box>

                    <Box mt={3}>
                        <Link
                            to={`/event/${event.id}`}
                            color="inherit"
                            style={{
                                transition: '0.3s',
                                '&:hover': { opacity: 0.95 },
                                textDecoration: 'none'
                            }}
                        >
                            <Button variant="outlined" size={'large'} sx={{
                                mx: { xs: 4, md: 1 },
                                // my: 2,
                                color: '#ffffff',
                                borderColor: '#ffffff',
                                fontSize: '1.5rem',
                                padding: '12px 32px',
                                '&:hover': {
                                    backgroundColor: '#ffffff',
                                    color: 'secondary.contrastText',
                                    borderColor: '#ffffff',
                                },
                                mb: { xs: 6, md: 9 },
                            }}>
                                More info & Tickets
                            </Button>
                        </Link >
                    </Box>
                </Box>

            </Box>
            : <Paper elevation={0} sx={{
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
                <Typography my={{ xs: 3, md: 1 }} variant="h3" mb={3} fontWeight={600} color={'secondary.main'} letterSpacing={3.5}>Relic Presents</Typography>
                <Grid container spacing={2} justifyContent="center" my={4}>
                    <Grid item size={{ xs: 12, md: 5 }} display={'flex'} justifyContent={{ xs: 'center', md: 'end' }}>
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
                    <Grid item size={{ xs: 12, md: 6 }} textAlign={'left'} color={'secondary.main'}>

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
                                <Typography variant="h6" fontWeight={600} mt={{ xs: 3, md: 0 }} mb={{ xs: 3, md: 2 }} mx={{ xs: 4, md: 1 }} fontSize={'1.4em'}>
                                    {event.title}
                                </Typography>


                                {event?.performances && <><Typography variant="body1" fontSize={{ xs: '1.4em', md: '1.2em' }} mx={{ xs: 4, md: 1 }} >
                                    {performanceDateExtractor(event.performances)}
                                </Typography>
                                    <Typography variant="body1" fontSize={{ xs: '1.4em', md: '1.2em' }} mx={{ xs: 4, md: 1 }} mt={2} >
                                        {performanceLocationExtractor(event.performances)}
                                    </Typography></>}
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
                                        mx: { xs: 4, md: 1 },
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
