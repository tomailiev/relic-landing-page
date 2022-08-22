import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link as RouterLink } from 'react-router-dom';
import icons from "../../data/icons";


const StoryListItem = ({ icon, text, more }) => {

    const [open, setOpen] = useState(false);

    const ListItemRouterLink = ({ type, route, itemText, itemIcon }) => {
        return type === 'route'
            ? <ListItemButton sx={{ pl: 4 }} component={RouterLink} to={route}>
                <ListItemIcon>
                    {icons[itemIcon]}
                </ListItemIcon>
                <ListItemText primary={itemText} />
            </ListItemButton>
            : <ListItemButton sx={{ pl: 4 }} href={route} target="_blank">
                <ListItemIcon>
                    {icons[itemIcon]}
                </ListItemIcon>
                <ListItemText primary={itemText} />
            </ListItemButton>;
    };

    return (
        <>
            <ListItem disablePadding>
                <ListItemButton onClick={() => setOpen(!open)}>
                    <ListItemIcon>
                        {icons[icon]}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {more && (open ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
            </ListItem>
            {more &&
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {more.map(({ type, route, itemText, itemIcon }) => (
                            <ListItemRouterLink key={itemText} type={type} route={route} itemText={itemText} itemIcon={itemIcon} />
                        ))}
                    </List>
                </Collapse>}
        </>
    );
};

export default StoryListItem;