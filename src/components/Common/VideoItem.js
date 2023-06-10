import { Button, Grid, Typography } from "@mui/material";
import YouTube from 'react-youtube';
import { links } from "../../data/links";
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

const VideoItem = ({ video, position, playVideo }) => {

    return (
        <Grid key={video.id} container spacing={2} justifyContent="center" my={4} sx={{
            position: 'absolute',
            left: `${position === -1 ? 100 : position > 0 ? -100 : 0}%`,
            top: 0,
            width: position ? '0px' : '100%',
            transition: Math.abs(position) === 1 ? 'width 7s ease-in, visibility 5s ease-in, left 1s ease-in' : 'left 1s ease-in, width 100ms ease-in',
            visibility: position ? 'hidden' : 'visible',
        }}>
            <Grid item md={6} sm={8}>
                <YouTube
                    videoId={video.youtubeId}
                    opts={{ height: '300px', width: '100%', }}
                    onPlay={playVideo}
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