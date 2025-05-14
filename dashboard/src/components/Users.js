import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import "../pages/Sidebar";


function Users() {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    middleName: '',
    username: '',
    password: '',
  });
  const [users, setUsers] = useState(null);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    axios.get('http://localhost:1337/users')
      .then(response => {
        console.log('Fetched users:', response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    axios.post('http://localhost:1337/users', formData)
      .then(() => {
        fetchUsers();
        setOpen(false);
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  }

  function handleEdit(index) {
    setFormData(users[index]);
    setCurrentIndex(index);
    setEditOpen(true);
  }

  function handleSaveEdit() {
    axios.put(`http://localhost:1337/users/${formData.id}`, formData)
      .then(() => {
        fetchUsers();
        setEditOpen(false);
      })
      .catch(error => {
        console.error('Error editing user:', error);
      });
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        User Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add User
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ backgroundColor: 'white', padding: 4, margin: '100px auto', maxWidth: 400, borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom>
            Add User
          </Typography>
          <TextField label="ID" name="id" value={formData.id} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Username" name="username" value={formData.username} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Password" name="password" value={formData.password} onChange={handleChange} type="password" fullWidth margin="normal" />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Modal>

      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box sx={{ backgroundColor: 'white', padding: 4, margin: '100px auto', maxWidth: 400, borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom>
            Edit User
          </Typography>
          <TextField label="ID" name="id" value={formData.id} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Username" name="username" value={formData.username} onChange={handleChange} fullWidth margin="normal" />
          <Button variant="contained" color="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Box>
      </Modal>

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Middle Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users ? (
              users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.middleName}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => handleEdit(index)}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: 'center' }}>No users available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Users;
