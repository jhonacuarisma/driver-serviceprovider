// import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ServiceProviders from 'components/sections/home/ServiceProviders';
// import Footer from 'components/common/Footer';

const Home = () => {
  return (
    <Stack
      direction={{ xs: 'column' }}
      width={1}
      //  bgcolor="info.dark"
      px={3.5}
      py={3.5}
      spacing={3.5}
    >
      <Typography variant="h3" component="h1">
        Find available roadside services
      </Typography>
      <ServiceProviders />
    </Stack>
  );
};

export default Home;
