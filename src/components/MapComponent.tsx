import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Definizione del tipo delle proprietà
interface MapComponentProps {
    locations: {
        id: number;
        position: [number, number];
        name: string;
        data: { temperature: number; co2Impact: number; communityActions: number }
    }[];
    onMarkerClick: (data: { temperature: number; co2Impact: number; communityActions: number }) => void;
}

// Stile per la mappa
const mapStyle = {
    width: '100%',
    height: '50em',
};


const MapComponent: React.FC<MapComponentProps> = ({ locations, onMarkerClick }) => {

    return (
        <MapContainer center={[45.444, 9.333]} zoom={6} style={mapStyle}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />

            {locations.map((location) => (
                <Marker
                    key={location.id}
                    position={location.position}
                    eventHandlers={{
                        click: () => onMarkerClick(location.data),
                    }}
                >
                    <Popup>{location.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
