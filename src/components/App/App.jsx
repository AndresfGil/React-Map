import { Fragment, useState, useEffect } from 'react';
import './App.css';
import { GoogleMap, useLoadScript, Marker, Polygon, InfoWindow } from '@react-google-maps/api';

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
  });

  const defaultMarkerPosition = { lat: 4.535984516143799, lng: -75.66903686523438 };

  const [markerPosition, setMarkerPosition] = useState(() => {
    const storedPosition = localStorage.getItem('markerPosition');
    return storedPosition ? JSON.parse(storedPosition) : defaultMarkerPosition;
  });

  const [mapLoaded, setMapLoaded] = useState(false);

  const polygonPaths = [
    { lat: markerPosition.lat + 0.01, lng: markerPosition.lng - 0.01 },
    { lat: markerPosition.lat - 0.01, lng: markerPosition.lng - 0.01 },
    { lat: markerPosition.lat - 0.01, lng: markerPosition.lng + 0.01 },
    { lat: markerPosition.lat + 0.01, lng: markerPosition.lng + 0.01 },
  ];

  const polygonOptions = {
    fillColor: '#00FF7F',
    fillOpacity: 0.5,
    strokeColor: '#000000',
    strokeOpacity: 1,
    strokeWeight: 2,
  };

  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('markerPosition', JSON.stringify(markerPosition));
  }, [markerPosition]);

  useEffect(() => {
    if (isLoaded) {
      setMapLoaded(true);
    }
  }, [isLoaded]);

  if (loadError) return 'Error loading maps';

  return (
    <Fragment>
      <div style={{ width: '100%', height: '90vh' }}>
        <h1 className='text-center'>Mapa</h1>
        <div style={{ width: '100%', height: '90vh' }}>
          {mapLoaded && (
            <GoogleMap
              center={markerPosition}
              zoom={14}
              mapContainerStyle={{
                width: '100%',
                height: '90vh',
              }}
            >

              <Marker
                position={markerPosition}
                onClick={() => setInfoWindowOpen(!infoWindowOpen)}
              />

              <Polygon paths={polygonPaths} options={polygonOptions} />

              {infoWindowOpen && (
                <InfoWindow
                  position={markerPosition}
                  onCloseClick={() => setInfoWindowOpen(false)}
                >
                  <div style={{ maxWidth: '200px', padding: '10px' }}>
                    <h2>Parque Sucre</h2>
                    <p> <b>Informacion:</b> Es el corazón central de la ciudad de armenia, su historia y su parte cultural hacen que el sitio sea de interés cultural</p>
                    <p> <b>Direccion:</b> Carrera 13 Calle 13</p>
                  </div>
                </InfoWindow>
              )}

            </GoogleMap>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default App;