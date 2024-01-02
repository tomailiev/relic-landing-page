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
    const date = new Date();
    const month = date.getMonth();
    const seasonSwitch = month >= 7;
    const year = date.getFullYear();
    const seasons = Array.from({ length: seasonSwitch ? year - 2021 : year - 2022 }, (_, i) => i + 2022);

    const navItems = [
        {
            path: '/about', title: 'About', menu: [
                { path: '/about/bio', title: 'Relic' },
                { path: '/about/mission', title: 'Mission' },
                { path: '/about/musicians', title: 'Musicians' },
                { path: '/about/journey', title: 'Journey' }
            ]
        },
        {
            path: '/events', title: 'Events', menu: seasons.reverse().map((item) => {
                return {
                    path: `/events/${item}`,
                    title: `Season ${item}-${(item + 1) % 2000}`
                }
            })
        },
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
                    <Box component={RouterLink} overflow={'hidden'} to={'/'} height={'80px'} minWidth={'80px'} sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, transition: 'all 0.08s ease' }} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                        <img src={logo} alt="homepage" aria-label="home" width={'70%'} height={'170%'} />
                    </Box>
                    <Box justifyContent={'center'} flexGrow={1} component={"nav"} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {navItems.map(({ path, title, menu }) => {
                            return <NavMenuItem key={title} menuTitle={title} menu={menu} path={path} color={'white'} />
                        })}
                    </Box>
                    <ResponsiveDrawer handleDrawerToggle={handleDrawerToggle} isDrawerOpen={isDrawerOpen} navItems={navItems} />
                    <Box width={'90px'}>
                        <Button color="secondary" sx={{ fontWeight: 'bold', width: '100%', letterSpacing: 1.5, px: 6, border: '2px solid' }} variant="outlined" href={links.gems} target={'_blank'} onClick={() => analyze('select_content', { content_type: 'donate_button' })}>
                            Donate
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;