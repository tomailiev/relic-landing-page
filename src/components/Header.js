import { AppBar, Toolbar, Typography, MenuItem } from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    const pages = ["Home", "Who we are", "Contact"]
    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                {/* <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton> */}
                {pages.map((page) => (
                    <MenuItem key={page}>
                        <Typography textAlign="center">{page}</Typography>
                    </MenuItem>))}
                {/* <Button color="inherit">Login</Button> */}
            </Toolbar>
        </AppBar>
    )
}

export default Header;