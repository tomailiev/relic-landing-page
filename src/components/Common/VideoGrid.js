import { Button, Grid, Typography } from "@mui/material";
import { links } from "../../data/links";
import YouTube from 'react-youtube';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { useEffect, useState } from "react";



const VideoGrid = ({ video, switchInterval }) => {

    const [animation, setAnimation] = useState('');

    const hiddenRight = {
        transition: 'all 1000ms ease-in',
        position: 'absolute',
        left: '1500px'
    }

    const shown = {
        transition: 'all 1000ms ease-in',
        position: 'relative',
        left: 0,
        top: 0
    }

    // const hiddenLeft = {
    //     transition: 'all 1000ms ease-out',
    //     position: 'absolute',
    //     left: '-1500px'
    // }

    useEffect(() => {
        setAnimation('shown')

        // return () => setAnimation('out')
    }, [])

    return (
        <Grid container spacing={2} justifyContent="center" my={4} sx={!animation ? hiddenRight : shown}>
            <Grid item md={6} sm={8}>
                <YouTube
                    videoId={video.youtubeId}
                    opts={{ height: '300px', width: '100%', }}
                    onPlay={switchInterval}
                    // onReady={() => setAnimation('shown')}
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

export default VideoGrid;