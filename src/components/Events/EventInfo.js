import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';


const EventInfo = () => {
    const event = {
        title: 'Autumn Rising',
        description: "Relic is going live this September in Kalamazoo, MI! Our inaugural week features two performances of handpicked baroque favorites and lesser known gems by Handel, Scarlatti, Corelli, and Barbara Strozzi among others. Join us at our free concerts at WMU and First Congregational Church!",
        performances: [
            {
                id: 0,
                date: 'September 8th, 2022',
                day: 'Thursday',
                time: '7:30pm',
                location: 'Kalamazoo, MI',
                venue: 'WMU Dalton Center Recital Hall'
            },
            {
                id: 1,
                date: 'September 10th, 2022',
                day: 'Saturday',
                time: '7:30pm',
                location: 'Kalamazoo, MI',
                venue: 'First Congregational Church'
            },
        ]
    }

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