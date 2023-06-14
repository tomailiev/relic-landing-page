import { Paper, Box, IconButton, useTheme, useMediaQuery, } from "@mui/material";
import { useEffect, useRef, useState } from "react";
// import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { downloadDocs } from "../../utils/firebase/firestore-funcs";
// import PlayCircleIcon from '@mui/icons-material/PlayCircle';
// import PauseCircleIcon from '@mui/icons-material/PauseCircle';
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import VideoItem from "./VideoItem";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseIcon from '@mui/icons-material/Pause';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import CircleIcon from '@mui/icons-material/Circle';


const VideoWall = () => {
    const [videos, setVideos] = useState([]);
    const [index, setIndex] = useState(0);
    const [timer, setTimer] = useState(true);
    const [activePlayer, setActivePlayer] = useState(null);
    let intervalRef = useRef(null);

    const theme = useTheme();
    const lgMatch = useMediaQuery(theme.breakpoints.up('md'));

    useEffect(() => {
        downloadDocs('videos', ['featured', '==', true])
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
                setIndex(prev => prev + 1 === videos.length ? 0 : ++prev);
            }, 5000);
        }
        return () => clearInterval(intervalRef.current);
    }, [videos.length])

    function playVideo(e) {
        switchInterval(true);
        setActivePlayer(e.target);
    }


    function switchActive(direction) {
        if (activePlayer) {
            activePlayer.stopVideo();
            setActivePlayer(null);
        }
        setIndex(prev => prev + direction === videos.length
            ? 0 : prev + direction < 0
                ? videos.length - 1
                : prev + direction);
        clearInterval(intervalRef.current);
        setTimer(false);
    }

    function switchInterval(sw) {
        
        if (sw) {
            clearInterval(intervalRef.current);
            setTimer(false);
        } else {
            if (activePlayer) {
                activePlayer.stopVideo();
                setActivePlayer(null);
            }
            intervalRef.current = setInterval(() => {
                setIndex(prev => prev + 1 === videos.length ? 0 : ++prev);
            }, 5000);
            setTimer(true);
        }
    }

    return (
        <>
            <Paper sx={{ my: 2, p: 1, }}>
                <Box position={'relative'} overflow={'hidden'} height={lgMatch ? '370px' : '546px'}>
                    {videos.map((vid, i, arr) => (
                        <VideoItem
                        key={vid.youtubeId}
                        video={vid}
                            index={i}
                            currentIndex={index}
                            playVideo={playVideo}
                            switchInterval={switchInterval}
                            length={arr.length}
                            />
                            ))}
                </Box>
                <Box display={'flex'} justifyContent={'center'}>
                    <IconButton
                        size="large"
                        onClick={() => switchActive(-1)}
                        color="primary"
                        >
                        <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton
                        size="large"
                        onClick={() => switchInterval(timer)}
                        color="primary"
                        >
                        {timer ? <PauseIcon /> : <PlayArrowIcon />}
                    </IconButton>
                    <IconButton
                        size="large"
                        onClick={() => switchActive(1)}
                        color="primary"
                        >
                        <NavigateNextIcon />
                    </IconButton>
                </Box>
            </Paper>
        </>
    );
};

export default VideoWall;