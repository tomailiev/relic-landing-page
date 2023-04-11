import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { Grid, List, ListItem, ListItemAvatar, Paper, Skeleton, Typography } from "@mui/material";

const EventSkeleton = () => {

    return (
        <Paper elevation={3} sx={{ p: 5 }}>
            <Grid container spacing={6}>
                <Grid item sm={12} md={5} p="1">
                    <Skeleton
                        variant="rectangular" width={250} height={250}
                    />
                </Grid>
                <Grid item sm={12} md={7} textAlign={'left'} >
                    <Typography variant="h4" mb={2}>
                        <Skeleton variant={'text'} width={250} />
                    </Typography>
                    <Skeleton variant={'text'} width={250} />
                    <Skeleton variant={'text'} width={250} />
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <ConfirmationNumberOutlinedIcon />
                            </ListItemAvatar>
                            <Skeleton variant={'rectangular'} width={180} height={30} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <ConfirmationNumberOutlinedIcon />
                            </ListItemAvatar>
                            <Skeleton variant={'rectangular'} width={180} height={30} />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default EventSkeleton;