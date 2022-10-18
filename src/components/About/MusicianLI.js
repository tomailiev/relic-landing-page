import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import DialogContext from "../../context/DialogContext";
import { getLink } from "../../utils/firebase/firestore-funcs";

const MusicianLI = ({ name, picUrl, bio, title, id, founder }) => {
    const { setDialog } = useContext(DialogContext);

    const [src, setSrc] = useState(null);

    function addBoldToBio(bio = "") {
        const arr = bio.split(name);
        return (
            <>
                <Box display={'flex'} justifyContent={'center'}>
                    <img src={src} height="auto" width="80%" alt={name} />
                </Box>
                <Box>
                    <Typography m={3}>
                        {arr[0]}
                        <Typography component={'span'} fontSize={18} fontWeight="700" >{name}</Typography>
                        {arr[1]}
                    </Typography>
                </Box>
            </>
        );
    }

    useEffect(() => {
        if (picUrl) {
            getLink(picUrl)
                .then(val => setSrc(val))
                .catch(console.error);
        }
    }, [picUrl]);

    return (
        <ListItemButton onClick={() => setDialog({ type: 'bio', component: addBoldToBio(bio), title: name })}>
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