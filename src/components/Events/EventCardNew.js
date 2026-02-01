import {
    Box,
    Typography,
    Paper,
    Button,
    Skeleton,
    // useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getLink } from '../../utils/firebase/firestore-funcs';
import { Link } from 'react-router-dom';
// import { useTheme } from '@emotion/react';
import diagonalBanner from '../../assets/banners/ribbon_past.png';


const EventCardNew = ({ event, past }) => {
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
        <Link
            to={`/event/${event.id}`}
            color="inherit"
            style={{
                transition: '0.3s',
                '&:hover': { opacity: 0.95 },
                textDecoration: 'none'
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'stretch',
                    borderRadius: 3,
                    backgroundColor: '#fafafa',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    position: 'relative',
                    textAlign: 'center',
                    overflow: 'hidden',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6,
                    },
                }}
            >
                {past && (
                    <Box
                        component="img"
                        src={diagonalBanner}
                        alt="Past Event"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: { xs: 200, sm: 250, md: 200 },
                            height: 'auto',
                            zIndex: 2,
                            pointerEvents: 'none',
                        }}
                    />
                )}
                {/* Image */}
                <Box
                    sx={{
                        width: { xs: '100%', md: 270 },
                        height: { xs: 'auto', md: 270 },
                        aspectRatio: '1 / 1',
                        flexShrink: 0,
                        borderRadius: 2,
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

                {/* Text content */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        px: { xs: 0, md: 10 }
                    }}
                >
                    <Box>
                        <Typography variant="h5" fontWeight={600}>
                            {event.title}
                        </Typography>
                        {event.subtitle && (
                            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                                {event.subtitle}
                            </Typography>
                        )}

                        <Typography variant="body1" fontWeight={'600'} sx={{ mb: 1 }}>
                            {formattedDateRange}
                        </Typography>
                        <Typography variant="body1" fontWeight={'600'} sx={{ mb: 2 }}>
                            {locationsString}
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-wrap' }}>
                            {event.intro}
                        </Typography>
                    </Box>

                    <Box>
                        <Button variant="contained" color="primary">
                            {past ? 'More info' : 'Tickets & Info'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Link>
    );
};

export default EventCardNew;
