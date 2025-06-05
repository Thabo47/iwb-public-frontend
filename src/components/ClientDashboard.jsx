"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  Tabs,
  Tab,
  Badge,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Snackbar,
  Alert,
  CircularProgress,
  MenuItem,
  Avatar,
  Chip,
  Rating,
} from "@mui/material"
import {
  ShoppingCart,
  Computer,
  Support,
  History,
  Delete,
  CheckCircle,
  Payment,
  Add,
  Remove,
  Favorite,
  FavoriteBorder,
  Visibility,
} from "@mui/icons-material"
import axios from "axios"

const API_BASE_URL = "http://localhost:5000/api"

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

const Dashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState(null)
  const [orders, setOrders] = useState([])
  const [queries, setQueries] = useState([])
  const [newQuery, setNewQuery] = useState({ subject: "", message: "" })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    paymentMethod: "Credit Card",
  })
  const [favorites, setFavorites] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch products
        const productsRes = await api.get("/products")
        setProducts(productsRes.data)

        // Fetch cart
        const cartRes = await api.get("/cart")
        setCart(cartRes.data)

        // Fetch orders
        const ordersRes = await api.get("/orders")
        setOrders(ordersRes.data)

        // Fetch queries
        const queriesRes = await api.get("/queries")
        setQueries(queriesRes.data)

        setLoading(false)
      } catch (err) {
        setError("Failed to load dashboard data")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  // Add to cart
  const handleAddToCart = async (productId) => {
    try {
      const res = await api.post("/cart", {
        productId,
        quantity: 1,
      })
      setCart(res.data)
      setSuccess("Product added to cart!")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add to cart")
    }
  }

  // Update cart item quantity
  const updateCartItem = async (itemId, newQuantity) => {
    try {
      if (newQuantity < 1) return

      const res = await api.put(`/cart/${itemId}`, {
        quantity: newQuantity,
      })
      setCart(res.data)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update cart")
    }
  }

  // Remove from cart
  const handleRemoveFromCart = async (itemId) => {
    try {
      const res = await api.delete(`/cart/${itemId}`)
      setCart(res.data)
      setSuccess("Item removed from cart")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove item")
    }
  }

  // Handle query submission
  const handleQuerySubmit = async () => {
    try {
      if (!newQuery.subject || !newQuery.message) {
        setError("Please fill all fields")
        return
      }

      const res = await api.post("/queries", newQuery)

      setQueries([res.data, ...queries])
      setNewQuery({ subject: "", message: "" })
      setSuccess("Query submitted successfully!")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit query")
    }
  }

  // Place order with better error handling
  const handlePlaceOrder = async () => {
    try {
      // Validation checks
      if (!shippingInfo.address.trim()) {
        setError("Please enter a valid shipping address")
        return
      }

      if (!cart || !cart.items || cart.items.length === 0) {
        setError("Your cart is empty. Please add items before placing an order.")
        return
      }

      // Check if user is authenticated
      const token = localStorage.getItem("token")
      if (!token) {
        setError("Please log in to place an order")
        navigate("/login")
        return
      }

      setLoading(true)
      setError("")

      console.log("Placing order with:", {
        shippingAddress: shippingInfo.address,
        paymentMethod: shippingInfo.paymentMethod,
        cartItems: cart.items.length,
      })

      const res = await api.post("/orders", {
        shippingAddress: shippingInfo.address,
        paymentMethod: shippingInfo.paymentMethod,
      })

      console.log("Order placed successfully:", res.data)

      // Update local state
      setOrders([res.data, ...orders])

      // Clear cart
      const cartRes = await api.get("/cart")
      setCart(cartRes.data)

      // Clear shipping info
      setShippingInfo({
        address: "",
        paymentMethod: "Credit Card",
      })

      setSuccess("Order placed successfully! Check your orders tab for details.")
      setActiveTab(2) // Switch to Orders tab
    } catch (err) {
      console.error("Order placement error:", err)

      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.")
        localStorage.removeItem("token")
        navigate("/login")
      } else if (err.response?.status === 400) {
        setError(err.response.data.message || "Invalid order data. Please check your cart and try again.")
      } else {
        setError(err.response?.data?.message || "Failed to place order. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  // Calculate cart total with better error handling
  const calculateCartTotal = () => {
    if (!cart || !cart.items || cart.items.length === 0) return 0

    return cart.items.reduce((total, item) => {
      if (item && item.product && typeof item.product.price === "number" && typeof item.quantity === "number") {
        return total + item.product.price * item.quantity
      }
      return total
    }, 0)
  }

  // Close alerts
  const handleCloseAlert = () => {
    setError("")
    setSuccess("")
  }

  // Toggle favorite
  const toggleFavorite = (productId) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Get unique categories
  const categories = ["all", ...new Set(products.map((p) => p.category))]

  // Render product cards
  const renderProducts = () => (
    <Box>
      {/* Search and Filter Controls */}
      <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <TextField
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 200 }}
        />
        <TextField
          select
          label="Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category === "all" ? "All Categories" : category}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imageUrl || "/placeholder.svg?height=200&width=300"}
                  alt={product.name}
                  sx={{ objectFit: "contain", p: 1 }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "background.paper",
                    "&:hover": { bgcolor: "background.paper" },
                  }}
                  onClick={() => toggleFavorite(product._id)}
                >
                  {favorites.includes(product._id) ? <Favorite color="error" /> : <FavoriteBorder />}
                </IconButton>
                <Chip
                  label={product.category}
                  size="small"
                  color="primary"
                  sx={{ position: "absolute", top: 8, left: 8 }}
                />
              </Box>

              <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                  {product.description}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Visibility fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {product.viewCount || 0}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Chip
                    label={product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                    size="small"
                    color={product.stock > 0 ? "success" : "error"}
                    variant="outlined"
                  />
                  <Rating value={4.5} precision={0.5} size="small" readOnly />
                </Box>
              </CardContent>

              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={product.stock === 0}
                  onClick={() => handleAddToCart(product._id)}
                  startIcon={<ShoppingCart />}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Computer sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filter criteria
          </Typography>
        </Box>
      )}
    </Box>
  )

  // Render cart
  const renderCart = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        {/* Debug info - remove in production */}
        {process.env.NODE_ENV === "development" && (
          <Box sx={{ mb: 2, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
            <Typography variant="caption">
              Debug: Cart items: {cart?.items?.length || 0}, Total: ${calculateCartTotal().toFixed(2)}, Token:{" "}
              {localStorage.getItem("token") ? "Present" : "Missing"}
            </Typography>
          </Box>
        )}
        {cart && cart.items && cart.items.length > 0 ? (
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "background.default" }}>
                  <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Price
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Quantity
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Total
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item._id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar src={item.product?.imageUrl} sx={{ mr: 2, width: 50, height: 50 }} variant="rounded">
                          <Computer />
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {item.product?.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.product?.category}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        ${item.product?.price?.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IconButton
                          size="small"
                          onClick={() => updateCartItem(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Remove />
                        </IconButton>
                        <Typography variant="body1" sx={{ mx: 2, minWidth: 20, textAlign: "center" }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => updateCartItem(item._id, item.quantity + 1)}
                          disabled={item.quantity >= item.product?.stock}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        ${(item.product?.price * item.quantity).toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleRemoveFromCart(item._id)} color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Card sx={{ textAlign: "center", p: 6 }}>
            <ShoppingCart sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Browse our products and add items to your cart
            </Typography>
            <Button variant="contained" onClick={() => setActiveTab(0)} startIcon={<Computer />}>
              Browse Products
            </Button>
          </Card>
        )}
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <List sx={{ py: 0 }}>
              {cart &&
                cart.items &&
                cart.items.map((item) => (
                  <ListItem key={item._id} sx={{ py: 1, px: 0 }}>
                    <ListItemText
                      primary={`${item.product?.name} × ${item.quantity}`}
                      secondary={item.product?.category}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ${(item.product?.price * item.quantity).toFixed(2)}
                    </Typography>
                  </ListItem>
                ))}

              <Divider sx={{ my: 2 }} />

              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Subtotal" />
                <Typography variant="body1">${calculateCartTotal().toFixed(2)}</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Shipping" />
                <Typography variant="body1">Free</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Tax" />
                <Typography variant="body1">$0.00</Typography>
              </ListItem>

              <Divider sx={{ my: 2 }} />

              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Total
                    </Typography>
                  }
                />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  ${calculateCartTotal().toFixed(2)}
                </Typography>
              </ListItem>
            </List>

            <TextField
              fullWidth
              label="Shipping Address"
              value={shippingInfo.address}
              onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
              margin="normal"
              required
              multiline
              rows={3}
              sx={{ mb: 2 }}
              error={!shippingInfo.address.trim() && shippingInfo.address !== ""}
              helperText={
                !shippingInfo.address.trim() && shippingInfo.address !== "" ? "Shipping address is required" : ""
              }
              placeholder="Enter your complete shipping address including street, city, state, and ZIP code"
            />

            <TextField
              select
              fullWidth
              label="Payment Method"
              value={shippingInfo.paymentMethod}
              onChange={(e) => setShippingInfo({ ...shippingInfo, paymentMethod: e.target.value })}
              margin="normal"
              required
              sx={{ mb: 3 }}
            >
              {["Credit Card", "PayPal", "Bank Transfer"].map((method) => (
                <MenuItem key={method} value={method}>
                  {method}
                </MenuItem>
              ))}
            </TextField>

            <Button
              fullWidth
              variant="contained"
              size="large"
              disabled={loading || !cart || !cart.items || cart.items.length === 0 || !shippingInfo.address.trim()}
              onClick={handlePlaceOrder}
              startIcon={loading ? <CircularProgress size={20} /> : <Payment />}
              sx={{
                borderRadius: 2,
                py: 1.5,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )

  // Render orders
  const renderOrders = () => (
    <Box>
      {orders.length > 0 ? (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "background.default" }}>
                <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Items</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  Total
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                      #{order._id.substring(0, 8)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{new Date(order.createdAt).toLocaleDateString()}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      {order.items.slice(0, 2).map((item, idx) => (
                        <Typography key={idx} variant="body2">
                          {item.product?.name} × {item.quantity}
                        </Typography>
                      ))}
                      {order.items.length > 2 && (
                        <Typography variant="body2" color="text.secondary">
                          +{order.items.length - 2} more items
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      ${order.totalAmount.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      size="small"
                      color={
                        order.status === "Delivered"
                          ? "success"
                          : order.status === "Cancelled"
                            ? "error"
                            : order.status === "Shipped"
                              ? "info"
                              : "warning"
                      }
                      icon={order.status === "Delivered" ? <CheckCircle /> : undefined}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Card sx={{ textAlign: "center", p: 6 }}>
          <History sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No orders yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            When you place orders, they will appear here
          </Typography>
          <Button variant="contained" onClick={() => setActiveTab(0)} startIcon={<Computer />}>
            Browse Products
          </Button>
        </Card>
      )}
    </Box>
  )

  // Render queries
  const renderQueries = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
        <Card sx={{ mb: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Submit a New Query
            </Typography>
            <TextField
              fullWidth
              label="Subject"
              value={newQuery.subject}
              onChange={(e) => setNewQuery({ ...newQuery, subject: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Message"
              value={newQuery.message}
              onChange={(e) => setNewQuery({ ...newQuery, message: e.target.value })}
              margin="normal"
              required
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              onClick={handleQuerySubmit}
              sx={{ mt: 2 }}
              startIcon={<Support />}
              disabled={!newQuery.subject || !newQuery.message}
            >
              Submit Query
            </Button>
          </CardContent>
        </Card>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Your Recent Queries
        </Typography>

        {queries.length === 0 ? (
          <Card sx={{ textAlign: "center", p: 4 }}>
            <Support sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No queries submitted yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Submit your first query using the form above
            </Typography>
          </Card>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {queries.map((query) => (
              <Card key={query._id} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {query.subject}
                    </Typography>
                    <Chip
                      label={query.status}
                      size="small"
                      color={
                        query.status === "Resolved" ? "success" : query.status === "In Progress" ? "warning" : "info"
                      }
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {new Date(query.createdAt).toLocaleString()}
                  </Typography>

                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {query.message}
                  </Typography>

                  {query.response && (
                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        bgcolor: "success.light",
                        borderRadius: 1,
                        border: "1px solid",
                        borderColor: "success.main",
                      }}
                    >
                      <Typography variant="subtitle2" color="success.dark" sx={{ fontWeight: 600, mb: 1 }}>
                        Response from Support:
                      </Typography>
                      <Typography variant="body1">{query.response}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                        {new Date(query.updatedAt).toLocaleString()}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Grid>

      <Grid item xs={12} md={5}>
        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Support Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="body1" paragraph>
              Our support team is available to help you with any questions or issues you may have.
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Business Hours:
              </Typography>
              <Typography variant="body2">Monday-Friday: 9AM - 6PM (EST)</Typography>
              <Typography variant="body2">Saturday: 10AM - 4PM (EST)</Typography>
              <Typography variant="body2">Sunday: Closed</Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Contact:
              </Typography>
              <Typography variant="body2">Email: support@techstore.com</Typography>
              <Typography variant="body2">Phone: +1 (800) 123-4567</Typography>
            </Box>

            <Box sx={{ p: 2, bgcolor: "info.light", borderRadius: 1 }}>
              <Typography variant="body2" color="info.dark">
                <strong>Average response time:</strong> 24-48 hours
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Client Dashboard
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            localStorage.removeItem("token")
            navigate("/login")
          }}
        >
          Logout
        </Button>
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
      >
        <Tab
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Computer />
              Products
            </Box>
          }
        />
        <Tab
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Badge badgeContent={cart?.items?.length || 0} color="primary">
                <ShoppingCart />
              </Badge>
              Shopping Cart
            </Box>
          }
        />
        <Tab
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <History />
              Orders
            </Box>
          }
        />
        <Tab
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Badge badgeContent={queries.filter((q) => q.status !== "Resolved").length} color="error">
                <Support />
              </Badge>
              Support
            </Box>
          }
        />
      </Tabs>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <>
          {activeTab === 0 && renderProducts()}
          {activeTab === 1 && renderCart()}
          {activeTab === 2 && renderOrders()}
          {activeTab === 3 && renderQueries()}
        </>
      )}

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={!!success} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Dashboard
