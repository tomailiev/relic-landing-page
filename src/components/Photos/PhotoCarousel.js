import { useEffect, useState, useCallback } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { getLink } from '../../utils/firebase/firestore-funcs';
import { useSwipeable } from 'react-swipeable';

const PhotoCarousel = ({ photos, currentIndex }) => {
    const [index, setIndex] = useState(currentIndex);
    const [srcs, setSrcs] = useState(Array(photos.length).fill(null));
    const [direction, setDirection] = useState(''); // 'left' or 'right'

    const loadImage = useCallback(async (i) => {
        if (!photos[i] || srcs[i]) return;
        try {
            const url = await getLink(photos[i].path);
            const img = new Image();
            img.src = url;
            img.onload = () => setSrcs((prev) => {
                const updated = [...prev];
                updated[i] = url;
                return updated;
            });
        } catch (e) {
            console.log(e);

        }
    }, [photos, srcs]);

    useEffect(() => {
        loadImage(index);
        // Prefetch neighbors
        if (photos[index + 1]) loadImage(index + 1);
        if (photos[index - 1]) loadImage(index - 1);
    }, [index, loadImage, photos]);

    const goLeft = () => {
        if (index === 0) {
            return;
        }
        setDirection('left');
        setIndex((prev) => prev - 1);
    };

    const goRight = () => {
        if (index === photos.length - 1) {
            return;
        }
        setDirection('right');
        setIndex((prev) => prev + 1);
    };

    // useEffect(() => {
    //     const handleKey = (e) => {
    //         if (e.key === 'ArrowLeft') goLeft();
    //         if (e.key === 'ArrowRight') goRight();
    //     };
    //     window.addEventListener('keydown', handleKey);
    //     return () => window.removeEventListener('keydown', handleKey);
    // }, [goLeft, goRight]);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: goRight,
        onSwipedRight: goLeft,
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    return (
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ backgroundColor: 'black', width: '100%', height: '100%' }}>
            <Box
                {...swipeHandlers}
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '75vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    overflow: 'hidden',
                }}
            >
                <IconButton
                    onClick={goLeft}
                    sx={{
                        position: 'absolute',
                        left: 16,
                        color: 'white',
                        zIndex: 10,
                        py: 10,
                        pr: 3,
                        pl: 1
                    }}
                    disabled={index === 0}
                >
                    <ChevronLeftIcon fontSize="large" />
                </IconButton>

                <IconButton
                    onClick={goRight}
                    sx={{
                        position: 'absolute',
                        right: 16,
                        color: 'white',
                        zIndex: 10,
                        py: 10,
                        pr: 1,
                        pl: 3
                    }}
                    disabled={index === photos.length - 1}
                >
                    <ChevronRightIcon fontSize="large" />
                </IconButton>

                <Box
                    key={index}
                    sx={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        transition: 'transform 0.9s ease 1s',
                        animation: direction
                            ? `${direction === 'left' ? 'slideInFromLeft' : 'slideInFromRight'} 0.4s forwards`
                            : 'none',
                        '@keyframes slideInFromLeft': {
                            from: { transform: 'translateX(-100%)' },
                            to: { transform: 'translateX(0)' },
                        },
                        '@keyframes slideInFromRight': {
                            from: { transform: 'translateX(100%)' },
                            to: { transform: 'translateX(0)' },
                        }
                    }}
                >
                    {srcs[index] &&
                        <Box
                            component="img"
                            src={srcs[index]}
                            alt={photos[index]?.caption}
                            sx={{
                                maxHeight: '100%',
                                maxWidth: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    }
                </Box>

                <Box
                    key={index + 100}
                    sx={{
                        position: 'absolute',
                        bottom: '10px',
                        width: '100%',
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        px: 2,
                        py: 1,
                        textAlign: 'center',
                        transition: 'transform 0.9s ease 1s',
                        animation: direction
                            ? `${direction === 'left' ? 'slideInFromLeft' : 'slideInFromRight'} 0.4s forwards`
                            : 'none',
                        '@keyframes slideInFromLeft': {
                            from: { transform: 'translateX(-100%)' },
                            to: { transform: 'translateX(0)' },
                        },
                        '@keyframes slideInFromRight': {
                            from: { transform: 'translateX(100%)' },
                            to: { transform: 'translateX(0)' },
                        }
                    }}
                >
                    <Typography variant="body1" color={'secondary'}>{photos[index]?.caption}</Typography>
                    <Typography variant="caption" >
                        PC: {photos[index]?.pc}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default PhotoCarousel;
