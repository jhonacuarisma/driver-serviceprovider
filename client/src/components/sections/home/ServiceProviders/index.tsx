import ServiceProviderCard from './ServiceProviderCard';
import axiosInstance from 'configs/axios';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Typography } from '@mui/material';

interface Providers {
  provider_id: number;
  name: string;
  contact_info?: string;
  location_lat?: number;
  location_lng?: number;
}
interface Data {
  message: string;
  providers: Providers[];
}

// const serviceProviderData = [
//   {
//     name: 'Jane Service',
//     services: ['Car Repair', 'Towing', 'Oil Change'],
//     imageUrl: 'https://via.placeholder.com/150',
//   },
//   {
//     name: 'Jane Service',
//     services: ['Car Repair', 'Towing', 'Oil Change'],
//     imageUrl: 'https://via.placeholder.com/150',
//   },
//   {
//     name: 'Jane Service',
//     services: ['Car Repair', 'Towing', 'Oil Change'],
//     imageUrl: 'https://via.placeholder.com/150',
//   },
// ];

const getServiceProviders = async (): Promise<Data> => {
  try {
    const { data } = await axiosInstance.get<Data>('/service-providers'); // Add type here
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const ServiceProviders = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['get-service-providers'],
    queryFn: getServiceProviders,
  });

  const navigate = useNavigate();

  const handleClick = (id: number) => {
    // Navigate to the "/about" page when the button is clicked
    navigate(`/pages/service-provider/${id}`);
  };

  return isLoading ? (
    <Typography>Loading...</Typography>
  ) : (
    data?.providers?.map((serviceProviderData) => (
      <ServiceProviderCard
        key={serviceProviderData.provider_id}
        name={serviceProviderData.name}
        // imageUrl={serviceProviderData.imageUrl}
        onVisit={() => handleClick(serviceProviderData.provider_id)}
      />
    ))
  );
};

export default ServiceProviders;
