'use client';

import { Card, CardContent, CardHeader, Typography, Grid, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useStore } from 'store';
import axiosInstance from 'configs/axios';

interface ServiceRequest {
  request_id: number;
  service_id: number;
  status: 'pending' | 'in-progress' | 'completed';
  request_time: string;
  rating?: number;
  service_name: string;
}

interface ServiceRequestResponse {
  service_requests: ServiceRequest[];
}

const fetchServiceRequests = async (providerId: number): Promise<ServiceRequestResponse> => {
  const { data } = await axiosInstance.get<ServiceRequestResponse>(`/service-requests`, {
    params: {
      provider_id: providerId,
    },
  });
  return data;
};

export default function ServiceProviderHistory() {
  const { user } = useStore();

  const { data, isLoading, error } = useQuery<ServiceRequestResponse, Error>({
    queryKey: ['serviceRequests', user?.user_id],
    queryFn: () => {
      if (!user?.user_id) throw new Error('User ID is required');
      return fetchServiceRequests(user.user_id);
    },
    enabled: !!user?.user_id,
  });

  if (isLoading) {
    return (
      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
        <Typography color="error">Error loading requests</Typography>
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: '100%', margin: 'auto', padding: 2 }}>
      <CardHeader
        title={<Typography variant="h5">Service Provider History</Typography>}
        subheader={
          <Typography variant="subtitle1">A record of your completed service requests</Typography>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          {data?.service_requests.map((request) => (
            <Grid item xs={12} sm={6} md={4} key={request.request_id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Request #{request.request_id}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Service: {request.service_name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Status: {request.status}
                  </Typography>
                  {/* <Typography color="textSecondary" gutterBottom>
                    Request Time: {request.request_time}
                  </Typography> */}
                  <Typography color="textSecondary">Rating: {request.rating || 'N/A'}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
