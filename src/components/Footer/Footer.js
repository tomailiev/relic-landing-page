import { Box, IconButton, Link, Typography, useTheme } from "@mui/material";
import FacebookRoundedIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YoutubeIcon from '@mui/icons-material/YouTube';
import Copyright from "./Copyright";
import { Container } from "@mui/system";
import { useContext } from "react";
import TextContext from "../../context/TextContext";
import { links } from "../../data/links";

const Footer = () => {

    const { text } = useContext(TextContext);
    const theme = useTheme();

    return (
        <footer style={{ background: theme.palette.primary.main, padding: 10 }}>
            {/* <Fab size="small" sx={{ position: 'fixed', right: '25px', bottom: '50px' }}>
                <InstagramIcon />
            </Fab>
            <Fab size="small" sx={{ position: 'fixed', right: '25px', bottom: '100px' }}>
                <FacebookRoundedIcon />
            </Fab> */}
            <Container disableGutters>
                <Box justifyContent={'center'} mx={5}>
                    <Typography color="white" align="center" paddingBottom={2}>
                        {text.footerGemsNote}
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent={"center"} alignItems="center" marginBottom={0}>
                    <IconButton size="large" color="secondary">
                        <Link color={'inherit'} href={links.facebook} target={"_blank"}>
                            <FacebookRoundedIcon fontSize="inherit" />
                        </Link>
                    </IconButton>
                    <IconButton size="large" color="secondary">
                        <Link color={'inherit'} href={links.insta} target={"_blank"}>
                            <InstagramIcon fontSize="inherit" />
                        </Link>
                    </IconButton>
                    <IconButton size="large" color="secondary">
                        <Link color={'inherit'} href={links.youtube} target={"_blank"}>
                            <YoutubeIcon fontSize="inherit" />
                        </Link>
                    </IconButton>
                </Box>
                <Copyright />
            </Container>
        </footer>
    );
};

export default Footer;