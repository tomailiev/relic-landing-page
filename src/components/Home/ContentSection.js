import { Button, Card, CardActionArea, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import images from "../../data/images";
// import CustomDivider from "./CustomDivider";

const ContentSection = ({ infoTitle, infoText, route, cardImage }) => {

    return (
        <>
            {/* {index !== 0 && <CustomDivider />} */}
            <Paper sx={{ my: 2, p: 1, }}>
                <Grid container spacing={2} justifyContent="center" my={4}>
                    <Grid item md={6} sm={8} xs={12}>
                        <Card component={RouterLink} to={route} sx={{ textDecoration: 'none' }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={images[cardImage]}
                                    alt="Event Image"
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item md={6} textAlign={'center'}>
                        <Typography variant="h5" mb={2} mx={2}>
                            {infoTitle}
                        </Typography>
                        <Typography variant="body1" mx={2}>
                            {infoText}
                        </Typography>
                        <Button component={RouterLink} to={route} variant="outlined" sx={{ m: 2 }}>
                            {'See more'}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default ContentSection;