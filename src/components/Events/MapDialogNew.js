import { createRef, useEffect } from "react";
import loader from "../../utils/gmaps/gmapsInit";
import { Container } from "@mui/material";

const MapDialog = ({ placeId, location, displayName, formattedAddress }) => {
    const mapRef = createRef();

    useEffect(() => {
        let map;

        loader.load().then(async (google) => {
            const { Map, InfoWindow } = await google.maps.importLibrary("maps");
            const { Marker } = await google.maps.importLibrary('marker')
            // Initialize map
            map = new Map(mapRef.current, {
                zoom: 16,
                center: location,
            });

            const marker = new Marker({
                position: location,
                map,
            });
            const googleMapsUri = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                displayName
            )}&query_place_id=${placeId}`;
            const infoWindow = new InfoWindow({
                content: `
          <div>
            <strong>${displayName}</strong><br>
            ${formattedAddress}<br>
            <a href="${googleMapsUri}" target="_blank" rel="noopener noreferrer">
              Open in Google Maps
            </a>
          </div>
        `,
            });

            infoWindow.open(map, marker);
        });
    }, [placeId, location, displayName, formattedAddress, mapRef]);

    return (
        <Container
            ref={mapRef}
            sx={{ width: "100%", height: "470px", borderRadius: "4px", my: 5 }}
        />
    );
};

export default MapDialog;
