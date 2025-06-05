import React, { useState, useEffect, useCallback } from 'react';
import {
  Tabs, Tab, Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, TextField, Dialog, DialogActions,
  DialogContent, DialogTitle, CircularProgress, Alert, Snackbar, styled,
  Card, CardContent, Grid, Avatar, Divider, Badge, Chip, Tooltip, Menu, MenuItem,
  Select, FormControl, InputLabel, FormHelperText, LinearProgress
} from '@mui/material';
import { 
  Add, Edit, Delete, ShoppingCart, 
  QueryBuilder, Email, AttachMoney, 
  Person, CalendarToday, FilterList, MoreVert,
  Inventory, Reply, TrendingUp, People, Assessment
} from '@mui/icons-material';
import { LineChart, BarChart, PieChart } from '@mui/x-charts';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with auth
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  boxShadow: theme.shadows[3],
  minHeight: 400,
  borderRadius: 12,
}));

const StatusBadge = styled(Box)(({ status, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: status === 'Resolved' ? theme.palette.success.main : theme.palette.warning.main,
}));

const DashboardCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: theme.shadows[2],
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const SalesDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [queries, setQueries] = useState([]);
  const [clients, setClients] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openQueryDialog, setOpenQueryDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    _id: null,
    name: '',
    description: '',
    price: 0,
    cost: 0,
    category: 'CPU',
    stock: 0,
    minStock: 5,
    imageUrl: ''
  });
  const [currentQuery, setCurrentQuery] = useState({
    _id: null,
    response: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [filter, setFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [salesTrend, setSalesTrend] = useState([]);

  // Dashboard statistics
  const totalSalesValue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalProductsSold = sales.reduce((sum, sale) => sum + sale.quantity, 0);
  const lowStockProducts = products.filter(p => p.stock <= p.minStock).length;
  const pendingQueries = queries.filter(q => q.status !== 'Resolved').length;

  const fetchData = useCallback(async (tab) => {
    setLoading(true);
    setError(null);
    try {
      if (tab === 0) {
        // Dashboard Overview
        const [dashboardRes, salesTrendRes] = await Promise.all([
          api.get('/analytics/dashboard'),
          api.get('/analytics/sales')
        ]);
        setDashboardStats(dashboardRes.data);
        setSalesTrend(salesTrendRes.data);
      } else if (tab === 1) {
        // Products
        const productsRes = await api.get('/products');
        setProducts(productsRes.data);
      } else if (tab === 2) {
        // Sales & Orders
        const [salesRes, ordersRes] = await Promise.all([
          api.get('/sales'),
          api.get('/orders')
        ]);
        setSales(salesRes.data);
        setOrders(ordersRes.data);
      } else if (tab === 3) {
        // Client Performance
        const clientsRes = await api.get('/analytics/clients');
        setClients(clientsRes.data);
      } else if (tab === 4) {
        // Customer Queries
        const queriesRes = await api.get('/queries');
        setQueries(queriesRes.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab, fetchData]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Product Management
  const handleAddProduct = () => {
    setCurrentProduct({
      _id: null,
      name: '',
      description: '',
      price: 0,
      cost: 0,
      category: 'CPU',
      stock: 0,
      minStock: 5,
      imageUrl: ''
    });
    setOpenProductDialog(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setOpenProductDialog(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
      setSuccess('Product deleted successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product');
    }
  };

  const handleSaveProduct = async () => {
    try {
      setLoading(true);
      
      if (currentProduct._id) {
        const response = await api.put(`/products/${currentProduct._id}`, currentProduct);
        setProducts(products.map(p => p._id === currentProduct._id ? response.data : p));
        setSuccess('Product updated successfully');
      } else {
        const response = await api.post('/products', currentProduct);
        setProducts([...products, response.data]);
        setSuccess('Product added successfully');
      }
      
      setOpenProductDialog(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  // Query Management
  const handleRespondToQuery = (query) => {
    setCurrentQuery({
      _id: query._id,
      response: query.response || ''
    });
    setOpenQueryDialog(true);
  };

  const handleSaveResponse = async () => {
    try {
      setLoading(true);
      
      const response = await api.put(`/queries/${currentQuery._id}/respond`, {
        response: currentQuery.response
      });
      
      setQueries(queries.map(q => 
        q._id === currentQuery._id ? response.data : q
      ));
      
      setSuccess('Response submitted successfully');
      setOpenQueryDialog(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit response');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    handleMenuClose();
  };

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  // Prepare chart data
  const salesChartData = salesTrend.map(item => ({
    date: item._id,
    total: item.totalSales
  }));

  const stockChartData = [
    { label: 'In Stock', value: products.reduce((sum, p) => sum + p.stock, 0) },
    { label: 'Low Stock', value: products.filter(p => p.stock <= p.minStock).length }
  ];

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
          Sales & Admin Dashboard
        </Typography>
        <Box>
          <Button 
            variant="contained" 
            startIcon={<Assessment />}
            sx={{ mr: 2 }}
          >
            Generate Report
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<CalendarToday />}
          >
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Button>
        </Box>
      </Box>

      <Tabs 
        value={activeTab} 
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ 
          mb: 3,
          '& .MuiTabs-indicator': {
            height: 4,
            borderRadius: '4px 4px 0 0',
          }
        }}
      >
        <Tab label="Dashboard" icon={<TrendingUp />} iconPosition="start" />
        <Tab label="Product Management" icon={<Inventory />} iconPosition="start" />
        <Tab label="Sales & Orders" icon={<ShoppingCart />} iconPosition="start" />
        <Tab label="Client Performance" icon={<People />} iconPosition="start" />
        <Tab label="Customer Support" icon={<Email />} iconPosition="start" />
      </Tabs>

      <Box>
        {activeTab === 0 && (
          <Box>
            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={3}>
                <DashboardCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Total Clients
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {dashboardStats.totalClients || 0}
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                        <People fontSize="large" />
                      </Avatar>
                    </Box>
                  </CardContent>
                </DashboardCard>
              </Grid>
              <Grid item xs={12} md={3}>
                <DashboardCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Total Revenue
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {formatCurrency(dashboardStats.totalRevenue || 0)}
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56 }}>
                        <AttachMoney fontSize="large" />
                      </Avatar>
                    </Box>
                  </CardContent>
                </DashboardCard>
              </Grid>
              <Grid item xs={12} md={3}>
                <DashboardCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Total Orders
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {dashboardStats.totalOrders || 0}
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56 }}>
                        <ShoppingCart fontSize="large" />
                      </Avatar>
                    </Box>
                  </CardContent>
                </DashboardCard>
              </Grid>
              <Grid item xs={12} md={3}>
                <DashboardCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Active Queries
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {dashboardStats.activeQueries || 0}
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56 }}>
                        <QueryBuilder fontSize="large" />
                      </Avatar>
                    </Box>
                  </CardContent>
                </DashboardCard>
              </Grid>
            </Grid>

            {/* Charts Row */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={8}>
                <DashboardCard>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Sales Trend (Last 30 Days)
                    </Typography>
                    {salesChartData.length > 0 ? (
                      <LineChart
                        xAxis={[{ 
                          data: salesChartData.map(item => item.date),
                          scaleType: 'band'
                        }]}
                        series={[{ 
                          data: salesChartData.map(item => item.total),
                          area: true 
                        }]}
                        height={300}
                      />
                    ) : (
                      <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography color="text.secondary">No sales data available</Typography>
                      </Box>
                    )}
                  </CardContent>
                </DashboardCard>
              </Grid>
              <Grid item xs={12} md={4}>
                <DashboardCard>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Quick Actions
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Button 
                        variant="outlined" 
                        startIcon={<Add />}
                        onClick={() => setActiveTab(1)}
                      >
                        Add New Product
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<People />}
                        onClick={() => setActiveTab(3)}
                      >
                        View Client Performance
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<Email />}
                        onClick={() => setActiveTab(4)}
                      >
                        Manage Support Queries
                      </Button>
                    </Box>
                  </CardContent>
                </DashboardCard>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Product Management
              </Typography>
              <Box>
                <Tooltip title="Filter">
                  <Button 
                    variant="outlined" 
                    startIcon={<FilterList />}
                    endIcon={<MoreVert />}
                    onClick={handleMenuOpen}
                    sx={{ mr: 2 }}
                  >
                    {filter === 'all' ? 'All Categories' : filter}
                  </Button>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleFilterChange('all')}>All Categories</MenuItem>
                  <MenuItem onClick={() => handleFilterChange('CPU')}>CPUs</MenuItem>
                  <MenuItem onClick={() => handleFilterChange('GPU')}>GPUs</MenuItem>
                  <MenuItem onClick={() => handleFilterChange('RAM')}>RAM</MenuItem>
                  <MenuItem onClick={() => handleFilterChange('Motherboard')}>Motherboards</MenuItem>
                  <MenuItem onClick={() => handleFilterChange('Storage')}>Storage</MenuItem>
                  <MenuItem onClick={() => handleFilterChange('Peripherals')}>Peripherals</MenuItem>
                </Menu>
                <Button 
                  variant="contained" 
                  startIcon={<Add />} 
                  onClick={handleAddProduct}
                >
                  Add Product
                </Button>
              </Box>
            </Box>

            {loading && products.length === 0 ? (
              <Box display="flex" justifyContent="center" my={4}>
                <CircularProgress />
              </Box>
            ) : (
              <StyledTableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'background.default' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Price</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Cost</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Stock</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <TableRow key={product._id} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar 
                                src={product.imageUrl} 
                                sx={{ mr: 2, width: 36, height: 36 }}
                              >
                                <Inventory />
                              </Avatar>
                              <Box>
                                <Typography>{product.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {product.description.substring(0, 50)}...
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={product.category} 
                              size="small" 
                              color="primary"
                            />
                          </TableCell>
                          <TableCell align="right">{formatCurrency(product.price)}</TableCell>
                          <TableCell align="right">{formatCurrency(product.cost)}</TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box sx={{ width: '100%', mr: 1 }}>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={Math.min(100, (product.stock / (product.minStock * 3)) * 100)}
                                  color={
                                    product.stock <= product.minStock ? 'error' :
                                    product.stock <= product.minStock * 2 ? 'warning' : 'success'
                                  }
                                />
                              </Box>
                              {product.stock}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={
                                product.stock <= product.minStock ? 'Low Stock' :
                                product.stock <= product.minStock * 2 ? 'Medium Stock' : 'In Stock'
                              }
                              color={
                                product.stock <= product.minStock ? 'error' :
                                product.stock <= product.minStock * 2 ? 'warning' : 'success'
                              }
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Edit product">
                              <IconButton 
                                onClick={() => handleEditProduct(product)} 
                                aria-label="edit product"
                              >
                                <Edit color="primary" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete product">
                              <IconButton 
                                onClick={() => handleDeleteProduct(product._id)} 
                                aria-label="delete product"
                              >
                                <Delete color="error" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Inventory sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                            <Typography variant="h6" color="text.secondary">
                              No products found
                            </Typography>
                            <Button 
                              variant="text" 
                              startIcon={<Add />} 
                              onClick={handleAddProduct}
                              sx={{ mt: 2 }}
                            >
                              Add your first product
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            )}
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Sales & Orders Management
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DashboardCard>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Recent Sales
                    </Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell>Date</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {sales.slice(0, 5).map((sale) => (
                            <TableRow key={sale._id}>
                              <TableCell>{sale.product?.name}</TableCell>
                              <TableCell>{sale.customer.name}</TableCell>
                              <TableCell align="right">{formatCurrency(sale.total)}</TableCell>
                              <TableCell>{formatDate(sale.date)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </DashboardCard>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <DashboardCard>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Recent Orders
                    </Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orders.slice(0, 5).map((order) => (
                            <TableRow key={order._id}>
                              <TableCell>{order._id.substring(0, 8)}</TableCell>
                              <TableCell>{order.user?.firstName} {order.user?.lastName}</TableCell>
                              <TableCell align="right">{formatCurrency(order.totalAmount)}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={order.status} 
                                  size="small"
                                  color={
                                    order.status === 'Delivered' ? 'success' :
                                    order.status === 'Cancelled' ? 'error' : 'warning'
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </DashboardCard>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 3 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Client Performance Analytics
            </Typography>

            <StyledTableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'background.default' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>Total Spent</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>Orders</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Last Login</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Member Since</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client._id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 2, bgcolor: 'primary.light' }}>
                            <Person />
                          </Avatar>
                          <Box>
                            <Typography>{client.firstName} {client.lastName}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {client.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>
                        {formatCurrency(client.totalSpent || 0)}
                      </TableCell>
                      <TableCell align="right">{client.orderCount || 0}</TableCell>
                      <TableCell>
                        {client.lastLogin ? formatDate(client.lastLogin) : 'Never'}
                      </TableCell>
                      <TableCell>{formatDate(client.createdAt)}</TableCell>
                      <TableCell>
                        <Chip 
                          label={
                            (client.totalSpent || 0) > 1000 ? 'VIP' :
                            (client.totalSpent || 0) > 500 ? 'Premium' : 'Regular'
                          }
                          color={
                            (client.totalSpent || 0) > 1000 ? 'success' :
                            (client.totalSpent || 0) > 500 ? 'warning' : 'default'
                          }
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          </Box>
        )}

        {activeTab === 4 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Customer Support Management
            </Typography>

            <StyledTableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'background.default' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Query</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {queries.map((query) => (
                    <TableRow key={query._id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: 'secondary.light', mr: 2, width: 36, height: 36 }}>
                            <Person />
                          </Avatar>
                          <Box>
                            <Typography>{query.customer.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {query.customer.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 600 }}>{query.subject}</Typography>
                        <Typography variant="body2">{query.message}</Typography>
                        {query.response && (
                          <Box sx={{ mt: 1, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                            <Typography variant="subtitle2" color="primary">
                              Response:
                            </Typography>
                            <Typography variant="body2">{query.response}</Typography>
                          </Box>
                        )}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarToday color="action" sx={{ mr: 1, fontSize: 'small' }} />
                          {formatDate(query.createdAt)}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={query.status}>
                          <Badge 
                            color={query.status === 'Resolved' ? 'success' : 'warning'} 
                            variant="dot" 
                            sx={{ mr: 1 }}
                          />
                          <Box sx={{ textTransform: 'capitalize' }}>{query.status}</Box>
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        {query.status !== 'Resolved' && (
                          <Tooltip title="Respond to query">
                            <IconButton 
                              onClick={() => handleRespondToQuery(query)}
                              aria-label="respond to query"
                            >
                              <Reply color="primary" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          </Box>
        )}
      </Box>

      {/* Product Dialog */}
      <Dialog open={openProductDialog} onClose={() => setOpenProductDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          {currentProduct._id ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Product Name"
                variant="outlined"
                fullWidth
                value={currentProduct.name}
                onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={currentProduct.description}
                onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Price"
                type="number"
                variant="outlined"
                fullWidth
                value={currentProduct.price}
                onChange={(e) => setCurrentProduct({ ...currentProduct, price: +e.target.value })}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: <AttachMoney color="action" sx={{ mr: 1 }} />,
                  inputProps: { min: 0, step: 0.01 }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Cost"
                type="number"
                variant="outlined"
                fullWidth
                value={currentProduct.cost}
                onChange={(e) => setCurrentProduct({ ...currentProduct, cost: +e.target.value })}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: <AttachMoney color="action" sx={{ mr: 1 }} />,
                  inputProps: { min: 0, step: 0.01 }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={currentProduct.category}
                  label="Category"
                  onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                >
                  <MenuItem value="CPU">CPU</MenuItem>
                  <MenuItem value="GPU">GPU</MenuItem>
                  <MenuItem value="RAM">RAM</MenuItem>
                  <MenuItem value="Motherboard">Motherboard</MenuItem>
                  <MenuItem value="Storage">Storage</MenuItem>
                  <MenuItem value="Peripherals">Peripherals</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                value={currentProduct.imageUrl}
                onChange={(e) => setCurrentProduct({ ...currentProduct, imageUrl: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Stock Quantity"
                type="number"
                variant="outlined"
                fullWidth
                value={currentProduct.stock}
                onChange={(e) => setCurrentProduct({ ...currentProduct, stock: +e.target.value })}
                sx={{ mb: 2 }}
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Minimum Stock"
                type="number"
                variant="outlined"
                fullWidth
                value={currentProduct.minStock}
                onChange={(e) => setCurrentProduct({ ...currentProduct, minStock: +e.target.value })}
                sx={{ mb: 2 }}
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProductDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveProduct}
            color="primary"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {currentProduct._id ? 'Update Product' : 'Add Product'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Query Response Dialog */}
      <Dialog open={openQueryDialog} onClose={() => setOpenQueryDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          Respond to Customer Query
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            label="Response"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={currentQuery.response}
            onChange={(e) => setCurrentQuery({ ...currentQuery, response: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenQueryDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveResponse}
            color="primary"
            variant="contained"
            disabled={loading || !currentQuery.response}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Submit Response
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error || !!success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          severity={error ? 'error' : 'success'} 
          onClose={handleCloseSnackbar}
          sx={{ minWidth: 300 }}
        >
          {error || success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SalesDashboard;
