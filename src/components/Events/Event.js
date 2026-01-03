import { Button, Grid, Paper, useMediaQuery, useTheme } from "@mui/material";
import EventCard from "./EventCard";
import EventInfo from "./EventInfo";
import diagonalBanner from '../../assets/banners/ribbon_past.png';
import { useContext, useEffect, useState } from "react";
import DialogContext from "../../context/DialogContext";
import ProgramDialog from "./ProgramDialog";
import { getLink } from "../../utils/firebase/firestore-funcs";

const Event = ({ event, past }) => {

    const { setDialog } = useContext(DialogContext);

    const theme = useTheme();
    const smMatch = useMediaQuery(theme.breakpoints.down('md'));
    const [pdfFile, setPdfFile] = useState(null);

    useEffect(() => {
        if (event.program) {
            getLink(event.program)
                .then(val => setPdfFile(val))
                .catch(console.error);
        }
    }, [event.program]);

    return (
        <Paper key={event.id} elevation={3} sx={{ py: 3, px: 3, mb: 4, position: 'relative' }}>
            {past && <img src={diagonalBanner} style={{ position: "absolute", zIndex: 100, left: 0, top: 0, width: `${smMatch ? '35%' : '20%'}` }} alt="past event banner" />}
            <Grid container spacing={6} justifyContent={'center'}>
                <Grid item sm={10} md={5} size={{ xs: 10, md: 5 }} textAlign={'center'}>
                    <EventCard id={event.id} imageUrl={event.imageUrl} title={event.title} url={event.eventUrl} past={past} />
                    {pdfFile && <Button sx={{ mt: 2 }} size={'large'} variant={'text'} onClick={() => setDialog({ title: event.title, component: <ProgramDialog file={pdfFile} />, type: 'program' })}>View Program Book</Button>}
                </Grid>
                <Grid item sm={10} md={7} size={{ xs: 10, md: 7 }} textAlign={'left'}>
                    <EventInfo event={event} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Event;