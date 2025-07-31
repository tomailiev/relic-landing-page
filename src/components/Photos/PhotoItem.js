import { Box, Button, Card, CardContent, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getLink } from "../../utils/firebase/firestore-funcs";

const PhotoItem = ({ photo, setPhotoDialog }) => {
    const [thumbSrc, setThumbSrc] = useState(null);

    useEffect(() => {
        if (photo && photo.thumb) {
            getLink(photo.thumb)
                .then(val => {
                    const img = new Image();
                    img.src = val;
                    img.onload = () => setThumbSrc(val);
                })
                .catch(console.error);
        }
    }, [photo]);


    return (
        <Grid item xs={12} sm={6} md={4} display={'flex'}>
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
                        {thumbSrc
                            ? <Box
                                component="img"
                                src={thumbSrc}
                                alt={photo.title}
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
                            : <Skeleton
                                variant="rectangular"
                                animation="wave"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    transformOrigin: 'center',
                                }}
                            />}
                    </Box>
                    <CardContent>
                        <Typography variant="body1" fontWeight="bold">
                            {photo.title}
                        </Typography>
                    </CardContent>
                    <Button sx={{ width: '100%', height: '100%', left: 0, top: 0, position: 'absolute' }} onClick={setPhotoDialog} aria-label="open gallery" />
                </Card>
            </Paper>
        </Grid>
    );
};

export default PhotoItem;