import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import DialogContext from "../../context/DialogContext";
import { getLink } from "../../utils/firebase/firestore-funcs";

const MusicianLI = ({ name, picUrl, bio, title, id, founder }) => {
    const { setDialog } = useContext(DialogContext);

    const [src, setSrc] = useState(null);

    function addBoldToBio(bio = "") {
        const arr = bio.split(name);
        const span = (<Typography component={'span'} fontSize={18} fontWeight="700" >{name}</Typography>);
        return [arr[0], span, arr[1]];
    }

    useEffect(() => {
        if (picUrl) {
            getLink(picUrl)
                .then(val => setSrc(val))
                .catch(console.error);
        }
    }, [picUrl]);

    return (
        <ListItemButton onClick={() => setDialog(addBoldToBio(bio))}>
            <ListItem key={id} alignItems="center" sx={{padding: 0}}>
                <ListItemAvatar>
                    <Avatar alt={name} src={src} />
                </ListItemAvatar>
                <ListItemText
                    primary={`${name}${founder ? '*' : ''}`}
                />
            </ListItem>
        </ListItemButton>
    )
};

export default MusicianLI;