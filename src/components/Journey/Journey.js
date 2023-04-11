import { Grid, Paper, Typography, } from "@mui/material";
import { Container } from "@mui/system";
import { createRef, useContext, useEffect, useState } from "react";
import loader from '../../utils/gmaps/gmapsInit';
import markerIcon from '../../assets/imgs/maps-marker-32.png'
import { downloadDocs } from "../../utils/firebase/firestore-funcs";
import TextContext from "../../context/TextContext";

const Journey = () => {

    const { text } = useContext(TextContext);
    const [events, setEvents] = useState([]);
    const mapRef = createRef();
    // const [statesNum, setStatesNum] = useState(new Set());


    useEffect(() => {
        downloadDocs('events')
            .then(docs => {
                setEvents(docs.reduce((acc, curr) => {
                    const title = curr.title;
                    const arr = acc.concat(curr.performances.map(perf => ({
                        title,
                        location: perf.geocode,
                        locationName: perf.location,
                        date: perf.date
                    })));
                    return arr;
                }, []));
            })
    }, []);

    useEffect(() => {
        if (events.length) {
            const center = { lat: 37.0902, lng: -95.7129 };
            loader.load()
                .then(google => {
                    const map = new google.maps.Map(mapRef.current, {
                        zoom: 3,
                        center: center
                    });
                    events.forEach((position) => {
                        const marker = new google.maps.Marker({
                            position: position.location,
                            map: map,
                            icon: markerIcon
                        });

                        const infoWindow = new google.maps.InfoWindow({
                            content: `<div>
                        <b>${position.title}</b>
                        </div>
                        <div>
                        ${position.locationName}
                        </div>
                        <div>
                        ${position.date}
                        </div>`
                        });

                        marker.addListener("click", () => {
                            infoWindow.open({
                                anchor: marker,
                                map,
                            });
                        });
                    });
                })
                .catch(e => console.log(e));
        }
    }, [events, mapRef])


    return (
        <Container maxWidth="false" disableGutters sx={{ my: 5, textAlign: 'center' }}>
            <Typography variant="h3" mb={5} >
                Our journey
            </Typography>
            <Paper elevation={3} sx={{ my: 2, mx: 4, p: 2, }}>
                <Grid container spacing={2} justifyContent="center" my={4}>
                    <Grid item md={6} xs={12}>
                        <Typography mx={3} textAlign={'left'}>
                            {text.mapText.replace('{statesNum}', 7)}
                        </Typography>
                    </Grid>
                    <Grid item md={6} xs={12} textAlign={'left'}>
                        <Container ref={mapRef} sx={{ width: '100%', height: '500px', borderRadius: '4px' }} />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Journey;