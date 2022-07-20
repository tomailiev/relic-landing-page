import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Paper, Typography } from "@mui/material";

const ContentSection = ({ content }) => {

    return (
        <Paper elevation={1} sx={{ my: 2, p: 3, textAlign: 'center' }}>
            <Grid container spacing={2} justifyContent="center" my={4}>
                <Grid item md={6} >
                    <Typography variant="h5" textAlign="center" mb={2}>
                        {content.infoTitle}
                    </Typography>
                    <Typography variant="body1" mx={2}>
                        {content.infoText}
                    </Typography>
                    <Button variant="contained" sx={{ m: 2 }}>
                        {content.buttonText || 'See more'}
                    </Button>
                </Grid>
                <Grid item md={6}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="300"
                                image={content.cardImage}
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