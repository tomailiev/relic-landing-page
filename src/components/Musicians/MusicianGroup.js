import { List, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import MusicianLI from "./MusicianLI";

const MusicianGroup = ({ section }) => {

    const [sectionTitle, setSectionTitle] = useState('');

    useEffect(() => {
        setSectionTitle(section[0]?.newTitle);
    }, [section]);

    return (
        <>
            {sectionTitle && <Typography variant={'h6'} textAlign={'left'}>{sectionTitle}</Typography>}
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {section?.map(({ name, pic, bio, title, id, founder }) => {
                    return <MusicianLI key={id} name={name} picUrl={pic} bio={bio} title={title} founder={founder} />
                })}
            </List>
        </>
    );
};

export default MusicianGroup;