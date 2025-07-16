import { Box, Button, Card, CardActionArea, Grid, Paper, Typography } from "@mui/material";
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
                            <CardActionArea sx={{
                                position: 'relative',
                                overflow: 'hidden',
                            }}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        pt: '56.25%', // 16:9 aspect ratio
                                        overflow: 'hidden',
                                        borderRadius: '5px'
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={images[cardImage]}
                                        alt={`Go to ${infoTitle}`}
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
                                                width: '107%',
                                                height: '107%',
                                            },
                                        }}
                                    />
                                    {/* <CardMedia
                                        component="img"
                                        height="300"
                                        image={images[cardImage]}
                                        alt="Event Image"
                                        sx={{ borderRadius: 2, boxShadow: boxShadow, border: `${boxShadow ? 0 : 3}px solid #ffffff`, transition: 'border 80ms ease-in-out' }}
                                        onMouseEnter={() => setBoxShadow(0)}
                                        onMouseLeave={() => setBoxShadow(10)}
                                    /> */}
                                </Box>
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