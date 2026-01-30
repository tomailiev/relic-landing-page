import { Button, Grid } from "@mui/material"

const CalendarDialog = ({ event, perf }) => {

    const handleCalendarOption = (option) => {
        if (!event) return;

        if (option === 'google') {
            // Example Google Calendar URL (adjust fields as needed)
            const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Relic: ' + event.title)}&dates=${perf.start_utc_compact}/${perf.end_utc_compact}&location=${encodeURIComponent(perf.calendar_location)}&details=${encodeURIComponent(event.description)}`;
            window.open(googleUrl, '_blank');
        } else if (option === 'ical') {
            // Example iCal download (you would generate .ics file normally)
            const icsContent = `
                            BEGIN:VEVENT
                            DTSTART:${event.start_utc_compact}
                            DTEND:${event.end_utc_compact}
                            SUMMARY:${'Relic: ' + event.title}
                            LOCATION:${event.calendar_location}
                            END:VEVENT

                                   `;
            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Relic: ${event.title}.ics`;
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