import { Paper, Box, Grid, Button, Typography, } from "@mui/material";
import { useEffect, useState } from "react";
// import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { downloadDocsV2 } from "../../utils/firebase/firestore-funcs";
// import PlayCircleIcon from '@mui/icons-material/PlayCircle';
// import PauseCircleIcon from '@mui/icons-material/PauseCircle';
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// import VideoItem from "./VideoItem";
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// import PauseIcon from '@mui/icons-material/Pause';
// import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import YouTube from "react-youtube";
// import { links } from "../../data/links";
// import { Subscriptions } from "@mui/icons-material";
import { Link } from "react-router-dom";
// import CircleIcon from '@mui/icons-material/Circle';


const VideoWall = () => {
    const [video, setVideo] = useState([]);
    // const [index, setIndex] = useState(0);
    // const [timer, setTimer] = useState(true);
    // const [activePlayer, setActivePlayer] = useState(null);
    // const [buttonsDisabled, setButtonsDisabled] = useState(false);
    // let intervalRef = useRef(null);


    useEffect(() => {
        downloadDocsV2('videos', [
            { value: ['featured', '==', 5], type: 'condition' },
            // { value: ['featured', 'desc'], type: 'sorting' },
            { value: [1], type: 'limit' }
        ])
            .then((docs) => {

                setVideo(docs[0]);
            })
            .catch(e => {
                console.error('not found');
                console.error(e);
            })
    }, []);

    // useEffect(() => {
    //     if (videos.length) {
    //         intervalRef.current = setInterval(() => {
    //             setIndex(prev => prev + 1 === videos.length ? 0 : ++prev);
    //         }, 5000);
    //     }
    //     return () => clearInterval(intervalRef.current);
    // }, [videos.length])

    // function playVideo(e) {
    //     switchInterval(true);
    //     setActivePlayer(e.target);
    // }


    // function switchActive(direction) {
    //     if (activePlayer) {
    //         activePlayer.stopVideo();
    //         setActivePlayer(null);
    //     }
    //     setButtonsDisabled(true);
    //     setTimeout(() => {
    //         setButtonsDisabled(false);
    //     }, 900)
    //     setIndex(prev => prev + direction === videos.length
    //         ? 0 : prev + direction < 0
    //             ? videos.length - 1
    //             : prev + direction);
    //     clearInterval(intervalRef.current);
    //     setTimer(false);
    // }

    // function switchInterval(sw) {

    //     if (sw) {
    //         clearInterval(intervalRef.current);
    //         setTimer(false);
    //     } else {
    //         if (activePlayer) {
    //             activePlayer.stopVideo();
    //             setActivePlayer(null);
    //         }
    //         intervalRef.current = setInterval(() => {
    //             setIndex(prev => prev + 1 === videos.length ? 0 : ++prev);
    //         }, 5000);
    //         setTimer(true);
    //     }
    // }

    return (
        <>
            <Paper sx={{ my: 2, px: 1, }}>
                <Box position={'relative'} overflow={'hidden'} >
                    {/* {videos.map((vid, i, arr) => (
                        <VideoItem
                            key={vid.youtubeId}
                            video={vid}
                            index={i}
                            currentIndex={index}
                            playVideo={playVideo}
                            switchInterval={switchInterval}
                            length={arr.length}
                        />
                    ))} */}
                    <Grid container spacing={2} justifyContent="center" my={4} >
                        <Grid item md={6} sm={8} xs={12}>
                            <YouTube
                                videoId={video.youtubeId}
                                opts={{ height: '300px', width: '100%', }}
                            />
                        </Grid>
                        <Grid item md={6} textAlign={'center'}>
                            <Typography variant="h5" mb={2} mx={2}>
                                {video.title}
                            </Typography>
                            <Link to={'/media/videos'}>
                                <Button variant={'outlined'}>
                                    {'More videos'}
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                {/* <Box display={'flex'} justifyContent={'center'}>
                    <Tooltip title={'previous video'}>
                        <IconButton
                            size="large"
                            onClick={() => switchActive(-1)}
                            disabled={buttonsDisabled}
                            color="primary"
                        >
                            <NavigateBeforeIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={`${timer ? 'pause' : 'play'} slideshow`}>
                        <IconButton
                            size="large"
                            onClick={() => switchInterval(timer)}
                            color="primary"
                        >
                            {timer ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'next video'}>
                        <IconButton
                            size="large"
                            onClick={() => switchActive(1)}
                            disabled={buttonsDisabled}
                            color="primary"
                        >
                            <NavigateNextIcon />
                        </IconButton>
                    </Tooltip>
                </Box> */}
            </Paper >
        </>
    );
};

export default VideoWall;