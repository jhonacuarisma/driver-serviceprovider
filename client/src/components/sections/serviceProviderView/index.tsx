import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  CardMedia,
  Button,
  Container,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from 'configs/axios';
import RequestForm from './RequestForm'; // Import the RequestForm component

interface Service {
  provider_service_id: number;
  provider_id: number;
  service_name: string;
  price: number;
  description: string;
  ratings: number | null;
}

const getServiceProvider = async (id: string | undefined) => {
  try {
    const { data } = await axiosInstance.get(`/service-providers/${id}`);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const ServiceProviderView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<{ id: number; name: string } | null>(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ['serviceProvider', id],
    queryFn: () => getServiceProvider(id),
  });

  const handleOpenModal = (serviceId: number, serviceName: string) => {
    setSelectedService({ id: serviceId, name: serviceName });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedService(null);
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;
  if (!data) return null;

  const serviceProvider = data.provider;

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          p: 0,
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image="https://place.abh.ai/s3fs-public/placeholder/DSC_0057_400x400.jpeg"
          alt={serviceProvider.name}
        />
        <CardContent>
          <Typography variant="h5" component="div" mt={1}>
            {serviceProvider.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contact: {serviceProvider.contact_info}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" component="div" sx={{ mt: 2, mb: 1 }}>
        Services Offered:
      </Typography>
      <Grid container spacing={2}>
        {serviceProvider.services.map((service: Service) => (
          <Grid item xs={12} sm={6} md={4} key={service.provider_service_id}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6">{service.service_name}</Typography>
                <Typography variant="body2">{service.description}</Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Price: ${service.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenModal(service.provider_service_id, service.service_name)}
                >
                  Avail Service
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Use the RequestForm component */}
      {selectedService && (
        <RequestForm
          open={openModal}
          handleCloseModal={handleCloseModal}
          serviceId={selectedService.id}
          selectedService={selectedService.name}
        />
      )}
    </Container>
  );
};

export default ServiceProviderView;
