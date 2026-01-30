import { Button, Grid } from "@mui/material"
import { buildICS } from "../../utils/iCal/buildICS";

const CalendarDialog = ({ event, perf }) => {

    const handleCalendarOption = (option) => {
        if (!event) return;

        if (option === 'google') {
            // Example Google Calendar URL (adjust fields as needed)
            const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Relic: ' + event.title)}&dates=${perf.start_utc_compact}/${perf.end_utc_compact}&location=${encodeURIComponent(perf.calendar_location)}&details=${encodeURIComponent(event.description + perf.url ? 'Tickets: ' + perf.url : '')}`;
            window.open(googleUrl, '_blank');
        } else {
            // Example iCal download (you would generate .ics file normally)
            const icsContent = buildICS(event, perf);

            const blob = new Blob([icsContent], {
                type: "text/calendar;charset=utf-8",
            });

            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `Relic-${event.title}.ics`; // avoid :
            link.click();

        }
    };

    return <Grid container>
        <Grid item size={{ xs: 12, sm: 6 }} textAlign={'center'} sx={{ my: 3 }}>
            <Button variant={'outlined'} onClick={() => handleCalendarOption('google')}>Google</Button>
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }} textAlign={'center'} sx={{ my: 3 }}>
            <Button variant='outlined' onClick={() => handleCalendarOption('ical')}>iCal</Button>
        </Grid>
    </Grid>
}

export default CalendarDialog;