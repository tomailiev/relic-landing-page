import { Grid, Paper, Typography, Box, IconButton, Button, } from "@mui/material";
import { useEffect, useRef, useState } from "react";
// import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { downloadDocs } from "../../utils/firebase/firestore-funcs";
import { links } from "../../data/links";
import YouTube from 'react-youtube';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// import CircleIcon from '@mui/icons-material/Circle';


const VideoWall = () => {
    const [videos, setVideos] = useState([]);
    const [id, setId] = useState(0);
    const [timer, setTimer] = useState(true);
    const [activePlayer, setActivePlayer] = useState(null);
    let intervalRef = useRef(null);

    useEffect(() => {
        downloadDocs('videos')
            .then((docs) => {
                setVideos(docs);
            })
            .catch(e => {
                console.error('not found');
                console.error(e);
            })
    }, []);

    useEffect(() => {
        if (videos.length) {
            intervalRef.current = setInterval(() => {
                setId(prev => prev + 1 === videos.length ? 0 : ++prev);
            }, 5000);
        }
        return () => clearInterval(intervalRef.current);
    }, [videos.length])

    // function changeVid(vidIndex) {
    //     if (activePlayer) {
    //         activePlayer.stopVideo();
    //         setActivePlayer(null);
    //     }
    //     switchInterval(true);
    //     setId(vidIndex);
    // }

    // function switchInterval(sw) {
    //     if (sw === true) {
    //         clearInterval(intervalRef.current);
    //         setTimer(false);
    //         return;
    //     } else if (sw && sw !== true) {
    //         setActivePlayer(sw.target);
    //     }
    //     if (timer) {
    //         clearInterval(intervalRef.current);
    //     } else {
    //         intervalRef.current = setInterval(() => {
    //             setId(prev => prev + 1 === videos.length ? 0 : ++prev);
    //         }, 5000);
    //     }
    //     setTimer(prev => !prev);
    // }

    function playVideo(e) {
        setActivePlayer(e.target);
        switchInterval(true);
    }

    function switchActive(index) {
        if (activePlayer) {
            activePlayer.stopVideo();
            setActivePlayer(null);
        }
        setId(index);
        clearInterval(intervalRef.current);
    }

    function switchInterval(sw) {
        if (activePlayer) {
            activePlayer.stopVideo();
            setActivePlayer(null);
        }
        if (sw) {
            clearInterval(intervalRef.current);
        } else {
            intervalRef.current = setInterval(() => {
                setId(prev => prev + 1 === videos.length ? 0 : ++prev);
            }, 5000);
        }
        setTimer(prev => !prev);
    }

    return (
        <>
            <Paper sx={{ my: 2, p: 1, overflow: 'hidden' }}>
                <Box position={'relative'} overflow={'hidden'}>
                    {videos.map((vid, i) => (
                        <Grid key={vid.id} container spacing={2} justifyContent="center" my={4} sx={{
                            position: i - id ? 'absolute' : 'relative',
                            left: `${i - id > 0 ? 100 : i - id < 0 ? -100 : 0}%`,
                            top: 0,
                            width: i - id ? '0px' : '100%',
                            transition: 'left 1000ms ease-in',
                            visibility: i - id ? 'hidden' : 'visible'
                        }}>
                            <Grid item md={id - i ? 0 : 6} sm={id - i ? 0 : 8}>
                                <YouTube
                                    videoId={vid.youtubeId}
                                    opts={{ height: '300px', width: '100%', }}
                                    onPlay={playVideo}
                                />
                            </Grid>
                            <Grid item md={id - i ? 0 : 6} textAlign={'center'}>
                                <Typography variant="h5" mb={2} mx={2}>
                                    {vid.title}
                                </Typography>
                                <Button variant="contained" sx={{ background: '#f60000', '&:hover': { background: '#a90000' } }} endIcon={<SubscriptionsIcon />} href={links.ytSubscribe} target="_blank">
                                    {'Subscribe'}
                                </Button>
                            </Grid>
                        </Grid>
                    ))}
                </Box>
                <Box display={'flex'} justifyContent={'center'}>
                    <IconButton
                        size="small"
                        onClick={() => switchInterval(timer)}
                        color="primary"
                    >
                        {timer ? <PauseCircleIcon /> : <PlayCircleIcon />}
                    </IconButton>
                    {videos.map((_item, i) => (
                        <IconButton
                            key={i}
                            size="small"
                            onClick={() => switchActive(i)}
                            disabled={i === id}
                            color="primary"
                        >
                            <FiberManualRecordIcon />
                        </IconButton>
                    ))}
                </Box>
            </Paper>
        </>
    );
};

export default VideoWall;