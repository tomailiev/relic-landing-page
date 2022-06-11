import { Button, ButtonGroup, IconButton, Toolbar } from "@mui/material";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Copyright from "./Copyright";
import { Container } from "@mui/system";

const Footer = () => {

    return (
        <footer>
            <Container disableGutters>
                <Container>
                    <IconButton size="large" color="secondary">
                        <InstagramIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton size="large" color="secondary">
                        <FacebookRoundedIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton size="large" color="secondary">
                        <TwitterIcon fontSize="inherit" />
                    </IconButton>
                </Container>
                <Copyright />
            </Container>
        </footer>
    );
};

export default Footer;