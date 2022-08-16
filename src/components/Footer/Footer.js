import { Box, IconButton, Link, Typography } from "@mui/material";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
// import TwitterIcon from '@mui/icons-material/Twitter';
import Copyright from "./Copyright";
import { Container } from "@mui/system";
import { useContext } from "react";
import TextContext from "../../context/TextContext";

const Footer = () => {

    const { text } = useContext(TextContext);

    return (
        <footer style={{ background: '#aa4370', padding: 10 }}>
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
                    {/* <IconButton size="large" color="secondary">
                        <TwitterIcon fontSize="inherit" />
                    </IconButton> */}
                </Box>
                <Copyright />
            </Container>
        </footer>
    );
};

export default Footer;