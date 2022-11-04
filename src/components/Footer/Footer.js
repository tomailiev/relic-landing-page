import { Box, IconButton, Link, Typography, useTheme } from "@mui/material";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import Copyright from "./Copyright";
import { Container } from "@mui/system";
import { useContext } from "react";
import TextContext from "../../context/TextContext";

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
                        <Link color={'inherit'} href="https://www.instagram.com/relic_ensemble/" target={"_blank"}>
                            <InstagramIcon fontSize="inherit" />
                        </Link>
                    </IconButton>
                    <IconButton size="large" color="secondary">
                        <Link color={'inherit'} href="https://www.facebook.com/RELIC-ensemble-109345125182475/" target={"_blank"}>
                            <FacebookRoundedIcon fontSize="inherit" />
                        </Link>
                    </IconButton>
                </Box>
                <Copyright />
            </Container>
        </footer>
    );
};

export default Footer;