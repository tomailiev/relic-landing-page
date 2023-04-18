import { AppBar, Toolbar, IconButton, Box, Button, } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import NavMenuItem from "./NavMenuItem";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { links } from "../../data/links";
import logo from "../../assets/logos/relic-logo-bw.png";
import { analyze } from "../../utils/firebase/firestore-funcs";


const Header = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const navItems = [
        {
            path: '/about', title: 'About', menu: [
                { path: '/bio', title: 'Relic' },
                { path: '/musicians', title: 'Musicians' },
                { path: '/journey', title: 'Journey' }
            ]
        },
        { path: '/events', title: 'Events' },
        { path: '/support', title: 'Support' },
        { path: '/contact', title: 'Contact' },
    ];


    function handleDrawerToggle() {
        setIsDrawerOpen(!isDrawerOpen);
    }

    return (
        <>
            <AppBar color={'primary'} sx={{ transition: 'all 0.15s ease' }} position={'sticky'}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { xs: 'relative', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box component={RouterLink} to={'/'} height={'80px'} minWidth={'80px'} sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, transition: 'all 0.08s ease' }} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                        <img src={logo} alt="homepage" aria-label="home" width={'70%'} height={'70%'} />
                    </Box>
                    <Box justifyContent={'center'} flexGrow={1} component={"nav"} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {navItems.map(({ path, title, menu }) => {
                            return <NavMenuItem key={title} menuTitle={title} menu={menu} path={path} color={'white'} />
                        })}
                    </Box>
                    <ResponsiveDrawer handleDrawerToggle={handleDrawerToggle} isDrawerOpen={isDrawerOpen} navItems={navItems} />
                    <Box width={'80px'}>
                        <Button color="secondary" sx={{ fontWeight: 'bold', width: '100%' }} variant="contained" href={links.gems} target={'_blank'} onClick={() => analyze('select_content', {content_type: 'donate_button'})}>
                            Donate
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;