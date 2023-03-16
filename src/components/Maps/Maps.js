import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { createRef, useEffect } from "react";
import loader from '../../utils/gmaps/gmapsInit';

const Maps = () => {

    const mapRef = createRef();


    useEffect(() => {
        const uluru = { lat: 45.51903501997312, lng: -122.68448666907778 };
        loader
            .load()
            .then(google => {
                const map = new google.maps.Map(mapRef.current, {
                    zoom: 4,
                    center: uluru
                });

                const marker = new google.maps.Marker({
                    position: uluru,
                    map: map,
                    // label: 'First Baptist'
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
                <Container ref={mapRef} sx={{width: '100%', height: '500px'}}>

                </Container>
            </Container>
        </>
    );
};

export default Maps;