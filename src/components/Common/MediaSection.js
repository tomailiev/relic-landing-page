import { Button, Card, CardActionArea, CardMedia, Grid, Paper, Typography, Link, Slide } from "@mui/material";
import { useRef, useState } from "react";
// import CustomDivider from "./CustomDivider";

const MediaSection = () => {
    const [id, setId] = useState(0);
    // const containerRef = useRef(null);
    const videos = [{ id: 'WKlB6mk7EQo', title: 'Alessandro Scarlatti - Concerto No. 5 in D minor - I. Allegro' }, { id: 'PPAcIoJ0PQQ', title: 'Marco Uccellini - Sinfonia Terza a cinque stromenti' }]

    function changeVid() {
        setId(prev => prev + 1 >= videos.length ? 0 : prev + 1);
    }

    return (
        <>
            <Paper sx={{ my: 2, p: 1, }}>
                {videos.map((vid, i) => (
                    <Slide key={vid.id} timeout={750} exit={false} in={id === i} direction={'left'} mountOnEnter unmountOnExit>
                        <Grid container spacing={2} justifyContent="center" my={4}>
                            <Grid item md={6} sm={8}>
                                <Card component={Link} href={`https://youtu.be/${vid.id}`} sx={{ textDecoration: 'none' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component={'iframe'}
                                            src={`https://www.youtube.com/embed/${vid.id}`}
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
                            </Grid>
                        </Grid>
                    </Slide>
                ))}
                <Button onClick={changeVid} variant="contained" sx={{ mt: 5 }}>
                    {'Channel'}
                </Button>
            </Paper>
        </>
    );
};

export default MediaSection;