import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { GenderEnum, MemberTypeEnum } from '../constant/enum';
import { utils, writeFile } from 'xlsx';


const Membership = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        fullName: '',
        address: '',
        dateOfBirth: '',
        gender: '',
        phone: '',
        email: '',
        membershipType: '',
        isDisabled: false,
    });
    const [editId, setEditId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/member/membership`);
            if (response.data.status === "success") {
                const updatedData = response.data.data.map((item, index) => ({
                    ...item,
                    Id: index + 1,
                    isDisabled: item.isDisabled || false,
                }));
                setData(updatedData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleEdit = (item) => {
        setForm({
            fullName: item.fullName,
            address: item.address,
            dateOfBirth: item.dateOfBirth,
            gender: item.gender,
            phone: item.phone,
            email: item.email,
            membershipType: item.membershipType,
            isDisabled: item.isDisabled,
        });
        setEditId(item.id);
        setIsFormVisible(true);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setOpenDialog(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/member/membership/${deleteId}`);
            if (response.data.status === "success") {
                setData(prevData => prevData.filter(item => item.id !== deleteId));
                setMessage('Member deleted successfully');
                setMessageType('success');
            } else {
                setMessage('Failed to delete member: ' + response.data.message);
                setMessageType('error');
            }
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error deleting member:", error);
            setMessage('Error deleting member');
            setMessageType('error');
            setOpenSnackbar(true);
        }
        setOpenDialog(false);
        setDeleteId(null);
    };

    const handleStatusToggle = async (id) => {
        const item = data.find(row => row.id === id);
        const updatedStatus = !item.isDisabled;
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/member/membership/${id}`, {
                isDisabled: updatedStatus,
                // email: item.email,  // Include email in the request 
            });

            if (response.data.status === "success") {
                setData(prevRows =>
                    prevRows.map(row =>
                        row.id === id ? { ...row, isDisabled: updatedStatus } : row
                    )
                );
                setMessage('Status updated successfully');
                setMessageType('success');
            } else {
                setMessage('Failed to update status: ' + response.data.message);
                setMessageType('error');
            }
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error updating status:", error);
            setMessage('Error updating status');
            setMessageType('error');
            setOpenSnackbar(true);
        }
    };



    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    };
    // const handleInputChange = (e) => {
    //     const { name, value, type, checked } = e.target;
    //     setForm(prevForm => ({
    //         ...prevForm,
    //         [name]: type === 'checkbox' ? checked : value,
    //     }));
    // };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Prepare the form data as a simple object
        const formData = {
            fullName: form.fullName,
            address: form.address,
            dateOfBirth: form.dateOfBirth ? new Date(form.dateOfBirth).toISOString().split('T')[0] : '',
            gender: form.gender,
            phone: form.phone,
            email: form.email,
            membershipType: form.membershipType,
            isDisabled: form.isDisabled,
        };

        try {
            let response;

            // If editing an existing member
            if (editId) {
                response = await axios.put(`${process.env.REACT_APP_API_URL}/api/member/membership/${editId}`, formData, {
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.data.status === "success") {
                    setData((prevData) =>
                        prevData.map((item) =>
                            item.id === editId ? { ...item, ...formData } : item
                        )
                    );
                    setMessage('Member updated successfully');
                }
            }
            // If adding a new member
            else {
                response = await axios.post(`${process.env.REACT_APP_API_URL}/api/member/membershipregister`, formData, {
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.data.status === "success") {
                    fetchData();  // Fetch updated member data
                    setMessage('Member added successfully');
                }
            }

            setMessageType('success');
            setOpenSnackbar(true);
            setIsFormVisible(false);
            setEditId(null);

        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage('Error submitting form');
            setMessageType('error');
            setOpenSnackbar(true);
        }
    };

    const handleCancel = () => {
        setIsFormVisible(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setDeleteId(null);
    };

    // Export to Excel function
    const exportToExcel = () => {
        // Prepare the data in a format suitable for Excel
        const exportData = data.map(({ Id, fullName, address, createdAt, dateOfBirth, gender, phone, email, membershipType, isDisabled }) => ({
            'S.No': Id,
            'Full Name': fullName,
            'Address': address,
            'Registration Date': new Date(createdAt).toLocaleDateString(),
            'Date of Birth': new Date(dateOfBirth).toLocaleDateString(),
            'Gender': gender,
            'Phone': phone,
            'Email': email,
            'Membership Type': membershipType,
            'Approved': isDisabled ? 'Yes' : 'No'
        }));
    
        // Convert JSON data to worksheet format
        const worksheet = utils.json_to_sheet(exportData);
    
        // Create a new workbook and append the worksheet
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Members Data');
    
        // Write the workbook to an Excel file
        writeFile(workbook, 'MembersData.xlsx');
    };
    

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                Membership
            </Typography>
            {/* Add Export Button */}
            <Button variant="contained" color="primary" onClick={exportToExcel}>
                Export
            </Button>
            {isFormVisible ? (
                <Box>
                    <Typography variant="h6" component="h2">
                        {editId ? 'Edit Member' : 'Add Member'}
                    </Typography>
                    <form onSubmit={handleFormSubmit}>
                        <TextField label="Full Name" name="fullName" value={form.fullName} onChange={handleInputChange} fullWidth margin="normal" />
                        <TextField label="Address" name="address" value={form.address} onChange={handleInputChange} fullWidth margin="normal" />
                        <TextField
                            label="Date of Birth"
                            name="dateOfBirth"
                            value={form.dateOfBirth ? form.dateOfBirth.split('T')[0] : ''}  // Format as yyyy-mm-dd
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            type="date"
                            inputProps={{ pattern: "\\d{4}-\\d{2}-\\d{2}" }}  // Ensure proper format
                        />
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select
                                labelId="gender-label"
                                name="gender"
                                value={form.gender}
                                onChange={handleInputChange}
                                label="gender"
                                required
                            >
                                {Object.keys(GenderEnum).map((key) => (
                                    <MenuItem key={key} value={GenderEnum[key]} >
                                        {GenderEnum[key]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField label="Phone" name="phone" value={form.phone} onChange={handleInputChange} fullWidth margin="normal" />
                        <TextField label="Email" name="email" value={form.email} onChange={handleInputChange} fullWidth margin="normal" />
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="membership-type-label">Membership Type</InputLabel>
                            <Select
                                labelId="membership-type-label"
                                name="membershipType"
                                value={form.membershipType}
                                onChange={handleInputChange}
                                label="membershipType"
                                required
                            >
                                {Object.keys(MemberTypeEnum).map((key) => (
                                    <MenuItem key={key} value={MemberTypeEnum[key]} >
                                        {MemberTypeEnum[key]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box display="flex" alignItems="center" mt={2}>
                            <Typography>Approved</Typography>
                            <Switch name="isDisabled" checked={form.isDisabled} onChange={handleInputChange} color="success" />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Button type="submit" variant="contained" color="primary">
                                {editId ? 'Update' : 'Add'}
                            </Button>
                            <Button onClick={handleCancel} variant="contained" color="secondary" sx={{ ml: 2 }}>
                                Cancel
                            </Button>
                        </Box>
                    </form>
                </Box>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="members table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>S.No</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Full Name</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Address</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Registration Date</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Date of Birth</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Gender</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Phone</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Email</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Membership Type</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Approved</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Edit</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.Id}</TableCell>
                                        <TableCell>{row.fullName}</TableCell>
                                        <TableCell>{row.address}</TableCell>
                                        <TableCell>{new Date(row.createdAt).toISOString().split('T')[0]}</TableCell>
                                        <TableCell>{new Date(row.dateOfBirth).toISOString().split('T')[0]}</TableCell>
                                        <TableCell>{row.gender}</TableCell>
                                        <TableCell>{row.phone}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.membershipType}</TableCell>
                                        <TableCell>
                                            <Switch checked={row.isDisabled} onChange={() => handleStatusToggle(row.id)} color={row.isDisabled ? 'success' : 'error'} />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton color="primary" onClick={() => handleEdit(row)}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton color="secondary" onClick={() => handleDelete(row.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={messageType} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <Dialog open={openDialog} onClose={handleDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this member?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} variant="contained" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} variant="contained" color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Membership;
