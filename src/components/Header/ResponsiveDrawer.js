import { Divider, Drawer, List, MenuItem, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { Link as RouterLink } from 'react-router-dom';


const ResponsiveDrawer = ({isDrawerOpen, handleDrawerToggle, navItems}) => {
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
            <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', color: 'white' }}>
                <MenuItem component={RouterLink} to={'/'} sx={{ my: 2.2 }}>
                <Typography textAlign="center" fontSize={'bold'}>Home</Typography>
                </MenuItem>
                <Divider />
                <List>
                    {navItems.filter((x) => x.title !== 'Home').map(({ path, title }) => (
                        <MenuItem key={title} component={RouterLink} to={path}>
                            <Typography textAlign="center" fontSize={'bold'}>{title}</Typography>
                        </MenuItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    </Box>

    );
};

export default ResponsiveDrawer;