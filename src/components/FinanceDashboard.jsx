"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  LinearProgress,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  styled,
} from "@mui/material"
import {
  Add,
  Download,
  TrendingUp,
  TrendingDown,
  MoneyOff,
  AttachMoney,
  Assessment,
  FilterList,
  Edit,
  Delete,
  Visibility,
  PieChart as PieIcon,
  BarChart,
  ShowChart,
  Receipt,
  Warning,
  CheckCircle,
} from "@mui/icons-material"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Pie,
} from "recharts"
import axios from "axios"

const API_BASE_URL = "https://cloud-backend-8.onrender.com/api"

// Create axios instance with auth
const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Styled components
const DashboardCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: theme.shadows[4],
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}))

const MetricCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    width: "100px",
    height: "100px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "50%",
    transform: "translate(30px, -30px)",
  },
}))

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00", "#ff00ff"]

const FinanceDashboard = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [financeData, setFinanceData] = useState([
    {
      id: 1,
      date: "2024-01-01",
      category: "Revenue",
      subcategory: "Product Sales",
      amount: 2.5,
      type: "income",
      description: "Q1 Product Revenue",
      paymentMethod: "Bank Transfer",
      status: "completed",
      tags: ["sales", "q1"],
    },
    {
      id: 2,
      date: "2024-01-15",
      category: "Marketing",
      subcategory: "Digital Advertising",
      amount: 0.8,
      type: "expense",
      description: "Google Ads Campaign",
      paymentMethod: "Credit Card",
      status: "completed",
      tags: ["marketing", "ads"],
    },
    {
      id: 3,
      date: "2024-02-01",
      category: "Operations",
      subcategory: "Office Rent",
      amount: 0.3,
      type: "expense",
      description: "Monthly office rent",
      paymentMethod: "Bank Transfer",
      status: "completed",
      tags: ["operations", "rent"],
    },
    {
      id: 4,
      date: "2024-02-15",
      category: "Revenue",
      subcategory: "Service Revenue",
      amount: 1.8,
      type: "income",
      description: "Consulting services",
      paymentMethod: "Invoice",
      status: "pending",
      tags: ["services", "consulting"],
    },
  ])

  const [openDialog, setOpenDialog] = useState(false)
  const [newEntry, setNewEntry] = useState({
    id: null,
    date: "",
    category: "",
    subcategory: "",
    amount: "",
    type: "income",
    description: "",
    paymentMethod: "Bank Transfer",
    status: "completed",
    tags: [],
  })
  const [isEdit, setIsEdit] = useState(false)
  const [filterAnchorEl, setFilterAnchorEl] = useState(null)
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    status: "all",
    dateRange: "all",
  })
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [loading, setLoading] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

  // Categories and subcategories
  const categories = {
    income: {
      Revenue: ["Product Sales", "Service Revenue", "Licensing", "Subscriptions"],
      Investment: ["Dividends", "Interest", "Capital Gains", "Real Estate"],
      Other: ["Grants", "Donations", "Miscellaneous"],
    },
    expense: {
      Operations: ["Office Rent", "Utilities", "Insurance", "Maintenance"],
      Marketing: ["Digital Advertising", "Content Marketing", "Events", "PR"],
      Personnel: ["Salaries", "Benefits", "Training", "Recruitment"],
      Technology: ["Software", "Hardware", "Cloud Services", "Development"],
      Finance: ["Bank Fees", "Interest", "Taxes", "Accounting"],
    },
  }

  const paymentMethods = ["Bank Transfer", "Credit Card", "Cash", "Check", "Invoice", "Digital Wallet"]
  const statuses = ["completed", "pending", "cancelled", "refunded"]

  // Fetch financial data from server
  useEffect(() => {
    fetchFinancialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchFinancialData = async () => {
    try {
      setLoading(true)
      // In a real app, you'd have a finance API endpoint
      // For now, we'll use the existing data
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch financial data:", error)
      showSnackbar("Failed to load financial data", "error")
      setLoading(false)
    }
  }

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleDialogOpen = (entry = null) => {
    if (entry) {
      setNewEntry({ ...entry, tags: entry.tags || [] })
      setIsEdit(true)
    } else {
      setNewEntry({
        id: null,
        date: new Date().toISOString().split("T")[0],
        category: "",
        subcategory: "",
        amount: "",
        type: "income",
        description: "",
        paymentMethod: "Bank Transfer",
        status: "completed",
        tags: [],
      })
      setIsEdit(false)
    }
    setOpenDialog(true)
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
    setIsEdit(false)
  }

  const handleSave = () => {
    if (!newEntry.date || !newEntry.category || !newEntry.amount) {
      showSnackbar("Please fill in all required fields", "error")
      return
    }

    if (isEdit) {
      setFinanceData((prev) => prev.map((item) => (item.id === newEntry.id ? newEntry : item)))
      showSnackbar("Entry updated successfully", "success")
    } else {
      const newId = financeData.length > 0 ? Math.max(...financeData.map((i) => i.id)) + 1 : 1
      setFinanceData((prev) => [...prev, { ...newEntry, id: newId }])
      showSnackbar("Entry added successfully", "success")
    }
    handleDialogClose()
  }

  const handleDelete = (id) => {
    setFinanceData((prev) => prev.filter((item) => item.id !== id))
    showSnackbar("Entry deleted successfully", "success")
  }

  const handleViewDetails = (entry) => {
    setSelectedEntry(entry)
    setOpenDetailsDialog(true)
  }

  const exportToCSV = () => {
    const csvHeader = [
      "Date",
      "Category",
      "Subcategory",
      "Amount (M)",
      "Type",
      "Description",
      "Payment Method",
      "Status",
      "Tags",
    ]
    const csvRows = filteredData.map((item) =>
      [
        item.date,
        item.category,
        item.subcategory || "",
        item.amount,
        item.type,
        item.description || "",
        item.paymentMethod || "",
        item.status || "",
        (item.tags || []).join(";"),
      ].join(","),
    )
    const csvContent = [csvHeader.join(","), ...csvRows].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", `finance_data_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showSnackbar("Data exported successfully", "success")
  }

  // Filter data
  const filteredData = useMemo(() => {
    return financeData.filter((item) => {
      if (filters.type !== "all" && item.type !== filters.type) return false
      if (filters.category !== "all" && item.category !== filters.category) return false
      if (filters.status !== "all" && item.status !== filters.status) return false
      return true
    })
  }, [financeData, filters])

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalIncome = filteredData
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0)
    const totalExpenses = filteredData
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0)
    const netProfit = totalIncome - totalExpenses
    const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0

    return {
      totalIncome,
      totalExpenses,
      netProfit,
      profitMargin,
      transactionCount: filteredData.length,
      avgTransactionSize: filteredData.length > 0 ? (totalIncome + totalExpenses) / filteredData.length : 0,
    }
  }, [filteredData])

  // Prepare chart data
  const chartData = useMemo(() => {
    const monthlyData = {}
    filteredData.forEach((item) => {
      const month = item.date.substring(0, 7) // YYYY-MM
      if (!monthlyData[month]) {
        monthlyData[month] = { month, income: 0, expenses: 0 }
      }
      if (item.type === "income") {
        monthlyData[month].income += item.amount
      } else {
        monthlyData[month].expenses += item.amount
      }
    })

    return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month))
  }, [filteredData])

  const categoryData = useMemo(() => {
    const categories = {}
    filteredData.forEach((item) => {
      if (!categories[item.category]) {
        categories[item.category] = { name: item.category, value: 0, type: item.type }
      }
      categories[item.category].value += item.amount
    })
    return Object.values(categories)
  }, [filteredData])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(amount * 1000000) // Convert millions to actual amount
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main" }}>
          Finance Dashboard
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" startIcon={<FilterList />} onClick={(e) => setFilterAnchorEl(e.currentTarget)}>
            Filters
          </Button>
          <Button variant="outlined" startIcon={<Download />} onClick={exportToCSV}>
            Export CSV
          </Button>
          <Button variant="contained" startIcon={<Add />} onClick={() => handleDialogOpen()}>
            Add Entry
          </Button>
        </Box>
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
      >
        <Tab label="Overview" icon={<Assessment />} iconPosition="start" />
        <Tab label="Transactions" icon={<Receipt />} iconPosition="start" />
        <Tab label="Analytics" icon={<ShowChart />} iconPosition="start" />
        <Tab label="Reports" icon={<BarChart />} iconPosition="start" />
      </Tabs>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Overview Tab */}
      {activeTab === 0 && (
        <Box>
          {/* Metrics Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                        Total Income
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                        {formatCurrency(metrics.totalIncome)}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                        +12.5% from last month
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                      <TrendingUp fontSize="large" />
                    </Avatar>
                  </Box>
                </CardContent>
              </MetricCard>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <MetricCard sx={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                        Total Expenses
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                        {formatCurrency(metrics.totalExpenses)}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                        +8.2% from last month
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                      <TrendingDown fontSize="large" />
                    </Avatar>
                  </Box>
                </CardContent>
              </MetricCard>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <MetricCard sx={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                        Net Profit
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                        {formatCurrency(metrics.netProfit)}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                        Margin: {metrics.profitMargin.toFixed(1)}%
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
              <MetricCard sx={{ background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                        Transactions
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                        {metrics.transactionCount}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                        Avg: {formatCurrency(metrics.avgTransactionSize)}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
                      <Receipt fontSize="large" />
                    </Avatar>
                  </Box>
                </CardContent>
              </MetricCard>
            </Grid>
          </Grid>

          {/* Charts Row */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Income vs Expenses Trend
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="income"
                        stackId="1"
                        stroke="#4facfe"
                        fill="#4facfe"
                        fillOpacity={0.6}
                        name="Income"
                      />
                      <Area
                        type="monotone"
                        dataKey="expenses"
                        stackId="2"
                        stroke="#f5576c"
                        fill="#f5576c"
                        fillOpacity={0.6}
                        name="Expenses"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </DashboardCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Category Breakdown
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </DashboardCard>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Transactions Tab */}
      {activeTab === 1 && (
        <Box>
          <DashboardCard>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Financial Transactions
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "background.default" }}>
                      <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>
                        Amount
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((row) => (
                      <TableRow key={row.id} hover>
                        <TableCell>{formatDate(row.date)}</TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {row.category}
                            </Typography>
                            {row.subcategory && (
                              <Typography variant="caption" color="text.secondary">
                                {row.subcategory}
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{row.description}</Typography>
                          {row.tags && row.tags.length > 0 && (
                            <Box sx={{ mt: 0.5 }}>
                              {row.tags.slice(0, 2).map((tag) => (
                                <Chip key={tag} label={tag} size="small" sx={{ mr: 0.5, fontSize: "0.7rem" }} />
                              ))}
                            </Box>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              color: row.type === "income" ? "success.main" : "error.main",
                            }}
                          >
                            {row.type === "income" ? "+" : "-"}
                            {formatCurrency(row.amount)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={row.type}
                            color={row.type === "income" ? "success" : "error"}
                            icon={row.type === "income" ? <TrendingUp /> : <TrendingDown />}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            color={
                              row.status === "completed" ? "success" : row.status === "pending" ? "warning" : "error"
                            }
                            size="small"
                            icon={
                              row.status === "completed" ? (
                                <CheckCircle />
                              ) : row.status === "pending" ? (
                                <Warning />
                              ) : (
                                <MoneyOff />
                              )
                            }
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="View Details">
                            <IconButton size="small" onClick={() => handleViewDetails(row)}>
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" onClick={() => handleDialogOpen(row)}>
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredData.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Receipt sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
                            <Typography variant="h6" color="text.secondary">
                              No transactions found
                            </Typography>
                            <Button
                              variant="text"
                              startIcon={<Add />}
                              onClick={() => handleDialogOpen()}
                              sx={{ mt: 2 }}
                            >
                              Add your first transaction
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </DashboardCard>
        </Box>
      )}

      {/* Analytics Tab */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DashboardCard>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Monthly Comparison
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Bar dataKey="income" fill="#4facfe" name="Income" />
                    <Bar dataKey="expenses" fill="#f5576c" name="Expenses" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </DashboardCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <DashboardCard>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Financial Health Score
                </Typography>
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="h2" sx={{ fontWeight: 700, color: "success.main", mb: 2 }}>
                    85
                  </Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Excellent Financial Health
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={85}
                    sx={{ height: 8, borderRadius: 4, mt: 2 }}
                    color="success"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Based on income stability, expense management, and profit margins
                  </Typography>
                </Box>
              </CardContent>
            </DashboardCard>
          </Grid>

          <Grid item xs={12}>
            <DashboardCard>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Cash Flow Analysis
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#4facfe"
                      strokeWidth={3}
                      name="Income"
                      dot={{ fill: "#4facfe", strokeWidth: 2, r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="#f5576c"
                      strokeWidth={3}
                      name="Expenses"
                      dot={{ fill: "#f5576c", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </DashboardCard>
          </Grid>
        </Grid>
      )}

      {/* Reports Tab */}
      {activeTab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <DashboardCard>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Quick Reports
                </Typography>
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <Assessment color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Monthly P&L Statement" secondary="Profit and Loss overview" />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemIcon>
                      <BarChart color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Expense Analysis" secondary="Category-wise breakdown" />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemIcon>
                      <ShowChart color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Cash Flow Report" secondary="Income vs expenses trend" />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemIcon>
                      <PieIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Budget Variance" secondary="Planned vs actual spending" />
                  </ListItem>
                </List>
              </CardContent>
            </DashboardCard>
          </Grid>

          <Grid item xs={12} md={8}>
            <DashboardCard>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Financial Summary Report
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: "center", p: 2, bgcolor: "background.default", borderRadius: 2 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: "success.main" }}>
                        {formatCurrency(metrics.totalIncome)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Income
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: "center", p: 2, bgcolor: "background.default", borderRadius: 2 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: "error.main" }}>
                        {formatCurrency(metrics.totalExpenses)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Expenses
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: "center", p: 2, bgcolor: "background.default", borderRadius: 2 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main" }}>
                        {formatCurrency(metrics.netProfit)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Net Profit
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: "center", p: 2, bgcolor: "background.default", borderRadius: 2 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {metrics.profitMargin.toFixed(1)}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Profit Margin
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                  Key Insights
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Strong Revenue Growth"
                      secondary="Income has increased by 12.5% compared to last month"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="warning" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Rising Operational Costs"
                      secondary="Expenses have grown by 8.2%, monitor cost efficiency"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <TrendingUp color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Healthy Profit Margins"
                      secondary={`Current margin of ${metrics.profitMargin.toFixed(1)}% is above industry average`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </DashboardCard>
          </Grid>
        </Grid>
      )}

      {/* Filter Menu */}
      <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={() => setFilterAnchorEl(null)}>
        <MenuItem>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={filters.type}
              label="Type"
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              label="Status"
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
      </Menu>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>
          {isEdit ? "Edit Transaction" : "Add New Transaction"}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Type</InputLabel>
                <Select
                  value={newEntry.type}
                  label="Type"
                  onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value, category: "", subcategory: "" })}
                >
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newEntry.category}
                  label="Category"
                  onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value, subcategory: "" })}
                >
                  {newEntry.type &&
                    Object.keys(categories[newEntry.type]).map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  value={newEntry.subcategory}
                  label="Subcategory"
                  onChange={(e) => setNewEntry({ ...newEntry, subcategory: e.target.value })}
                >
                  {newEntry.category &&
                    categories[newEntry.type][newEntry.category].map((subcat) => (
                      <MenuItem key={subcat} value={subcat}>
                        {subcat}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Amount (in millions)"
                type="number"
                value={newEntry.amount}
                onChange={(e) => setNewEntry({ ...newEntry, amount: Number.parseFloat(e.target.value) || "" })}
                required
                inputProps={{ step: 0.1, min: 0 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  value={newEntry.paymentMethod}
                  label="Payment Method"
                  onChange={(e) => setNewEntry({ ...newEntry, paymentMethod: e.target.value })}
                >
                  {paymentMethods.map((method) => (
                    <MenuItem key={method} value={method}>
                      {method}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={newEntry.status}
                  label="Status"
                  onChange={(e) => setNewEntry({ ...newEntry, status: e.target.value })}
                >
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={newEntry.description}
                onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                placeholder="Enter transaction description..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tags (comma-separated)"
                value={(newEntry.tags || []).join(", ")}
                onChange={(e) =>
                  setNewEntry({
                    ...newEntry,
                    tags: e.target.value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="e.g., marketing, q1, urgent"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {isEdit ? "Update" : "Add"} Transaction
          </Button>
        </DialogActions>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Transaction Details</DialogTitle>
        <DialogContent>
          {selectedEntry && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Date
                  </Typography>
                  <Typography variant="body1">{formatDate(selectedEntry.date)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Amount
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: selectedEntry.type === "income" ? "success.main" : "error.main" }}
                  >
                    {formatCurrency(selectedEntry.amount)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Category
                  </Typography>
                  <Typography variant="body1">{selectedEntry.category}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Subcategory
                  </Typography>
                  <Typography variant="body1">{selectedEntry.subcategory || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Payment Method
                  </Typography>
                  <Typography variant="body1">{selectedEntry.paymentMethod}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip
                    label={selectedEntry.status}
                    color={
                      selectedEntry.status === "completed"
                        ? "success"
                        : selectedEntry.status === "pending"
                          ? "warning"
                          : "error"
                    }
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body1">{selectedEntry.description || "No description"}</Typography>
                </Grid>
                {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Tags
                    </Typography>
                    <Box>
                      {selectedEntry.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                      ))}
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetailsDialog(false)}>Close</Button>
          <Button onClick={() => handleDialogOpen(selectedEntry)} variant="contained">
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default FinanceDashboard
