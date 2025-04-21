/**
 * This component renders an interactive Leaflet map that displays a marker
 * for the delivery or pickup address using OpenStreetMap.
 * 
 * Converts a given address (from `selectedType.address`) into latitude and longitude 
 * using the Nominatim OpenStreetMap API. Then it displays a Leaflet map centered on 
 * the fetched coordinates.
 * 
 * There is a custom marker icon with a popup showing the delivery type and address. 
 * The map uses a fixed zoom range and disables scroll wheel zoom for usability.
 */

import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Need to create a custom icon because the Leaflet default
// icon won't work in React without manually setting the image paths
const customIcon = new L.Icon({
    iconUrl: "/images/marker-icon.png",
    shadowUrl: "/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const Map = ({deliveryType, selectedType}) => {
    const [coords, setCoords] = useState(null);
    
    //fetch coordinates using the Nominatim open street map API 
    useEffect(() => {
        // useEffect can't be async
        const fetchCoords = async () => {
            try {
                // Send a GET request to the Nominatim API to search for coordinates based on the address.
                // `encodeURIComponent` makes the address is URL-safe (e.g., spaces become %20).
                // `format=json` tells the API to return data in JSON format
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(selectedType.address)}`
                )

                //// Parse the response body as JSON so we can access the returned location data.
                const data = await response.json();

                if(data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);

                    console.log(lat + " " + lon);

                    // Update the state with fetched coordinates
                    setCoords([lat, lon]);
                } else {
                    console.error("Address not found.")
                }
            } catch (error) {
                console.error("Failed to fetch coordinates", error);
            }
        }

        fetchCoords();
    }, [selectedType.address]);

    return (
        <div className="Map-Container">
            {coords && (
                <div className="map">
                    <MapContainer
                        center={coords}
                        zoom={17}
                        minZoom={15}
                        scrollWheelZoom={false}
                        className="map-container"
                    >
                        <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={coords} icon={customIcon}>
                        <Popup>
                            {deliveryType === 'pickup' ? 'Pickup' : 'Delivery'}
                            <br />
                            {selectedType.address}
                        </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            )}
        </div>
    );
};

export default Map;