import { Map, TileLayer, Marker } from "react-leaflet";
import { icon } from "leaflet";

const markerIcon = icon({
    iconUrl: "/img/icon/map/marker.svg",
    iconSize: [44, 44],
    iconAnchor: [22, 44]
});

const BusinessMap = ({ locations, center, zoom }) => (
    <Map center={center} zoom={zoom}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {locations.map(({ coordinates }, i) => <Marker key={i} icon={markerIcon} position={coordinates} />)}
    </Map>
);

export default BusinessMap;
