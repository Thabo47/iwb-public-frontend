import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Link,
  CircularProgress,
  Alert
} from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.role) newErrors.role = 'Role is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setErrors({});

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post('https://cloud-2lxn.onrender.com', {
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      localStorage.setItem('token', response.data.token);
      
      // Use selected role to navigate
      const role = formData.role;

      if (role === 'Client') {
        navigate('/client/dashboard');
      } else if (role === 'Developer') {
        navigate('/developer/dashboard');
      } else if (role === 'Partner') {
        navigate('/partner/dashboard');
      } else if (role === 'Finance') {
        navigate('/finance/dashboard');
      } else if (role === 'Sales') {
        navigate('/sales/dashboard');
      } else if (role === 'Investor') {
        navigate('/investor/dashboard');
      } else {
        navigate('/');
      }

    } catch (err) {
      setApiError(err.response?.data?.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          boxShadow: 3,
          borderRadius: 2
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Log In
        </Typography>

        {apiError && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
            onClose={() => setApiError('')}
          >
            {apiError}
          </Alert>
        )}

        <TextField
          label="Email Address"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          required
        />

        <FormControl fullWidth margin="normal" error={!!errors.role} required>
          <InputLabel id="role-label">Select Your Role</InputLabel>
          <Select
            labelId="role-label"
            name="role"
            value={formData.role}
            onChange={handleChange}
            label="Select Your Role"
          >
            <MenuItem value="Client">Client</MenuItem>
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="Partner">Partner</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="Investor">Investor</MenuItem>
          </Select>
          {errors.role && (
            <Typography color="error" variant="body2">
              {errors.role}
            </Typography>
          )}
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              color="primary"
            />
          }
          label="Remember me"
          sx={{ mt: 2 }}
        />

        {isLoading ? (
          <CircularProgress size={24} />
        ) : (
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        )}

        <Typography variant="body2" align="center">
          Don't have an account? <Link href="/signup">Sign Up</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
