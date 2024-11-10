import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

interface ServiceProviderCardProps {
  name: string;
  imageUrl?: string; // Made optional
  onVisit: () => void;
}

const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({ name, imageUrl, onVisit }) => {
  const placeholderImage = 'https://place.abh.ai/s3fs-public/placeholder/Sunset_400x400.jpeg'; // Placeholder image URL

  return (
    <Card sx={{ maxWidth: 345, p: 0 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl || placeholderImage} // Fallback to placeholder image
        alt={name}
      />
      <CardContent
        sx={{
          px: 0,
          pt: 1,
          pb: 2,
        }}
      >
        <Typography gutterBottom variant="h6" fontWeight="600" p={0}>
          {name}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
            Services Offered:
          </Typography>

          <Stack mt={1} spacing={0.5}>
            {services.map((service, index) => (
              <Typography key={index} variant="body2">
                • {service}
              </Typography>
            ))}
          </Stack> */}
      </CardContent>
      <CardActions>
        <Button
          size="medium"
          variant="contained"
          color="primary"
          onClick={onVisit}
          sx={{
            width: 1,
          }}
        >
          Visit
        </Button>
      </CardActions>
    </Card>
  );
};

export default ServiceProviderCard;
