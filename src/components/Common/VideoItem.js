import { Button, Grid, Typography } from "@mui/material";
import YouTube from 'react-youtube';
import { links } from "../../data/links";
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
// import { useEffect } from "react";

const VideoItem = ({ video, index, currentIndex, playVideo, length, switchInterval }) => {
    //position = currentIndex - index
    // const [position, setPosition] = useState(currentIndex - index);

    const position = currentIndex - index;
    const isShifting = (index === 0 && currentIndex === length - 1);

    function cueUpVideo(e) {
        if (e.data === 3) {
            switchInterval(true);
        }
    }

    return (
        <Grid key={video.id} container spacing={2} justifyContent="center" my={4} sx={{
            position: position ? 'absolute' : 'relative',
            left: `${(position < 0 && position !== -(length - 1)) || isShifting ? 150 : position === 1 || position === -(length - 1) ? -150 : 0}%`,
            top: 0,
            width: position ? '0px' : '100%',
            transition: Math.abs(position) === 1 || Math.abs(position) === length - 1? 'width 7s ease-in, visibility 5s ease-in, left 1s ease-in' : !position ? 'left 1s ease-in, width 100ms ease-in' : 'none',
            visibility: position ? 'hidden' : 'visible',
        }}>
            <Grid item md={6} sm={8}>
                <YouTube
                    videoId={video.youtubeId}
                    opts={{ height: '300px', width: '100%', }}
                    onPlay={playVideo}
                    onStateChange={cueUpVideo}
                />
            </Grid>
            <Grid item md={6} textAlign={'center'}>
                <Typography variant="h5" mb={2} mx={2}>
                    {video.title}
                </Typography>
                <Button variant="contained" sx={{ background: '#f60000', '&:hover': { background: '#a90000' } }} endIcon={<SubscriptionsIcon />} href={links.ytSubscribe} target="_blank">
                    {'Subscribe'}
                </Button>
            </Grid>
        </Grid>
    );
};

export default VideoItem;