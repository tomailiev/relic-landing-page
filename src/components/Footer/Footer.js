import { Box, IconButton, Link, Typography, useTheme } from "@mui/material";
import { FacebookRounded, Instagram, YouTube } from '@mui/icons-material';
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
            {/* <Fab size="small" sx={{ position: 'fixed', right: '25px', bottom: '150px' }}>
                <Email />
            </Fab>
            <Fab size="small" sx={{ position: 'fixed', right: '25px', bottom: '100px' }}>
                <FacebookRounded />
            </Fab>
            <Fab size="small" sx={{ position: 'fixed', right: '25px', bottom: '50px' }}>
                <Instagram />
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