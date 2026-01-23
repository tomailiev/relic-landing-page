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
                py: { xs: 1, sm: 6, md: 10 },
                borderRadius: 0,
                background: { xs: `center / cover url(${bgs.reviewBgV})`, md: `center / cover url(${bgs.reviewBg})` },
                transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
                position: 'relative',
                overflow: 'hidden',
                minHeight: { xs: '100vh', md: '100%', xl: '80vh' },
                width: '100%',
                // '&:hover': {
                //     transform: 'translateY(-2px)',
                //     boxShadow: 4,
                //     // backgroundColor: '#ffffff'
                // },
            }}>
                <Grid container spacing={2} justifyContent="start" my={4}>

                    <Grid item size={{ xs: 12, sm: 10, md: 6 }} textAlign={'left'}>
                        <Typography variant="h6" fontWeight={600} mb={2} mx={2} sx={{ color: 'secondary.main', fontSize: '1.2em', pt: { xs: 0, md: 6 } }}>
                            {infoTitle}
                        </Typography>
                        <Typography variant="body1" fontSize={{ xs: '1em', sm: '1.2em' }} mx={2} sx={{ fontStyle: 'italic', color: 'secondary.main' }}>
                            {infoText}
                        </Typography>
                        <Typography variant={'subtitle1'} color={'secondary.main'} textAlign={{ xs: 'left', md: 'right', }} fontSize={{ xs: '0.8em', sm: '1em', md: '1.2em' }} pr={5} pl={{ xs: 2, md: 0 }} mt={2}>- {reviewSource}</Typography>
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