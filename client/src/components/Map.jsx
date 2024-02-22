import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ experiences }) => {
  const capeTownCenter = [-33.918861, 18.423300];

  return (
    <MapContainer
      center={capeTownCenter}
      zoom={12}
      style={{ height: '500px', width: '100%' }}
      tap={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {experiences.map((experience, index) => (
        <Marker key={index} position={[experience.lat, experience.lng]}>
          <Popup>
            <div>
              <h2>{experience.title}</h2>
              <p>{experience.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
