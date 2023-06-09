import { Paper, Box, IconButton, } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
// import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { downloadDocs } from "../../utils/firebase/firestore-funcs";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// import CircleIcon from '@mui/icons-material/Circle';
import './MediaSection.css';
import VideoGrid from "./VideoGrid";


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
            }, 7000);
        }
        return () => clearInterval(intervalRef.current);
    }, [videos.length])

    function changeVid(vidIndex) {
        switchInterval(true);
        setId(vidIndex);
    }

    function switchInterval(sw) {
        if (sw === true) {
            clearInterval(intervalRef.current);
            setTimer(false);
            return;
        }

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
                <Box position={'relative'} ref={containerRef} overflow={'hidden'}>
                    {videos.map((vid, i) => (
                        i === id && <VideoGrid key={vid.youtubeId} video={vid} switchInterval={switchInterval} />
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