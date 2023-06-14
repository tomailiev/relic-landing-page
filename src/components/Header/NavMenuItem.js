import { Box, Fade, MenuItem, Typography, useTheme } from "@mui/material";
import { useRef } from "react";
import { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';


const NavMenuItem = ({ menuTitle, menu, path }) => {
    const theme = useTheme();
    const anchorEl = useRef(null);
    const [checked, setChecked] = useState(false);

    const handleClick = (event) => {
        setChecked(true);
    };

    const handleClose = () => {
        setChecked(false);
    };

    return (
        <Box onMouseOver={handleClick} onMouseOut={handleClose}>
            <MenuItem ref={anchorEl} key={menuTitle} component={menu ? Box : RouterLink} to={path} sx={{ my: 2.2, mx: 1.2 }}>
                <Typography variant="h6" textAlign="center" color={'white'} >{menuTitle}</Typography>
            </MenuItem>
            {menu && (
                <Fade direction="up" in={checked} container={anchorEl.current}>
                    <Box position={'absolute'} sx={{ background: theme.palette.primary.main, mx: 1.2 }} >
                        {menu.map(({ title, path }) => (
                            <MenuItem key={title} component={RouterLink} to={path} onClick={handleClose} >
                                <Typography variant="h6" textAlign="center" color={'white'}>{title}</Typography>
                            </MenuItem>
                        ))}
                    </Box>
                </Fade>
            )}
        </Box>
    );
};

export default NavMenuItem;