import { ListItem, ListItemAvatar, Skeleton } from "@mui/material";

const MusicianSkeleton = () => {

    return (
        <ListItem alignItems="center" sx={{ pl: '16px' }} >
            <ListItemAvatar>
                <Skeleton animation="wave" variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <Skeleton animation="wave" variant="text" width={120} />
        </ListItem>
    );
};

export default MusicianSkeleton;