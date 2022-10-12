import { AppBar, Toolbar, Typography, MenuItem, IconButton, Box, Button, useScrollTrigger, } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import NavMenuItem from "./NavMenuItem";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { links } from "../../data/links";
import logo from "../../assets/logos/relic-logo-bw.png";


const Header = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const navItems = [
        // { path: '/', title: 'Home' },
        {
            path: '/about', title: 'About us', menu: [
                { path: '/story', title: 'Our story' },
                { path: '/musicians', title: 'Our musicians' }
            ]
        },
        { path: '/events', title: 'Events' },
        { path: '/contact', title: 'Contact Us' }
    ];


    const colorTrigger = useScrollTrigger({ disableHysteresis: true });

    function handleDrawerToggle() {
        setIsDrawerOpen(!isDrawerOpen);
    }

    return (
        <>
            <AppBar color={!!colorTrigger ? 'primary' : 'transparent'} sx={{ transition: 'all 0.15s ease' }} position={'sticky'}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box component={RouterLink} to={'/'} height={!!colorTrigger ? '40px' : '100px'} sx={{ display: { xs: 'none', sm: 'flex' }, transition: 'all 0.08s ease' }} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                        <img src={logo} alt="logo" width={'auto'} height={!!colorTrigger ? '95%' : '70%'} />
                    </Box>
                    <Box justifyContent={'center'} flexGrow={1} component={"nav"} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        {navItems.map(({ path, title, menu }) => {
                            return menu
                                ? <NavMenuItem key={title} menuTitle={title} menu={menu} color={!!colorTrigger ? 'white' : 'primary'} />
                                : (
                                    <MenuItem key={title} component={RouterLink} to={path} sx={{ my: 2.2, mx: 1.2 }}>
                                        <Typography textAlign="center" color={!!colorTrigger ? 'white' : 'primary'} sx={{ fontWeight: 'bold' }}>{title}</Typography>
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
        </>
    );
};

export default Header;