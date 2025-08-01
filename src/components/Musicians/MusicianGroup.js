import { List } from "@mui/material";
import MusicianLI from "./MusicianLI";
import MusicianSkeleton from "./MusicianSkeleton";

const MusicianGroup = ({ section, length = 1 }) => {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', }}>
            {section?.length
                ? section.map(({ name, pic, bio, newTitle, id, founder, chair, }) => {
                    return <MusicianLI key={id} name={name} picUrl={pic} bio={bio} title={newTitle} founder={founder} chair={chair} />
                })
                : new Array(length).fill(null).map((_, i) => <MusicianSkeleton key={i} />)
            }
        </List>


    );
};

export default MusicianGroup;