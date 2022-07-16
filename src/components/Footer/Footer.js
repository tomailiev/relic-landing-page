import { Box, IconButton, Typography } from "@mui/material";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Copyright from "./Copyright";
import { Container } from "@mui/system";

const Footer = () => {

    return (
        <footer style={{ background: "linear-gradient(180deg, rgba(238,222,197,1) 0%, rgba(214,191,162,1) 100%)", padding: 10 }}>
            <Container disableGutters>
                <Box justifyContent={'center'}>
                    <Typography color="text.secondary" align="center" paddingBottom={2}>
                        Relic is a fiscal project of Gotham Early Music Scene, Inc., a 501(c)(3) non-profit organization registered in the State of New York. Your contribution is tax deductible to the full extent of the law.
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent={"center"} alignItems="center" marginBottom={0}>
                    <IconButton size="large" color="secondary">
                        <InstagramIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton size="large" color="secondary">
                        <FacebookRoundedIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton size="large" color="secondary">
                        <TwitterIcon fontSize="inherit" />
                    </IconButton>
                </Box>
                <Copyright />
            </Container>
        </footer>
    );
};

export default Footer;