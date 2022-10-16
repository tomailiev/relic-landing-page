import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getLink } from "../../utils/firebase/firestore-funcs";

const MusicianLI = ({ name, picUrl, bio, title, id }) => {
    const [src, setSrc] = useState(null);

    useEffect(() => {
        if (picUrl) {
            getLink(picUrl)
                .then(val => setSrc(val))
                .catch(console.error);
        }
    }, [picUrl]);

    return (
        <ListItem key={id} alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={src} />
            </ListItemAvatar>
            <ListItemText
                primary={name}
                // secondary={
                //     <Typography
                //         sx={{ display: 'inline' }}
                //         component="span"
                //         variant="body2"
                //         color="text.primary"
                //     >
                //         {title}
                //     </Typography>
                // }
            />
        </ListItem>
    )
};

export default MusicianLI;