import { useContext, useEffect, useState } from "react";
import { downloadDocsV2 } from "../../utils/firebase/firestore-funcs";
import { Box, Button, Card, CardContent, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { PlayCircleFilled, PlayCircleOutline } from "@mui/icons-material";
import DialogContext from "../../context/DialogContext";
import YouTube from "react-youtube";

const Videos = () => {

    const { setDialog } = useContext(DialogContext)
    const [videoCategory, setVideoCategory] = useState('live');
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        downloadDocsV2('videos', [
            { type: 'condition', value: ['category', '==', videoCategory] },
            { type: 'sorting', value: ['featured', 'desc'] }
        ])
            .then(docs => setVideos(docs))
    }, [videoCategory]);

    function handleSelectChange(event) {
        setVideoCategory(event.target.value)
    }

    function setYoutubeDialog(video) {
        setDialog({ type: 'video', title: video.title, component: <YouTube videoId={video.youtubeId} opts={{ playerVars: { autoplay: 1 }, width: '100%', height: '370px', }} />})
    }

    return (
        <Container maxWidth="lg" sx={{ my: 5, textAlign: 'center' }}>
            <Typography variant="h3" my={8}>
                Videos
            </Typography>
            <Container disableGutters sx={{ textAlign: 'left' }}>
                <FormControl fullWidth>
                    <InputLabel id="video-category-select">Category</InputLabel>
                    <Select
                        labelId="video-category-select"
                        id="video-category"
                        value={videoCategory}
                        label="Category"
                        onChange={handleSelectChange}
                        MenuProps={{
                            MenuListProps: {
                                sx: {
                                    background: '#ffffff'
                                }
                            }
                        }}
                    >
                        <MenuItem value={'live'}>Live recording</MenuItem>
                        <MenuItem value={'studio'}>Studio recording</MenuItem>
                        <MenuItem value={'full concert'}>Full concert</MenuItem>
                    </Select>
                </FormControl>
            </Container>
            {videos?.length && <Grid container spacing={6} my={3}>
                {videos.map(video => {
                    return <Grid key={video.id} item xs={12} sm={6} md={4} display={'flex'}>
                        <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <Card
                                sx={{
                                    flexGrow: 1,
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        pt: '56.25%', // 16:9 aspect ratio
                                        overflow: 'hidden',
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
                                            '.MuiCard-root:hover &': {
                                                width: '110%',
                                                height: '110%'
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
                                        {/* Outline icon (default) */}
                                        <PlayCircleOutline
                                            sx={{
                                                width: '100%',
                                                height: 'auto',
                                                position: 'absolute',
                                                transition: 'opacity 400ms ease, transform 400ms ease',
                                                opacity: 1,
                                                '.MuiCard-root:hover &': {
                                                    opacity: 0,
                                                },
                                            }}
                                        />
                                        {/* Filled icon (on hover) */}
                                        <PlayCircleFilled
                                            sx={{
                                                width: '100%',
                                                height: 'auto',
                                                position: 'absolute',
                                                transition: 'opacity 400ms ease, transform 400ms ease',
                                                opacity: 0,
                                                '.MuiCard-root:hover &': {
                                                    opacity: 1,
                                                },
                                            }}
                                        />
                                    </IconButton>
                                </Box>

                                {/* ─────────── Title ─────────── */}
                                <CardContent>
                                    <Typography variant="body1" fontWeight="bold">
                                        {video.title}
                                    </Typography>
                                </CardContent>
                                <Button sx={{ width: '100%', height: '100%', left: 0, top: 0, position: 'absolute' }} onClick={() => setYoutubeDialog(video)} />
                            </Card>
                        </Paper>
                    </Grid>
                })}
            </Grid>}
        </Container>
    );
};

export default Videos;