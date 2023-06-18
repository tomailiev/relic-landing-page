import { Paper, Box, IconButton, useTheme, useMediaQuery, Tooltip, } from "@mui/material";
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
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    let intervalRef = useRef(null);

    const theme = useTheme();
    const lgMatch = useMediaQuery(theme.breakpoints.up('md'));

    useEffect(() => {
        downloadDocs('videos', ['featured', '!=', 0], ['featured', 'desc'])
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
        setButtonsDisabled(true);
        setTimeout(() => {
            setButtonsDisabled(false);
        }, 900)
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
            <Paper sx={{ my: 2, px: 1, }}>
                <Box position={'relative'} overflow={'hidden'} height={lgMatch ? '370px' : '540px'} >
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
                </Box>
            </Paper>
        </>
    );
};

export default VideoWall;