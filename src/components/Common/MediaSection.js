import { Card, CardActionArea, CardMedia, Grid, Paper, Typography, Link, Slide, Box, IconButton, } from "@mui/material";
import { useRef, useState } from "react";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
// import CustomDivider from "./CustomDivider";

const MediaSection = () => {
    const [id, setId] = useState(0);
    const containerRef = useRef();
    const videos = [{ id: 'WKlB6mk7EQo', title: 'Alessandro Scarlatti - Concerto No. 5 in D minor - I. Allegro' }, { id: 'PPAcIoJ0PQQ', title: 'Marco Uccellini - Sinfonia Terza a cinque stromenti' }]

    function changeVid(vidIndex) {
        setId(vidIndex);
    }

    return (
        <>
            <Paper sx={{ my: 2, p: 1, }}>
                <Box ref={containerRef} overflow={'hidden'}>
                    {videos.map((vid, i) => (
                        <Slide key={vid.id} timeout={750} exit={false} in={id === i} direction={'left'} container={containerRef.current} mountOnEnter unmountOnExit>
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
                </Box>
                <Box display={'flex'} justifyContent={'center'}>
                    {videos.map((_item, i) => (
                        <IconButton 
                        key={i} 
                        size="small" 
                        onClick={() => changeVid(i)} 
                        disabled={i === id}
                        >
                            <HorizontalRuleIcon />
                        </IconButton>
                    ))}
                </Box>
                {/* <Button onClick={changeVid} variant="contained" sx={{ mt: 5 }}>
                    {'Channel'}
                </Button> */}
            </Paper>
        </>
    );
};

export default MediaSection;