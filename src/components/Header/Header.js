import { AppBar, Toolbar, Typography, MenuItem, IconButton, Box, Drawer, List, Divider, Button, useScrollTrigger, Slide, } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import logoIcon from '../../assets/logos/relic-logo-bw.png'
import { useState } from "react";
import NavMenuItem from "./NavMenuItem";
import { useContext } from "react";
import DialogContext from "../../context/DialogContext";
// import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const Header = () => {

    const { setDialog } = useContext(DialogContext);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const navItems = [
        {
            path: '/about', title: 'About us', menu: [
                { path: '/mission', title: 'Our mission' },
                { path: '/musicians', title: 'Our musicians' }
            ]
        },
        { path: '/events', title: 'Events' },
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
                            <MenuItem component={RouterLink} to={'/'} sx={{ my: 2.2, mr: 1 }}>
                                <img src={logoIcon} height="48px" width="auto" alt="logo icon" />
                            </MenuItem>
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
                        <Box component="nav">
                            <Drawer
                                anchor="left"
                                color="primary"
                                variant="temporary"
                                open={isDrawerOpen}
                                onClose={handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                                sx={{
                                    display: { xs: 'block', sm: 'none' },
                                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, background: '#a33363' },
                                }}
                            >
                                <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', color: 'white' }}>
                                    <MenuItem component={RouterLink} to={'/'} sx={{ my: 2.2 }}>
                                        <img src={logoIcon} height="48px" width="auto" alt="logo icon" />
                                    </MenuItem>
                                    <Divider />
                                    <List>
                                        {navItems.map(({ path, title }) => (
                                            <MenuItem key={title} component={RouterLink} to={path}>
                                                <Typography textAlign="center" fontSize={'bold'}>{title}</Typography>
                                            </MenuItem>
                                        ))}
                                    </List>
                                </Box>
                            </Drawer>
                        </Box>
                        <Button color="secondary" sx={{ fontWeight: 'bold' }} variant="contained" onClick={() => setDialog('donation')}>
                            Donate
                        </Button>
                    </Toolbar>
                </AppBar>
            </Slide >
        </>
    );
};

export default Header;