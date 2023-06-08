import { Grid, Paper, Typography, Slide, Box, IconButton, Button, } from "@mui/material";
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


const MediaSection = () => {
    const [videos, setVideos] = useState([]);
    const [id, setId] = useState(0);
    const containerRef = useRef();
    const [timer, setTimer] = useState(true);
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

    function changeVid(vidIndex) {
        switchInterval();
        setId(vidIndex);
    }

    function switchInterval() {
        if (timer) {
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
            <Paper sx={{ my: 2, p: 1, }}>
                <Box ref={containerRef} overflow={'hidden'}>
                    {videos.map((vid, i) => (
                        <Slide key={vid.youtubeId} timeout={750} exit={false} in={id === i} direction={'left'} container={containerRef.current} mountOnEnter unmountOnExit>
                            <Grid container spacing={2} justifyContent="center" my={4}>
                                <Grid item md={6} sm={8}>
                                    <YouTube
                                        videoId={vid.youtubeId}
                                        opts={{ height: '300px', width: '100%', }}
                                        onPlay={switchInterval}
                                    />
                                </Grid>
                                <Grid item md={6} textAlign={'center'}>
                                    <Typography variant="h5" mb={2} mx={2}>
                                        {vid.title}
                                    </Typography>
                                    <Button variant="contained" sx={{ background: '#f60000', '&:hover': { background: '#a90000' } }} endIcon={<SubscriptionsIcon />} href={links.ytSubscribe} target="_blank">
                                        {'Subscribe'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Slide>
                    ))}
                </Box>
                <Box display={'flex'} justifyContent={'center'}>
                    <IconButton
                        size="small"
                        onClick={switchInterval}
                        color="primary"
                    >
                        {timer ? <PauseCircleIcon /> : <PlayCircleIcon />}
                    </IconButton>
                    {videos.map((_item, i) => (
                        <IconButton
                            key={i}
                            size="small"
                            onClick={() => changeVid(i)}
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

export default MediaSection;