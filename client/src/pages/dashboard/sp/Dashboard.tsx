import { Grid, Paper, Typography, Box, useTheme } from '@mui/material';
import { FaHourglassHalf, FaCheckCircle, FaClock } from 'react-icons/fa'; // Font Awesome icons
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // Import Google Maps components
import ServiceProviderNotifications from 'components/notification/ServiceProviderNotifications';
import { useStore } from 'store';

export default function ServiceProviderDashboard() {
  const user = useStore((state) => state.user);
  const user_id = user ? user.user_id : null; // Check if user is not null

  const theme = useTheme();

  // Mock data for demonstration
  const summaryData = {
    pendingRequests: 5,
    inProgressRequests: 3,
    completedRequests: 12,
    earnings: 1250.0,
  };

  interface SummaryCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
  }

  const SummaryCard = ({ title, value, icon }: SummaryCardProps) => (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="subtitle1" color="text.secondary">
          {title}
        </Typography>
        {icon}
      </Box>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
    </Paper>
  );

  // Google Maps configuration
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };
  const center = {
    lat: 40.7128, // Example latitude
    lng: -74.006, // Example longitude
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <ServiceProviderNotifications providerId={user_id} />
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard
            title="Pending Requests"
            value={summaryData.pendingRequests}
            icon={<FaClock color="gray" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard
            title="In-Progress Requests"
            value={summaryData.inProgressRequests}
            icon={<FaHourglassHalf color="gray" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard
            title="Completed Requests"
            value={summaryData.completedRequests}
            icon={<FaCheckCircle color="gray" />}
          />
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Service Locations
        </Typography>
        <Box
          sx={{
            height: 0,
            paddingTop: '56.25%', // 16:9 aspect ratio
            position: 'relative',
            backgroundColor: theme.palette.grey[200],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              {' '}
              {/* Replace with your API key */}
              <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
                <Marker position={center} /> {/* You can add multiple markers here */}
              </GoogleMap>
            </LoadScript>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
