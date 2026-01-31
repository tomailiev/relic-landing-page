import { Box, Grid, IconButton, Link, Typography, useTheme } from "@mui/material";
import { FacebookRounded, Instagram, YouTube } from '@mui/icons-material';
import Copyright from "./Copyright";
import { Container } from "@mui/system";
import { useContext } from "react";
import TextContext from "../../context/TextContext";
import { links } from "../../data/links";
import NYSCALogo from '../../assets/logos/NYS_CouncilontheArts_Horizontal_WHITE.png';
import GEMSLogo from '../../assets/logos/GEMS-web_white-horiz.png';

const Footer = () => {

    const { text } = useContext(TextContext);
    const theme = useTheme();

    return (
        <footer style={{ background: theme.palette.primary.main, padding: 10 }}>
            {/* <Fab size="small" sx={{ position: 'fixed', right: '25px', bottom: '150px' }}>
                <Email />
            </Fab>
            <Fab size="small" sx={{ position: 'fixed', right: '25px', bottom: '100px' }}>
                <FacebookRounded />
            </Fab>
            <Fab size="small" sx={{ position: 'fixed', right: '25px', bottom: '50px' }}>
                <Instagram />
            </Fab> */}
            <Container disableGutters maxWidth={false}>
                <Container sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" my={4} fontWeight={'bold'} color="secondary">Supporting Partners</Typography>
                </Container>
                <Grid container justifyContent={'space-evenly'}>
                    <Grid mx={2} size={{ xs: 10, sm: 4 }} >
                        <Box maxWidth={'370px'} maxHeight={'120px'}>
                            <img src={NYSCALogo} alt="NYSCA logo" style={{ maxWidth: '100%' }} />
                        </Box>
                        <Box>
                            <Typography color="secondary" fontSize={'0.9em'} paddingBottom={2}>
                                Relic's New York concerts are made possible in part by the New York State Council on the Arts with the support of the Office of the Governor and the New York State Legislature.
                            </Typography>
                        </Box>

                    </Grid>
                    <Grid mx={2} size={{ xs: 10, sm: 4 }} my={{ xs: 3, sm: 0 }}>
                        <Box maxWidth={'370px'} maxHeight={'120px'}>
                            <img src={GEMSLogo} alt="GEMS logo" style={{ maxWidth: '100%' }} />
                        </Box>
                        <Box>
                            <Typography color="secondary" fontSize={'0.9em'} paddingBottom={2}>
                                {text.footerGemsNote}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box display="flex" flexDirection="row" justifyContent={"center"} alignItems="center" marginBottom={0}>
                    <IconButton size="large" color="secondary">
                        <Link color={'inherit'} href={links.facebook} target={"_blank"}>
                            <FacebookRounded fontSize="inherit" />
                        </Link>
                    </IconButton>
                    <IconButton size="large" color="secondary">
                        <Link color={'inherit'} href={links.insta} target={"_blank"}>
                            <Instagram fontSize="inherit" />
                        </Link>
                    </IconButton>
                    <IconButton size="large" color="secondary">
                        <Link color={'inherit'} href={links.youtube} target={"_blank"}>
                            <YouTube fontSize="inherit" />
                        </Link>
                    </IconButton>
                </Box>
                <Copyright />
            </Container>
        </footer>
    );
};

export default Footer;