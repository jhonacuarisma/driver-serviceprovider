'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'configs/axios';
import {
  Button,
  TextField,
  // Avatar,
  Card,
  CardContent,
  // CardHeader,
  Typography,
} from '@mui/material';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  // FaBriefcase, FaMapMarkerAlt
} from 'react-icons/fa';
import { useStore } from 'store';

// Add type definitions for API response
interface UpdateProfileResponse {
  message: string;
  user: {
    user_id: number;
    name: string;
    email: string;
    phone: string;
    type: string;
    username: string;
  };
}

// Type for the request payload
interface UpdateProfileRequest {
  name: string;
  phone?: string;
}

// Update the API function with types
const updateUserProfile = async (
  userData: UpdateProfileRequest,
): Promise<UpdateProfileResponse> => {
  const response = await axios.put<UpdateProfileResponse>(
    'http://127.0.0.1:8001/api/auth/user/update',
    userData,
  );
  return response.data;
};

export default function ServiceProviderProfile() {
  const { user, updateUser } = useStore();
  const [profile, setProfile] = useState({
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    username: user?.username || '',
  });

  const updateProfileMutation = useMutation<UpdateProfileResponse, Error, UpdateProfileRequest>({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      // Update local store with the complete user data from response
      updateUser(data.user);
      alert(data.message);
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const result = e.target?.result;
  //       if (typeof result === 'string') {
  //         setProfile((prev) => ({ ...prev, profilePicture: result }));
  //       }
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateProfileMutation.mutate({
      name: `${profile.firstName} ${profile.lastName}`,
      phone: profile.phone,
    });
  };

  return (
    <div style={{ maxWidth: '600px', padding: '16px' }}>
      <Typography variant="h5" component="h2">
        Service Provider Profile
      </Typography>

      <Card sx={{ margin: 'auto' }}>
        {/* <CardHeader
          title={
       
          }
        /> */}
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <FaUser style={{ marginRight: '8px' }} />,
                  }}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <FaUser style={{ marginRight: '8px' }} />,
                  }}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  label="Username"
                  name="username"
                  value={profile.username}
                  disabled
                  InputProps={{
                    startAdornment: <FaUser style={{ marginRight: '8px' }} />,
                  }}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={profile.email}
                  disabled
                  InputProps={{
                    startAdornment: <FaEnvelope style={{ marginRight: '8px' }} />,
                  }}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: <FaPhone style={{ marginRight: '8px' }} />,
                  }}
                  fullWidth
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '16px' }}
              disabled={updateProfileMutation.isPending}
            >
              {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
