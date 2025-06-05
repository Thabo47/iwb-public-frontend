"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  LinearProgress,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  styled,
} from "@mui/material"
import {
  TrendingUp,
  People,
  AttachMoney,
  Computer,
  Assessment,
  Speed,
  CheckCircle,
  Warning,
  Error,
  Business,
} from "@mui/icons-material"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Styled components
const DashboardCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: theme.shadows[4],
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[8],
  },
}))

const MetricCard = styled(Card)(({ theme, gradient }) => ({
  borderRadius: 12,
  background: gradient || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    width: "80px",
    height: "80px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "50%",
    transform: "translate(25px, -25px)",
  },
}))

const StatusIndicator = styled(Box)(({ status }) => ({
  width: 12,
  height: 12,
  borderRadius: "50%",
  backgroundColor:
    status === "excellent" ? "#4caf50" : status === "good" ? "#8bc34a" : status === "warning" ? "#ff9800" : "#f44336",
  display: "inline-block",
  marginRight: 8,
}))

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00", "#ff00ff"]

const PartnerDashboard = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(true)

  // Mock data - in real app, this would come from APIs
  const [dashboardData, setDashboardData] = useState({
    overview: {
      totalRevenue: 12.5,
      totalClients: 1247,
      activeProjects: 23,
      systemUptime: 99.8,
      monthlyGrowth: 15.2,
      partnershipScore: 92,
    },
    sales: {
      monthlyRevenue: [
        { month: "Jan", revenue: 2.1, target: 2.0 },
        { month: "Feb", revenue: 2.8, target: 2.2 },
        { month: "Mar", revenue: 3.2, target: 2.5 },
        { month: "Apr", revenue: 2.9, target: 2.8 },
        { month: "May", revenue: 3.8, target: 3.0 },
        { month: "Jun", revenue: 4.2, target: 3.2 },
      ],
      topProducts: [
        { name: "Enterprise CPU Package", sales: 45, revenue: 2.1 },
        { name: "Gaming GPU Bundle", sales: 38, revenue: 1.8 },
        { name: "Server Memory Kit", sales: 29, revenue: 1.2 },
        { name: "Workstation Setup", sales: 22, revenue: 0.9 },
      ],
      salesMetrics: {
        totalOrders: 234,
        averageOrderValue: 1850,
        conversionRate: 12.5,
        customerSatisfaction: 4.7,
      },
    },
    clients: {
      totalActive: 1247,
      newThisMonth: 89,
      retentionRate: 94.2,
      engagementScore: 87,
      clientDistribution: [
        { segment: "Enterprise", count: 156, value: 45 },
        { segment: "SMB", count: 423, value: 35 },
        { segment: "Startups", count: 668, value: 20 },
      ],
      topClients: [
        { name: "TechCorp Industries", spent: 245000, orders: 12, status: "excellent" },
        { name: "Innovation Labs", spent: 189000, orders: 8, status: "good" },
        { name: "Digital Solutions", spent: 156000, orders: 15, status: "excellent" },
        { name: "Future Systems", spent: 134000, orders: 6, status: "good" },
      ],
    },
    system: {
      performance: {
        cpu: 45,
        memory: 68,
        storage: 32,
        network: 89,
        responseTime: 245,
        uptime: 99.8,
      },
      health: [
        { component: "Web Servers", status: "excellent", uptime: 99.9 },
        { component: "Database", status: "good", uptime: 99.5 },
        { component: "API Gateway", status: "excellent", uptime: 99.8 },
        { component: "Payment System", status: "warning", uptime: 98.2 },
        { component: "Analytics", status: "good", uptime: 99.1 },
      ],
      recentActivity: [
        { time: "2 min ago", event: "New client registration", type: "info" },
        { time: "15 min ago", event: "Large order processed", type: "success" },
        { time: "1 hour ago", event: "System maintenance completed", type: "info" },
        { time: "3 hours ago", event: "Payment gateway update", type: "warning" },
      ],
    },
    finance: {
      revenue: {
        total: 12.5,
        growth: 15.2,
        forecast: 14.8,
      },
      expenses: {
        total: 8.3,
        growth: 8.7,
        categories: [
          { name: "Operations", amount: 3.2, percentage: 38.6 },
          { name: "Marketing", amount: 2.1, percentage: 25.3 },
          { name: "Technology", amount: 1.8, percentage: 21.7 },
          { name: "Personnel", amount: 1.2, percentage: 14.4 },
        ],
      },
      profitability: {
        gross: 4.2,
        net: 3.1,
        margin: 24.8,
      },
    },
  })

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(amount * 1000000)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "excellent":
        return <CheckCircle color="success" />
      case "good":
        return <CheckCircle color="info" />
      case "warning":
        return <Warning color="warning" />
      case "error":
        return <Error color="error" />
      default:
        return <CheckCircle />
    }
  }

  if (loading) {
    return (
      <Box sx={{ width: "100%", p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Loading Partner Dashboard...
        </Typography>
        <LinearProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}>
          🤝 Partner Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Real-time insights into business performance and system health
        </Typography>
        <Alert severity="info" sx={{ mt: 2 }}>
          <strong>Partnership Status:</strong> Active Premium Partner • Last Updated: {new Date().toLocaleString()}
        </Alert>
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          mb: 3,
          "& .MuiTabs-indicator": {
            height: 4,
            borderRadius: "4px 4px 0 0",
          },
        }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Business Overview" icon={<Business />} iconPosition="start" />
        <Tab label="Sales Performance" icon={<TrendingUp />} iconPosition="start" />
        <Tab label="Client Analytics" icon={<People />} iconPosition="start" />
        <Tab label="System Health" icon={<Computer />} iconPosition="start" />
        <Tab label="Financial Summary" icon={<AttachMoney />} iconPosition="start" />
      </Tabs>

      {/* Business Overview Tab */}
      {activeTab === 0 && (
        <Box>
          {/* Key Metrics */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                        Total Revenue
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                        {formatCurrency(dashboardData.overview.totalRevenue)}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                        +{dashboardData.overview.monthlyGrowth}% this month
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                      <AttachMoney fontSize="large" />
                    </Avatar>
                  </Box>
                </CardContent>
              </MetricCard>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <MetricCard gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                        Active Clients
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                        {dashboardData.overview.totalClients.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                        94.2% retention rate
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                      <People fontSize="large" />
                    </Avatar>
                  </Box>
                </CardContent>
              </MetricCard>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <MetricCard gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                        Active Projects
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                        {dashboardData.overview.activeProjects}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                        5 new this week
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                      <Assessment fontSize="large" />
                    </Avatar>
                  </Box>
                </CardContent>
              </MetricCard>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <MetricCard gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)">
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                        System Uptime
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                        {dashboardData.overview.systemUptime}%
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                        Last 30 days
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                      <Speed fontSize="large" />
                    </Avatar>
                  </Box>
                </CardContent>
              </MetricCard>
            </Grid>
          </Grid>

          {/* Partnership Score */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Partnership Health Score
                  </Typography>
                  <Box sx={{ textAlign: "center", py: 3 }}>
                    <Typography variant="h2" sx={{ fontWeight: 700, color: "success.main", mb: 2 }}>
                      {dashboardData.overview.partnershipScore}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Excellent Partnership Status
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={dashboardData.overview.partnershipScore}
                      sx={{ height: 8, borderRadius: 4, mt: 2 }}
                      color="success"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                      Based on revenue growth, client satisfaction, and system reliability
                    </Typography>
                  </Box>
                </CardContent>
              </DashboardCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Recent Milestones
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Revenue Target Exceeded" secondary="Q2 revenue exceeded target by 15.2%" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Client Satisfaction High" secondary="Average rating of 4.7/5 stars" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary="System Reliability" secondary="99.8% uptime maintained" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Warning color="warning" />
                      </ListItemIcon>
                      <ListItemText primary="Growth Opportunity" secondary="Potential for 20% expansion in Q3" />
                    </ListItem>
                  </List>
                </CardContent>
              </DashboardCard>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Sales Performance Tab */}
      {activeTab === 1 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Revenue vs Target Trend
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dashboardData.sales.monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#4facfe" strokeWidth={3} name="Actual Revenue" />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#f5576c"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Target"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </DashboardCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Sales Metrics
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Total Orders
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {dashboardData.sales.salesMetrics.totalOrders}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Average Order Value
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        ${dashboardData.sales.salesMetrics.averageOrderValue.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Conversion Rate
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {dashboardData.sales.salesMetrics.conversionRate}%
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Customer Satisfaction
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {dashboardData.sales.salesMetrics.customerSatisfaction}/5
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </DashboardCard>
            </Grid>

            <Grid item xs={12}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Top Performing Products
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Product Name</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            Units Sold
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            Revenue
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            Performance
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dashboardData.sales.topProducts.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell align="right">{product.sales}</TableCell>
                            <TableCell align="right">{formatCurrency(product.revenue)}</TableCell>
                            <TableCell align="right">
                              <Chip
                                label={index === 0 ? "Excellent" : index === 1 ? "Very Good" : "Good"}
                                color={index === 0 ? "success" : index === 1 ? "info" : "default"}
                                size="small"
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

      {/* Client Analytics Tab */}
      {activeTab === 2 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Client Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={dashboardData.clients.clientDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ segment, value }) => `${segment} ${value}%`}
                      >
                        {dashboardData.clients.clientDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </DashboardCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Client Metrics
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3, py: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Total Active Clients
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {dashboardData.clients.totalActive.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        New Clients This Month
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: "success.main" }}>
                        +{dashboardData.clients.newThisMonth}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Retention Rate
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {dashboardData.clients.retentionRate}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={dashboardData.clients.retentionRate}
                        sx={{ mt: 1, height: 6, borderRadius: 3 }}
                        color="success"
                      />
                    </Box>
                  </Box>
                </CardContent>
              </DashboardCard>
            </Grid>

            <Grid item xs={12}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Top Clients by Revenue
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Client Name</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            Total Spent
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            Orders
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            Status
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dashboardData.clients.topClients.map((client, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <StatusIndicator status={client.status} />
                                {client.name}
                              </Box>
                            </TableCell>
                            <TableCell align="right">${client.spent.toLocaleString()}</TableCell>
                            <TableCell align="right">{client.orders}</TableCell>
                            <TableCell align="right">
                              <Chip
                                label={client.status}
                                color={client.status === "excellent" ? "success" : "info"}
                                size="small"
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

      {/* System Health Tab */}
      {activeTab === 3 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    System Performance Metrics
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                      <Box sx={{ textAlign: "center", p: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main" }}>
                          {dashboardData.system.performance.cpu}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          CPU Usage
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={dashboardData.system.performance.cpu}
                          sx={{ mt: 1 }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box sx={{ textAlign: "center", p: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "secondary.main" }}>
                          {dashboardData.system.performance.memory}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Memory
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={dashboardData.system.performance.memory}
                          color="secondary"
                          sx={{ mt: 1 }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box sx={{ textAlign: "center", p: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "success.main" }}>
                          {dashboardData.system.performance.storage}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Storage
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={dashboardData.system.performance.storage}
                          color="success"
                          sx={{ mt: 1 }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box sx={{ textAlign: "center", p: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: "info.main" }}>
                          {dashboardData.system.performance.responseTime}ms
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Response Time
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(100, (500 - dashboardData.system.performance.responseTime) / 5)}
                          color="info"
                          sx={{ mt: 1 }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </DashboardCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Recent System Activity
                  </Typography>
                  <List>
                    {dashboardData.system.recentActivity.map((activity, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon>{getStatusIcon(activity.type)}</ListItemIcon>
                        <ListItemText primary={activity.event} secondary={activity.time} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </DashboardCard>
            </Grid>

            <Grid item xs={12}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    System Component Health
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Component</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            Status
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600 }}>
                            Uptime
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dashboardData.system.health.map((component, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <StatusIndicator status={component.status} />
                                {component.component}
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <Chip
                                label={component.status}
                                color={
                                  component.status === "excellent"
                                    ? "success"
                                    : component.status === "good"
                                      ? "info"
                                      : "warning"
                                }
                                size="small"
                              />
                            </TableCell>
                            <TableCell align="right">{component.uptime}%</TableCell>
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

      {/* Financial Summary Tab */}
      {activeTab === 4 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Revenue Overview
                  </Typography>
                  <Box sx={{ textAlign: "center", py: 2 }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: "success.main" }}>
                      {formatCurrency(dashboardData.finance.revenue.total)}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      Total Revenue
                    </Typography>
                    <Typography variant="h6" sx={{ color: "success.main" }}>
                      +{dashboardData.finance.revenue.growth}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Growth this quarter
                    </Typography>
                  </Box>
                </CardContent>
              </DashboardCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Expense Breakdown
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={dashboardData.finance.expenses.categories}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="amount"
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                      >
                        {dashboardData.finance.expenses.categories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </DashboardCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Profitability
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2, py: 1 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Gross Profit
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {formatCurrency(dashboardData.finance.profitability.gross)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Net Profit
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {formatCurrency(dashboardData.finance.profitability.net)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Profit Margin
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: "success.main" }}>
                        {dashboardData.finance.profitability.margin}%
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </DashboardCard>
            </Grid>

            <Grid item xs={12}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Financial Health Summary
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Alert severity="success" sx={{ mb: 2 }}>
                        <strong>Strong Revenue Growth:</strong> 15.2% increase in quarterly revenue
                      </Alert>
                      <Alert severity="info" sx={{ mb: 2 }}>
                        <strong>Healthy Margins:</strong> Profit margin of 24.8% exceeds industry average
                      </Alert>
                      <Alert severity="warning">
                        <strong>Cost Management:</strong> Monitor operational expenses for optimization
                      </Alert>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                        Key Financial Metrics
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText
                            primary="Revenue Growth Rate"
                            secondary={`${dashboardData.finance.revenue.growth}% quarterly`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Operating Efficiency"
                            secondary="Expenses well-controlled at 66.4% of revenue"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Cash Flow" secondary="Positive and growing month-over-month" />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </CardContent>
              </DashboardCard>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default PartnerDashboard
