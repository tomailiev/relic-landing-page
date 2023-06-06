import { Card, CardActionArea, CardMedia, Grid, Paper, Typography, Link, Slide, Box, IconButton, Button, } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { downloadDocs } from "../../utils/firebase/firestore-funcs";
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { links } from "../../data/links";
// import CustomDivider from "./CustomDivider";

const MediaSection = () => {
    const [videos, setVideos] = useState([]);
    const [id, setId] = useState(0);
    const containerRef = useRef();

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

    function changeVid(vidIndex) {
        setId(vidIndex);
    }

    return (
        <>
            <Paper sx={{ my: 2, p: 1, }}>
                <Box ref={containerRef} overflow={'hidden'}>
                    {videos.map((vid, i) => (
                        <Slide key={vid.youtubeId} timeout={750} exit={false} in={id === i} direction={'left'} container={containerRef.current} mountOnEnter unmountOnExit>
                            <Grid container spacing={2} justifyContent="center" my={4}>
                                <Grid item md={6} sm={8}>
                                    <Card component={Link} href={`https://youtu.be/${vid.youtubeId}`} sx={{ textDecoration: 'none' }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component={'iframe'}
                                                src={`https://www.youtube.com/embed/${vid.youtubeId}`}
                                                height={'300'}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            />
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item md={6} textAlign={'center'}>
                                    <Typography variant="h5" mb={2} mx={2}>
                                        {vid.title}
                                    </Typography>
                                    <Button variant="contained" sx={{ background: '#f60000', '&:hover': { background: '#a90000' }, fontWeight: '900' }} endIcon={<SubscriptionsIcon />} href={links.ytSubscribe} target="_blank">
                                        {'Subscribe'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Slide>
                    ))}
                </Box>
                <Box display={'flex'} justifyContent={'center'}>
                    {videos.map((_item, i) => (
                        <IconButton
                            key={i}
                            size="small"
                            onClick={() => changeVid(i)}
                            disabled={i === id}
                            color="primary"
                        >
                            <HorizontalRuleIcon />
                        </IconButton>
                    ))}
                </Box>
            </Paper>
        </>
    );
};

export default MediaSection;