import { createRef, useEffect } from "react";
import loader from "../../utils/gmaps/gmapsInit";
import { Container } from "@mui/material";

const MapDialog = ({ location, query }) => {
  const mapRef = createRef();

  useEffect(() => {
    let map;

    loader.load().then(async (google) => {
      const { Map } = await google.maps.importLibrary("maps");
      const { Place } = await google.maps.importLibrary("places");

      map = new Map(mapRef.current, {
        zoom: 16,
        center: location,
      });

      // 🔍 Modern replacement for findPlaceFromQuery()
      const searchResults = await Place.searchByText({
        textQuery: query,
        fields: ["id"], // minimal field mask → cheapest SKU
      });

      if (!searchResults.places || searchResults.places.length === 0) return;

      const place = searchResults.places[0];

      // 📄 Modern replacement for getDetails()
      const fullPlace = await place.fetchFields({
        fields: ["displayName", "formattedAddress", "location", "googleMapsUri"],
      });

      const marker = new google.maps.Marker({
        position: fullPlace.location,
        map,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div>
            <strong>${fullPlace.displayName}</strong><br>
            ${fullPlace.formattedAddress}<br>
            <a href="${fullPlace.googleMapsUri}" target="_blank" rel="noopener noreferrer">
              Open in Google Maps
            </a>
          </div>
        `,
      });

      infoWindow.open(map, marker);
    });
  }, [location, query]);

  return (
    <Container
      ref={mapRef}
      sx={{ width: "100%", height: "470px", borderRadius: "4px", my: 5 }}
    />
  );
};

export default MapDialog;
