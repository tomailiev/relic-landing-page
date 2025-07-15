import { List } from "@mui/material";
import MusicianLI from "./MusicianLI";
import MusicianSkeleton from "./MusicianSkeleton";

const MusicianGroup = ({ section }) => {

    return (
        <>
            {
                section?.length
                    ? <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',}}>
                        {section?.map(({ name, pic, bio, title, id, founder, chair }) => {
                            return <MusicianLI key={id} name={name} picUrl={pic} bio={bio} title={title} founder={founder} chair={chair} />
                        })}
                    </List>
                    : <MusicianSkeleton />
            }
        </>
    );
};

export default MusicianGroup;