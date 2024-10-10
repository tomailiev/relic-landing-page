import { Button, Card, CardActionArea, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import images from "../../data/images";
import { useState } from "react";
// import CustomDivider from "./CustomDivider";

const ContentSection = ({ infoTitle, infoText, route, cardImage }) => {
    const [boxShadow, setBoxShadow] = useState(10);
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
                                    sx={{borderRadius: 3, boxShadow: boxShadow, border: `${boxShadow ? 0 : 3}px solid #ffffff`, transition: 'border 80ms ease-in-out'}}
                                    onMouseEnter={() => setBoxShadow(0)}
                                    onMouseLeave={() => setBoxShadow(10)}
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