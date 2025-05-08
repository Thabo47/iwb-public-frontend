import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  CircularProgress,
  Snackbar
} from '@mui/material';
import { Send, CheckCircle, Pending, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

import ramImage from './images/ram.jpg';
import hddImage from './images/hdd.jpg';
import capacitorsImage from './images/capacitors.jpg';
import laptopRamImage from './images/laptop-ram.jpg';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [queryForm, setQueryForm] = useState({ name: '', email: '', message: '' });
  const [submittedQueries, setSubmittedQueries] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState({ submit: false, fetch: false });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const { currentUser } = useAuth();

  const [products] = useState([
    {
      id: 1,
      name: "DDR4 RAM 8GB",
      description: "Refurbished high-quality DDR4 RAM modules, perfect for desktops and laptops.",
      price: "M250",
      image: ramImage
    },
    {
      id: 2,
      name: "Hard Drive 1TB",
      description: "Securely wiped and fully functional 1TB SATA hard drives with warranty.",
      price: "M500",
      image: hddImage
    },
    {
      id: 3,
      name: "Motherboard Capacitors Pack",
      description: "Recovered capacitors ideal for electronics repair projects (pack of 50).",
      price: "M150",
      image: capacitorsImage
    },
    {
      id: 4,
      name: "Laptop RAM 4GB",
      description: "Reliable laptop RAM modules, refurbished and tested with 6-month warranty.",
      price: "M180",
      image: laptopRamImage
    }
  ]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (activeTab === 1) fetchQueries();
  }, [activeTab]);

  const fetchQueries = async () => {
    try {
      setLoading(prev => ({ ...prev, fetch: true }));
      const response = await axios.get('/api/queries', { withCredentials: true });
      setSubmittedQueries(response.data);
      showNotification('Queries fetched successfully', 'success');
    } catch (err) {
      showNotification('Failed to fetch queries. Please try again.', 'error');
    } finally {
      setLoading(prev => ({ ...prev, fetch: false }));
    }
  };

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQueryForm(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!queryForm.name.trim()) errors.name = 'Name is required';
    if (!queryForm.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(queryForm.email)) errors.email = 'Invalid email';
    if (!queryForm.message.trim()) errors.message = 'Message is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitQuery = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(prev => ({ ...prev, submit: true }));
      const formData = currentUser ? {
        ...queryForm,
        name: currentUser.name || queryForm.name,
        email: currentUser.email || queryForm.email
      } : queryForm;

      const response = await axios.post('/api/queries', formData, { withCredentials: true });
      setSubmittedQueries([response.data, ...submittedQueries]);
      setQueryForm({ name: '', email: '', message: '' });
      showNotification('Query submitted successfully!', 'success');
      setActiveTab(1);
    } catch (err) {
      showNotification('Failed to submit query. Please try again.', 'error');
    } finally {
      setLoading(prev => ({ ...prev, submit: false }));
    }
  };

  const showNotification = (message, severity) => setNotification({ open: true, message, severity });
  const handleCloseNotification = () => setNotification(prev => ({ ...prev, open: false }));
  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Client Dashboard
      </Typography>

      {/* Product Section */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Our Products</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
          {products.map((product) => (
            <Box key={product.id} sx={{ border: '1px solid #ddd', borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
              <Box sx={{ height: 200, overflow: 'hidden' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>{product.description}</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{product.price}</Typography>
                <Button variant="contained" size="small" sx={{ mt: 1, mr: 1 }} onClick={() => handleAddToCart(product)}>Add to Cart</Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Cart Section */}
      {cart.length > 0 && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Your Cart</Typography>
          <Box>
            {cart.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', py: 1 }}>
                <Typography>{item.name} - {item.price}</Typography>
                <Button variant="outlined" color="error" size="small" startIcon={<Delete />} onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Tabs for Queries */}
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Submit Query" icon={<Send />} />
        <Tab label="Query Status" icon={<Pending />} />
      </Tabs>

      <Box sx={{ p: 2 }}>
        {activeTab === 0 && (
          <Box component="form" onSubmit={handleSubmitQuery} sx={{ maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h6">Submit a New Query</Typography>
            {!currentUser && (
              <>
                <TextField fullWidth label="Your Name" name="name" value={queryForm.name} onChange={handleInputChange} error={!!formErrors.name} helperText={formErrors.name} margin="normal" required />
                <TextField fullWidth label="Email Address" name="email" type="email" value={queryForm.email} onChange={handleInputChange} error={!!formErrors.email} helperText={formErrors.email} margin="normal" required />
              </>
            )}
            {currentUser && <Typography sx={{ mb: 2 }}>Submitting as: {currentUser.name} ({currentUser.email})</Typography>}
            <TextField fullWidth label="Your Message" name="message" value={queryForm.message} onChange={handleInputChange} error={!!formErrors.message} helperText={formErrors.message} margin="normal" multiline rows={4} required />
            <Button type="submit" variant="contained" startIcon={loading.submit ? <CircularProgress size={20} /> : <Send />} sx={{ mt: 2 }} disabled={loading.submit} fullWidth>
              {loading.submit ? 'Submitting...' : 'Submit Query'}
            </Button>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="h6">Your Query Status</Typography>
            {loading.fetch ? (
              <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>
            ) : submittedQueries.length === 0 ? (
              <Alert severity="info">You haven't submitted any queries yet.</Alert>
            ) : (
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Message</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {submittedQueries.map((query) => (
                      <TableRow key={query._id}>
                        <TableCell>{formatDate(query.date)}</TableCell>
                        <TableCell>{query.message}</TableCell>
                        <TableCell>
                          <Chip
                            label={query.status}
                            color={query.status === 'complete' ? 'success' : 'warning'}
                            icon={query.status === 'complete' ? <CheckCircle /> : <Pending />}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={notification.severity} onClose={handleCloseNotification}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClientDashboard;