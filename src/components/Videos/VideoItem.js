import { PlayCircleFilled, PlayCircleOutline } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Grid, IconButton, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import DialogContext from "../../context/DialogContext";
import YouTube from "react-youtube";

const VideoItem = ({ video }) => {
    const { setDialog } = useContext(DialogContext)

    function setYoutubeDialog(video) {
        const component = <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ width: '100%', height: '100%', background: '#000000' }}><YouTube videoId={video.youtubeId} opts={{ playerVars: { autoplay: 1 }, width: '100%', height: '370px', }} /></Box>
        setDialog({ type: 'video', title: video.title, component })
    }

    return (
        <Grid key={video.id} item xs={12} sm={6} md={4} size={{ xs: 12, sm: 6, md: 4 }} display={'flex'}>
            <Paper elevation={5} sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
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
                    <CardContent>
                        <Typography variant="body1" fontWeight="bold">
                            {video.title}
                        </Typography>
                    </CardContent>
                    <Button sx={{ width: '100%', height: '100%', left: 0, top: 0, position: 'absolute' }} onClick={() => setYoutubeDialog(video)} />
                </Card>
            </Paper>
        </Grid>
    );
};

export default VideoItem;