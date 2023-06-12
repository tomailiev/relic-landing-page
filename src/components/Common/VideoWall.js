import { Paper, Box, IconButton, } from "@mui/material";
import { useEffect, useRef, useState } from "react";
// import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { downloadDocs } from "../../utils/firebase/firestore-funcs";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import VideoItem from "./VideoItem";
// import CircleIcon from '@mui/icons-material/Circle';


const VideoWall = () => {
    const [videos, setVideos] = useState([]);
    const [index, setIndex] = useState(0);
    const [timer, setTimer] = useState(true);
    const [activePlayer, setActivePlayer] = useState(null);
    let intervalRef = useRef(null);

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
        if (activePlayer) {
            activePlayer.stopVideo();
            setActivePlayer(null);
        }
        if (sw) {
            clearInterval(intervalRef.current);
            setTimer(false);
        } else {
            intervalRef.current = setInterval(() => {
                setIndex(prev => prev + 1 === videos.length ? 0 : ++prev);
            }, 5000);
            setTimer(true);
        }
    }

    return (
        <>
            <Paper sx={{ my: 2, p: 1, }}>
                <Box position={'relative'} overflow={'hidden'} minHeight={'400px'}>
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
                        size="small"
                        onClick={() => switchActive(-1)}
                        color="primary"
                    >
                        <FiberManualRecordIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => switchInterval(timer)}
                        color="primary"
                    >
                        {timer ? <PauseCircleIcon /> : <PlayCircleIcon />}
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => switchActive(1)}
                        color="primary"
                    >
                        <FiberManualRecordIcon />
                    </IconButton>
                </Box>
            </Paper>
        </>
    );
};

export default VideoWall;