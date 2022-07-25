import { Box, IconButton, Link, Typography } from "@mui/material";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
// import TwitterIcon from '@mui/icons-material/Twitter';
import Copyright from "./Copyright";
import { Container } from "@mui/system";

const Footer = () => {


    return (
        <footer style={{ background: '#aa4370', padding: 10 }}>
            <Container disableGutters>
                <Box justifyContent={'center'} mx={5}>
                    <Typography color="white" align="center" paddingBottom={2}>
                        Relic is a fiscal project of Gotham Early Music Scene, Inc., a 501(c)(3) non-profit organization registered in the State of New York. Your contribution is tax deductible to the full extent of the law.
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