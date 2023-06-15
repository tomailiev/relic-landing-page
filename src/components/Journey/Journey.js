import { Paper, Typography, } from "@mui/material";
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

                        function showWindow() {
                            infoWindow.open({
                                anchor: marker,
                                map,
                            });
                        }
                        marker.addListener("mouseover", showWindow);
                        marker.addListener("mousedown", showWindow);
                        marker.addListener("mouseout", () => {
                            infoWindow.close();
                        })
                    });
                })
                .catch(e => console.log(e));
        }
    }, [events, mapRef])


    return (
        <Container maxWidth="false" disableGutters sx={{ mb: 5, textAlign: 'center' }}>
            <Typography variant="h3" my={8} >
                Our journey
            </Typography>
            <Paper elevation={3} sx={{ my: 2, mx: 3, py: 5, px: 1 }}>
                <Container maxWidth={'lg'}>
                    <Typography textAlign={'left'}>
                        {text.mapText.replace('{statesNum}', 6)}
                    </Typography>
                </Container>
                <Container ref={mapRef} sx={{ width: '100%', height: '500px', borderRadius: '4px', my: 5 }} />
            </Paper>
        </Container>
    );
};

export default Journey;