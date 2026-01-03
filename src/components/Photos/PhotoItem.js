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
        <Grid item xs={12} sm={6} md={4} size={{xs: 12, sm: 6, md: 4}} sx={{ display: 'flex' }}>
            <Paper elevation={5} sx={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100$' }}>
                <Card
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                        width: '100%'
                    }}
                >
                    <Box sx={{ position: 'relative', width: '100%', pt: '56.25%', overflow: 'hidden' }}>
                        {thumbSrc ? (
                            <Box
                                component="img"
                                src={thumbSrc}
                                alt={photo.title}
                                sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    objectFit: 'cover',
                                    transition: 'all 400ms ease',
                                    '.MuiCard-root:hover &': {
                                        width: '110%',
                                        height: '110%',
                                    },
                                }}
                            />
                        ) : (
                            <Skeleton
                                variant="rectangular"
                                animation="wave"
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                }}
                            />
                        )}
                    </Box>

                    <CardContent>
                        <Typography variant="body1" fontWeight="bold">
                            {photo.title}
                        </Typography>
                    </CardContent>

                    <Button
                        sx={{ position: 'absolute', inset: 0 }}
                        onClick={setPhotoDialog}
                        aria-label="open gallery"
                    />
                </Card>
            </Paper>
        </Grid>

    );
};

export default PhotoItem;