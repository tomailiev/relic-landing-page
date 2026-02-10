import { Typography, useMediaQuery, useTheme, } from "@mui/material";
import { Box, Container } from "@mui/system";
import { createRef, useContext, useEffect, useState } from "react";
import loader from '../../utils/gmaps/gmapsInit';
import markerIcon from '../../assets/imgs/maps-marker-32.png'
import { downloadDocsV2 } from "../../utils/firebase/firestore-funcs";
import TextContext from "../../context/TextContext";
import banners from "../../data/banners";
import Seo from "../Common/SEO";

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
        <>
            <Seo title={`Relic's Journey`} description={`View Relic's concert history on a map.`} />
            <Container maxWidth="false" disableGutters sx={{ mb: 5, textAlign: 'center' }}>
                <Box
                    sx={{
                        width: '100%',
                        height: { xs: 300, sm: 350, },
                        backgroundImage: `url(${banners.journeyBanner})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        mb: 3,
                    }}
                />
                <Typography variant="h3" my={8} mx={3} >
                    Relic's journey
                </Typography>
                <Container maxWidth={'lg'}>
                    <Typography textAlign={'left'} fontSize={'1.2em'}>
                        {text.mapText.replace('{statesNum}', events.length ? events.reduce((a, c) => {
                            const state = c.locationName.substring(c.locationName.length - 3);
                            if (!a.includes(state) && state !== '.C.') {
                                return a.concat(state);
                            }
                            return a;
                        }, []).length : 1)}
                    </Typography>
                </Container>
                {/* <Paper elevation={3} sx={{ my: 2, mx: 2, py: 5, px: 1 }}> */}
                <Container maxWidth={'lg'} />
                <Container ref={mapRef} sx={{ width: { xs: '90%', md: '95%' }, height: '500px', borderRadius: '4px', my: 7, }} />
                {/* </Paper> */}
            </Container>
        </>
    );
};

export default Journey;