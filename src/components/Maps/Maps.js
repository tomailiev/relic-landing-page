import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { createRef, useEffect } from "react";
import loader from '../../utils/gmaps/gmapsInit';
import markerIcon from '../../assets/imgs/maps-marker-32.png'

const Maps = () => {

    const mapRef = createRef();


    useEffect(() => {
        const center = { lat: 37.0902, lng: -95.7129 };
        // const bg = { lat: 42.698334, lng: 23.319941 };
        loader
            .load()
            .then(google => {
                const map = new google.maps.Map(mapRef.current, {
                    zoom: 4,
                    center: center
                });
                const positions = [
                    { lat: 37.57620294743149, lng: -77.49717694332172 },
                    { lat: 42.28082114626222, lng: -85.61577097755985 },
                ];
                positions.forEach((position) => {
                    const marker = new google.maps.Marker({
                        position,
                        map: map,
                        icon: markerIcon
                    });

                    const infoWindow = new google.maps.InfoWindow({
                        content: 'Hello'
                    });

                    marker.addListener("click", () => {
                        infoWindow.open({
                            anchor: marker,
                            map,
                        });
                    });
                });
            })
            .catch(e => console.log('erroring out'))
    }, [mapRef])


    return (
        <>
            <Container maxWidth="false" disableGutters sx={{ my: 5, textAlign: 'center' }}>
                <Typography variant="h3" >
                    Our map
                </Typography>
                <Container ref={mapRef} sx={{ width: '100%', height: '500px', borderRadius: '4px' }}>

                </Container>
            </Container>
        </>
    );
};

export default Maps;