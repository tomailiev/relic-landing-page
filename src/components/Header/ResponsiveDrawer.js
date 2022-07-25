import { Divider, Drawer, List, MenuItem, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { Link as RouterLink } from 'react-router-dom';
import ResponsiveMenuItem from "./ResponsiveMenuItem";


const ResponsiveDrawer = ({ isDrawerOpen, handleDrawerToggle, navItems }) => {
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
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, background: '#a33363' },
                }}
            >
                <Box sx={{ textAlign: 'center', color: 'white' }}>
                    <MenuItem onClick={handleDrawerToggle} component={RouterLink} to={'/'} sx={{ my: 2.2 }}>
                        <Typography textAlign="center"  sx={{ fontWeight: 'bold' }}>Home</Typography>
                    </MenuItem>
                    <Divider />
                    <List>
                        {navItems.filter((x) => x.title !== 'Home').map(({ path, title, menu }) => {
                            return menu
                                ? <ResponsiveMenuItem key={title} menuTitle={title} menu={menu} handleDrawerToggle={handleDrawerToggle} />
                                : (
                                    <MenuItem onClick={handleDrawerToggle} key={title} component={RouterLink} to={path}>
                                        <Typography textAlign="center"  sx={{ fontWeight: 'bold' }}>{title}</Typography>
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