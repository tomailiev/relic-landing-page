import { Paper, Typography, useMediaQuery, useTheme, } from "@mui/material";
import { Container } from "@mui/system";
import { createRef, useContext, useEffect, useState } from "react";
import loader from '../../utils/gmaps/gmapsInit';
import markerIcon from '../../assets/imgs/maps-marker-32.png'
import { downloadDocsV2 } from "../../utils/firebase/firestore-funcs";
import TextContext from "../../context/TextContext";

//revise if international engagements!!
const Journey = () => {

    const { text } = useContext(TextContext);
    const [events, setEvents] = useState([]);
    const mapRef = createRef();
    
    const theme = useTheme();
    const smMatch = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        downloadDocsV2('events')
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
                        zoom: smMatch ? 3 : 4,
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
    }, [events, mapRef, smMatch])


    return (
        <Container maxWidth="false" disableGutters sx={{ mb: 5, textAlign: 'center' }}>
            <Typography variant="h3" my={8} mx={3} >
                Our journey
            </Typography>
            <Paper elevation={3} sx={{ my: 2, mx: 3, py: 5, px: 1 }}>
                <Container maxWidth={'lg'}>
                    <Typography textAlign={'left'}>
                        {text.mapText.replace('{statesNum}', events.length ? events.reduce((a, c) => {
                                const state = c.locationName.substring(c.locationName.length - 3);
                                if (!a.includes(state) && state !== '.C.') {
                                    return a.concat(state);
                                }
                                return a;
                        }, []).length : 1)}
                    </Typography>
                </Container>
                <Container ref={mapRef} sx={{ width: '100%', height: '500px', borderRadius: '4px', my: 5 }} />
            </Paper>
        </Container>
    );
};

export default Journey;