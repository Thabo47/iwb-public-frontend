"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Alert,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material"
import {
  Equalizer,
  ShowChart,
  Description,
  MonetizationOn,
  TrendingUp,
  ArrowUpward,
  ArrowDownward,
  Info,
  Download,
  CheckCircle,
  Warning,
  Business,
  AccountBalance,
} from "@mui/icons-material"
import {
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Area,
  AreaChart,
  ComposedChart,
} from "recharts"

const InvestorDashboard = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [timePeriod, setTimePeriod] = useState("monthly")
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [investmentYears, setInvestmentYears] = useState("")
  const [estimatedReturn, setEstimatedReturn] = useState(null)
  const [showThankYou, setShowThankYou] = useState(false)
  const [comparisonMetric, setComparisonMetric] = useState("revenue")

  const rate = 0.12 // Increased expected return rate
  const baseRevenue = 100000
  const multiplier = investmentAmount ? Number.parseFloat(investmentAmount) / 10000 : 1

  // Financial data
  const financialData = {
    revenue: {
      2020: 1200000,
      2021: 1450000,
      2022: 1850000,
      2023: 2350000,
      2024: 2950000,
    },
    expenses: {
      2020: 840000,
      2021: 980000,
      2022: 1200000,
      2023: 1480000,
      2024: 1780000,
    },
    profit: {
      2020: 360000,
      2021: 470000,
      2022: 650000,
      2023: 870000,
      2024: 1170000,
    },
    assets: {
      2020: 2500000,
      2021: 3200000,
      2022: 4100000,
      2023: 5300000,
      2024: 6800000,
    },
    liabilities: {
      2020: 1200000,
      2021: 1400000,
      2022: 1600000,
      2023: 1900000,
      2024: 2200000,
    },
    equity: {
      2020: 1300000,
      2021: 1800000,
      2022: 2500000,
      2023: 3400000,
      2024: 4600000,
    },
    cashFlow: {
      2020: 420000,
      2021: 550000,
      2022: 720000,
      2023: 950000,
      2024: 1250000,
    },
  }

  // Financial ratios
  const financialRatios = {
    profitMargin: {
      2020: 30.0,
      2021: 32.4,
      2022: 35.1,
      2023: 37.0,
      2024: 39.7,
    },
    roe: {
      2020: 27.7,
      2021: 26.1,
      2022: 26.0,
      2023: 25.6,
      2024: 25.4,
    },
    currentRatio: {
      2020: 1.8,
      2021: 2.1,
      2022: 2.3,
      2023: 2.5,
      2024: 2.7,
    },
    debtToEquity: {
      2020: 0.92,
      2021: 0.78,
      2022: 0.64,
      2023: 0.56,
      2024: 0.48,
    },
    assetTurnover: {
      2020: 0.48,
      2021: 0.45,
      2022: 0.45,
      2023: 0.44,
      2024: 0.43,
    },
  }

  // Industry comparison data
  const industryComparisonData = [
    { name: "Our Company", revenue: 2.95, profit: 1.17, growth: 25.5, margin: 39.7 },
    { name: "Industry Avg", revenue: 2.1, profit: 0.63, growth: 12.3, margin: 30.0 },
    { name: "Top Competitor", revenue: 3.8, profit: 1.33, growth: 18.7, margin: 35.0 },
  ]

  // Market share data
  const marketShareData = [
    { name: "Our Company", value: 18 },
    { name: "Competitor A", value: 22 },
    { name: "Competitor B", value: 15 },
    { name: "Competitor C", value: 12 },
    { name: "Others", value: 33 },
  ]

  // Investment performance data
  const investmentPerformanceData = [
    { year: 2020, investment: 100, value: 100 },
    { year: 2021, investment: 100, value: 115 },
    { year: 2022, investment: 100, value: 138 },
    { year: 2023, investment: 100, value: 172 },
    { year: 2024, investment: 100, value: 215 },
  ]

  // Quarterly data for the current year
  const quarterlyData = [
    { quarter: "Q1 2024", revenue: 680000, expenses: 422000, profit: 258000 },
    { quarter: "Q2 2024", revenue: 720000, expenses: 432000, profit: 288000 },
    { quarter: "Q3 2024", revenue: 760000, expenses: 456000, profit: 304000 },
    { quarter: "Q4 2024", revenue: 790000, expenses: 470000, profit: 320000 },
  ]

  // Monthly data
  const dynamicData = {
    monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => {
      const revenue = baseRevenue * (1 + i * 0.1) * multiplier
      const expenses = revenue * 0.6
      const profit = revenue - expenses
      return { month, revenue, expenses, profit }
    }),
    yearly: Object.keys(financialData.revenue).map((year) => {
      return {
        year,
        revenue: financialData.revenue[year],
        expenses: financialData.expenses[year],
        profit: financialData.profit[year],
        assets: financialData.assets[year],
        liabilities: financialData.liabilities[year],
        equity: financialData.equity[year],
        cashFlow: financialData.cashFlow[year],
      }
    }),
  }

  // Financial highlights
  const financialHighlights = [
    {
      metric: "Revenue Growth",
      value: "25.5%",
      trend: "up",
      description: "Year-over-year revenue growth exceeds industry average by 13.2%",
    },
    {
      metric: "Profit Margin",
      value: "39.7%",
      trend: "up",
      description: "Consistently improving margins due to operational efficiency",
    },
    {
      metric: "Return on Equity",
      value: "25.4%",
      trend: "stable",
      description: "Strong and stable returns for shareholders",
    },
    {
      metric: "Debt Reduction",
      value: "14.3%",
      trend: "up",
      description: "Significant reduction in debt-to-equity ratio over the past year",
    },
  ]

  // Cost breakdown data
  const costBreakdownData = [
    { name: "Production", value: 42 },
    { name: "R&D", value: 18 },
    { name: "Marketing", value: 22 },
    { name: "Admin", value: 12 },
    { name: "Other", value: 6 },
  ]

  // Future projections
  const projectionData = [
    { year: 2024, revenue: 2.95, profit: 1.17 },
    { year: 2025, revenue: 3.7, profit: 1.52 },
    { year: 2026, revenue: 4.6, profit: 1.93 },
    { year: 2027, revenue: 5.7, profit: 2.45 },
    { year: 2028, revenue: 7.1, profit: 3.12 },
  ]

  const COLORS = ["#42A5F5", "#66BB6A", "#FFA726", "#AB47BC", "#EC407A", "#7E57C2", "#26A69A"]

  const formatCurrency = (value) => {
    const millions = value / 1000000
    return `M${millions.toLocaleString("en-ZA", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`
  }

  const formatCurrencyMillions = (value) => `M${value.toLocaleString("en-ZA", { maximumFractionDigits: 1 })}`
  const formatPercent = (value) => `${value.toFixed(1)}%`
  const isMonthly = timePeriod === "monthly"
  const xAxisKey = isMonthly ? "month" : "year"
  const currentData = dynamicData[timePeriod]

  const handleEstimateReturn = () => {
    const principal = Number.parseFloat(investmentAmount)
    const years = Number.parseInt(investmentYears)
    if (!isNaN(principal) && !isNaN(years)) {
      const futureValue = principal * Math.pow(1 + rate, years)
      setEstimatedReturn(futureValue.toFixed(2))
      setShowThankYou(true)
    }
  }

  // Calculate key financial metrics
  const calculateGrowth = (metric, currentYear, previousYear) => {
    const current = financialData[metric][currentYear]
    const previous = financialData[metric][previousYear]
    return ((current - previous) / previous) * 100
  }

  const generateAndDownloadProspectus = () => {
    // Create prospectus content
    const prospectusContent = `
INVESTOR PROSPECTUS
Company Financial Overview & Investment Opportunity

EXECUTIVE SUMMARY
================
Company Name: [Your Company Name]
Industry: Technology & Innovation
Founded: 2019
Headquarters: [Location]

FINANCIAL HIGHLIGHTS (2024)
===========================
• Revenue: M2.95 million (+25.5% YoY)
• Profit: M1.17 million (+34.5% YoY)
• Profit Margin: 39.7%
• Return on Equity: 25.4%
• Debt-to-Equity Ratio: 0.48 (Improving)

5-YEAR FINANCIAL PERFORMANCE
============================
Year    Revenue    Profit     Growth
2020    M1.20      M0.36      -
2021    M1.45      M0.47      20.8%
2022    M1.85      M0.65      27.6%
2023    M2.35      M0.87      27.0%
2024    M2.95      M1.17      25.5%

MARKET POSITION
===============
• Market Share: 18% (up from 12% in 2021)
• Industry Ranking: #3 by revenue, #1 by growth rate
• Geographic Presence: 3 regional markets
• Competitive Advantage: Innovation & operational efficiency

INVESTMENT OPPORTUNITIES
========================
1. Common Stock
   - Minimum Investment: M10,000
   - Expected Return: 12-15% annually
   - Risk Level: Medium
   - Term: Open-ended

2. Preferred Shares
   - Minimum Investment: M50,000
   - Expected Return: 8-10% annually
   - Risk Level: Low
   - Term: Open-ended

3. Growth Fund
   - Minimum Investment: M25,000
   - Expected Return: 10-18% annually
   - Risk Level: Medium-High
   - Term: 3-5 years

4. Expansion Bond
   - Minimum Investment: M100,000
   - Expected Return: 7.5% fixed
   - Risk Level: Low
   - Term: 5 years

FINANCIAL PROJECTIONS (2025-2028)
==================================
2025: Revenue M3.7M, Profit M1.52M
2026: Revenue M4.6M, Profit M1.93M
2027: Revenue M5.7M, Profit M2.45M
2028: Revenue M7.1M, Profit M3.12M

KEY FINANCIAL RATIOS
====================
• Current Ratio: 2.7 (Excellent liquidity)
• Asset Turnover: 0.43 (Efficient asset utilization)
• Profit Margin Trend: Consistently improving (30% → 39.7%)
• ROE: Stable at 25%+ (Excellent shareholder returns)

RISK FACTORS
============
• Market competition from larger players
• Economic downturns affecting demand
• Technology disruption risks
• Regulatory changes in the industry

INVESTOR BENEFITS
=================
• Quarterly dividend payments
• Voting rights on major decisions
• Access to exclusive investor events
• Detailed quarterly and annual reports
• Dedicated investor relations support
• Early access to new products/services

MANAGEMENT TEAM
===============
• Experienced leadership with proven track record
• Strong focus on innovation and growth
• Commitment to shareholder value creation
• Transparent communication and governance

CONTACT INFORMATION
===================
Investor Relations Department
Email: investors@company.com
Phone: +27 (0) 11 123 4567
Address: [Company Address]

DISCLAIMER
==========
This prospectus contains forward-looking statements based on current expectations. 
Actual results may differ materially. Past performance does not guarantee future results. 
All investments carry risk of loss. Please consult with financial advisors before investing.

Generated on: ${new Date().toLocaleDateString()}
Document Version: 2024.1
  `.trim()

    // Create and download the file
    const blob = new Blob([prospectusContent], { type: "text/plain;charset=utf-8" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `Investor_Prospectus_${new Date().getFullYear()}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    // Show success message
    setShowThankYou(true)
  }

  const latestYear = "2024"
  const previousYear = "2023"
  const revenueGrowth = calculateGrowth("revenue", latestYear, previousYear)
  const profitGrowth = calculateGrowth("profit", latestYear, previousYear)
  const equityGrowth = calculateGrowth("equity", latestYear, previousYear)

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        p: 4,
        background: "linear-gradient(to bottom right, #f0f4ff, #e3f2fd)",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1200 }}>
        <Typography variant="h3" gutterBottom sx={{ textAlign: "center", color: "#1976d2" }}>
          <AccountBalance fontSize="large" sx={{ verticalAlign: "middle", mr: 1 }} />
          Investor Financial Analytics
        </Typography>

        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          centered
          sx={{ mb: 3 }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Financial Overview" icon={<Description />} />
          <Tab label="Performance Metrics" icon={<Equalizer />} />
          <Tab label="Market Analysis" icon={<ShowChart />} />
          <Tab label="Investment Calculator" icon={<MonetizationOn />} />
        </Tabs>

        {/* Financial Overview Tab */}
        {activeTab === 0 && (
          <Box>
            {/* Financial Highlights Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {financialHighlights.map((highlight, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      bgcolor: "#ffffff",
                      borderTop: "4px solid",
                      borderColor:
                        highlight.trend === "up" ? "#4caf50" : highlight.trend === "down" ? "#f44336" : "#2196f3",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography variant="subtitle1" color="text.secondary">
                        {highlight.metric}
                      </Typography>
                      {highlight.trend === "up" ? (
                        <ArrowUpward fontSize="small" color="success" />
                      ) : highlight.trend === "down" ? (
                        <ArrowDownward fontSize="small" color="error" />
                      ) : (
                        <TrendingUp fontSize="small" color="primary" />
                      )}
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {highlight.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: "auto" }}>
                      {highlight.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Financial Statements */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h5">Financial Performance</Typography>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Time Period</InputLabel>
                  <Select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} label="Time Period">
                    <MenuItem value="monthly">Monthly (Current Year)</MenuItem>
                    <MenuItem value="yearly">Annual (5-Year Trend)</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xAxisKey} />
                  <YAxis yAxisId="left" tickFormatter={formatCurrency} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={formatCurrency} />
                  <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill="#42A5F5" name="Revenue" />
                  <Bar yAxisId="left" dataKey="expenses" fill="#EC407A" name="Expenses" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="profit"
                    stroke="#4CAF50"
                    strokeWidth={3}
                    name="Profit"
                    dot={{ r: 5 }}
                  />
                  {!isMonthly && (
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="cashFlow"
                      stroke="#FFA726"
                      strokeWidth={3}
                      name="Cash Flow"
                      dot={{ r: 5 }}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>

              {!isMonthly && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Balance Sheet Overview
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={currentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={xAxisKey} />
                      <YAxis tickFormatter={formatCurrency} />
                      <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Bar dataKey="assets" fill="#42A5F5" name="Assets" />
                      <Bar dataKey="liabilities" fill="#EC407A" name="Liabilities" />
                      <Bar dataKey="equity" fill="#66BB6A" name="Equity" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              )}
            </Paper>

            {/* Quarterly Results */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Quarterly Results (2024)
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Quarter</TableCell>
                      <TableCell align="right">Revenue</TableCell>
                      <TableCell align="right">Expenses</TableCell>
                      <TableCell align="right">Profit</TableCell>
                      <TableCell align="right">Margin</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {quarterlyData.map((row) => (
                      <TableRow key={row.quarter}>
                        <TableCell component="th" scope="row">
                          {row.quarter}
                        </TableCell>
                        <TableCell align="right">{formatCurrency(row.revenue)}</TableCell>
                        <TableCell align="right">{formatCurrency(row.expenses)}</TableCell>
                        <TableCell align="right">{formatCurrency(row.profit)}</TableCell>
                        <TableCell align="right">{formatPercent((row.profit / row.revenue) * 100)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Future Projections */}
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h5">5-Year Projections</Typography>
                <Chip icon={<Info />} label="Based on current growth trends" variant="outlined" color="primary" />
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={formatCurrencyMillions} />
                  <RechartsTooltip formatter={(value) => formatCurrencyMillions(value)} />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stackId="1" stroke="#8884d8" fill="#8884d8" name="Revenue" />
                  <Area type="monotone" dataKey="profit" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Profit" />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Box>
        )}

        {/* Performance Metrics Tab */}
        {activeTab === 1 && (
          <Box>
            {/* Key Financial Ratios */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Key Financial Ratios
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Profitability
                  </Typography>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart
                      data={Object.keys(financialRatios.profitMargin).map((year) => ({
                        year,
                        "Profit Margin": financialRatios.profitMargin[year],
                        "Return on Equity": financialRatios.roe[year],
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <RechartsTooltip formatter={(value) => `${value.toFixed(1)}%`} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Profit Margin"
                        stroke="#8884d8"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Return on Equity"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Financial Health
                  </Typography>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart
                      data={Object.keys(financialRatios.currentRatio).map((year) => ({
                        year,
                        "Current Ratio": financialRatios.currentRatio[year],
                        "Debt to Equity": financialRatios.debtToEquity[year],
                        "Asset Turnover": financialRatios.assetTurnover[year],
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <RechartsTooltip formatter={(value) => value.toFixed(2)} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Current Ratio"
                        stroke="#8884d8"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Debt to Equity"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Asset Turnover"
                        stroke="#ffc658"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Grid>
              </Grid>
            </Paper>

            {/* Growth Metrics */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Year-over-Year Growth
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        {
                          name: "Revenue",
                          growth: revenueGrowth,
                          industry: 12.3,
                        },
                        {
                          name: "Profit",
                          growth: profitGrowth,
                          industry: 10.5,
                        },
                        {
                          name: "Equity",
                          growth: equityGrowth,
                          industry: 8.7,
                        },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <RechartsTooltip formatter={(value) => `${value.toFixed(1)}%`} />
                      <Legend />
                      <Bar dataKey="growth" name="Our Growth" fill="#4CAF50" />
                      <Bar dataKey="industry" name="Industry Average" fill="#90CAF9" />
                    </BarChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid item xs={12} md={4}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingUp color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Revenue Growth: ${revenueGrowth.toFixed(1)}%`}
                        secondary="Exceeding industry average by 13.2%"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingUp color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Profit Growth: ${profitGrowth.toFixed(1)}%`}
                        secondary="Exceeding industry average by 24.5%"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingUp color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Equity Growth: ${equityGrowth.toFixed(1)}%`}
                        secondary="Exceeding industry average by 26.3%"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Consistent Growth"
                        secondary="5 consecutive years of double-digit growth"
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Paper>

            {/* Cost Structure */}
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Cost Structure Analysis
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={costBreakdownData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        dataKey="value"
                      >
                        {costBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Cost Efficiency Highlights
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="R&D Investment"
                        secondary="18% of costs allocated to R&D, driving innovation and future growth"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Production Efficiency"
                        secondary="3.5% improvement in production costs through automation"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Marketing ROI"
                        secondary="22% of costs with 2.8x return on marketing investment"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Administrative Efficiency"
                        secondary="Administrative costs reduced to 12% through digital transformation"
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        )}

        {/* Market Analysis Tab */}
        {activeTab === 2 && (
          <Box>
            {/* Industry Comparison */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h5">Industry Comparison</Typography>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Metric</InputLabel>
                  <Select value={comparisonMetric} onChange={(e) => setComparisonMetric(e.target.value)} label="Metric">
                    <MenuItem value="revenue">Revenue</MenuItem>
                    <MenuItem value="profit">Profit</MenuItem>
                    <MenuItem value="growth">Growth Rate</MenuItem>
                    <MenuItem value="margin">Profit Margin</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={industryComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    tickFormatter={
                      comparisonMetric === "revenue" || comparisonMetric === "profit"
                        ? formatCurrencyMillions
                        : (value) => `${value}%`
                    }
                  />
                  <RechartsTooltip
                    formatter={(value) =>
                      comparisonMetric === "revenue" || comparisonMetric === "profit"
                        ? formatCurrencyMillions(value)
                        : `${value}%`
                    }
                  />
                  <Legend />
                  <Bar
                    dataKey={comparisonMetric}
                    fill="#8884d8"
                    name={comparisonMetric.charAt(0).toUpperCase() + comparisonMetric.slice(1)}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Paper>

            {/* Market Share */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Market Share Analysis
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={marketShareData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        dataKey="value"
                      >
                        {marketShareData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Market Position Highlights
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingUp color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Growing Market Share"
                        secondary="Increased from 12% to 18% over the past 3 years"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Business color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Strategic Positioning"
                        secondary="Third largest player with fastest growth rate"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Market Expansion"
                        secondary="Successfully entered 3 new regional markets"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Warning color="warning" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Competitive Threat"
                        secondary="Competitor A maintains largest market share but with slowing growth"
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Paper>

            {/* Investment Performance */}
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Investment Performance
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={investmentPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `${value}%`} domain={[0, 250]} />
                  <RechartsTooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="investment"
                    stroke="#8884d8"
                    name="Initial Investment (Indexed)"
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#82ca9d"
                    strokeWidth={3}
                    name="Investment Value"
                    dot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <Box sx={{ mt: 2 }}>
                <Alert severity="success">
                  <Typography variant="subtitle1">5-Year Return: 115%</Typography>
                  <Typography variant="body2">
                    M100,000 invested in 2020 would be worth approximately M215,000 today, representing a compound
                    annual growth rate (CAGR) of 16.5%
                  </Typography>
                </Alert>
              </Box>
            </Paper>
          </Box>
        )}

        {/* Investment Calculator Tab */}
        {activeTab === 3 && (
          <Box>
            {/* Investment Calculator */}
            <Paper elevation={4} sx={{ p: 4, mb: 4, backgroundColor: "#ffffffdd" }}>
              <Typography variant="h5" gutterBottom sx={{ color: "#424242" }}>
                Investment Calculator
              </Typography>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", alignItems: "center" }}>
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
                  Calculate Return
                </Button>
              </Box>
              {estimatedReturn && (
                <Box sx={{ mt: 3, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
                  <Typography variant="h6">
                    Estimated Value after {investmentYears} years:{" "}
                    <strong>{formatCurrencyMillions(estimatedReturn)}</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Expected annual return rate: {(rate * 100).toFixed(1)}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Based on our historical performance and projected growth
                  </Typography>
                </Box>
              )}
              {showThankYou && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">🎉 Thank you for your interest in investing!</Typography>
                  <Typography variant="body2">
                    Our investor relations team will contact you with detailed information about investment
                    opportunities. You can also download our complete investor prospectus below.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="success"
                    startIcon={<Download />}
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={generateAndDownloadProspectus}
                  >
                    Download Investor Prospectus
                  </Button>
                </Alert>
              )}
            </Paper>

            {/* Investment Opportunities */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Investment Opportunities
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Investment Type</TableCell>
                      <TableCell>Minimum Amount</TableCell>
                      <TableCell>Expected Return</TableCell>
                      <TableCell>Risk Level</TableCell>
                      <TableCell>Term</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Common Stock</TableCell>
                      <TableCell>M10,000</TableCell>
                      <TableCell>12-15% annually</TableCell>
                      <TableCell>
                        <Chip label="Medium" color="primary" size="small" />
                      </TableCell>
                      <TableCell>Open-ended</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Preferred Shares</TableCell>
                      <TableCell>M50,000</TableCell>
                      <TableCell>8-10% annually</TableCell>
                      <TableCell>
                        <Chip label="Low" color="success" size="small" />
                      </TableCell>
                      <TableCell>Open-ended</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Growth Fund</TableCell>
                      <TableCell>M25,000</TableCell>
                      <TableCell>10-18% annually</TableCell>
                      <TableCell>
                        <Chip label="Medium-High" color="warning" size="small" />
                      </TableCell>
                      <TableCell>3-5 years</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Expansion Bond</TableCell>
                      <TableCell>M100,000</TableCell>
                      <TableCell>7.5% fixed</TableCell>
                      <TableCell>
                        <Chip label="Low" color="success" size="small" />
                      </TableCell>
                      <TableCell>5 years</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Investor Benefits */}
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Investor Benefits
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Quarterly Dividends" secondary="Regular income from your investment" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Voting Rights" secondary="Have your say in major company decisions" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Exclusive Events"
                        secondary="Access to investor-only meetings and product launches"
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Detailed Reporting"
                        secondary="Comprehensive quarterly and annual reports"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Dedicated Support"
                        secondary="Personal investor relations representative"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Early Access"
                        secondary="Preview new products and services before public release"
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default InvestorDashboard
