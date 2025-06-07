"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  IconButton,
  Tooltip,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Chip,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Badge,
  useMediaQuery, // Import useMediaQuery
} from "@mui/material"
import { useTheme } from "@mui/material/styles" // Import useTheme
import {
  Code,
  Folder,
  Settings,
  CloudUpload,
  CloudDownload,
  Description,
  Refresh,
  Delete,
  Visibility,
  Edit,
  Add,
  Speed,
  Memory,
  NetworkCheck,
  Warning,
  CheckCircle,
  Error,
  Info,
  TrendingUp,
  TrendingDown,
  Computer,
  Dashboard,
  PlayArrow,
  Stop,
  ContentCopy,
} from "@mui/icons-material"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"

// Add these imports at the top with the existing imports
import axios from "axios"

const DeveloperDashboard = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")) // Define isMobile

  const [activeTab, setActiveTab] = useState(0)
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "config.json",
      type: "json",
      content: '{\n  "appName": "MyApp",\n  "version": "1.0.0",\n  "apiEndpoint": "https://api.example.com"\n}',
    },
    {
      id: 2,
      name: "settings.yaml",
      type: "yaml",
      content:
        "app:\n  name: MyApp\n  version: 1.0.0\n  debug: false\napi:\n  endpoint: https://api.example.com\n  timeout: 30",
    },
    {
      id: 3,
      name: "environment.prod",
      type: "env",
      content: "API_KEY=production_key\nDB_HOST=prod-db.example.com\nCACHE_ENABLED=true",
    },
  ])
  // Replace the existing logs state and add new state for real logs
  const [logs, setLogs] = useState([])
  const [realTimeLogs, setRealTimeLogs] = useState([])
  const [logSources, setLogSources] = useState(["all", "server", "database", "api", "auth", "cache"])
  const [logLevels, setLogLevels] = useState(["all", "error", "warning", "info", "debug"])
  const [logSearch, setLogSearch] = useState("")
  const [logDateRange, setLogDateRange] = useState({ start: "", end: "" })
  const [isLogStreaming, setIsLogStreaming] = useState(false)
  const [logStats, setLogStats] = useState({
    total: 0,
    errors: 0,
    warnings: 0,
    info: 0,
    debug: 0,
  })

  // Performance monitoring state
  const [performanceData, setPerformanceData] = useState({
    cpu: 45,
    memory: 68,
    disk: 32,
    network: 89,
    responseTime: 245,
    throughput: 1250,
    errorRate: 2.3,
    uptime: 99.8,
  })

  const [performanceHistory, setPerformanceHistory] = useState([
    { time: "10:00", cpu: 35, memory: 60, responseTime: 200, requests: 1100 },
    { time: "10:15", cpu: 42, memory: 65, responseTime: 220, requests: 1200 },
    { time: "10:30", cpu: 45, memory: 68, responseTime: 245, requests: 1250 },
    { time: "10:45", cpu: 38, memory: 62, responseTime: 210, requests: 1180 },
    { time: "11:00", cpu: 50, memory: 70, responseTime: 280, requests: 1300 },
    { time: "11:15", cpu: 47, memory: 69, responseTime: 260, requests: 1280 },
  ])

  const [webVitals, setWebVitals] = useState([
    { metric: "First Contentful Paint", value: "1.2s", status: "good", threshold: "< 1.8s" },
    { metric: "Largest Contentful Paint", value: "2.1s", status: "needs-improvement", threshold: "< 2.5s" },
    { metric: "First Input Delay", value: "45ms", status: "good", threshold: "< 100ms" },
    { metric: "Cumulative Layout Shift", value: "0.08", status: "good", threshold: "< 0.1" },
    { metric: "Time to Interactive", value: "3.2s", status: "needs-improvement", threshold: "< 3.8s" },
    { metric: "Total Blocking Time", value: "180ms", status: "poor", threshold: "< 200ms" },
  ])

  const [apiEndpoints, setApiEndpoints] = useState([
    { endpoint: "/api/users", method: "GET", avgResponseTime: 120, requests: 1500, errors: 12, status: "healthy" },
    { endpoint: "/api/products", method: "GET", avgResponseTime: 89, requests: 2300, errors: 5, status: "healthy" },
    { endpoint: "/api/orders", method: "POST", avgResponseTime: 340, requests: 890, errors: 45, status: "warning" },
    { endpoint: "/api/auth/login", method: "POST", avgResponseTime: 180, requests: 450, errors: 8, status: "healthy" },
    { endpoint: "/api/analytics", method: "GET", avgResponseTime: 520, requests: 120, errors: 15, status: "critical" },
  ])

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "critical",
      message: "High memory usage detected (>80%)",
      timestamp: "2 minutes ago",
      resolved: false,
    },
    {
      id: 2,
      type: "warning",
      message: "API response time increased by 25%",
      timestamp: "5 minutes ago",
      resolved: false,
    },
    {
      id: 3,
      type: "info",
      message: "New deployment completed successfully",
      timestamp: "10 minutes ago",
      resolved: true,
    },
    { id: 4, type: "critical", message: "Database connection timeout", timestamp: "15 minutes ago", resolved: true },
  ])

  const [monitoringEnabled, setMonitoringEnabled] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)

  // Existing state
  const [openFileDialog, setOpenFileDialog] = useState(false)
  const [openLogsDialog, setOpenLogsDialog] = useState(false)
  const [openPerformanceDialog, setOpenPerformanceDialog] = useState(false)
  const [currentFile, setCurrentFile] = useState({ id: null, name: "", type: "json", content: "" })
  const [selectedLog, setSelectedLog] = useState(null)
  const [selectedEndpoint, setSelectedEndpoint] = useState(null)
  const [fileAnchorEl, setFileAnchorEl] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [logFilter, setLogFilter] = useState("all")
  const [uploadFile, setUploadFile] = useState(null)

  const fileTypes = ["json", "yaml", "env", "txt", "js", "ts"]

  // Auto-refresh performance data
  useEffect(() => {
    if (autoRefresh && monitoringEnabled) {
      const interval = setInterval(() => {
        // Simulate real-time data updates
        setPerformanceData((prev) => ({
          ...prev,
          cpu: Math.max(20, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(30, Math.min(95, prev.memory + (Math.random() - 0.5) * 8)),
          network: Math.max(50, Math.min(100, prev.network + (Math.random() - 0.5) * 15)),
          responseTime: Math.max(100, Math.min(500, prev.responseTime + (Math.random() - 0.5) * 50)),
        }))

        // Update performance history
        const now = new Date()
        const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`
        setPerformanceHistory((prev) => {
          const newData = [
            ...prev.slice(-5),
            {
              time: timeStr,
              cpu: performanceData.cpu,
              memory: performanceData.memory,
              responseTime: performanceData.responseTime,
              requests: Math.floor(Math.random() * 500) + 1000,
            },
          ]
          return newData
        })
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [autoRefresh, monitoringEnabled, performanceData.cpu, performanceData.memory, performanceData.responseTime])

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleFileClick = (file) => {
    setCurrentFile(file)
    setOpenFileDialog(true)
  }

  const handleFileMenuClick = (event) => {
    setFileAnchorEl(event.currentTarget)
  }

  const handleFileMenuClose = () => {
    setFileAnchorEl(null)
  }

  const handleCreateNewFile = (type) => {
    setCurrentFile({ id: null, name: `newfile.${type}`, type, content: "" })
    setOpenFileDialog(true)
    setFileAnchorEl(null)
  }

  const handleSaveFile = () => {
    if (currentFile.id) {
      setFiles(files.map((file) => (file.id === currentFile.id ? currentFile : file)))
    } else {
      const newId = Math.max(...files.map((f) => f.id), 0) + 1
      setFiles([...files, { ...currentFile, id: newId }])
    }
    setOpenFileDialog(false)
    showSnackbar("File saved successfully", "success")
  }

  const handleDeleteFile = (id) => {
    setFiles(files.filter((file) => file.id !== id))
    showSnackbar("File deleted successfully", "success")
  }

  const handleLogClick = (log) => {
    setSelectedLog(log)
    setOpenLogsDialog(true)
  }

  const handleEndpointClick = (endpoint) => {
    setSelectedEndpoint(endpoint)
    setOpenPerformanceDialog(true)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const extension = file.name.split(".").pop()
        const newFile = {
          id: Math.max(...files.map((f) => f.id), 0) + 1,
          name: file.name,
          type: fileTypes.includes(extension) ? extension : "txt",
          content: event.target.result,
        }
        setFiles([...files, newFile])
        showSnackbar("File uploaded successfully", "success")
      }
      reader.readAsText(file)
    }
  }

  const handleDownloadFile = (file) => {
    const blob = new Blob([file.content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = file.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    showSnackbar("Download started", "info")
  }

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const resolveAlert = (alertId) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, resolved: true } : alert)))
    showSnackbar("Alert resolved", "success")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "good":
        return "success"
      case "needs-improvement":
        return "warning"
      case "poor":
        return "error"
      case "healthy":
        return "success"
      case "warning":
        return "warning"
      case "critical":
        return "error"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "good":
      case "healthy":
        return <CheckCircle color="success" />
      case "needs-improvement":
      case "warning":
        return <Warning color="warning" />
      case "poor":
      case "critical":
        return <Error color="error" />
      default:
        return <Info />
    }
  }

  // Add API configuration
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

  // Add these functions after the existing functions

  // Fetch real logs from server
  const fetchServerLogs = async () => {
    try {
      const response = await api.get("/logs", {
        params: {
          filter: logFilter,
          search: logSearch,
          startDate: logDateRange.start,
          endDate: logDateRange.end,
          limit: 100,
        },
      })

      setLogs(response.data.logs || [])
      setLogStats(response.data.stats || logStats)

      if (response.data.logs) {
        showSnackbar(`Loaded ${response.data.logs.length} log entries`, "success")
      }
    } catch (error) {
      console.error("Failed to fetch logs:", error)
      // Fallback to mock data if server is not available
      setLogs([
        {
          id: 1,
          timestamp: new Date().toISOString(),
          level: "error",
          message: "Database connection failed - using connection pool",
          source: "database",
          details: {
            error: "ECONNREFUSED",
            host: "localhost:5432",
            database: "techstore",
          },
          userId: null,
          requestId: "req_123456",
          duration: null,
        },
        {
          id: 2,
          timestamp: new Date(Date.now() - 60000).toISOString(),
          level: "info",
          message: "User authentication successful",
          source: "auth",
          details: {
            userId: "507f1f77bcf86cd799439011",
            email: "user@example.com",
            role: "Client",
          },
          userId: "507f1f77bcf86cd799439011",
          requestId: "req_123455",
          duration: 145,
        },
        {
          id: 3,
          timestamp: new Date(Date.now() - 120000).toISOString(),
          level: "warning",
          message: "High memory usage detected",
          source: "server",
          details: {
            memoryUsage: "85%",
            threshold: "80%",
            availableMemory: "2.1GB",
          },
          userId: null,
          requestId: null,
          duration: null,
        },
        {
          id: 4,
          timestamp: new Date(Date.now() - 180000).toISOString(),
          level: "error",
          message: "API rate limit exceeded",
          source: "api",
          details: {
            endpoint: "/api/products",
            clientIp: "192.168.1.100",
            requestCount: 1001,
            timeWindow: "1 hour",
          },
          userId: "507f1f77bcf86cd799439012",
          requestId: "req_123454",
          duration: 5,
        },
        {
          id: 5,
          timestamp: new Date(Date.now() - 240000).toISOString(),
          level: "info",
          message: "Cache cleared successfully",
          source: "cache",
          details: {
            cacheType: "redis",
            keysCleared: 1247,
            operation: "manual_clear",
          },
          userId: "507f1f77bcf86cd799439013",
          requestId: null,
          duration: 320,
        },
        {
          id: 6,
          timestamp: new Date(Date.now() - 300000).toISOString(),
          level: "debug",
          message: "Product search query executed",
          source: "api",
          details: {
            query: "SELECT * FROM products WHERE category = ?",
            params: ["CPU"],
            resultCount: 45,
          },
          userId: "507f1f77bcf86cd799439011",
          requestId: "req_123453",
          duration: 23,
        },
      ])

      setLogStats({
        total: 6,
        errors: 2,
        warnings: 1,
        info: 2,
        debug: 1,
      })

      showSnackbar("Using sample log data - server connection failed", "warning")
    }
  }

  // Start real-time log streaming
  const startLogStreaming = () => {
    setIsLogStreaming(true)

    // Simulate real-time logs with WebSocket or polling
    const interval = setInterval(async () => {
      try {
        const response = await api.get("/logs/stream")
        if (response.data.newLogs && response.data.newLogs.length > 0) {
          setRealTimeLogs((prev) => [...response.data.newLogs, ...prev.slice(0, 49)])
        }
      } catch (error) {
        // Simulate new log entries for demo
        const newLog = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          level: ["info", "warning", "error", "debug"][Math.floor(Math.random() * 4)],
          message: [
            "New user registration completed",
            "Payment processing initiated",
            "Database query optimization completed",
            "Cache hit ratio: 94.2%",
            "API response time: 156ms",
          ][Math.floor(Math.random() * 5)],
          source: ["api", "database", "auth", "cache", "server"][Math.floor(Math.random() * 5)],
          details: { simulated: true },
          userId: Math.random() > 0.5 ? "507f1f77bcf86cd799439011" : null,
          requestId: `req_${Date.now()}`,
          duration: Math.floor(Math.random() * 500) + 50,
        }

        setRealTimeLogs((prev) => [newLog, ...prev.slice(0, 49)])
      }
    }, 3000)

    return () => {
      clearInterval(interval)
      setIsLogStreaming(false)
    }
  }

  // Stop log streaming
  const stopLogStreaming = () => {
    setIsLogStreaming(false)
  }

  // Export logs
  const exportLogs = () => {
    const logData = logs.map((log) => ({
      timestamp: log.timestamp,
      level: log.level,
      source: log.source,
      message: log.message,
      details: JSON.stringify(log.details),
      userId: log.userId,
      requestId: log.requestId,
      duration: log.duration,
    }))

    const csvContent = [
      "Timestamp,Level,Source,Message,Details,User ID,Request ID,Duration",
      ...logData.map(
        (log) =>
          `"${log.timestamp}","${log.level}","${log.source}","${log.message}","${log.details}","${log.userId || ""}","${log.requestId || ""}","${log.duration || ""}"`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `application-logs-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    showSnackbar("Logs exported successfully", "success")
  }

  // Add useEffect to fetch logs when component mounts or filters change
  useEffect(() => {
    if (activeTab === 4) {
      // Logs Viewer tab
      fetchServerLogs()
    }
  }, [activeTab, logFilter, logSearch, logDateRange])

  // Update the filteredLogs logic
  const filteredLogs = logs.filter((log) => {
    const matchesFilter = logFilter === "all" || log.level === logFilter || log.source === logFilter
    const matchesSearch =
      !logSearch ||
      log.message.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.source.toLowerCase().includes(logSearch.toLowerCase()) ||
      (log.details && JSON.stringify(log.details).toLowerCase().includes(logSearch.toLowerCase()))

    return matchesFilter && matchesSearch
  })

  const unresolvedAlerts = alerts.filter((alert) => !alert.resolved)

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ display: "flex", alignItems: "center", fontWeight: 700 }}>
          <Code fontSize="large" sx={{ mr: 1 }} /> Developer Dashboard
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={monitoringEnabled}
                onChange={(e) => setMonitoringEnabled(e.target.checked)}
                color="primary"
              />
            }
            label="Monitoring"
          />
          <FormControlLabel
            control={
              <Switch checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} color="primary" />
            }
            label="Auto Refresh"
          />
          <Badge badgeContent={unresolvedAlerts.length} color="error">
            <Button variant="outlined" startIcon={<Warning />}>
              Alerts
            </Button>
          </Badge>
        </Box>
      </Box>

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
        <Tab label="Performance Monitor" icon={<Dashboard />} iconPosition="start" />
        <Tab label="Web Vitals" icon={<Speed />} iconPosition="start" />
        <Tab label="API Monitoring" icon={<NetworkCheck />} iconPosition="start" />
        <Tab label="Configuration Files" icon={<Settings />} iconPosition="start" />
        <Tab label="Logs Viewer" icon={<Description />} iconPosition="start" />
        <Tab label="File Operations" icon={<Folder />} iconPosition="start" />
      </Tabs>

      <Box sx={{ p: 2 }}>
        {/* Performance Monitor Tab */}
        {activeTab === 0 && (
          <Box>
            {/* Performance Overview Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box>
                        <Typography color="text.secondary" gutterBottom>
                          CPU Usage
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {performanceData.cpu}%
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: performanceData.cpu > 80 ? "error.main" : "primary.main" }}>
                        <Computer />
                      </Avatar>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={performanceData.cpu}
                      sx={{ mt: 2 }}
                      color={performanceData.cpu > 80 ? "error" : "primary"}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box>
                        <Typography color="text.secondary" gutterBottom>
                          Memory Usage
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {performanceData.memory}%
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: performanceData.memory > 85 ? "error.main" : "secondary.main" }}>
                        <Memory />
                      </Avatar>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={performanceData.memory}
                      sx={{ mt: 2 }}
                      color={performanceData.memory > 85 ? "error" : "secondary"}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box>
                        <Typography color="text.secondary" gutterBottom>
                          Response Time
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {performanceData.responseTime}ms
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: performanceData.responseTime > 300 ? "warning.main" : "success.main" }}>
                        <Speed />
                      </Avatar>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      {performanceData.responseTime > 300 ? (
                        <TrendingUp color="error" sx={{ mr: 1 }} />
                      ) : (
                        <TrendingDown color="success" sx={{ mr: 1 }} />
                      )}
                      <Typography variant="body2" color="text.secondary">
                        {performanceData.responseTime > 300 ? "Above threshold" : "Within limits"}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box>
                        <Typography color="text.secondary" gutterBottom>
                          Uptime
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {performanceData.uptime}%
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: "success.main" }}>
                        <CheckCircle />
                      </Avatar>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Last 30 days
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Performance Charts */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Real-time Performance Metrics
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <RechartsTooltip />
                        <Line type="monotone" dataKey="cpu" stroke="#8884d8" strokeWidth={2} name="CPU %" />
                        <Line type="monotone" dataKey="memory" stroke="#82ca9d" strokeWidth={2} name="Memory %" />
                        <Line
                          type="monotone"
                          dataKey="responseTime"
                          stroke="#ffc658"
                          strokeWidth={2}
                          name="Response Time (ms)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 2, boxShadow: 3, height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Active Alerts
                    </Typography>
                    <List sx={{ maxHeight: 250, overflow: "auto" }}>
                      {unresolvedAlerts.map((alert) => (
                        <ListItem key={alert.id} sx={{ px: 0 }}>
                          <ListItemText
                            primary={
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                {getStatusIcon(alert.type)}
                                <Typography variant="body2">{alert.message}</Typography>
                              </Box>
                            }
                            secondary={alert.timestamp}
                          />
                          <IconButton size="small" onClick={() => resolveAlert(alert.id)} color="primary">
                            <CheckCircle />
                          </IconButton>
                        </ListItem>
                      ))}
                      {unresolvedAlerts.length === 0 && (
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
                          No active alerts
                        </Typography>
                      )}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Web Vitals Tab */}
        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Core Web Vitals & Performance Metrics
            </Typography>

            <Grid container spacing={3}>
              {webVitals.map((vital, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {vital.metric}
                          </Typography>
                          <Typography
                            variant="h4"
                            sx={{ fontWeight: 700, color: `${getStatusColor(vital.status)}.main` }}
                          >
                            {vital.value}
                          </Typography>
                        </Box>
                        <Chip
                          label={vital.status.replace("-", " ")}
                          color={getStatusColor(vital.status)}
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Threshold: {vital.threshold}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={vital.status === "good" ? 100 : vital.status === "needs-improvement" ? 60 : 30}
                        color={getStatusColor(vital.status)}
                        sx={{ mt: 2 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Card sx={{ mt: 3, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Performance Score Trend
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <RechartsTooltip />
                    <Area
                      type="monotone"
                      dataKey="requests"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                      name="Requests/min"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* API Monitoring Tab */}
        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              API Endpoint Performance
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "background.default" }}>
                    <TableCell sx={{ fontWeight: 600 }}>Endpoint</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Method</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      Avg Response Time
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      Requests
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      Errors
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {apiEndpoints.map((endpoint, index) => (
                    <TableRow key={index} hover>
                      <TableCell sx={{ fontFamily: "monospace" }}>{endpoint.endpoint}</TableCell>
                      <TableCell>
                        <Chip label={endpoint.method} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell align="right">{endpoint.avgResponseTime}ms</TableCell>
                      <TableCell align="right">{endpoint.requests.toLocaleString()}</TableCell>
                      <TableCell align="right">
                        <Typography color={endpoint.errors > 20 ? "error" : "text.primary"}>
                          {endpoint.errors}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={endpoint.status}
                          color={getStatusColor(endpoint.status)}
                          size="small"
                          icon={getStatusIcon(endpoint.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEndpointClick(endpoint)}>
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Card sx={{ mt: 3, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  API Response Time Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={apiEndpoints}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="endpoint" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="avgResponseTime" fill="#8884d8" name="Avg Response Time (ms)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Configuration Files Tab */}
        {activeTab === 3 && (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Application Configuration Files
              </Typography>
              <Box>
                <Button variant="contained" startIcon={<Add />} onClick={handleFileMenuClick}>
                  New File
                </Button>
                <Menu anchorEl={fileAnchorEl} open={Boolean(fileAnchorEl)} onClose={handleFileMenuClose}>
                  {fileTypes.map((type) => (
                    <MenuItem key={type} onClick={() => handleCreateNewFile(type)}>
                      .{type.toUpperCase()}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>

            <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
              <List>
                {files.map((file) => (
                  <React.Fragment key={file.id}>
                    <ListItem
                      secondaryAction={
                        <Box>
                          <Tooltip title="View/Edit">
                            <IconButton edge="end" onClick={() => handleFileClick(file)}>
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Download">
                            <IconButton edge="end" onClick={() => handleDownloadFile(file)}>
                              <CloudDownload />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton edge="end" onClick={() => handleDeleteFile(file.id)}>
                              <Delete color="error" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      }
                    >
                      <ListItemText primary={file.name} secondary={`Type: ${file.type.toUpperCase()}`} />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Box>
        )}

        {/* Logs Viewer Tab */}
        {/* Replace the Logs Viewer Tab content (activeTab === 4) with this enhanced version: */}
        {activeTab === 4 && (
          <Box>
            {/* Log Controls */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Application Logs
              </Typography>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Button
                  variant={isLogStreaming ? "contained" : "outlined"}
                  color={isLogStreaming ? "error" : "primary"}
                  onClick={isLogStreaming ? stopLogStreaming : startLogStreaming}
                  startIcon={isLogStreaming ? <Stop /> : <PlayArrow />}
                >
                  {isLogStreaming ? "Stop Stream" : "Start Stream"}
                </Button>
                <Button variant="outlined" onClick={fetchServerLogs} startIcon={<Refresh />}>
                  Refresh
                </Button>
                <Button variant="outlined" onClick={exportLogs} startIcon={<CloudDownload />}>
                  Export
                </Button>
              </Box>
            </Box>

            {/* Log Statistics */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6} sm={2.4}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {logStats.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6} sm={2.4}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "error.main" }}>
                    {logStats.errors}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Errors
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6} sm={2.4}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "warning.main" }}>
                    {logStats.warnings}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Warnings
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6} sm={2.4}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "info.main" }}>
                    {logStats.info}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Info
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6} sm={2.4}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "text.secondary" }}>
                    {logStats.debug}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Debug
                  </Typography>
                </Card>
              </Grid>
            </Grid>

            {/* Log Filters */}
            <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Search logs"
                    value={logSearch}
                    onChange={(e) => setLogSearch(e.target.value)}
                    placeholder="Search message, source, or details..."
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Level</InputLabel>
                    <Select value={logFilter} label="Level" onChange={(e) => setLogFilter(e.target.value)}>
                      {logLevels.map((level) => (
                        <MenuItem key={level} value={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Source</InputLabel>
                    <Select value={logFilter} label="Source" onChange={(e) => setLogFilter(e.target.value)}>
                      {logSources.map((source) => (
                        <MenuItem key={source} value={source}>
                          {source.charAt(0).toUpperCase() + source.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={2.5}>
                  <TextField
                    fullWidth
                    size="small"
                    type="datetime-local"
                    label="Start Date"
                    value={logDateRange.start}
                    onChange={(e) => setLogDateRange({ ...logDateRange, start: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={2.5}>
                  <TextField
                    fullWidth
                    size="small"
                    type="datetime-local"
                    label="End Date"
                    value={logDateRange.end}
                    onChange={(e) => setLogDateRange({ ...logDateRange, end: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Real-time Logs Stream */}
            {isLogStreaming && realTimeLogs.length > 0 && (
              <Paper sx={{ mb: 3, borderRadius: 2 }}>
                <Box sx={{ p: 2, bgcolor: "primary.main", color: "white", borderRadius: "8px 8px 0 0" }}>
                  <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center" }}>
                    <Badge color="error" variant="dot" sx={{ mr: 1 }} />
                    Live Stream
                  </Typography>
                </Box>
                <List sx={{ maxHeight: 200, overflow: "auto" }}>
                  {realTimeLogs.slice(0, 10).map((log) => (
                    <ListItem key={log.id} sx={{ py: 0.5 }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Chip
                              label={log.level}
                              size="small"
                              color={getStatusColor(log.level)}
                              sx={{ minWidth: 60 }}
                            />
                            <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                              {log.message}
                            </Typography>
                          </Box>
                        }
                        secondary={`${new Date(log.timestamp).toLocaleTimeString()} • ${log.source}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}

            {/* Main Logs Table */}
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
              <Table
                sx={{
                  width: "100%",
                  overflowX: "auto",
                  display: "block",
                }}
              >
                <TableHead>
                  <TableRow sx={{ bgcolor: "background.default" }}>
                    <TableCell sx={{ fontWeight: 600 }}>Timestamp</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Level</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Source</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Message</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow
                      key={log.id}
                      hover
                      sx={{
                        bgcolor: log.level === "error" ? "#ffebee" : log.level === "warning" ? "#fff8e1" : "inherit",
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                          {new Date(log.timestamp).toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={log.level}
                          size="small"
                          color={getStatusColor(log.level)}
                          icon={getStatusIcon(log.level)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip label={log.source} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            maxWidth: isMobile ? 200 : 300, // Responsive maxWidth
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontFamily: "monospace",
                          }}
                        >
                          {log.message}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {log.userId ? (
                          <Chip
                            label={log.userId.substring(0, 8)}
                            size="small"
                            variant="outlined"
                            sx={{ fontFamily: "monospace" }}
                          />
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            -
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {log.duration ? (
                          <Typography
                            variant="body2"
                            color={log.duration > 1000 ? "error" : log.duration > 500 ? "warning.main" : "text.primary"}
                          >
                            {log.duration}ms
                          </Typography>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            -
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => handleLogClick(log)} color="primary">
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {filteredLogs.length === 0 && (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Description sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No logs found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search criteria or check if the server is running
                </Typography>
                <Button variant="contained" onClick={fetchServerLogs} sx={{ mt: 2 }} startIcon={<Refresh />}>
                  Retry Connection
                </Button>
              </Box>
            )}
          </Box>
        )}

        {/* File Operations Tab */}
        {activeTab === 5 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              File Operations
            </Typography>

            <Box sx={{ display: "flex", gap: 3, mb: 4, flexDirection: isMobile ? "column" : "row" }}>
              <Paper elevation={2} sx={{ p: 3, flex: 1, borderRadius: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                  <CloudUpload sx={{ mr: 1 }} /> Upload Files
                </Typography>
                <input
                  accept=".json,.yaml,.env,.txt,.js,.ts"
                  style={{ display: "none" }}
                  id="upload-file"
                  type="file"
                  onChange={handleFileUpload}
                />
                <label htmlFor="upload-file">
                  <Button variant="contained" component="span" startIcon={<CloudUpload />}>
                    Select File
                  </Button>
                </label>
                {uploadFile && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected: {uploadFile.name}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Supported formats: JSON, YAML, ENV, TXT, JS, TS
                </Typography>
              </Paper>

              <Paper elevation={2} sx={{ p: 3, flex: 1, borderRadius: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                  <CloudDownload sx={{ mr: 1 }} /> Download Files
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Download configuration files for deployment
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<CloudDownload />}
                  onClick={() => {
                    const zipContent = files.map((f) => `${f.name}:\n${f.content}`).join("\n\n")
                    handleDownloadFile({ name: "config-bundle.txt", content: zipContent })
                  }}
                >
                  Download All as Bundle
                </Button>
              </Paper>
            </Box>

            <Typography variant="subtitle1" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
              <Refresh sx={{ mr: 1 }} /> Recent Files
            </Typography>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
              <List>
                {files.slice(0, 3).map((file) => (
                  <React.Fragment key={file.id}>
                    <ListItem
                      secondaryAction={
                        <Button size="small" startIcon={<CloudDownload />} onClick={() => handleDownloadFile(file)}>
                          Download
                        </Button>
                      }
                    >
                      <ListItemText
                        primary={file.name}
                        secondary={`Last modified: ${new Date().toLocaleDateString()}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Box>
        )}
      </Box>

      {/* File Editor Dialog */}
      <Dialog open={openFileDialog} onClose={() => setOpenFileDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{currentFile.id ? `Editing ${currentFile.name}` : "Create New File"}</DialogTitle>
        <DialogContent sx={{ height: "60vh" }}>
          <TextField
            fullWidth
            label="File Name"
            value={currentFile.name}
            onChange={(e) => setCurrentFile({ ...currentFile, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Typography variant="subtitle2" gutterBottom>
            File Content:
          </Typography>
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: 1,
              overflow: "auto",
              height: "calc(100% - 40px)",
            }}
          >
            <SyntaxHighlighter
              language={currentFile.type}
              style={nightOwl}
              wrapLines
              showLineNumbers
              lineNumberStyle={{ color: "#ddd", marginRight: "1em" }}
            >
              {currentFile.content}
            </SyntaxHighlighter>
            <TextField
              fullWidth
              multiline
              minRows={10}
              value={currentFile.content}
              onChange={(e) => setCurrentFile({ ...currentFile, content: e.target.value })}
              sx={{
                fontFamily: "monospace",
                "& textarea": { fontFamily: "monospace !important" },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFileDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveFile} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Log Details Dialog */}
      {/* Update the Log Details Dialog to show more comprehensive information */}
      <Dialog open={openLogsDialog} onClose={() => setOpenLogsDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            Log Details
            {selectedLog && (
              <Chip
                label={selectedLog.level}
                size="small"
                color={getStatusColor(selectedLog.level)}
                icon={getStatusIcon(selectedLog.level)}
              />
            )}
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedLog && (
            <Box sx={{ minWidth: 400 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Timestamp:
                  </Typography>
                  <Typography gutterBottom sx={{ fontFamily: "monospace" }}>
                    {new Date(selectedLog.timestamp).toLocaleString()}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Source:
                  </Typography>
                  <Chip label={selectedLog.source} size="small" variant="outlined" />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Request ID:
                  </Typography>
                  <Typography sx={{ fontFamily: "monospace" }}>{selectedLog.requestId || "N/A"}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Duration:
                  </Typography>
                  <Typography>{selectedLog.duration ? `${selectedLog.duration}ms` : "N/A"}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Message:
                  </Typography>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                    <Typography fontFamily="monospace">{selectedLog.message}</Typography>
                  </Paper>
                </Grid>

                {selectedLog.details && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                      Details:
                    </Typography>
                    <Paper elevation={0} sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                      <SyntaxHighlighter language="json" style={nightOwl} customStyle={{ margin: 0, fontSize: "12px" }}>
                        {JSON.stringify(selectedLog.details, null, 2)}
                      </SyntaxHighlighter>
                    </Paper>
                  </Grid>
                )}

                {selectedLog.userId && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                      User ID:
                    </Typography>
                    <Typography sx={{ fontFamily: "monospace" }}>{selectedLog.userId}</Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogsDialog(false)}>Close</Button>
          {selectedLog && (
            <Button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(selectedLog, null, 2))
                showSnackbar("Log details copied to clipboard", "success")
              }}
              startIcon={<ContentCopy />}
            >
              Copy
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* API Endpoint Details Dialog */}
      <Dialog open={openPerformanceDialog} onClose={() => setOpenPerformanceDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>API Endpoint Details</DialogTitle>
        <DialogContent>
          {selectedEndpoint && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedEndpoint.method} {selectedEndpoint.endpoint}
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Average Response Time</Typography>
                  <Typography variant="h4">{selectedEndpoint.avgResponseTime}ms</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Total Requests</Typography>
                  <Typography variant="h4">{selectedEndpoint.requests.toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Error Count</Typography>
                  <Typography variant="h4" color="error">
                    {selectedEndpoint.errors}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Status</Typography>
                  <Chip
                    label={selectedEndpoint.status}
                    color={getStatusColor(selectedEndpoint.status)}
                    icon={getStatusIcon(selectedEndpoint.status)}
                  />
                </Grid>
              </Grid>
              <Typography variant="subtitle2" gutterBottom>
                Performance Trend
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={performanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="responseTime" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPerformanceDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default DeveloperDashboard
