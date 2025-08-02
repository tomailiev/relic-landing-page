import { Box, Button, Card, CardActionArea, Grid, Paper, Typography } from "@mui/material";
import { Link, Link as RouterLink } from "react-router-dom";
import images from "../../data/images";
// import CustomDivider from "./CustomDivider";

const ContentSection = ({ infoTitle, infoText, route, cardImage }) => {
    return (
        <>
            <Link
                to={route}
                color="inherit"
                width={'100%%'}
                style={{
                    transition: '0.3s',
                    '&:hover': { opacity: 0.95 },
                    textDecoration: 'none',
                }}
            >
                <Paper elevation={0} sx={{
                    my: 2,
                    p: 1,
                    borderRadius: 3,
                    backgroundColor: '#f9f9f9',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                    width: '100%',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 4,
                        backgroundColor: '#ffffff'
                    },
                }}>
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

                                            }}
                                        />

                                    </Box>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item md={6} textAlign={'left'}>
                            <Typography variant="h5" mb={2} mx={2}>
                                {infoTitle}
                            </Typography>
                            <Typography variant="body1" mx={2}>
                                {infoText}
                            </Typography>
                            <Button variant="outlined" sx={{ my: 3, mx: 2 }}>
                                {'See more'}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Link>
        </>
    );
};

export default ContentSection;