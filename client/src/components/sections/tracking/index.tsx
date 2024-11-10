// src/components/MapTracking.tsx
import { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 37.7749, // Default center (San Francisco)
  lng: -122.4194,
};

interface Location {
  lat: number;
  lng: number;
}

const MapTracking = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '', // Add your Google Maps API key
  });

  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [providerLocation, setProviderLocation] = useState<Location | null>(null);

  useEffect(() => {
    // Fetch initial location data from the backend (mocked here)
    const fetchLocations = async () => {
      const response = await axios.get('/api/locations'); // Fetch from backend
      setUserLocation(response.data.user);
      setProviderLocation(response.data.provider);
    };

    fetchLocations();
  }, []);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {userLocation && <Marker position={userLocation} label="User" />}
      {providerLocation && <Marker position={providerLocation} label="Service Provider" />}
    </GoogleMap>
  ) : (
    <div>Loading Map...</div>
  );
};

export default MapTracking;
