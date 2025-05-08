import React, { useState, useEffect, useCallback } from 'react';
import {
  Tabs, Tab, Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, TextField, Dialog, DialogActions,
  DialogContent, DialogTitle, CircularProgress, Alert, Snackbar, styled,
  Card, CardContent, Grid, Avatar, Divider, Badge, Chip, Tooltip, Menu, MenuItem
} from '@mui/material';
import { 
  Add, Edit, Delete, CheckCircle, ShoppingCart, 
  QueryBuilder, Email, AttachMoney, BarChart, 
  Person, CalendarToday, FilterList, MoreVert 
} from '@mui/icons-material';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { DoughnutChart, SalesTrendChart } from './charts';
import { formatCurrency, formatDate } from '../utils/formatters';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  boxShadow: theme.shadows[3],
  minHeight: 400,
  borderRadius: 12,
}));

const StatusBadge = styled(Box)(({ status, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: status === 'answered' ? theme.palette.success.main : theme.palette.warning.main,
}));

const SalesCard = styled(Card)(({ theme }) => ({
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
  const [sales, setSales] = useState([]);
  const [queries, setQueries] = useState([]);
  const [autoResponses, setAutoResponses] = useState([]);
  const [openSaleDialog, setOpenSaleDialog] = useState(false);
  const [currentSale, setCurrentSale] = useState({ 
    _id: null, 
    product: '', 
    quantity: 1, 
    price: 0, 
    date: new Date().toISOString().split('T')[0],
    category: 'electronics'
  });
  const [newQuery, setNewQuery] = useState('');
  const [newClientName, setNewClientName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [filter, setFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, logout, refreshToken } = useAuth();

  // Sales statistics
  const totalSales = sales.reduce((sum, sale) => sum + (sale.price * sale.quantity), 0);
  const totalItemsSold = sales.reduce((sum, sale) => sum + sale.quantity, 0);
  const avgSaleValue = sales.length > 0 ? totalSales / sales.length : 0;
  const pendingQueries = queries.filter(q => q.status !== 'answered').length;

  const fetchWithAuth = useCallback(async (url) => {
    try {
      const response = await api.get(url);
      return response;
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          await refreshToken();
          return await api.get(url);
        } catch (refreshError) {
          logout();
          throw new Error('Session expired. Please login again.');
        }
      }
      throw err;
    }
  }, [logout, refreshToken]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (activeTab === 0) {
        const response = await api.get('/api/sales');
        setSales(response.data);
      } else if (activeTab === 1) {
        const response = await api.get('/api/queries');
        setQueries(response.data);
        
        const responses = response.data
          .filter(query => query.autoReply)
          .map(query => ({
            _id: query._id,
            query: query.message,
            response: query.autoReply,
            date: query.date
          }));
        setAutoResponses(responses);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddSale = () => {
    setCurrentSale({ 
      _id: null, 
      product: '', 
      quantity: 1, 
      price: 0, 
      date: new Date().toISOString().split('T')[0],
      category: 'electronics'
    });
    setOpenSaleDialog(true);
  };

  const handleEditSale = (sale) => {
    setCurrentSale({
      ...sale,
      date: sale.date.split('T')[0] || sale.date
    });
    setOpenSaleDialog(true);
  };

  const handleDeleteSale = async (id) => {
    try {
      await api.delete(`/api/sales/${id}`);
      setSales(sales.filter(sale => sale._id !== id));
      setSuccess('Sale deleted successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete sale');
    }
  };

  const handleSaveSale = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const saleData = {
        product: currentSale.product,
        quantity: currentSale.quantity,
        price: currentSale.price,
        date: currentSale.date,
        category: currentSale.category
      };

      if (currentSale._id) {
        const response = await api.put(`/api/sales/${currentSale._id}`, saleData);
        setSales(sales.map(sale => sale._id === currentSale._id ? response.data : sale));
        setSuccess('Sale updated successfully');
      } else {
        const response = await api.post('/api/sales', saleData);
        setSales([...sales, response.data]);
        setSuccess('Sale added successfully');
      }
      setTimeout(() => setSuccess(null), 3000);
      setOpenSaleDialog(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save sale');
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuery = async () => {
    if (!newClientName || !newQuery) {
      setError('Client name and question are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await api.post('/api/queries', {
        name: newClientName,
        email: `${newClientName.toLowerCase().replace(/\s+/g, '')}@example.com`,
        message: newQuery
      });

      const response = await api.get('/api/queries');
      setQueries(response.data);
      
      setNewQuery('');
      setNewClientName('');
      setSuccess('Query submitted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
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

  const filteredSales = filter === 'all' 
    ? sales 
    : sales.filter(sale => sale.category === filter);

  const salesByCategory = sales.reduce((acc, sale) => {
    acc[sale.category] = (acc[sale.category] || 0) + (sale.price * sale.quantity);
    return acc;
  }, {});

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
          Sales Dashboard
        </Typography>
        <Box>
          <Button 
            variant="contained" 
            startIcon={<BarChart />}
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

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <SalesCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Sales
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {formatCurrency(totalSales)}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                  <AttachMoney fontSize="large" />
                </Avatar>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="success.main" sx={{ mr: 1 }}>
                  +12% from last month
                </Typography>
              </Box>
            </CardContent>
          </SalesCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <SalesCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Items Sold
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {totalItemsSold}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56 }}>
                  <ShoppingCart fontSize="large" />
                </Avatar>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="success.main" sx={{ mr: 1 }}>
                  +8% from last month
                </Typography>
              </Box>
            </CardContent>
          </SalesCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <SalesCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Avg. Sale Value
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {formatCurrency(avgSaleValue)}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56 }}>
                  <BarChart fontSize="large" />
                </Avatar>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="error.main" sx={{ mr: 1 }}>
                  -2% from last month
                </Typography>
              </Box>
            </CardContent>
          </SalesCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <SalesCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Pending Queries
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {pendingQueries}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'error.main', width: 56, height: 56 }}>
                  <QueryBuilder fontSize="large" />
                </Avatar>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="success.main" sx={{ mr: 1 }}>
                  +5% from last month
                </Typography>
              </Box>
            </CardContent>
          </SalesCard>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <SalesCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales Trend (Last 30 Days)
              </Typography>
              <Box sx={{ height: 300 }}>
                <SalesTrendChart sales={sales} />
              </Box>
            </CardContent>
          </SalesCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <SalesCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales by Category
              </Typography>
              <Box sx={{ height: 300 }}>
                <DoughnutChart data={salesByCategory} />
              </Box>
            </CardContent>
          </SalesCard>
        </Grid>
      </Grid>

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
        <Tab label="Sales Records" icon={<ShoppingCart />} iconPosition="start" />
        <Tab label="Query Management" icon={<Email />} iconPosition="start" />
        <Tab label="Auto Response History" icon={<CheckCircle />} iconPosition="start" />
      </Tabs>

      <Box>
        {activeTab === 0 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Sales Records
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
                  <MenuItem onClick={() => handleFilterChange('electronics')}>Electronics</MenuItem>
                  <MenuItem onClick={() => handleFilterChange('clothing')}>Clothing</MenuItem>
                  <MenuItem onClick={() => handleFilterChange('furniture')}>Furniture</MenuItem>
                  <MenuItem onClick={() => handleFilterChange('other')}>Other</MenuItem>
                </Menu>
                <Button 
                  variant="contained" 
                  startIcon={<Add />} 
                  onClick={handleAddSale}
                >
                  Add Sale
                </Button>
              </Box>
            </Box>

            {loading && sales.length === 0 ? (
              <Box display="flex" justifyContent="center" my={4}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
            ) : (
              <StyledTableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'background.default' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Quantity</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Price</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredSales.length > 0 ? (
                      filteredSales.map((sale) => (
                        <TableRow key={sale._id} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ bgcolor: 'primary.light', mr: 2, width: 36, height: 36 }}>
                                <ShoppingCart />
                              </Avatar>
                              {sale.product}
                            </Box>
                          </TableCell>
                          <TableCell align="right">{sale.quantity}</TableCell>
                          <TableCell align="right">{formatCurrency(sale.price)}</TableCell>
                          <TableCell>
                            <Chip 
                              label={sale.category} 
                              size="small" 
                              color={
                                sale.category === 'electronics' ? 'primary' :
                                sale.category === 'clothing' ? 'secondary' :
                                sale.category === 'furniture' ? 'warning' : 'default'
                              }
                            />
                          </TableCell>
                          <TableCell>{formatDate(sale.date)}</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>
                            {formatCurrency(sale.price * sale.quantity)}
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Edit sale">
                              <IconButton 
                                onClick={() => handleEditSale(sale)} 
                                aria-label="edit sale"
                              >
                                <Edit color="primary" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete sale">
                              <IconButton 
                                onClick={() => handleDeleteSale(sale._id)} 
                                aria-label="delete sale"
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
                            <ShoppingCart sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                            <Typography variant="h6" color="text.secondary">
                              No sales records found
                            </Typography>
                            <Button 
                              variant="text" 
                              startIcon={<Add />} 
                              onClick={handleAddSale}
                              sx={{ mt: 2 }}
                            >
                              Add your first sale
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

        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Client Queries
            </Typography>

            <Box sx={{ mb: 3, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <Email color="primary" sx={{ mr: 1 }} /> New Customer Inquiry
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Client Name"
                    variant="outlined"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: <Person color="action" sx={{ mr: 1 }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Client Email"
                    variant="outlined"
                    fullWidth
                    value={`${newClientName.toLowerCase().replace(/\s+/g, '')}@example.com`}
                    disabled
                    InputProps={{
                      startAdornment: <Email color="action" sx={{ mr: 1 }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Question"
                    variant="outlined"
                    fullWidth
                    value={newQuery}
                    onChange={(e) => setNewQuery(e.target.value)}
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      variant="contained" 
                      onClick={handleAddQuery}
                      sx={{ minWidth: 150 }}
                      startIcon={<Email />}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Submit Query'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {loading && queries.length === 0 ? (
              <Box display="flex" justifyContent="center" my={4}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
            ) : (
              <StyledTableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'background.default' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Question</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {queries.length > 0 ? (
                      queries.map((query) => (
                        <TableRow key={query._id} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ bgcolor: 'secondary.light', mr: 2, width: 36, height: 36 }}>
                                <Person />
                              </Avatar>
                              <Box>
                                <Typography>{query.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {query.email}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography>{query.message}</Typography>
                            {query.autoReply && (
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                <strong>Response:</strong> {query.autoReply}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarToday color="action" sx={{ mr: 1, fontSize: 'small' }} />
                              {formatDate(query.date)}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={query.status}>
                              <Badge 
                                color={query.status === 'answered' ? 'success' : 'warning'} 
                                variant="dot" 
                                sx={{ mr: 1 }}
                              />
                              <Box sx={{ textTransform: 'capitalize' }}>{query.status}</Box>
                            </StatusBadge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Email sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                            <Typography variant="h6" color="text.secondary">
                              No customer queries yet
                            </Typography>
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
              Auto Response History
            </Typography>

            {autoResponses.length > 0 ? (
              <StyledTableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'background.default' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Query</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Response</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {autoResponses.map((response) => (
                      <TableRow key={response._id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ bgcolor: 'info.light', mr: 2, width: 36, height: 36 }}>
                              <Email />
                            </Avatar>
                            {response.query}
                          </Box>
                        </TableCell>
                        <TableCell>{response.response}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarToday color="action" sx={{ mr: 1, fontSize: 'small' }} />
                            {formatDate(response.date)}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            ) : (
              <Alert severity="info" sx={{ borderRadius: 2 }}>
                No auto responses available. Responses will appear here once queries are answered.
              </Alert>
            )}
          </Box>
        )}
      </Box>

      {/* Add/Edit Sale Dialog */}
      <Dialog open={openSaleDialog} onClose={() => setOpenSaleDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          {currentSale._id ? 'Edit Sale Record' : 'Add New Sale'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Product Name"
                variant="outlined"
                fullWidth
                value={currentSale.product}
                onChange={(e) => setCurrentSale({ ...currentSale, product: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Quantity"
                type="number"
                variant="outlined"
                fullWidth
                value={currentSale.quantity}
                onChange={(e) => setCurrentSale({ ...currentSale, quantity: +e.target.value })}
                sx={{ mb: 2 }}
                InputProps={{
                  inputProps: { min: 1 }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Price"
                type="number"
                variant="outlined"
                fullWidth
                value={currentSale.price}
                onChange={(e) => setCurrentSale({ ...currentSale, price: +e.target.value })}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: <AttachMoney color="action" sx={{ mr: 1 }} />,
                  inputProps: { min: 0, step: 0.01 }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Category"
                select
                variant="outlined"
                fullWidth
                value={currentSale.category}
                onChange={(e) => setCurrentSale({ ...currentSale, category: e.target.value })}
                sx={{ mb: 2 }}
              >
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="furniture">Furniture</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date"
                type="date"
                variant="outlined"
                fullWidth
                value={currentSale.date}
                onChange={(e) => setCurrentSale({ ...currentSale, date: e.target.value })}
                sx={{ mb: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {currentSale._id && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Last updated: {formatDate(currentSale.updatedAt || currentSale.date)}
                </Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSaleDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveSale}
            color="primary"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {currentSale._id ? 'Update Sale' : 'Add Sale'}
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