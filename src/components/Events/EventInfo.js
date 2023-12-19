import { Avatar, Link, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
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
                    {event.performances.sort((a, b) => a.id - b.id).map(({ id, date, day, time, location, venue, url }) => {
                        return (
                            <Link key={id} href={url} target={'_blank'} underline={'none'}>
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar sx={{background: '#09455a'}}>
                                            <ConfirmationNumberOutlinedIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={`${venue} - ${location}`} secondary={`${day}, ${date} - ${time}`} />
                                </ListItemButton>
                            </Link>
                        )
                    })}
                </List>
            </Container>
        </>
    )
};

export default EventInfo;