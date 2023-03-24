import { Divider, Drawer, List, MenuItem, Typography, useTheme } from "@mui/material"
import { Box } from "@mui/system";
import { Link as RouterLink } from 'react-router-dom';
import ResponsiveMenuItem from "./ResponsiveMenuItem";
import { logos } from '../../data/images';


const ResponsiveDrawer = ({ isDrawerOpen, handleDrawerToggle, navItems }) => {
    const theme = useTheme();
    return (
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
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, background: theme.palette.primary.main },
                }}
            >
                <Box sx={{ textAlign: 'center', color: 'white' }}>
                    <MenuItem onClick={handleDrawerToggle} component={RouterLink} to={'/'} sx={{ my: 2.2 }}>
                        {/* <Typography variant="h6" textAlign="center"  sx={{ fontWeight: 'bold' }}>Home</Typography> */}
                        <img width={'50%'} src={logos.logo_gold} alt={'Home'} />
                    </MenuItem>
                    <Divider />
                    <List>
                        {navItems.filter((x) => x.title !== 'Home').map(({ path, title, menu }) => {
                            return menu
                                ? <ResponsiveMenuItem key={title} menuTitle={title} menu={menu} handleDrawerToggle={handleDrawerToggle} />
                                : (
                                    <MenuItem onClick={handleDrawerToggle} key={title} component={RouterLink} to={path}>
                                        <Typography variant="h6" textAlign="center" sx={{ fontWeight: 'bold' }}>{title}</Typography>
                                    </MenuItem>
                                );
                        }
                        )}
                    </List>
                </Box>
            </Drawer>
        </Box>

    );
};

export default ResponsiveDrawer;