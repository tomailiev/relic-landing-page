import { Grid, Paper, useMediaQuery, useTheme } from "@mui/material";
import EventCard from "./EventCard";
import EventInfo from "./EventInfo";
import diagonalBanner from '../../assets/banners/ribbon_past.png';

const Event = ({ event, past }) => {
    const theme = useTheme();
    const smMatch = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Paper key={event.id} elevation={3} sx={{ py: 3, px: 3, mb: 4, position: 'relative' }}>
            {past && <img src={diagonalBanner} style={{ position: "absolute", zIndex: 100, left: 0, top: 0, width: `${smMatch ? '35%' : '20%'}` }} alt="past event banner" />}
            <Grid container spacing={6} justifyContent={'center'}>
                <Grid item sm={10} md={5}>
                    <EventCard imageUrl={event.imageUrl} url={event.eventUrl} past={past} />
                </Grid>
                <Grid item sm={10} md={7} textAlign={'left'}>
                    <EventInfo event={event} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Event;