import { AppBar, Toolbar, Typography, MenuItem, IconButton, Box, Drawer, List, Divider, } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const navItems = [
        { path: '/', title: 'Home' },
        { path: '/whoweare', title: 'Who we are' },
        { path: '/contact', title: 'Contact' },
    ];

    function handleDrawerToggle() {
        setIsDrawerOpen(!isDrawerOpen);
    }

    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Box justifyContent={'center'} component={"nav"} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    {navItems.map(({ path, title }) => (
                        <MenuItem key={title} component={RouterLink} to={path}>
                            <Typography textAlign="center">{title}</Typography>
                        </MenuItem>
                    ))}
                </Box>
                <Box component="nav">
                    <Drawer
                        anchor="left"
                        variant="temporary"
                        open={isDrawerOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, background: '#f4e5cf' },
                        }}
                    >
                        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', }}>
                            <Typography variant="h4" fontFamily="tangerine" sx={{ my: 2 }}>
                                Relic
                            </Typography>
                            <Divider />
                            <List>
                                {navItems.map(({ path, title }) => (
                                    <MenuItem key={title} component={RouterLink} to={path}>
                                        <Typography textAlign="center">{title}</Typography>
                                    </MenuItem>
                                ))}
                            </List>
                        </Box>
                    </Drawer>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;