import { AppBar, Toolbar, Typography, MenuItem } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
// import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                <MenuItem component={RouterLink} to="/">
                        <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem component={RouterLink} to="/whoweare">
                        <Typography textAlign="center">Who we are</Typography>
                </MenuItem>
                <MenuItem component={RouterLink} to="/contact">
                        <Typography textAlign="center">Contact</Typography>
                </MenuItem>
            </Toolbar>
        </AppBar>
    );
};

export default Header;