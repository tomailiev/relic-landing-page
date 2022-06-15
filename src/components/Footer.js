import { Box, IconButton } from "@mui/material";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Copyright from "./Copyright";
import { Container } from "@mui/system";

const Footer = () => {

    return (
        <footer style={{ background: "rgb(238,222,197)", background: "linear-gradient(180deg, rgba(238,222,197,1) 0%, rgba(214,191,162,1) 100%)", padding: 10 }}>
            <Container disableGutters>
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