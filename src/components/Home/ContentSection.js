import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import images from "../../data/images";
// import CustomDivider from "./CustomDivider";

const ContentSection = ({ infoTitle, infoText, cardImage, textCss, titleCss, buttonText }) => {
    return (
        <>
            <Paper elevation={0} sx={{
                // my: 2,
                p: 1,
                borderRadius: 0,
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
                    <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'}>
                        <Box
                            sx={{
                                width: { xs: '94%', md: '100%' },
                                height: 'auto',
                                aspectRatio: '16 / 9',
                                flexShrink: 0,
                                borderRadius: 2,
                                overflow: 'hidden',
                                mb: { xs: 2, md: 0 },
                                backgroundColor: '#eee',
                                position: 'relative',
                            }}
                        >
                            <img
                                src={images[cardImage]}
                                alt={infoTitle}
                                // onLoad={() => setImgLoaded(true)}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />
                        </Box>
                        {/* </CardActionArea> */}
                        {/* </Card> */}
                    </Grid>
                    <Grid item xs={12} md={6} textAlign={'left'}>
                        <Typography variant="h6" fontWeight={600} mb={2} mx={2} sx={titleCss || {}}>
                            {infoTitle}
                        </Typography>
                        <Typography variant="body1" fontSize={{ xs: '1.4rem', md: '1.2rem' }} mx={2} sx={textCss || {}}>
                            {infoText}
                        </Typography>
                        <Button variant="outlined" sx={{ my: 3, mx: 2 }}>
                            {buttonText || 'See more'}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default ContentSection;