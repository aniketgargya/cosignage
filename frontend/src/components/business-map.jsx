import { Map, TileLayer, Marker } from "react-leaflet";
import { icon } from "leaflet";

const locations = [
    {
        name: "Mia Z's",
        coordinates: [40.110178, -88.229158]
    },
    {
        name: "Midsummer Lounge",
        coordinates: [40.110160, -88.229484]
    },
    {
        name: "Cracked",
        coordinates: [40.110112, -88.229614]
    }
];

const markerIcon = icon({
    iconUrl: "/img/icon/map/marker.svg",
    iconSize: [44, 44],
    iconAnchor: [22, 44]
});

const BusinessMap = () => (
    <Map center={[40.1106, -88.2073]} zoom={13}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {locations.map(({ coordinates }, i) => <Marker key={i} icon={markerIcon} position={coordinates} />)}
    </Map>
);

export default BusinessMap;
