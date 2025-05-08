import React, { useState } from "react";
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
  Paper,
  Chip,
} from "@mui/material";
import { Add, Download, TrendingUp, MoneyOff } from "@mui/icons-material";

const FinanceDashboard = () => {
  const [financeData, setFinanceData] = useState([
    {
      id: 1,
      date: "2024-01-01",
      category: "Revenue",
      amount: 2.5,
      type: "income",
    },
    {
      id: 2,
      date: "2024-01-15",
      category: "Marketing",
      amount: 0.8,
      type: "expense",
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEntry, setNewEntry] = useState({
    id: null,
    date: "",
    category: "",
    amount: "",
    type: "income",
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleDialogOpen = (entry = null) => {
    if (entry) {
      setNewEntry(entry);
      setIsEdit(true);
    } else {
      setNewEntry({ id: null, date: "", category: "", amount: "", type: "income" });
      setIsEdit(false);
    }
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setIsEdit(false);
  };

  const handleSave = () => {
    if (isEdit) {
      setFinanceData(prev =>
        prev.map(item => (item.id === newEntry.id ? newEntry : item))
      );
    } else {
      const newId = financeData.length > 0 ? Math.max(...financeData.map(i => i.id)) + 1 : 1;
      setFinanceData(prev => [...prev, { ...newEntry, id: newId }]);
    }
    handleDialogClose();
  };

  const handleDelete = (id) => {
    setFinanceData(prev => prev.filter(item => item.id !== id));
  };

  const exportToCSV = () => {
    const csvHeader = ["Date", "Category", "Amount (M)", "Type"];
    const csvRows = financeData.map(item =>
      [item.date, item.category, item.amount, item.type].join(",")
    );
    const csvContent = [csvHeader.join(","), ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "finance_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Finance Dashboard</Typography>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleDialogOpen()}
        >
          Add Entry
        </Button>
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={exportToCSV}
        >
          Export CSV
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount (M)</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {financeData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.amount}M</TableCell>
                <TableCell>
                  <Chip
                    label={row.type}
                    color={row.type === "income" ? "success" : "error"}
                    icon={row.type === "income" ? <TrendingUp /> : <MoneyOff />}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleDialogOpen(row)}
                  >
                    Edit
                  </Button>
                  &nbsp;
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {financeData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{isEdit ? "Edit Entry" : "Add Entry"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Date"
            type="date"
            margin="dense"
            value={newEntry.date}
            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Category"
            margin="dense"
            value={newEntry.category}
            onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value })}
          />
          <TextField
            fullWidth
            label="Amount (in M)"
            type="number"
            margin="dense"
            value={newEntry.amount}
            onChange={(e) => setNewEntry({ ...newEntry, amount: parseFloat(e.target.value) })}
          />
          <TextField
            fullWidth
            label="Type"
            margin="dense"
            select
            SelectProps={{ native: true }}
            value={newEntry.type}
            onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {isEdit ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FinanceDashboard;
