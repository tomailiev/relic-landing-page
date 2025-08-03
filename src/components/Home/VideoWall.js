import { Paper, Box, Grid, Button, Typography, IconButton, } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { downloadDocsV2 } from "../../utils/firebase/firestore-funcs";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import { PlayCircleFilled, PlayCircleOutline } from "@mui/icons-material";
import DialogContext from "../../context/DialogContext";


const VideoWall = () => {
    const [video, setVideo] = useState([]);
    const { setDialog } = useContext(DialogContext)


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

    function setYoutubeDialog(video) {
        const component = <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ width: '100%', height: '100%', background: '#000000' }}><YouTube videoId={video.youtubeId} opts={{ playerVars: { autoplay: 1 }, width: '100%', height: '370px', }} /></Box>
        setDialog({ type: 'video', title: video.title, component })
    }
    return (
        <>
            <Paper elevation={0} sx={{
                // my: 2,
                p: 1,
                borderRadius: 0,
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
                <Grid container spacing={2} justifyContent="center" my={4}>
                    <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'}>
                        <Box
                            onClick={() => setYoutubeDialog(video)}
                            className="hover-parent"
                            sx={{
                                position: 'relative',
                                width: '100%',
                                pt: '56.25%', // 16:9 aspect ratio
                                overflow: 'hidden',
                                borderRadius: 2,
                                cursor: 'pointer',
                            }}
                        >
                            <Box
                                component="img"
                                src={video.thumbnail}
                                alt={video.title}
                                sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    top: '50%',
                                    left: '50%',
                                    objectFit: 'cover',
                                    transform: 'translate(-50%, -50%)',
                                    transition: 'all 400ms ease',
                                    '.hover-parent:hover &': {
                                        width: '105%',
                                        height: '105%'
                                    },
                                }}
                            />

                            {/* Play icon overlay */}
                            <IconButton
                                disableRipple
                                color="secondary"
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '20%',
                                    p: 0,
                                }}
                            >
                                <PlayCircleOutline
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        position: 'absolute',
                                        transition: 'opacity 400ms ease, transform 400ms ease',
                                        opacity: 1,
                                        '.hover-parent:hover &': {
                                            opacity: 0,
                                        },
                                    }}
                                />
                                <PlayCircleFilled
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        position: 'absolute',
                                        transition: 'opacity 400ms ease, transform 400ms ease',
                                        opacity: 0,
                                        '.hover-parent:hover &': {
                                            opacity: 1,
                                        },
                                    }}
                                />
                            </IconButton>
                        </Box>
                        {/* </CardActionArea> */}
                        {/* </Card> */}
                    </Grid>
                    <Grid item xs={12} md={6} textAlign={'left'}>
                        <Typography variant="h6" fontWeight={600} mb={2} mx={2} >
                            Featured Video
                        </Typography>
                        <Typography variant="body1" fontSize={{ xs: '1.4rem', md: '1.2rem' }} mx={2} >
                            {video.category === 'live' || video.category === 'studio'
                                ? <>Enjoy our {video.category} performance of <strong>{video.title},</strong> recorded as part of our {video.program} program.</>
                                : <>Enjoy the complete live concert recording of our {video.program} program.</>}
                        </Typography>
                        <Link to={'/media/videos'}>
                            <Button variant="outlined" sx={{ my: 3, mx: 2 }}>
                                {'More Videos'}
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default VideoWall;