import React, { useState } from 'react';
import {
  Box, Typography, Tabs, Tab, Paper, Divider, Chip,
  FormControl, InputLabel, Select, MenuItem,
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  TextField, Button, Alert
} from '@mui/material';
import {
  Equalizer, ShowChart, Description,
  MonetizationOn
} from '@mui/icons-material';
import {
  BarChart, LineChart, PieChart, Bar, Line, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from 'recharts';

const InvestorDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [timePeriod, setTimePeriod] = useState('monthly');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentYears, setInvestmentYears] = useState('');
  const [estimatedReturn, setEstimatedReturn] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const rate = 0.10;
  const baseRevenue = 100000;
  const multiplier = investmentAmount ? parseFloat(investmentAmount) / 10000 : 1;

  const dynamicData = {
    monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => {
      const revenue = baseRevenue * (1 + i * 0.1) * multiplier;
      const expenses = revenue * 0.65;
      const profit = revenue - expenses;
      return { month, revenue, expenses, profit };
    }),
    yearly: ['2020', '2021', '2022', '2023'].map((year, i) => {
      const revenue = baseRevenue * 12 * (1 + i * 0.2) * multiplier;
      const expenses = revenue * 0.7;
      const profit = revenue - expenses;
      return { year, revenue, expenses, profit };
    })
  };

  const costBreakdownData = [
    { name: 'Production', value: 45 },
    { name: 'Marketing', value: 25 },
    { name: 'Salaries', value: 20 },
    { name: 'Other', value: 10 }
  ];

  const COLORS = ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'];

  const formatCurrency = (value) => `M${parseFloat(value).toLocaleString('en-ZA')}`;
  const formatPercent = (value) => `${value.toFixed(1)}%`;
  const isMonthly = timePeriod === 'monthly';
  const xAxisKey = isMonthly ? 'month' : 'year';
  const currentData = dynamicData[timePeriod];

  const handleEstimateReturn = () => {
    const principal = parseFloat(investmentAmount);
    const years = parseInt(investmentYears);
    if (!isNaN(principal) && !isNaN(years)) {
      const futureValue = principal * Math.pow(1 + rate, years);
      setEstimatedReturn(futureValue.toFixed(2));
      setShowThankYou(true);
    }
  };

  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      p: 4,
      background: 'linear-gradient(to bottom right, #f0f4ff, #e3f2fd)'
    }}>
      <Box sx={{ width: '100%', maxWidth: 1200 }}>
        <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', color: '#1976d2' }}>
          <MonetizationOn fontSize="large" sx={{ verticalAlign: 'middle', mr: 1 }} />
          Investor Dashboard
        </Typography>

        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered sx={{ mb: 3 }}>
          <Tab label="Financials" icon={<Description />} />
          <Tab label="KPIs" icon={<Equalizer />} />
          <Tab label="Trends" icon={<ShowChart />} />
        </Tabs>

        {/* Investment Calculator */}
        <Paper elevation={4} sx={{ p: 4, mb: 4, backgroundColor: '#ffffffdd' }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#424242' }}>
            Estimate Your Investment
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              label="Investment Amount (M)"
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              sx={{ width: 200 }}
            />
            <TextField
              label="Years"
              type="number"
              value={investmentYears}
              onChange={(e) => setInvestmentYears(e.target.value)}
              sx={{ width: 150 }}
            />
            <Button variant="contained" color="primary" onClick={handleEstimateReturn}>
              Invest
            </Button>
          </Box>
          {estimatedReturn && (
            <Typography sx={{ mt: 2 }}>
              Estimated Value after {investmentYears} years: <strong>{formatCurrency(estimatedReturn)}</strong>
            </Typography>
          )}
          {showThankYou && (
            <Alert severity="success" sx={{ mt: 2 }}>
              🎉 Thank you for investing! We're excited to grow with you.
            </Alert>
          )}
        </Paper>

        {/* Financials Tab */}
        {activeTab === 0 && (
          <Box>
            <FormControl sx={{ mb: 3, minWidth: 200 }}>
              <InputLabel>Time Period</InputLabel>
              <Select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} label="Time Period">
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
            </FormControl>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xAxisKey} />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip formatter={formatCurrency} />
                <Legend />
                <Bar dataKey="revenue" fill="#42A5F5" />
                <Bar dataKey="expenses" fill="#66BB6A" />
                <Bar dataKey="profit" fill="#FFA726" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}

        {/* KPI Tab */}
        {activeTab === 1 && (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 3 }}>
            <Paper elevation={3} sx={{ p: 3, bgcolor: '#e1f5fe' }}>
              <Typography variant="subtitle1">Revenue Growth</Typography>
              <Typography variant="h6">+15.2%</Typography>
            </Paper>
            <Paper elevation={3} sx={{ p: 3, bgcolor: '#fce4ec' }}>
              <Typography variant="subtitle1">Profit Margin</Typography>
              <Typography variant="h6">32.5%</Typography>
            </Paper>
            <Paper elevation={3} sx={{ p: 3, bgcolor: '#e8f5e9' }}>
              <Typography variant="subtitle1">New Investors</Typography>
              <Typography variant="h6">1,842</Typography>
            </Paper>
            <Paper elevation={3} sx={{ p: 3, bgcolor: '#fff3e0' }}>
              <Typography variant="subtitle1">Churn Rate</Typography>
              <Typography variant="h6">2.1%</Typography>
            </Paper>
          </Box>
        )}

        {/* Trends Tab */}
        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Revenue & Profit Trends</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dynamicData.yearly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip formatter={formatCurrency} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#42A5F5" strokeWidth={2} />
                <Line type="monotone" dataKey="profit" stroke="#FFA726" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>

            <Divider sx={{ my: 4 }}>
              <Chip label="Cost Breakdown" />
            </Divider>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costBreakdownData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  dataKey="value"
                  nameKey="name"
                >
                  {costBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default InvestorDashboard;
