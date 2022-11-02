import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import DialogContext from "../../context/DialogContext";
import { getLink } from "../../utils/firebase/firestore-funcs";
import MusicianDialog from "./MusicianDialog";

const MusicianLI = ({ name, picUrl, bio, id, founder }) => {
    const { setDialog } = useContext(DialogContext);

    const [src, setSrc] = useState(null);

    useEffect(() => {
        if (picUrl) {
            getLink(picUrl)
                .then(val => setSrc(val))
                .catch(console.error);
        }
    }, [picUrl]);

    return (
        <ListItemButton onClick={() => setDialog({ type: 'bio', component: <MusicianDialog name={name} src={src} bio={bio} />, title: name })}>
            <ListItem key={id} alignItems="center" sx={{ padding: 0 }} >
                <ListItemAvatar>
                    <Avatar alt={name} src={src} />
                </ListItemAvatar>
                <ListItemText
                    primary={`${name}${founder ? '*' : ''}`}
                    primaryTypographyProps={{
                        fontSize: '1.2em',
                      }}
                />
            </ListItem>
        </ListItemButton>
    )
};

export default MusicianLI;