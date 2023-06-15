import { Accordion, AccordionDetails, AccordionSummary, MenuItem, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';


const ResponsiveMenuItem = ({ menuTitle, menu, handleDrawerToggle }) => {
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();
    const handleClose = () => {
        handleDrawerToggle();
        setExpanded(false);
    }

    return (
        <Accordion expanded={expanded} onClick={() => setExpanded(!expanded)} sx={{ background: theme.palette.primary.main, color: '#ffffff', borderBottom: 'none', boxShadow: 'none' }}>
            <AccordionSummary>
                <Typography variant="h6" textAlign="center">{menuTitle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {menu.map(({ title, path }) => (
                    <MenuItem key={title} component={RouterLink} to={path} onClick={handleClose} >
                        <Typography variant="h6" textAlign="center">{title}</Typography>
                    </MenuItem>
                ))}
            </AccordionDetails>
        </Accordion >
    );
};

export default ResponsiveMenuItem;