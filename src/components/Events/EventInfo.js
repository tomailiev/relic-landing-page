import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';


const EventInfo = ({ event }) => {

    return (
        <>
            <Typography variant="h4" mb={2}>
                {event.title}
            </Typography>
            <Typography variant="body1">
                {event.description}
            </Typography>
            <Container disableGutters>
                <Typography variant="h6" mt={2}>
                    Performances:
                </Typography>
                <List>
                    {event.performances.map(({ id, date, day, time, location, venue }) => {
                        return (
                            <ListItem key={id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ConfirmationNumberOutlinedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`${venue} - ${location}`} secondary={`${day}, ${date} - ${time}`} />
                            </ListItem>
                        )
                    })}
                </List>
            </Container>
        </>
    )
};

export default EventInfo;