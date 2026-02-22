import { Button, Grid, Paper, Typography } from "@mui/material";
import { bgs } from "../../data/images";
import InternalLink from "./InternalLink";
// import CustomDivider from "./CustomDivider";

const AboutSection = ({ infoTitle, infoText, buttonText, route }) => {
    return (
        <>
            <Paper elevation={0} sx={{
                // my: 2,
                px: 1,
                py: 8,
                borderRadius: 0,
                background: { xs: `center / cover url(${bgs.aboutbgV})`, md: `center / cover url(${bgs.aboutBgH})` },
                transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                width: '100%',
                // '&:hover': {
                //     transform: 'translateY(-2px)',
                //     boxShadow: 4,
                //     backgroundColor: '#ffffff'
                // },
            }}>
                <Grid container spacing={2} justifyContent="start" my={4}>
                    <Grid size={{ xs: 12, md: 7 }} display={'flex'} justifyContent={'center'} minHeight={'430px'} />
                    <Grid size={{ xs: 12, md: 5 }} textAlign={'left'} color={'secondary.main'}>
                        <Typography variant="h6" fontWeight={600} pt={{ sx: 2, sm: 0 }} mb={2} mx={{ xs: 2, sm: 5, md: 2 }} fontSize={'1.4em'}>
                            {infoTitle}
                        </Typography>
                        <Typography variant="body1" fontSize={{ xs: '1.4em', md: '1.2em' }} mx={{ xs: 2, sm: 5, md: 2 }}>
                            {infoText}
                        </Typography>
                        <InternalLink route={route}>
                            <Button variant="outlined" sx={{
                                mx: { xs: 2, sm: 5, md: 2 },
                                my: 3,
                                color: 'secondary.main',
                                borderColor: 'secondary.main',
                                '&:hover': {
                                    backgroundColor: 'secondary.main',
                                    color: 'secondary.contrastText',
                                    borderColor: 'secondary.main',
                                },
                                mb: { xs: 3 },
                            }}>
                                {buttonText || 'See more'}
                            </Button>
                        </InternalLink>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default AboutSection;