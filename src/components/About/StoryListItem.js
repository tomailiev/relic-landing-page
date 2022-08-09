import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link as RouterLink } from 'react-router-dom';


const StoryListItem = ({ icon, text, more }) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setOpen(!open)}>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {more && (open ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
            </ListItem>
            {more &&
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {more.map(({ type, route, itemText, itemIcon }) => (
                            <ListItemButton sx={{ pl: 4 }} component={type === 'route' ? RouterLink : 'button'} to={route}>
                                <ListItemIcon>
                                    {itemIcon}
                                </ListItemIcon>
                                <ListItemText primary={itemText} />
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>}
        </>
    );
};

export default StoryListItem;