import { AppBar, Toolbar, Typography, MenuItem, IconButton, Box, Button, useScrollTrigger, Slide, } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import NavMenuItem from "./NavMenuItem";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { links } from "../../data/links";

const Header = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const navItems = [
        { path: '/', title: 'Home' },
        {
            path: '/about', title: 'About us', menu: [
                { path: '/story', title: 'Our story' },
                { path: '/musicians', title: 'Our musicians' }
            ]
        },
        { path: '/events', title: 'Events' },
        { path: '/contact', title: 'Contact Us' }
    ];


    const trigger = useScrollTrigger();

    function handleDrawerToggle() {
        setIsDrawerOpen(!isDrawerOpen);
    }

    return (
        <>
            <Slide appear={false} direction="down" in={!trigger}>
                <AppBar color="primary" position={'sticky'}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
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
                            {navItems.map(({ path, title, menu }) => {
                                return menu
                                    ? <NavMenuItem key={title} menuTitle={title} menu={menu} />
                                    : (
                                        <MenuItem key={title} component={RouterLink} to={path} sx={{ my: 2.2, mx: 1.2 }}>
                                            <Typography textAlign="center" color={'white'} sx={{ fontWeight: 'bold' }}>{title}</Typography>
                                        </MenuItem>
                                    )
                            })}
                        </Box>
                        <ResponsiveDrawer handleDrawerToggle={handleDrawerToggle} isDrawerOpen={isDrawerOpen} navItems={navItems} />
                        <Button color="secondary" sx={{ fontWeight: 'bold' }} variant="contained" href={links.gems} target={'_blank'}>
                            Donate
                        </Button>
                    </Toolbar>
                </AppBar>
            </Slide >
        </>
    );
};

export default Header;