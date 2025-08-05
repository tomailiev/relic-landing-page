import { Button, Grid, Paper, Typography } from "@mui/material";
import { bgs } from "../../data/images";
import ExternalLink from "./ExternalLink";
// import CustomDivider from "./CustomDivider";

const ReviewSection = ({ infoTitle, infoText, buttonText, reviewSource, route }) => {
    return (
        <>
            <Paper elevation={0} sx={{
                // my: 2,
                px: 1,
                py: {xs: 0, md: 10},
                borderRadius: 0,
                background: `center / cover url(${bgs.reviewBg})`,
                transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                width: '100%',
                // '&:hover': {
                //     transform: 'translateY(-2px)',
                //     boxShadow: 4,
                //     // backgroundColor: '#ffffff'
                // },
            }}>
                <Grid container spacing={2} justifyContent="start" my={4}>

                    <Grid item xs={8} sm={8} md={6} textAlign={'left'}>
                        <Typography variant="h6" fontWeight={600} mb={2} mx={2} sx={{ color: 'secondary.main', fontSize: '1.4rem', pt: {xs: 0, md: 6} }}>
                            {infoTitle}
                        </Typography>
                        <Typography variant="body1" fontSize={{ xs: '1.4rem', md: '1.2rem' }} mx={2} sx={{ fontStyle: 'italic', color: 'secondary.main' }}>
                            {infoText}
                        </Typography>
                        <Typography variant={'subtitle1'} color={'secondary.main'} textAlign={'right'} pr={5} mt={2}>- {reviewSource}</Typography>
                        <ExternalLink route={route}>
                            <Button variant="outlined" sx={{
                                mx: 2,
                                my: 3,
                                color: 'secondary.main',
                                borderColor: 'secondary.main',
                                '&:hover': {
                                    backgroundColor: 'secondary.main',
                                    color: 'secondary.contrastText',
                                    borderColor: 'secondary.main',
                                },
                                mb: { xs: 13, md: 6 },
                            }}>
                                {buttonText || 'See more'}
                            </Button>
                        </ExternalLink>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default ReviewSection;