import { Paper, Box, Grid, Button, Typography, } from "@mui/material";
import { useEffect, useState } from "react";
import { downloadDocsV2 } from "../../utils/firebase/firestore-funcs";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";


const VideoWall = () => {
    const [video, setVideo] = useState([]);


    useEffect(() => {
        downloadDocsV2('videos', [
            { value: ['featured', '==', 5], type: 'condition' },
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

    return (
        <>
            <Paper elevation={0} sx={{
                my: 2,
                px: 1,
                borderRadius: 3,
                backgroundColor: '#f9f9f9',
                transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                width: '100%',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                    backgroundColor: '#ffffff'
                },
            }}>
                <Box position={'relative'} overflow={'hidden'} >

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
            </Paper >
        </>
    );
};

export default VideoWall;