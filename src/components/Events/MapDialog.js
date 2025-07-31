import { createRef, useEffect } from "react";
import loader from '../../utils/gmaps/gmapsInit';
import { Container } from "@mui/material";



const MapDialog = ({ location, query }) => {
    const mapRef = createRef();
    useEffect(() => {
        loader.load()
            .then(google => {
                const map = new google.maps.Map(mapRef.current, {
                    zoom: 16,
                    center: location
                });
                const service = new google.maps.places.PlacesService(map);
                service.findPlaceFromQuery({
                    query,
                    fields: ["place_id"]
                }, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && results[0]) {
                        const placeId = results[0].place_id;
                        const request = {
                            placeId,
                            fields: ['name', 'geometry', 'formatted_address', 'url'],
                        };
                        service.getDetails(request, (place, status) => {
                            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                                const marker = new window.google.maps.Marker({
                                    position: place.geometry.location,
                                    map,
                                });
                                const infoWindow = new window.google.maps.InfoWindow({
                                    content: `<div><strong>${place.name}</strong><br>${place.formatted_address}<br><a href="${place.url}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a></div>`,
                                });

                                infoWindow.open(map, marker);
                            }
                        })

                    }
                });
            })
    }, [location, mapRef, query]);

    return (
        <Container ref={mapRef} sx={{ width: '100%', height: '470px', borderRadius: '4px', my: 5 }} />

    );
};

export default MapDialog;