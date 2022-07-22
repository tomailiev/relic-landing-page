import { Container, Grid, Typography } from "@mui/material";
import eventsBanner from '../../assets/banners/eventsBanner.webp';
import EventCard from "./EventCard";

const Events = () => {

    return (
        <>
            <Container disableGutters maxWidth={false} sx={{ px: 0 }}>
                <img src={eventsBanner} width="100%" height={'auto'} alt="banner" />
            </Container>
            <Container maxWidth="lg" sx={{ my: 5, textAlign: 'center' }}>
                <Typography variant="h2" >
                    Upcoming Events
                </Typography>
                <Grid container spacing={6} mt={3}>
                    <Grid item xs={12} md={6}>
                        <EventCard />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        
                    </Grid>
                </Grid>
            </Container>
        </>
        // <Box height={'500px'} display="flex" flexDirection="column" alignItems={"center"} justifyContent="center" textAlign={'center'} mx={2}>
        //     <Typography variant="h4">Inaugural week in Kalamazoo MI September 7-10, 2022</Typography>
        //     <Typography variant="h5">For more information <Button onClick={() => setDialog('subscription')}>Subscribe here</Button></Typography>
        // </Box>
    );
};

export default Events;