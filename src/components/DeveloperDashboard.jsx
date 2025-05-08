import React, { useState } from 'react';
import {
  Box, Typography, Tabs, Tab, Button, TextField, Dialog,
  DialogActions, DialogContent, DialogTitle, Menu, MenuItem,
  List, ListItem, ListItemText, Divider, Paper, IconButton,
  Tooltip, Select, FormControl, InputLabel, Snackbar, Alert,
  Chip
} from '@mui/material';
import {
  Code, Folder, Settings, CloudUpload, CloudDownload,
  Description, Refresh, Delete, Visibility, Edit,
  Add
} from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';


const DeveloperDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [files, setFiles] = useState([
    { id: 1, name: 'config.json', type: 'json', content: '{\n  "appName": "MyApp",\n  "version": "1.0.0",\n  "apiEndpoint": "https://api.example.com"\n}' },
    { id: 2, name: 'settings.yaml', type: 'yaml', content: 'app:\n  name: MyApp\n  version: 1.0.0\n  debug: false\napi:\n  endpoint: https://api.example.com\n  timeout: 30' },
    { id: 3, name: 'environment.prod', type: 'env', content: 'API_KEY=production_key\nDB_HOST=prod-db.example.com\nCACHE_ENABLED=true' }
  ]);
  const [logs, setLogs] = useState([
    { id: 1, timestamp: '2023-05-15 10:30:22', type: 'error', message: 'Failed to connect to database', source: 'DB Service' },
    { id: 2, timestamp: '2023-05-15 10:31:45', type: 'info', message: 'API server started on port 3000', source: 'API Service' },
    { id: 3, timestamp: '2023-05-15 10:32:10', type: 'warning', message: 'Cache size approaching limit', source: 'Cache Service' },
    { id: 4, timestamp: '2023-05-15 10:35:18', type: 'error', message: 'Invalid API key provided', source: 'Auth Service' },
  ]);
  const [openFileDialog, setOpenFileDialog] = useState(false);
  const [openLogsDialog, setOpenLogsDialog] = useState(false);
  const [currentFile, setCurrentFile] = useState({ id: null, name: '', type: 'json', content: '' });
  const [selectedLog, setSelectedLog] = useState(null);
  const [fileAnchorEl, setFileAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [logFilter, setLogFilter] = useState('all');
  const [uploadFile, setUploadFile] = useState(null);

  const fileTypes = ['json', 'yaml', 'env', 'txt', 'js', 'ts'];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFileClick = (file) => {
    setCurrentFile(file);
    setOpenFileDialog(true);
  };

  const handleFileMenuClick = (event) => {
    setFileAnchorEl(event.currentTarget);
  };

  const handleFileMenuClose = () => {
    setFileAnchorEl(null);
  };

  const handleCreateNewFile = (type) => {
    setCurrentFile({ id: null, name: `newfile.${type}`, type, content: '' });
    setOpenFileDialog(true);
    setFileAnchorEl(null);
  };

  const handleSaveFile = () => {
    if (currentFile.id) {
      setFiles(files.map(file => file.id === currentFile.id ? currentFile : file));
    } else {
      const newId = Math.max(...files.map(f => f.id), 0) + 1;
      setFiles([...files, { ...currentFile, id: newId }]);
    }
    setOpenFileDialog(false);
    showSnackbar('File saved successfully', 'success');
  };

  const handleDeleteFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
    showSnackbar('File deleted successfully', 'success');
  };

  const handleLogClick = (log) => {
    setSelectedLog(log);
    setOpenLogsDialog(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const extension = file.name.split('.').pop();
        const newFile = {
          id: Math.max(...files.map(f => f.id), 0) + 1,
          name: file.name,
          type: fileTypes.includes(extension) ? extension : 'txt',
          content: event.target.result
        };
        setFiles([...files, newFile]);
        showSnackbar('File uploaded successfully', 'success');
      };
      reader.readAsText(file);
    }
  };

  const handleDownloadFile = (file) => {
    const blob = new Blob([file.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showSnackbar('Download started', 'info');
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const filteredLogs = logFilter === 'all' 
    ? logs 
    : logs.filter(log => log.type === logFilter);

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <Code fontSize="large" sx={{ mr: 1 }} /> Developer Dashboard
      </Typography>
      
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Configuration Files" icon={<Settings />} />
        <Tab label="Logs Viewer" icon={<Description />} />
        <Tab label="File Operations" icon={<Folder />} />
      </Tabs>
      
      <Box sx={{ p: 2 }}>
        {activeTab === 0 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Application Configuration Files</Typography>
              <Box>
                <Button 
                  variant="contained" 
                  startIcon={<Add />} 
                  onClick={handleFileMenuClick}
                >
                  New File
                </Button>
                <Menu
                  anchorEl={fileAnchorEl}
                  open={Boolean(fileAnchorEl)}
                  onClose={handleFileMenuClose}
                >
                  {fileTypes.map(type => (
                    <MenuItem key={type} onClick={() => handleCreateNewFile(type)}>
                      .{type.toUpperCase()}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
            
            <Paper elevation={2} sx={{ p: 2 }}>
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
                      <ListItemText 
                        primary={file.name} 
                        secondary={`Type: ${file.type.toUpperCase()}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Box>
        )}
        
        {activeTab === 1 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Application Logs</Typography>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel>Filter</InputLabel>
                <Select
                  value={logFilter}
                  label="Filter"
                  onChange={(e) => setLogFilter(e.target.value)}
                >
                  <MenuItem value="all">All Logs</MenuItem>
                  <MenuItem value="error">Errors</MenuItem>
                  <MenuItem value="warning">Warnings</MenuItem>
                  <MenuItem value="info">Info</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Paper elevation={2}>
              <List sx={{ maxHeight: 500, overflow: 'auto' }}>
                {filteredLogs.map((log) => (
                  <React.Fragment key={log.id}>
                    <ListItem
                      onClick={() => handleLogClick(log)}
                      sx={{
                        cursor: 'pointer',
                        bgcolor: log.type === 'error' ? '#ffebee' : 
                                log.type === 'warning' ? '#fff8e1' : 'inherit'
                      }}
                    >
                      <ListItemText
                        primary={log.message}
                        secondary={`${log.timestamp} • ${log.source}`}
                        primaryTypographyProps={{
                          color: log.type === 'error' ? 'error' : 
                                log.type === 'warning' ? 'warning.dark' : 'text.primary'
                        }}
                      />
                      <IconButton edge="end">
                        <Visibility />
                      </IconButton>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Box>
        )}
        
        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              File Operations
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
              <Paper elevation={2} sx={{ p: 3, flex: 1 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <CloudUpload sx={{ mr: 1 }} /> Upload Files
                </Typography>
                <input
                  accept=".json,.yaml,.env,.txt,.js,.ts"
                  style={{ display: 'none' }}
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
              
              <Paper elevation={2} sx={{ p: 3, flex: 1 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <CloudDownload sx={{ mr: 1 }} /> Download Files
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Download configuration files for deployment
                </Typography>
                <Button 
                  variant="outlined" 
                  startIcon={<CloudDownload />}
                  onClick={() => {
                    const zipContent = files.map(f => `${f.name}:\n${f.content}`).join('\n\n');
                    handleDownloadFile({ name: 'config-bundle.txt', content: zipContent });
                  }}
                >
                  Download All as Bundle
                </Button>
              </Paper>
            </Box>
            
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Refresh sx={{ mr: 1 }} /> Recent Files
            </Typography>
            <Paper elevation={2} sx={{ p: 2 }}>
              <List>
                {files.slice(0, 3).map((file) => (
                  <React.Fragment key={file.id}>
                    <ListItem
                      secondaryAction={
                        <Button 
                          size="small" 
                          startIcon={<CloudDownload />}
                          onClick={() => handleDownloadFile(file)}
                        >
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
        <DialogTitle>
          {currentFile.id ? `Editing ${currentFile.name}` : 'Create New File'}
        </DialogTitle>
        <DialogContent sx={{ height: '60vh' }}>
          <TextField
            fullWidth
            label="File Name"
            value={currentFile.name}
            onChange={(e) => setCurrentFile({...currentFile, name: e.target.value})}
            sx={{ mb: 2 }}
          />
          <Typography variant="subtitle2" gutterBottom>
            File Content:
          </Typography>
          <Box sx={{ 
            border: '1px solid #ddd', 
            borderRadius: 1, 
            overflow: 'auto',
            height: 'calc(100% - 40px)'
          }}>
            <SyntaxHighlighter
              language={currentFile.type}
              style={nightOwl}
              wrapLines
              showLineNumbers
              lineNumberStyle={{ color: '#ddd', marginRight: '1em' }}
            >
              {currentFile.content}
            </SyntaxHighlighter>
            <TextField
              fullWidth
              multiline
              minRows={10}
              value={currentFile.content}
              onChange={(e) => setCurrentFile({...currentFile, content: e.target.value})}
              sx={{ 
                fontFamily: 'monospace',
                '& textarea': { fontFamily: 'monospace !important' }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFileDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveFile}>Save</Button>
        </DialogActions>
      </Dialog>
      
      {/* Log Details Dialog */}
      <Dialog open={openLogsDialog} onClose={() => setOpenLogsDialog(false)}>
        <DialogTitle>Log Details</DialogTitle>
        <DialogContent>
          {selectedLog && (
            <Box sx={{ minWidth: 400 }}>
              <Typography variant="subtitle2" gutterBottom>Timestamp:</Typography>
              <Typography gutterBottom>{selectedLog.timestamp}</Typography>
              
              <Typography variant="subtitle2" gutterBottom>Type:</Typography>
              <Chip 
                label={selectedLog.type} 
                color={
                  selectedLog.type === 'error' ? 'error' : 
                  selectedLog.type === 'warning' ? 'warning' : 'info'
                }
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle2" gutterBottom>Source:</Typography>
              <Typography gutterBottom>{selectedLog.source}</Typography>
              
              <Typography variant="subtitle2" gutterBottom>Message:</Typography>
              <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <Typography fontFamily="monospace">{selectedLog.message}</Typography>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DeveloperDashboard;