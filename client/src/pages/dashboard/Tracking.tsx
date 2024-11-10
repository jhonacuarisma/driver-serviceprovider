import { Card, CardContent, CardHeader, Typography, Button } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import axios from 'configs/axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useStore } from 'store';
import 'leaflet/dist/leaflet.css';

interface GoogleMapProps {
  location: {
    lat: number;
    lng: number;
  };
}

interface QueryResponse {
  message: string;
  service_request: {
    request_id: number;
    user_id: number;
    provider_id: number;
    status: string;
    request_time: string;
    completion_time: string | null;
    location_lat: number;
    location_lng: number;
    service_id: number;
    rating: number;
  };
}

interface MutationResponse {
  status: string;
  location_lat: number;
  location_lng: number;
  completion_time: string;
}

interface UpdateStatusData {
  id: number;
  status: string;
}

const getServiceRequest = async (id: number): Promise<QueryResponse> => {
  const response = await axios.get<QueryResponse>(`/service-requests/${id}`);
  return response.data;
};

const updateStatus = async ({ id, status }: UpdateStatusData): Promise<MutationResponse> => {
  const response = await axios.put<MutationResponse>(`/service-requests/${id}`, {
    status: status,
  });
  return response.data;
};

const MapComponent = ({ location }: GoogleMapProps) => {
  const position: LatLngExpression = [location.lat, location.lng];

  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>Service location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default function ServiceTrackingPage() {
  const user = useStore((state) => state.user);
  const isServiceProvider = user && user.type === 'service_provider'; // Check if user is not null
  const { id } = useParams();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['service-request', id],
    queryFn: () => getServiceRequest(Number(id)),
  });

  const serviceTrackingMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      // You might want to show a success notification here
      alert('Service status updated successfully');
      refetch();
    },
    onError: (error) => {
      // Handle the error appropriately
      console.error('Failed to update service status', error);
      alert('Failed to update service status');
    },
  });

  const handleCancelService = () => {
    serviceTrackingMutation.mutate({ id: Number(id), status: 'cancelled' });
  };

  const handleAcceptService = () => {
    serviceTrackingMutation.mutate({ id: Number(id), status: 'accepted' });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching service request</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '16px' }}>
      <Typography variant="h4" gutterBottom>
        Service Tracking
      </Typography>

      {/* Service Status */}
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardHeader title="Service Status" />
        <CardContent>
          <Typography color="green" variant="body1" display="flex" alignItems="center">
            Status: {data.service_request.status}
          </Typography>
        </CardContent>
      </Card>

      {/* Request Information */}
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardHeader title="Request Information" />
        <CardContent>
          <Typography display="flex" alignItems="center">
            <strong>User ID:</strong> {data.service_request.user_id}
          </Typography>
          <Typography display="flex" alignItems="center" mt={1}>
            <strong>Request ID:</strong> {data.service_request.request_id}
          </Typography>
          <Typography display="flex" alignItems="center" mt={1}>
            <strong>Provider ID:</strong> {data.service_request.provider_id}
          </Typography>
        </CardContent>
      </Card>

      {/* Time Tracking */}
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardHeader title="Time Tracking" />
        <CardContent>
          <Typography display="flex" alignItems="center">
            <strong>Request Time:</strong>{' '}
            {new Date(data.service_request.request_time).toLocaleString()}
          </Typography>
          <Typography display="flex" alignItems="center" mt={1}>
            <strong>Completion Time:</strong>{' '}
            {data.service_request.completion_time
              ? new Date(data.service_request.completion_time).toLocaleString()
              : 'Pending'}
          </Typography>
        </CardContent>
      </Card>

      {/* Location Details with OpenStreetMap */}
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardHeader title="Location Details" />
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{ width: '100%', height: '300px', marginTop: '16px', position: 'relative' }}
            >
              <MapComponent
                location={{
                  lat: data.service_request.location_lat,
                  lng: data.service_request.location_lng,
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Information */}
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardHeader title="Service Information" />
        <CardContent>
          <Typography display="flex" alignItems="center">
            <strong>Service ID:</strong> {data.service_request.service_id}
          </Typography>
          <Typography display="flex" alignItems="center" mt={1}>
            <strong>Rating:</strong>{' '}
            {data.service_request.rating
              ? `${data.service_request.rating.toFixed(1)} / 5`
              : 'Not rated yet'}
          </Typography>
        </CardContent>
      </Card>

      {/* Action Buttons for Providers */}
      {isServiceProvider && data.service_request.status !== 'completed' && (
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAcceptService}
            fullWidth
            sx={{ mt: 2 }}
          >
            Accept Service
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleCancelService}
            fullWidth
            sx={{ mt: 2 }}
          >
            Cancel Service
          </Button>
        </div>
      )}
    </div>
  );
}
