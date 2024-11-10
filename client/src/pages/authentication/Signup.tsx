import { useState, ChangeEvent, FormEvent } from 'react';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconifyIcon from 'components/base/IconifyIcon';
import paths from 'routes/paths';

interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  username: string;
  type: string;
  license_number?: string;
  vehicle?: string;
  contact_info?: string;
  location_lat?: number;
  location_lng?: number;
}

const Signup = () => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    username: '',
    type: 'driver', // default to driver
    license_number: '',
    vehicle: '',
    contact_info: '',
    location_lat: undefined,
    location_lng: undefined,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <>
      <Typography align="center" variant="h4">
        Sign Up
      </Typography>
      <Typography mt={1.5} align="center" variant="body2">
        Let's Join us! create account with,
      </Typography>

      {/* <Stack mt={3} spacing={1.75} width={1}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          startIcon={<IconifyIcon icon="logos:google-icon" />}
          sx={{ bgcolor: 'info.main', '&:hover': { bgcolor: 'info.main' } }}
        >
          Google
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          startIcon={<IconifyIcon icon="logos:apple" sx={{ mb: 0.5 }} />}
          sx={{ bgcolor: 'info.main', '&:hover': { bgcolor: 'info.main' } }}
        >
          Apple
        </Button>
      </Stack> */}

      {/* <Divider sx={{ my: 4 }}>or Signup with</Divider> */}

      <Stack component="form" mt={3} onSubmit={handleSubmit} direction="column" gap={2}>
        <TextField
          id="name"
          name="name"
          type="text"
          value={user.name}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Your Name"
          autoComplete="name"
          fullWidth
          autoFocus
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="hugeicons:user-circle-02" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Your Email"
          autoComplete="email"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="hugeicons:mail-at-sign-02" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="phone"
          name="phone"
          type="tel"
          value={user.phone}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Your Phone"
          autoComplete="tel"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="hugeicons:phone" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="username"
          name="username"
          type="text"
          value={user.username}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Your Username"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="hugeicons:user-circle-02" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={user.password}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Your Password"
          autoComplete="current-password"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="hugeicons:lock-key" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  opacity: user.password ? 1 : 0,
                  pointerEvents: user.password ? 'auto' : 'none',
                }}
              >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ border: 'none', bgcolor: 'transparent !important' }}
                  edge="end"
                >
                  <IconifyIcon
                    icon={showPassword ? 'fluent-mdl2:view' : 'fluent-mdl2:hide-3'}
                    color="neutral.light"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          id="password_confirmation"
          name="password_confirmation"
          type={showPassword ? 'text' : 'password'}
          value={user.password_confirmation}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Confirm Your Password"
          autoComplete="current-password"
          fullWidth
          required
        />

        {/* Toggle user type and conditionally render fields */}
        <TextField
          id="type"
          name="type"
          select
          value={user.type}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Select User Type"
          fullWidth
          required
          SelectProps={{
            native: true,
          }}
        >
          <option value="driver">Driver</option>
          <option value="service_provider">Service Provider</option>
        </TextField>

        {user.type === 'driver' && (
          <>
            <TextField
              id="license_number"
              name="license_number"
              type="text"
              value={user.license_number}
              onChange={handleInputChange}
              variant="filled"
              placeholder="Your License Number"
              fullWidth
              required
            />
            <TextField
              id="vehicle"
              name="vehicle"
              type="text"
              value={user.vehicle}
              onChange={handleInputChange}
              variant="filled"
              placeholder="Your Vehicle"
              fullWidth
              required
            />
          </>
        )}

        {user.type === 'service_provider' && (
          <>
            <TextField
              id="contact_info"
              name="contact_info"
              type="text"
              value={user.contact_info}
              onChange={handleInputChange}
              variant="filled"
              placeholder="Contact Info"
              fullWidth
              required
            />
            <TextField
              id="location_lat"
              name="location_lat"
              type="number"
              value={user.location_lat}
              onChange={handleInputChange}
              variant="filled"
              placeholder="Location Latitude"
              fullWidth
              required
            />
            <TextField
              id="location_lng"
              name="location_lng"
              type="number"
              value={user.location_lng}
              onChange={handleInputChange}
              variant="filled"
              placeholder="Location Longitude"
              fullWidth
              required
            />
          </>
        )}

        <Button type="submit" variant="contained" size="medium" fullWidth sx={{ mt: 1.5 }}>
          Sign Up
        </Button>
      </Stack>

      <Typography mt={5} variant="body2" color="text.secondary" align="center" letterSpacing={0.25}>
        Already have an account? <Link href={paths.signin}>Signin</Link>
      </Typography>
    </>
  );
};

export default Signup;
