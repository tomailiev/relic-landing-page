import { Card, CardActionArea, CardContent, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import cardImage from '../../assets/banners/banner_square.webp';
import musicianImage from '../../assets/imgs/IMG_3983.webp'

const ContentSection = () => {

    return (
        <Container maxWidth="lg" >
            <Paper elevation={2} sx={{ my: 2, p: 3 }}>
                <Typography variant="h3" textAlign={'center'}>
                    Discover
                </Typography>
                <Grid container spacing={2} justifyContent="center" my={4}>
                    <Grid item md={6} >
                        <Typography variant="h5" textAlign="center" mb={2}>
                            Upcoming events
                        </Typography>
                        <Typography variant="body1" mx={2}>
                            Our inaugural week is quickly approaching. We have an exciting program of baroque music favorites that we are excited to present in Kalamazoo, MI this September.
                        </Typography>
                    </Grid>
                    <Grid item md={6}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={cardImage}
                                    alt="Event Image"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Autumn Rising
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        September 8-10, 2022
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Kalamazoo, MI
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
            <Paper  sx={{ my: 2, p: 3 }}>
                <Grid container spacing={2} justifyContent="center" my={4}>
                    <Grid item md={6} >
                        <Typography variant="h5" textAlign="center" mb={2}>
                            Our Musicians
                        </Typography>
                        <Typography variant="body1" mx={2}>
                            Find out who we are and what we do!
                        </Typography>
                    </Grid>
                    <Grid item md={6}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={musicianImage}
                                    alt="Musician Image"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Our musicians
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Co-founder Kako Miura
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        PC: Sam Brewer
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </Container >
    );
};

export default ContentSection;