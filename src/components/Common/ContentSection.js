import { Button, Card, CardActionArea, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import images from "../../data/images";
// import CustomDivider from "./CustomDivider";

const ContentSection = ({ content }) => {

    return (
        <>
            {/* {index !== 0 && <CustomDivider />} */}
            <Paper sx={{ my: 2, p: 1, }}>
                <Grid container spacing={2} justifyContent="center" my={4}>
                    <Grid item md={6} sm={8}>
                        <Card component={RouterLink} to={content.route} sx={{ textDecoration: 'none' }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={images[content.cardImage]}
                                    alt="Event Image"
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item md={6} textAlign={'center'}>
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
                </Grid>
            </Paper>
        </>
    );
};

export default ContentSection;