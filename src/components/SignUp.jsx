import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Link,
  CircularProgress
} from "@mui/material";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    role: ""
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = "Must contain at least one uppercase letter and one number";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms";
    }

    if (!formData.role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post("https://cloud-backend-8.onrender.com/api/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      // Store token and redirect to dashboard
      localStorage.setItem('token', response.data.token);
      navigate(`/${formData.role.toLowerCase()}/dashboard`);

    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          "Registration failed. Please try again.";
      setApiError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh", 
      p: 2,
      backgroundColor: '#f5f5f5'
    }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ 
          width: "100%", 
          maxWidth: 500, 
          p: 4, 
          boxShadow: 3, 
          borderRadius: 2,
          backgroundColor: 'white'
        }}
        noValidate
      >
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Create Account
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 3 }}>
          Join us today! Please enter your details
        </Typography>

        {apiError && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setApiError('')}>
            {apiError}
          </Alert>
        )}

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            margin="normal"
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            required
            autoComplete="given-name"
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            margin="normal"
            value={formData.lastName}
            onChange={handleChange}
            autoComplete="family-name"
          />
        </Box>

        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
          autoComplete="email"
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
          autoComplete="new-password"
        />
        
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          fullWidth
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          required
          autoComplete="new-password"
        />

        <FormControl fullWidth margin="normal" error={!!errors.role} required>
          <InputLabel id="role-label">Select Role</InputLabel>
          <Select
            labelId="role-label"
            name="role"
            value={formData.role}
            label="Select Role"
            onChange={handleChange}
            sx={{ textAlign: 'left' }}
          >
            <MenuItem value="Client">Client</MenuItem>
            <MenuItem value="Investor">Investor</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="Partner">Partner</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
          </Select>
          {errors.role && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{errors.role}</Typography>}
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              color="primary"
              required
            />
          }
          label={
            <Typography variant="body2">
              I agree to the <Link href="/terms" target="_blank">Terms and Conditions</Link>
            </Typography>
          }
          sx={{ mt: 2 }}
        />
        {errors.acceptTerms && (
          <Typography color="error" variant="body2">{errors.acceptTerms}</Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 3, mb: 2, py: 1.5 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
        </Button>

        <Typography variant="body2" align="center">
          Already have an account? <Link href="/login" fontWeight="bold">Log In</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;