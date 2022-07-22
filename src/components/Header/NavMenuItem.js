import { Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';


const NavMenuItem = ({ menuTitle, menu }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <MenuItem
                aria-controls={!!anchorEl ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={!!anchorEl ? 'true' : undefined}
                onClick={handleClick}
                component={'a'}
                sx={{fontWeight: 'bold'}}
            >
                {menuTitle}
            </MenuItem>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {menu.map(({title, path}) => (
                    <MenuItem key={title} component={RouterLink} to={path} onClick={handleClose} >
                        <Typography textAlign="center" color={'secondary'} sx={{ fontWeight: 'bold' }}>{title}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default NavMenuItem;