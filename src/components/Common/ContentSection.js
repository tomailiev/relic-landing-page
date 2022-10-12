import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import images from "../../data/images";

const ContentSection = ({ content }) => {

    return (
        <Paper elevation={1} sx={{ my: 2, p: 1, }}>
            <Grid container spacing={2} justifyContent="center" my={4}>
                <Grid item md={6} display={{xs: 'none', md: 'block'}}>
                    <Typography variant="h5" mb={2} mx={2}>
                        {content.infoTitle}
                    </Typography>
                    <Typography variant="body1" mx={2}>
                        {content.infoText}
                    </Typography>
                    <Button component={RouterLink} to={content.route} variant="contained" sx={{ m: 2 }}>
                        {content.buttonText || 'See more'}
                    </Button>
                </Grid>
                <Grid item md={6}>
                    <Card component={RouterLink} to={content.route} sx={{textDecoration: 'none'}}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="300"
                                image={images[content.cardImage]}
                                alt="Event Image"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {content.cardTitle}
                                </Typography>
                                {content.cardTexts.map(text => (
                                    <Typography key={text} variant="body2" color="text.secondary">
                                        {text}
                                    </Typography>
                                ))}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ContentSection;